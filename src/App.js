// src/App.js
import React from 'react';
import './App.css';

function App() {
  // Example tweet data (replace with real data from your backend / Twitter API)
  const tweetData = [
    {
      id: 1,
      author: 'User123',
      text: 'Large fire reported near Main Street. Fire department is on the way!',
      location: 'Main Street',
      timestamp: '2025-02-20 10:30 AM'
    },
    {
      id: 2,
      author: 'FirstResponderTeam',
      text: 'We have set up an emergency shelter at the Community Center.',
      location: 'Community Center',
      timestamp: '2025-02-20 10:45 AM'
    },
    {
      id: 3,
      author: 'LocalNews',
      text: 'Traffic jam on Highway 5 due to flooding. Avoid if possible.',
      location: 'Highway 5',
      timestamp: '2025-02-20 11:00 AM'
    },
    {
      id: 4,
      author: 'EmergencyAlert',
      text: 'Flash flood warning in the downtown area. Seek higher ground immediately.',
      location: 'Downtown',
      timestamp: '2025-02-20 12:15 PM'
    },
    {
      id: 5,
      author: 'CityHall',
      text: 'Power outage in the northern district. Crews are working to restore electricity.',
      location: 'Northern District',
      timestamp: '2025-02-20 12:30 PM'
    },
    {
      id: 6,
      author: 'CitizenAid',
      text: 'Volunteers needed at the community center to help distribute supplies.',
      location: 'Community Center',
      timestamp: '2025-02-20 01:00 PM'
    },
    {
      id: 7,
      author: 'TrafficUpdate',
      text: 'Road closure on Elm Street due to fallen tree. Use alternative routes.',
      location: 'Elm Street',
      timestamp: '2025-02-20 01:15 PM'
    },
    {
      id: 8,
      author: 'WeatherWatch',
      text: 'Severe thunderstorm approaching from the west. Expect strong winds and hail.',
      location: 'Western Suburbs',
      timestamp: '2025-02-20 01:45 PM'
    },
    {
      id: 9,
      author: 'LocalShelter',
      text: 'Overnight shelter capacity is reaching limits. Please call ahead if possible.',
      location: 'Main Shelter',
      timestamp: '2025-02-20 02:00 PM'
    },
    {
      id: 10,
      author: 'FireDept',
      text: 'Multiple reports of smoke near the industrial area. Investigation in progress.',
      location: 'Industrial Area',
      timestamp: '2025-02-20 02:15 PM'
    },
    {
      id: 11,
      author: 'MedicalTeam',
      text: 'Ambulance delayed on route 66 due to heavy traffic. Use alternate access if needed.',
      location: 'Route 66',
      timestamp: '2025-02-20 02:30 PM'
    },
    {
      id: 12,
      author: 'WaterRescue',
      text: 'Water levels rising at Riverside. Rescue teams are on standby for emergencies.',
      location: 'Riverside',
      timestamp: '2025-02-20 02:45 PM'
    },
    {
      id: 13,
      author: 'LocalGov',
      text: 'Curfew imposed in the downtown area for public safety. Please avoid non-essential travel.',
      location: 'Downtown',
      timestamp: '2025-02-20 03:00 PM'
    },
    {
      id: 14,
      author: 'VolunteerCoord',
      text: 'Emergency volunteers needed for food distribution at City Park. Sign up if available.',
      location: 'City Park',
      timestamp: '2025-02-20 03:15 PM'
    },
    {
      id: 15,
      author: 'SafetyFirst',
      text: 'Reminder: Do not use open flames in residential areas due to strong winds and fire risks.',
      location: 'Residential Area',
      timestamp: '2025-02-20 03:30 PM'
    }
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1>Crisis Dashboard</h1>
        <nav>
          <a href="#overview">Overview</a>
          <a href="#alerts">Alerts</a>
          <a href="#resources">Resources</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
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
              <p className="location">
                <strong>Location:</strong> {tweet.location}
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;



