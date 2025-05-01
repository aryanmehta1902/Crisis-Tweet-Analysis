// src/components/TweetDetail.js
import React from "react";
import { useParams, Link } from "react-router-dom";
//import { useParams } from "react-router-dom";
import "./TweetDetail.css";    // if you choose a separate CSS file

function TweetDetail({ tweetData }) {
  const { id } = useParams();
  const tweet = tweetData.find((t) => t.ID === parseInt(id, 10));

  if (!tweet) {
    return (
      <div className="tweet-detail-container">
        <h2 className="detail-title">Tweet not found</h2>
        {/* <Link to="/" className="back-link">Back to Tweet Summary</Link> */}
      </div>
    );
  }

  return (
    <div className="tweet-detail-container">
      <h1 className="detail-title">{tweet.UserID}</h1>

      <div className="detail-box">
        <p className="detail-timestamp">{tweet.DisasterType}:{tweet.SentimentPrediction} : {tweet.Sentiment}</p>
        <p className="detail-text">{tweet.Post}</p>
        <p className="detail-location">{tweet.Location}</p>
      </div>

      {/* <Link to="/" className="back-link">Back to Tweet Summary</Link> */}
    </div>
  );
}

export default TweetDetail;

