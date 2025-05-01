const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Search emergencies by predicted model results
router.get('/', async (req, res) => {
    try {
        const result = await prisma.data_Table.findMany({
                      ///////////////////////////////////////////////////////////////////////////////////////////////////////
            take: 75 //You can remove this, if you think it can display all 9000+ data on the frontend or change as desired
                      ///////////////////////////////////////////////////////////////////////////////////////////////////////
        }); 
        const formattedResult = result.map((result, index) => ({
            ID: result.ID,           // temporary ID for model
            Post: result.Post,
            DisasterType: result.DisasterType,
            Location: result.Location,
            Sentiment: result.Sentiment,
            UserID: result.UserID,
            TimeStamp: ""
        }));
        
        const posts = await prisma.posts.findMany({
            take: 25 // or however many you want to send
        });
        const existingCount = await prisma.data_Table.count() + 9214;
        const formattedPosts = posts.map((post, index) => ({
            ID: existingCount + index + 1,           // temporary ID for model
            Post: post.text,
            DisasterType: "",
            Location: "Unknown",
            Sentiment: "",
            UserID: post.author,
            TimeStamp: post.created_at
        }));
        const combinedData = [...formattedResult, ...formattedPosts];
        ////////////////////////////////////////////////////////
        //Change this with Python Server that uses Model's link
        ///////////////////////////////////////////////////////
        const response = await fetch("http://localhost:8000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(combinedData) 
        });
        
        const dataWithPredictions = await response.json();
        //console.log(dataWithPredictions);
        res.json(dataWithPredictions);

    } catch (error) {
        console.error('🔥 Prediction route error:', error);
        res.status(500).json({ error: 'Something went wrong', message: error.message });
    }
        
});

module.exports = router;