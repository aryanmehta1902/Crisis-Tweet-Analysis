// src/pages/Welcome.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '2rem',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        maxWidth: '700px',
        textAlign: 'center',
        backdropFilter: 'blur(6px)' // for subtle glass effect
      }}>
        <h1 style={{ color: '#00796b', fontSize: '2.5rem' }}>
          Welcome to the Crisis Dashboard
        </h1>
        <p style={{ marginTop: '1rem', fontSize: '1.1rem', color: '#333' }}>
          This dashboard helps you see and understand emergencies like floods, fires, or earthquakes as they happen. It uses live social media posts and checks them with official data to show where events are happening and how people are reacting. It’s built to help responders and the public get clear, fast information they can trust.
        </p>
        <Link to="/dashboard">
          <button style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#00796b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#004d40'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#00796b'}
          >
            Enter Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
