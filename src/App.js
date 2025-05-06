// src/App.js
import React, { useState } from 'react';
import Welcome from './components/Welcome'; // Adjust path if needed

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
        <h1>Sentry</h1>
        <nav>
        <NavLink
  to="/dashboard"
  end
  className={({ isActive }) =>
    isActive ? 'nav-item active' : 'nav-item'
  }
>
  Alerts
</NavLink>

<NavLink
  to="/dashboard/resources"
  className={({ isActive }) =>
    isActive ? 'nav-item active' : 'nav-item'
  }
>
  Statistics
</NavLink>

<NavLink
  to="/dashboard/map"
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

  const [locationFilter, setLocationFilter] = useState("");
  const locations = Array.from(
    new Set(tweetData.map(t => t.state))
  ).sort();

  return (
    <Router>
    <Routes>
      {/* Landing Page Route */}
      <Route path="/" element={<Welcome />} />
  
      {/* Main Dashboard Route */}
      <Route path="/dashboard" element={<Dashboard tweetData={tweetData} />}>
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
