# Install dependencies
!pip install atproto psycopg2-binary sqlalchemy pandas

# Import packages
from atproto import Client
from sqlalchemy import create_engine, Table, Column, String, MetaData
import pandas as pd
import time

# === CONFIGURATION ===
BLUESKY_USERNAME = "vaishnavik.bsky.social"
BLUESKY_APP_PASSWORD = "#Login_guppi21"
DATABASE_URL = "postgresql+psycopg2://postgres:StWzpGcZYpZqsyUsxWBWxZaxvVkHPTzf@mainline.proxy.rlwy.net:13374/railway"

DISASTER_KEYWORDS = [
    "earthquake", "flood", "fire", "storm", "hurricane", "tsunami", "tornado",
    "landslide", "drought", "volcano", "blizzard", "avalanche", "disaster", "evacuation"
]

# === SETUP DATABASE ===
engine = create_engine(DATABASE_URL)
metadata = MetaData()

posts = Table(
    'posts', metadata,
    Column('uri', String, primary_key=True),
    Column('text', String),
    Column('author', String),
    Column('created_at', String),
)

metadata.create_all(engine)

# === CONNECT TO BLUESKY ===
client = Client()
client.login(BLUESKY_USERNAME, BLUESKY_APP_PASSWORD)

# === LOOP: Up to 100 disaster posts per minute ===
while True:
    try:
        data = []
        cursor = None
        collected = 0
        max_posts = 100

        while collected < max_posts:
            response = client.app.bsky.feed.get_author_feed({'actor': 'bsky.app', 'cursor': cursor})

            if not response.feed:
                break

            for post in response.feed:
                try:
                    uri = post.post.uri
                    text = post.post.record.text
                    author = post.post.author.handle
                    created = post.post.record.created_at

                    if any(word in text.lower() for word in DISASTER_KEYWORDS):
                        data.append({
                            'uri': uri,
                            'text': text,
                            'author': author,
                            'created_at': created
                        })
                        collected += 1

                        if collected >= max_posts:
                            break
                except Exception as err:
                    print("Error on one post:", err)

            cursor = response.cursor
            if not cursor:
                break  # No more pages

        # Save to DB
        if data:
            df = pd.DataFrame(data)
            df.to_sql('posts', engine, if_exists='append', index=False)
            print(f"{len(df)} disaster-related posts saved. Waiting 1 minute...")
        else:
            print("No disaster-related posts found. Waiting 1 minute...")

    except Exception as e:
        print(f"Error: {e}")

    time.sleep(60)
