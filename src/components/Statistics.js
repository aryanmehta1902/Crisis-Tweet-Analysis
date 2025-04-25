import React from 'react';
import './Statistics.css';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Statistics() {
  // Paste your static tweet data from App.js
  const tweetData = [
    { id: 1, author: "User123", text: "Fire reported!", timestamp: "2025-02-20 10:30 AM", state: "California", city: "Los Angeles", type: "Fire" },
    { id: 2, author: "FirstResponderTeam", text: "Shelter in place!", timestamp: "2025-02-20 10:45 AM", state: "New York", city: "New York City", type: "Hurricane" },
    { id: 3, author: "LocalNews", text: "Flooding in Texas.", timestamp: "2025-02-20 11:00 AM", state: "Texas", city: "Houston", type: "Flood" },
    { id: 4, author: "CitizenAid", text: "Need volunteers in Florida.", timestamp: "2025-02-20 12:15 PM", state: "Florida", city: "Miami", type: "Hurricane" },
    { id: 5, author: "WeatherWatch", text: "Severe storm warning in Illinois.", timestamp: "2025-02-20 12:30 PM", state: "Illinois", city: "Chicago", type: "Tornado" },
    { id: 6, author: "DisasterReliefOrg", text: "Tornado damage reported in Oklahoma.", timestamp: "2025-02-20 01:00 PM", state: "Oklahoma", city: "Oklahoma City", type: "Tornado" },
    { id: 7, author: "NewsFlash", text: "Heavy rain in Seattle!", timestamp: "2025-02-20 01:30 PM", state: "Washington", city: "Seattle", type: "Flood" },
    { id: 8, author: "SafeHome", text: "Snowstorm expected tonight.", timestamp: "2025-02-20 02:00 PM", state: "Colorado", city: "Denver", type: "Hurricane" },
    { id: 9, author: "CityAlert", text: "Power outage in Miami.", timestamp: "2025-02-20 02:15 PM", state: "Florida", city: "Miami", type: "Hurricane" },
    { id: 10, author: "WeatherNow", text: "Hot temperatures in Arizona.", timestamp: "2025-02-20 02:30 PM", state: "Arizona", city: "Phoenix", type: "Fire" },
    { id: 11, author: "EmergencyInfo", text: "Road closures due to landslides.", timestamp: "2025-02-20 03:00 PM", state: "California", city: "San Francisco", type: "Flood" },
    { id: 12, author: "AlertZone", text: "Wildfires near Portland.", timestamp: "2025-02-20 03:30 PM", state: "Oregon", city: "Portland", type: "Fire" },
    { id: 13, author: "SafetyUpdate", text: "Bridge collapse, avoid downtown area.", timestamp: "2025-02-20 04:00 PM", state: "New Jersey", city: "Newark", type: "Flood" },
    { id: 14, author: "LocalRescue", text: "Evacuation in progress in Detroit.", timestamp: "2025-02-20 04:15 PM", state: "Michigan", city: "Detroit", type: "Earthquake" },
    { id: 15, author: "CommunityWatch", text: "Minor earthquake reported in Nevada.", timestamp: "2025-02-20 04:30 PM", state: "Nevada", city: "Las Vegas", type: "Earthquake" }
  ];

  if (!tweetData || tweetData.length === 0) {
    return (
      <div className="statistics-container">
        <h2>📊 Statistics Dashboard</h2>
        <p>Loading tweet data or no data available.</p>
      </div>
    );
  }

  // === Process Tweet Data ===
  const typeCounts = tweetData.reduce((acc, tweet) => {
    const type = tweet.type || 'Unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const sentimentCounts = tweetData.reduce((acc, tweet) => {
    const sentiment = tweet.sentiment || 'Neutral';
    acc[sentiment] = (acc[sentiment] || 0) + 1;
    return acc;
  }, {});

  const hourCounts = tweetData.reduce((acc, tweet) => {
    if (!tweet.timestamp) return acc;
    const hour = new Date(tweet.timestamp).getHours();
    const label = `${hour % 12 || 12}${hour >= 12 ? 'PM' : 'AM'}`;
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  // === Chart Data ===
  const crisisTypeData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        label: 'Tweet Count by Disaster Type',
        data: Object.values(typeCounts),
        backgroundColor: [
          '#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0', '#795548'
        ],
      },
    ],
  };

  const sentimentData = {
    labels: Object.keys(sentimentCounts),
    datasets: [
      {
        label: 'Sentiment Distribution',
        data: Object.values(sentimentCounts),
        backgroundColor: ['#2ecc71', '#e74c3c', '#f1c40f'],
      },
    ],
  };

  const timeData = {
    labels: Object.keys(hourCounts),
    datasets: [
      {
        label: 'Tweet Volume by Hour',
        data: Object.values(hourCounts),
        borderColor: 'rgba(255, 99, 132, 0.8)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="statistics-container">
      <h1>📊 Statistics Dashboard</h1>
      <p>This page shows real-time crisis analytics and trends.</p>

      <div style={{ marginBottom: '3rem' }}>
        <h2>Disaster Type Distribution</h2>
        <Bar data={crisisTypeData} />
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2>Sentiment Breakdown</h2>
        <Pie data={sentimentData} />
      </div>

      <div>
        <h2>Tweet Volume by Hour</h2>
        <Line data={timeData} />
      </div>
    </div>
  );
}
