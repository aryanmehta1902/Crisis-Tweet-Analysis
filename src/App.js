// src/App.js
import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import './App.css';

function App() {
  // Example tweet data (replace with real data from your backend / Twitter API)
  const tweetData = [
    { id: 1, author: "User123", text: "Fire reported!", timestamp: "2025-02-20 10:30 AM", state: "California", city: "Los Angeles" },
    { id: 2, author: "FirstResponderTeam", text: "Shelter in place!", timestamp: "2025-02-20 10:45 AM", state: "New York", city: "New York City" },
    { id: 3, author: "LocalNews", text: "Flooding in Texas.", timestamp: "2025-02-20 11:00 AM", state: "Texas", city: "Houston" },
    { id: 4, author: "CitizenAid", text: "Need volunteers in Florida.", timestamp: "2025-02-20 12:15 PM", state: "Florida", city: "Miami" },
    { id: 5, author: "WeatherWatch", text: "Severe storm warning in Illinois.", timestamp: "2025-02-20 12:30 PM", state: "Illinois", city: "Chicago" },
    { id: 6, author: "DisasterReliefOrg", text: "Tornado damage reported in Oklahoma.", timestamp: "2025-02-20 01:00 PM", state: "Oklahoma", city: "Oklahoma City" }
  ];
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1>Crisis Dashboard</h1>
        <nav>
          <a href="#overview" onClick={() => setActiveTab("tweets")}>Overview</a>
          <a href="#alerts" onClick={() => setActiveTab("tweets")}>Alerts</a>
          <a href="#resources" onClick={() => setActiveTab("tweets")}>Resources</a>
          <a href="#map" onClick={() => setActiveTab("map")}>Map</a> {/* Click to switch to map */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === "map" ? (
          <>
            <header className="main-header">
              <h2>Map View</h2>
              <p>Visualizing tweet locations</p>
            </header>
            <MapComponent tweetData={tweetData} />
          </>
        ) : (
          <>
            <header className="main-header">
              <h2>Tweet Summary</h2>
              <p>Live updates relevant to first responders</p>
            </header>
            {/* Tweet Cards */}
            <section className="tweet-grid">
              {tweetData.map((tweet) => (
                <article key={tweet.id} className="tweet-card">
                  <h3>{tweet.author}</h3>
                  <p className="timestamp">{tweet.timestamp}</p>
                  <p className="text">{tweet.text}</p>
                  <p className="location">{tweet.state}</p>
                    
                </article>
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;


