
from fastapi import FastAPI
from typing import List  # Import missing types
import pandas as pd
import json
import os

app = FastAPI()

@app.get("/search")
def echo_message(message: str):

    return {"You said": message}


"""
from fastapi import FastAPI, Query
from typing import List, Optional
import pandas as pd

app = FastAPI()

# Load dataset (Replace 'tweets.csv' with your actual dataset)
df = pd.read_csv("tweets.csv")

@app.get("/search")
def search_tweets(
    account: Optional[str] = Query(None, description="Filter by account name"),
    location: Optional[str] = Query(None, description="Filter by location"),
    keywords: Optional[List[str]] = Query(None, description="Search for keywords")
):
    

    

# Start with the full dataset
    filtered_df = df.copy()

# Filter by account name (if provided)
    if account:
        filtered_df = filtered_df[filtered_df["account"].str.contains(account, case=False, na=False)]

# Filter by location (if provided)
    if location:
        filtered_df = filtered_df[filtered_df["location"].str.contains(location, case=False, na=False)]

# Filter by keywords (if provided)
    if keywords:
        keyword_pattern = "|".join(keywords)  # Create regex pattern for multiple keywords
        filtered_df = filtered_df[filtered_df["tweet_text"].str.contains(keyword_pattern, case=False, na=False)]

# Convert results to dictionary
    results = filtered_df.to_dict(orient="records")

    return {"search_results": results}


"""