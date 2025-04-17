// src/App.js
// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import MapComponent from './components/MapComponent';
import TweetSummary from './components/TweetSummary';
import TweetDetail from './components/TweetDetail';
import './App.css';

// Inline Dashboard layout wraps all child routes
function Dashboard({ tweetData, activeTab, setActiveTab }) {
  return (
    <div className="app-container">
      {/* Sidebar stays consistent across all pages */}
      <aside className="sidebar">
        <h1>Crisis Dashboard</h1>
        <nav>
          <a href="/" onClick={() => setActiveTab('tweets')}>Overview</a>
          <a href="/#alerts" onClick={() => setActiveTab('alerts')}>Alerts</a>
          <a href="/#resources" onClick={() => setActiveTab('resources')}>Resources</a>
          <a href="/map" onClick={() => setActiveTab('map')}>Map</a>
        </nav>
      </aside>

      {/* Main Content renders whichever child route is active */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  const tweetData = [
    { id: 1, author: "User123", text: "Fire reported!", timestamp: "2025-02-20 10:30 AM", state: "California", city: "Los Angeles" },
    { id: 2, author: "FirstResponderTeam", text: "Shelter in place!", timestamp: "2025-02-20 10:45 AM", state: "New York", city: "New York City" },
    { id: 3, author: "LocalNews", text: "Flooding in Texas.", timestamp: "2025-02-20 11:00 AM", state: "Texas", city: "Houston" },
    { id: 4, author: "CitizenAid", text: "Need volunteers in Florida.", timestamp: "2025-02-20 12:15 PM", state: "Florida", city: "Miami" },
    { id: 5, author: "WeatherWatch", text: "Severe storm warning in Illinois.", timestamp: "2025-02-20 12:30 PM", state: "Illinois", city: "Chicago" },
    { id: 6, author: "DisasterReliefOrg", text: "Tornado damage reported in Oklahoma.", timestamp: "2025-02-20 01:00 PM", state: "Oklahoma", city: "Oklahoma City" },
    { id: 7, author: "NewsFlash", text: "Heavy rain in Seattle!", timestamp: "2025-02-20 01:30 PM", state: "Washington", city: "Seattle" },
    { id: 8, author: "SafeHome", text: "Snowstorm expected tonight.", timestamp: "2025-02-20 02:00 PM", state: "Colorado", city: "Denver" },
    { id: 9, author: "CityAlert", text: "Power outage in Miami.", timestamp: "2025-02-20 02:15 PM", state: "Florida", city: "Miami" },
    { id: 10, author: "WeatherNow", text: "Hot temperatures in Arizona.", timestamp: "2025-02-20 02:30 PM", state: "Arizona", city: "Phoenix" },
    { id: 11, author: "EmergencyInfo", text: "Road closures due to landslides.", timestamp: "2025-02-20 03:00 PM", state: "California", city: "San Francisco" },
    { id: 12, author: "AlertZone", text: "Wildfires near Portland.", timestamp: "2025-02-20 03:30 PM", state: "Oregon", city: "Portland" },
    { id: 13, author: "SafetyUpdate", text: "Bridge collapse, avoid downtown area.", timestamp: "2025-02-20 04:00 PM", state: "New Jersey", city: "Newark" },
    { id: 14, author: "LocalRescue", text: "Evacuation in progress in Detroit.", timestamp: "2025-02-20 04:15 PM", state: "Michigan", city: "Detroit" },
    { id: 15, author: "CommunityWatch", text: "Minor earthquake reported in Nevada.", timestamp: "2025-02-20 04:30 PM", state: "Nevada", city: "Las Vegas" }
  ];

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Router>
      <Routes>
        {/* Dashboard wraps these child routes for consistent layout */}
        <Route
          path="/"
          element={
            <Dashboard
              tweetData={tweetData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          }
        >
          {/* SUMMARY view at "/" */}
          <Route
            index
            element={
              <>
                <div className="page-header">
                  <h1>Live Tweets</h1>
                  <p className="page-subtitle">
                    Live Updates Relevant To First Responders
                  </p>
                </div>
                <TweetSummary tweetData={tweetData} />
              </>
            }
          />

          {/* Map view at "/map" */}
          <Route
            path="map"
            element={<MapComponent tweetData={tweetData} />}
          />

          {/* Detail view at "/tweet/:id" */}
          <Route
            path="tweet/:id"
            element={<TweetDetail tweetData={tweetData} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
