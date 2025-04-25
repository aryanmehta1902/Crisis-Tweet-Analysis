# !pip install spacy textblob
# !python -m textblob.download_corpora
# !python -m spacy download en_core_web_sm

import pandas as pd
import re
import string
import spacy
from textblob import TextBlob
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.multioutput import MultiOutputClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

# === Load and preprocess ===
df = pd.read_csv("disaster_posts_1_cleaned.csv")
df = df[['Post', 'DisasterType']].dropna()

# === Sentiment calculation ===
def get_sentiment_label(text):
    polarity = TextBlob(text).sentiment.polarity
    if polarity > 0.1:
        return "Positive"
    elif polarity < -0.1:
        return "Negative"
    else:
        return "Neutral"

df['Sentiment_Label'] = df['Post'].apply(get_sentiment_label)

# === spaCy clean + lemmatize ===
nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])
def preprocess(text):
    text = text.lower()
    text = re.sub(r"http\S+|www.\S+|@\w+|#\w+|\d+", "", text)
    text = re.sub(f"[{re.escape(string.punctuation)}]", "", text)
    text = text.encode("ascii", errors="ignore").decode()
    doc = nlp(text)
    return " ".join([token.lemma_ for token in doc if not token.is_stop and len(token) > 2])

df['CleanPost'] = df['Post'].apply(preprocess)

# === Features and multi-label targets ===
X = df[['CleanPost']]
y = df[['DisasterType', 'Sentiment_Label']]  # MULTI-TARGET

# === Train/Test split ===
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y['DisasterType'], random_state=42)

# === Preprocessing and TF-IDF ===
preprocessor = ColumnTransformer([
    ('text', TfidfVectorizer(max_features=5000, ngram_range=(1, 2)), 'CleanPost')
])

# === Multi-output classifier with Gradient Boosting ===
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('clf', MultiOutputClassifier(GradientBoostingClassifier(n_estimators=300, max_depth=5, random_state=42)))
])

# === Train ===
pipeline.fit(X_train, y_train)

# === Predict and Evaluate ===
y_pred = pipeline.predict(X_test)
print("=== Classification Report (Disaster Type) ===")
print(classification_report(y_test['DisasterType'], y_pred[:, 0]))

print("\n=== Classification Report (Sentiment) ===")
print(classification_report(y_test['Sentiment_Label'], y_pred[:, 1]))

# === Save the multi-output model ===
joblib.dump(pipeline, "multioutput_disaster_sentiment_model.pkl")
print("\n🎉 Model saved as: multioutput_disaster_sentiment_model.pkl")

# Load spaCy English model
nlp = spacy.load("en_core_web_sm")

# Example location extraction function
def extract_location(text):
    doc = nlp(text)
    locations = [ent.text for ent in doc.ents if ent.label_ in ("GPE", "LOC")]
    return locations[0] if locations else None

# Example with a tweet column
df = pd.read_csv("disaster_posts_1_cleaned.csv")
df['Extracted_Location'] = df['Post'].apply(extract_location)

# Show a few examples
print(df[['Post', 'Extracted_Location']].head())

# Load the trained multi-output model from file
model = joblib.load("multioutput_disaster_sentiment_model.pkl")

# Clean + lemmatized tweet (same format as model expects)
new_data = pd.DataFrame([{
    'CleanPost': "Massive flood hits downtown New York"
}])

predictions = model.predict(new_data)
predicted_disaster = predictions[0][0]
predicted_sentiment = predictions[0][1]

print("🌀 Predicted Disaster Type:", predicted_disaster)
print("💬 Predicted Sentiment:", predicted_sentiment)