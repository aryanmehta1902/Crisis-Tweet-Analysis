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
          key={tweet.id}
          className="tweet-card"
          onClick={() => handleClick(tweet.id)}
          style={{ cursor: "pointer" }}
        >
          <h3>{tweet.author}</h3>
          <p className="timestamp">{tweet.timestamp}</p>
          <p className="text">{tweet.text}</p>
          <p className="location">{tweet.state}</p>
        </article>
      ))}
    </section>
  );
}

export default TweetSummary;
