// src/App.js
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  NavLink
} from 'react-router-dom';

import MapComponent from './components/MapComponent';
import TweetSummary from './components/TweetSummary';
import TweetDetail from './components/TweetDetail';
import Statistics from './components/Statistics';


import './App.css';

function Dashboard({ tweetData }) {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <h1>Crisis Dashboard</h1>
        <nav>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            Alerts
          </NavLink>

          {/* removed Alerts link */}

          <NavLink
            to="/resources"
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            Statistics
          </NavLink>

          <NavLink
            to="/map"
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            Map
          </NavLink>
        </nav>
      </aside>

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

  // location filter state
  const [locationFilter, setLocationFilter] = useState("");
  // derive unique locations
  const locations = Array.from(
    new Set(tweetData.map(t => t.state))
  ).sort();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard tweetData={tweetData} />}>
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
                {/* location filter */}
                <div className="filter-container" style={{ marginBottom: '2rem' }}>
  <label>Location:</label>
  <select
    value={locationFilter}
    onChange={e => setLocationFilter(e.target.value)}
  >
    <option value="">All</option>
    {locations.map(loc => (
      <option key={loc} value={loc}>{loc}</option>
    ))}
  </select>
  {/* back / clear button */}
  <button
    className="clear-filter"
    onClick={() => setLocationFilter("")}
    style={{ marginLeft: '1rem', padding: '0.3rem 0.6rem' }}
  >
    Clear
  </button>
</div>
                <TweetSummary
                  tweetData={tweetData.filter(
                    t => !locationFilter || t.state === locationFilter
                  )}
                />
              </>
            }
          />
          <Route path="map" element={<MapComponent tweetData={tweetData} />} />
          <Route path="resources" element={<Statistics />} />
          <Route path="tweet/:id" element={<TweetDetail tweetData={tweetData} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
