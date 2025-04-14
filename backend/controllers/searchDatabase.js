import { fetchFromDatabase } from '../services/llamaService.js';

// Handles API request
export const searchEmergencies = async (req, res) => {
    try {
        const { query, location, severity } = req.query;  // Extract filters from request

        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }

        // Fetch filtered results from the database via LLaMA/DeSeek
        const results = await fetchFromDatabase(query, location, severity);

        res.json({ data: results });
    } catch (error) {
        console.error("Error fetching emergencies:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};