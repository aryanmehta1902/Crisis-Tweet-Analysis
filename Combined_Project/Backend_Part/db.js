require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;

// Test the connection
pool.connect()
    .then(() => console.log('Connected to PostgreSQL!'))
    .catch(err => console.error('Connection error:', err));

module.exports = pool;