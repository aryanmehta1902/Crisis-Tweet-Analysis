import axios from 'axios';

const LLAMA_API_URL = "http://llama-api-url"; // Replace with actual URL

// Fetches relevant data using LLaMA/DeSeek
export const fetchFromDatabase = async (query, location, severity) => {
    try {
        const response = await axios.post(LLAMA_API_URL, { 
            query, 
            location, 
            severity 
        });

        return response.data;  // Return processed data
    } catch (error) {
        console.error("Error fetching data from LLaMA:", error);
        throw new Error("Failed to retrieve data");
    }
};