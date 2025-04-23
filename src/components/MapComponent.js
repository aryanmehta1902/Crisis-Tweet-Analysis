import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import * as d3 from "d3";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom tweet icon
const tweetIcon = new L.Icon({
  iconUrl: "/icons/Map_Pinpoint.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: "tweet-icon",
});

const cityCoordinates = {
  "Los Angeles": [34.0522, -118.2437],
  "New York City": [40.7128, -74.006],
  "Houston": [29.7604, -95.3698],
  "Miami": [25.7617, -80.1918],
  "Chicago": [41.8781, -87.6298],
  "Oklahoma City": [35.4676, -97.5164],
};

const disasterTypes = ["All", "Fire", "Flood", "Hurricane", "Earthquake", "Tornado"];

const MapComponent = ({ tweetData }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [tweetCounts, setTweetCounts] = useState({});
  const [selectedDisaster, setSelectedDisaster] = useState("All");

  useEffect(() => {
    fetch("/data/states.geojson")
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data))
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, []);

  useEffect(() => {
    const counts = tweetData.reduce((acc, tweet) => {
      acc[tweet.state] = (acc[tweet.state] || 0) + 1;
      return acc;
    }, {});
    setTweetCounts(counts);
  }, [tweetData]);

  const colorScale = d3.scaleLinear()
    .domain([0, Math.max(...Object.values(tweetCounts), 1)])
    .range(["#DCE775", "#FF6F00"]);

  const stateStyle = (feature) => {
    const stateName = feature.properties.name;
    const tweetCount = tweetCounts[stateName] || 0;
    return {
      fillColor: colorScale(tweetCount),
      weight: 1,
      color: "#fff",
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature, layer) => {
    const stateName = feature.properties.name;
    const tweetCount = tweetCounts[stateName] || 0;
    layer.bindTooltip(`${stateName}: ${tweetCount} tweet${tweetCount !== 1 ? "s" : ""}`, {
      sticky: true,
    });
  };

  const filteredTweets = tweetData.filter(tweet => {
    return selectedDisaster === "All" || tweet.type === selectedDisaster;
  });

  return (
    <div style={{ width: "100%", height: "calc(100vh - 80px)" }}>
      {/* Disaster type filter */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
        {disasterTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedDisaster(type)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: selectedDisaster === type ? "#1976D2" : "#E3F2FD",
              color: selectedDisaster === type ? "white" : "black",
              cursor: "pointer"
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <MapContainer center={[37.8, -96]} zoom={4} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {geoJsonData && (
          <GeoJSON data={geoJsonData} style={stateStyle} onEachFeature={onEachFeature} />
        )}
        {filteredTweets.map((tweet) => {
          const position = cityCoordinates[tweet.city];
          if (!position) return null;
          return (
            <Marker key={tweet.id} position={position} icon={tweetIcon}>
              <Popup>
                <strong>{tweet.city}, {tweet.state}</strong><br />
                {tweet.text}<br />
                <em>By: {tweet.author}</em>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
