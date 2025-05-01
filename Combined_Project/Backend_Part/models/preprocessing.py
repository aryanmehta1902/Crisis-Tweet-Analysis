# preprocessing.py
import re
import string
import spacy
from textblob import TextBlob
from sklearn.base import BaseEstimator, TransformerMixin

nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])

class TweetPreprocessor(BaseEstimator, TransformerMixin):
    def __init__(self):
        pass

    def cleantext(self, text):
        if not isinstance(text, str):
            return ""
        text = text.lower()
        #text = re.sub(r"http\S+|www.\S+|@\w+|#\w+|\d+", "", text)
        text = re.sub(r"http\\S+|www\\.\\S+|@\\w+|#\\w+|\\d+", "", text)
        text = re.sub(f"[{re.escape(string.punctuation)}]", "", text)
        text = text.encode("ascii", errors="ignore").decode()
        doc = nlp(text)
        return " ".join([token.lemma_ for token in doc if not token.is_stop and len(token) > 2])

    def transform(self, X, y=None):
        X = X.copy()
        X['Post'] = X['Post'].fillna('')
        X['CleanPost'] = X['Post'].apply(self.cleantext)
        X['Sentiment_Score'] = X['Post'].apply(lambda text: TextBlob(text).sentiment.polarity)
        return X

    def fit(self, X, y=None):
        return self