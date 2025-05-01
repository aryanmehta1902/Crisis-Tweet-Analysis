import pandas as pd
import joblib
from textblob import TextBlob
from pydantic import BaseModel
from fastapi import FastAPI
import sys
import pickle

from typing import List

from textblob import TextBlob

from preprocessing import TweetPreprocessor

import cloudpickle


sys.modules['__main__'].TweetPreprocessor = TweetPreprocessor
def predict_sentiment(text):
    if pd.isna(text):
        return 0.0 
    polarity = TextBlob(text).sentiment.polarity
    if polarity > 0.1:
        return "Positive"
    elif polarity < -0.1:
        return "Negative"
    else:
        return "Neutral"

class PostData(BaseModel):
    ID: int
    Post: str
    DisasterType: str | None = None
    Location: str | None = None
    Sentiment: str | None = None
    UserID: str | None = None
    TimeStamp: str | None = None

app = FastAPI()


global model
###########################################
## Update filepath if needed
###########################################
model = joblib.load(r"D:\Twitter_Project\Backend_Project\models\disaster_sentiment_pipeline.pkl")

@app.post("/")
def predict(data: List[PostData]):
    df = pd.DataFrame([d.dict() for d in data])
    posts = df[['Post']]
    df['Post'] = df['Post'].fillna('')
     
    
    disaster_prediction = model.predict(df[['Post']])

    df['DisasterType'] = disaster_prediction.ravel()
    #print(disaster_prediction)
    df['SentimentPrediction'] = df['Post'].apply(predict_sentiment)
    
    return df.to_dict(orient="records")