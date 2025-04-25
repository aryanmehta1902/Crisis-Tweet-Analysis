const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import database connection

const { PrismaClient } = require('@prisma/client'); // Import Prisma Client
const prisma = new PrismaClient(); 

// Get all emergencies

//prisma

// Search emergencies by location
router.get('/', async (req, res) => {
    const { location, date, tweet_id, disaster_type } = req.query; // Extract query parameters
    
    console.log(req.query);

    try {
        const result = await prisma.data_Table.findMany({
            where: {
                ...(location && { Location: { contains: location, mode: 'insensitive' } }),
                ...(date && { Date: date }), // Adjust based on your DB's date format
                ...(tweet_id && { Tweet_ID: parseInt(tweet_id) || 0 }), // Ensure integer conversion
                ...(disaster_type && { Disaster_Type: { contains: disaster_type, mode: 'insensitive' } }),
            },
        });
        //Formattedresult =  result.map(entry => JSON.stringify(entry, null, 2)).join("\n\n");
        res.json(result);
        //res.send(`<pre>${formattedResult}</pre>`);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;