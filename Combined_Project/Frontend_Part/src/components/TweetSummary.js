// src/components/TweetSummary.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./TweetSummary.css";

function TweetSummary({ tweetData }) {
  const navigate = useNavigate();

  const handleClick = (tweetId) => {
    // Navigate to the detail page for this tweet
    navigate(`/tweet/${tweetId}`);
  };

  return (
    <section className="tweet-grid">
      {tweetData.map((tweet) => (
        <article
          key={tweet.ID}
          className="tweet-card"
          onClick={() => handleClick(tweet.ID)}
          style={{ cursor: "pointer" }}
        >
          <h3>{tweet.UserID}</h3>
          <p className="Disaster"> Disaster="{tweet.DisasterType}"; Sentiment="{tweet.SentimentPrediction}" </p>
          <p className="text">{tweet.Post}</p>
          <p className="location">Location: {tweet.Location} </p>
          <p className="time"> {tweet.TimeStamp} </p>
        </article>
      ))}
    </section>
  );
}

export default TweetSummary;
