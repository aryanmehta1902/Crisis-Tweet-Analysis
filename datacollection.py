import pandas as pd
import time
import spacy
from textblob import TextBlob
from atproto import Client, models  # Ensure your Bluesky API client library is installed
import warnings
import csv

warnings.filterwarnings("ignore", category=UserWarning)

summaries_cols = ["disasterNumber", "incidentType", "state"]
fema_summaries = pd.read_csv("DisasterDeclarationsSummaries.csv", usecols=summaries_cols, low_memory=True)

areas_cols = ["disasterNumber"]  # Include additional columns if needed.
fema_areas = pd.read_csv("FemaWebDeclarationAreas.csv", usecols=areas_cols, low_memory=True)

# Merge the datasets on the disasterNumber key.
df_fema = pd.merge(fema_summaries, fema_areas, on="disasterNumber", how="left")

# Drop rows missing the required fields.
df_fema = df_fema.dropna(subset=["incidentType", "state"])

# Create a query column that concatenates the incident type with the state.
df_fema["Query"] = df_fema["incidentType"].astype(str) + " " + df_fema["state"].astype(str)


# Keep only unique queries.
queries = df_fema["Query"].unique()
print(f"Constructed {len(queries)} unique FEMA queries.")


# Load spaCy model for NLP-based location extraction.
nlp = spacy.load("en_core_web_sm")

def extract_location_nlp(text):
    """
    Attempt to extract a location from text using spaCy's NER.
    Returns the longest candidate entity of type GPE or LOC.
    """
    doc = nlp(text)
    locations = [ent.text for ent in doc.ents if ent.label_ in ["GPE", "LOC"]]
    if locations:
        return max(set(locations), key=len)
    return None

def analyze_sentiment(text):
    """
    Calculate and return the sentiment polarity of the text.
    """
    return TextBlob(text).sentiment.polarity
client = Client()
client.login("vaishnavik.bsky.social", "#Login_guppi21") 

def fetch_posts_for_query(query, max_posts=100):
    """
    Fetch posts from Bluesky for the given query.
    Adjust posts_per_page and max_posts as needed based on API limitations.
    """
    posts = []
    page = 1
    posts_per_page = 25  # Adjust if needed
    while len(posts) < max_posts:
        try:
            params = models.AppBskyFeedSearchPosts.Params(q=query, page=page, limit=posts_per_page)
            feed = client.app.bsky.feed.search_posts(params)
        except Exception as e:
            print(f"Error fetching posts for query '{query}' on page {page}: {e}")
            time.sleep(10)
            continue
        
        # If no posts were returned, break out of the loop.
        if not feed.posts:
            break
        
        posts.extend(feed.posts)
        page += 1
        time.sleep(1)  # Respect API rate limits
    return posts

collected_posts = []
seen_ids = set()

# Process each unique FEMA query.
for query in queries:
    print(f"Fetching posts for query: '{query}'")
    posts = fetch_posts_for_query(query, max_posts=100)
    # For each post, extract desired details.
    for post in posts:
        # Create a unique identifier for the post (either from post.record.id or a hash of the text).
        post_id = getattr(post.record, "id", None) or hash(post.record.text)
        if post_id in seen_ids:
            continue
        seen_ids.add(post_id)
        
        post_text = post.record.text
        user_id = post.author.handle
        
        # Try to extract a location from the post text.
        loc = extract_location_nlp(post_text)
        if loc is None:
            # Fallback: use the state from the query (assumes state is the last word).
            loc = query.split()[-1]
        
        sentiment = analyze_sentiment(post_text)
        # Disaster type is taken as everything in the query except the last word (state).
        disaster_type = " ".join(query.split()[:-1])
        
        collected_posts.append({
            "Location": loc,
            "Post": post_text,
            "UserID": user_id,
            "Sentiment": sentiment,
            "DisasterType": disaster_type
        })
    print(f"After query '{query}': collected {len(collected_posts)} unique posts so far.")

df_posts = pd.DataFrame(collected_posts)
output_csv = "disaster_posts_3.csv"
df_posts.to_csv(output_csv, index=False)
print(f"Saved {len(df_posts)} disaster posts to '{output_csv}'.")

df = pd.read_csv('disaster_posts_1.csv')

# Display basic dataset info to understand its structure
print("Data Information:")
print(df.info())
print("\nData Head Preview:")
print(df.head())

# Remove any duplicate rows that might exist in the dataset.
df = df.drop_duplicates()

missing_counts = df.isnull().sum()
print("\nMissing Values in Each Column:")
print(missing_counts)


# Many disaster post datasets include a text field (e.g. 'text', 'message', or 'content').
if 'text' in df.columns:
    # Convert text to string (if not already), lower-case, and remove leading/trailing whitespace.
    df['text'] = df['text'].astype(str).str.lower().str.strip()
    
    # Remove punctuation: You can also customize which punctuation or characters to remove.
    df['text'] = df['text'].apply(lambda x: x.translate(str.maketrans('', '', string.punctuation)))
    
    # Replace any extra spaces with a single space for readability.
    df['text'] = df['text'].str.replace('\s+', ' ', regex=True)

# If your dataset uses another column name for the main content,
# repeat similar steps for that column (e.g. 'message' or 'content'):
if 'message' in df.columns:
    df['message'] = df['message'].astype(str).str.lower().str.strip()
    df['message'] = df['message'].apply(lambda x: x.translate(str.maketrans('', '', string.punctuation)))
    df['message'] = df['message'].str.replace('\s+', ' ', regex=True)

# For numeric columns, one strategy might be to replace missing values with the column mean:
num_cols = df.select_dtypes(include=['int64', 'float64']).columns
for col in num_cols:
    df[col] = df[col].fillna(df[col].mean())

# For categorical or text columns, you might fill missing values with a placeholder:
cat_cols = df.select_dtypes(include=['object']).columns
for col in cat_cols:
    df[col] = df[col].fillna('unknown')

# Recheck missing values after imputation
print("\nMissing Values After Cleaning:")
print(df.isnull().sum())

if 'DisasterType' in df.columns:
    print(df['DisasterType'].value_counts())
    
# Save the cleaned dataframe to a new CSV file.
cleaned_filepath = 'disaster_posts_1_cleaned.csv'
df.to_csv(cleaned_filepath, index=False)
print(f"\nData cleaning complete. Cleaned data saved as {cleaned_filepath}")
