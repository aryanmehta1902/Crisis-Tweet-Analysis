import React, { useState, useEffect, useCallback } from "react";
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

const stateAbbrMap = {
  'alabama': 'al',
  'alaska': 'ak',
  'arizona': 'az',
  'arkansas': 'ar',
  'california': 'ca',
  'colorado': 'co',
  'connecticut': 'ct',
  'delaware': 'de',
  'florida': 'fl',
  'georgia': 'ga',
  'hawaii': 'hi',
  'idaho': 'id',
  'illinois': 'il',
  'indiana': 'in',
  'iowa': 'ia',
  'kansas': 'ks',
  'kentucky': 'ky',
  'louisiana': 'la',
  'maine': 'me',
  'maryland': 'md',
  'massachusetts': 'ma',
  'michigan': 'mi',
  'minnesota': 'mn',
  'mississippi': 'ms',
  'missouri': 'mo',
  'montana': 'mt',
  'nebraska': 'ne',
  'nevada': 'nv',
  'new hampshire': 'nh',
  'new jersey': 'nj',
  'new mexico': 'nm',
  'new york': 'ny',
  'north carolina': 'nc',
  'north dakota': 'nd',
  'ohio': 'oh',
  'oklahoma': 'ok',
  'oregon': 'or',
  'pennsylvania': 'pa',
  'rhode island': 'ri',
  'south carolina': 'sc',
  'south dakota': 'sd',
  'tennessee': 'tn',
  'texas': 'tx',
  'utah': 'ut',
  'vermont': 'vt',
  'virginia': 'va',
  'washington': 'wa',
  'west virginia': 'wv',
  'wisconsin': 'wi',
  'wyoming': 'wy',
};

const locationCoordinates = {
  "los angeles": [34.0522, -118.2437],
  "new york city": [40.7128, -74.006],
  "houston": [29.7604, -95.3698],
  "miami": [25.7617, -80.1918],
  "chicago": [41.8781, -87.6298],
  "oklahoma city": [35.4676, -97.5164],
  "wisconsin":	[44.500000,	-89.500000],
  "wi":	[44.500000,	-89.500000],
  "west virginia":	[39.000000,	-80.500000],
  "wv":	[39.000000,	-80.500000],
  "vermont": [44.000000,	-72.699997],
  "vt": [44.000000,	-72.699997],
  "texas": [31.000000,	-100.000000],
  "tx": [31.000000,	-100.000000],
  "south dakota":	[44.500000,	-100.000000],
  "sd":	[44.500000,	-100.000000],
  "rhode island":	[41.742325,	-71.742332],
  "ri":	[41.742325,	-71.742332],
  "oregon":	[44.000000,	-120.500000],
  "or":	[44.000000,	-120.500000],
  "new york":	[43.000000,	-75.000000],
  "ny":	[43.000000,	-75.000000],
  "new hampshire":	[44.000000,	-71.500000],
  "nh":	[44.000000,	-71.500000],
  "nebraska":	[41.500000,	-100.000000],
  "ne":	[41.500000,	-100.000000],
  "kansas":	[38.500000,	-98.000000],
  "ks":	[38.500000,	-98.000000],
  "mississippi":	[33.000000,	-90.000000],
  "ms":	[33.000000,	-90.000000],
  "illinois": [40.000000,	-89.000000],
  "il": [40.000000,	-89.000000],
  "delaware":	[39.000000,	-75.500000],
  "de":	[39.000000,	-75.500000],
  "connecticut":	[41.599998,	-72.699997],
  "ct":	[41.599998,	-72.699997],
  "arkansas":	[34.799999,	-92.199997],
  "ar":	[34.799999,	-92.199997],
  "indiana": [40.273502,	-86.126976],
  "in": [40.273502,	-86.126976],
  "missouri":	[38.573936,	-92.603760],
  "mo":	[38.573936,	-92.603760],
  "florida":	[27.994402,	-81.760254],
  "fl":	[27.994402,	-81.760254],
  "nevada":	[39.876019,	-117.224121],
  "nv":	[39.876019,	-117.224121],
  "maine": 	[45.367584,	-68.972168],
  "me": 	[45.367584,	-68.972168],
  "michigan":	[44.182205,	-84.506836],
  "mi":	[44.182205,	-84.506836],
  "georgia":	[33.247875,	-83.441162],
  "ga":	[33.247875,	-83.441162],
  "hawaii":	[19.741755,	-155.844437],
  "hi":	[19.741755,	-155.844437],
  "alaska":	[66.160507,	-153.369141],
  "ak":	[66.160507,	-153.369141],
  "tennessee":	[35.860119,	-86.660156],
  "tn":	[35.860119,	-86.660156],
  "virginia":	[37.926868,	-78.024902],
  "va":	[37.926868,	-78.024902],
  "new jersey":	[39.833851,	-74.871826],
  "nj":	[39.833851,	-74.871826],
  "kentucky":	[37.839333,	-84.270020],
  "ky":	[37.839333,	-84.270020],
  "north dakota":	[47.650589,	-100.437012],
  "nd":	[47.650589,	-100.437012],
  "minnesota":	[46.392410,	-94.636230],
  "mn":	[46.392410,	-94.636230],
  "oklahoma":	[36.084621,	-96.921387],
  "ok":	[36.084621,	-96.921387],
  "montana":	[46.965260,	-109.533691],
  "mt":	[46.965260,	-109.533691],
  "washington":	[47.751076,	-120.740135],
  "wa":	[47.751076,	-120.740135],
  "utah":	[39.419220,	-111.950684],
  "ut":	[39.419220,	-111.950684],
  "colorado":	[39.113014,	-105.358887],
  "co":	[39.113014,	-105.358887],
  "ohio":	[40.367474,	-82.996216],
  "oh":	[40.367474,	-82.996216],
  "alabama":	[32.318230,	-86.902298],
  "al":	[32.318230,	-86.902298],
  "iowa":	[42.032974,	-93.581543],
  "ia":	[42.032974,	-93.581543],
  "new mexico":	[34.307144,	-106.018066],
  "nm":	[34.307144,	-106.018066],
  "south carolina":	[33.836082,	-81.163727],
  "sc":	[33.836082,	-81.163727],
  "pennsylvania":	[41.203323,	-77.194527],
  "pa":	[41.203323,	-77.194527],
  "arizona": [34.048927	,-111.093735],
  "az": [34.048927	,-111.093735],
  "maryland":	[39.045753,	-76.641273],
  "md":	[39.045753,	-76.641273],
  "massachusetts":	[42.407211,	-71.382439],
  "ma":	[42.407211,	-71.382439],
  "california":	[36.778259	,-119.417931],
  "ca":	[36.778259	,-119.417931],
  "idaho":	[44.068203	,-114.742043],
  "id":	[44.068203	,-114.742043],
  "wyoming":	[43.075970,	-107.290283],
  "wy":	[43.075970,	-107.290283],
  "north carolina":	[35.782169,	-80.793457],
  "nc":	[35.782169,	-80.793457],
  "louisiana":	[30.391830,	-92.329102],
  "la":	[30.391830,	-92.329102]
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
/*
  useEffect(() => {
    const counts = tweetData.reduce((acc, tweet) => {
      acc[tweet.Location.toLowerCase()] = (acc[tweet.Location.toLowerCase()] || 0) + 1;
      return acc;
    }, {});
    setTweetCounts(counts);
  }, [tweetData]);
*/
useEffect(() => {
  const counts = tweetData.reduce((acc, tweet) => {
    if (selectedDisaster === "All" || tweet.DisasterType === selectedDisaster) {
      const loc = tweet.Location.toLowerCase();
      acc[loc] = (acc[loc] || 0) + 1;
    }
    return acc;
  }, {});
  setTweetCounts(counts);
}, [tweetData, selectedDisaster]);

  const colorScale = d3.scaleLinear()
    .domain([0, Math.max(...Object.values(tweetCounts), 1)])
    .range(["#DCE775", "#FF6F00"]);

  const stateStyle = (feature) => {
    const stateName = feature.properties.name.toLowerCase();
    const stateAbbr = stateAbbrMap[stateName] || stateName; // fallback to full name if not found
    const tweetCount = tweetCounts[stateAbbr] || 0;
    //const tweetCount = tweetCounts[stateName] || 0;
    return {
      fillColor: colorScale(tweetCount),
      weight: 1,
      color: "#fff",
      fillOpacity: 0.7,
    };
  };
/*
  const onEachFeature = (feature, layer) => {
    const stateName = feature.properties.name.toLowerCase();
    const stateAbbr = stateAbbrMap[stateName] || stateName; // fallback to full name if not found
    const tweetCount = tweetCounts[stateAbbr] || 0;
    console.log(`${stateAbbr}: ${tweetCount} tweet(s)`);
    //const tweetCount = tweetCounts[stateName] || 0;
    layer.bindTooltip(`${stateName}: ${tweetCount} tweet${tweetCount !== 1 ? "s" : ""}`, {
      sticky: true,
    });
  };
*/
const onEachFeature = useCallback((feature, layer) => {
  const stateName = feature.properties.name.toLowerCase();
  const stateAbbr = stateAbbrMap[stateName] || stateName;
  const tweetCount = tweetCounts[stateAbbr] || 0;

  //console.log(`${stateAbbr}: ${tweetCount} tweet(s)`); // <-- Debugging line

  layer.bindTooltip(`${stateName}: ${tweetCount} tweet${tweetCount !== 1 ? "s" : ""}`, {
    sticky: true,
  });
}, [tweetCounts, stateAbbrMap]);
//new stuff
const [reRenderKey, setReRenderKey] = useState(0);

useEffect(() => {
  setReRenderKey(prev => prev + 1);
}, [selectedDisaster]);

const handleDisasterTypeClick = (type) => {
  setSelectedDisaster(type);
  //setReRenderKey((prevKey) => prevKey + 1); // This will force a re-render
};
//end new stuff
  const filteredTweets = tweetData.filter(tweet => {
    return selectedDisaster === "All" || tweet.DisasterType === selectedDisaster;
    
  });

  return (
    <div style={{ width: "100%", height: "calc(100vh - 80px)" }}>
      {/* Disaster type filter */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
        {disasterTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleDisasterTypeClick(type)}//setSelectedDisaster(type)}
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
          //<GeoJSON data={geoJsonData} style={stateStyle} onEachFeature={onEachFeature} />
          <GeoJSON
          key={reRenderKey}  // Forces re-render every time reRenderKey changes
          data={geoJsonData}
          style={stateStyle}
          onEachFeature={onEachFeature}
        
          />
        )}
        {filteredTweets.map((tweet) => {
          const position = locationCoordinates[tweet.Location.toLowerCase()];
          if (!position) return null;
          return (
            <Marker key={tweet.ID} position={position} icon={tweetIcon}>
              <Popup>
                <strong>{tweet.Location}</strong><br />
                {tweet.Post}<br />
                <em>By: {tweet.UserID}</em>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;