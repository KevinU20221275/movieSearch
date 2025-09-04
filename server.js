// Import dependencies
import express from 'express'
import path from 'path'
import dotenv from 'dotenv/config'
import { fileURLToPath } from 'url';

// Configure absolute paths 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Express
const app = express();

// Middleware: Serve the "website" folder as static content
app.use(express.static(path.join(__dirname, 'website')))

// Environment variables
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY

/* Endpoint: This endpoint receives a "search" query parameter
It makes a request to the OMDb API using the API_KEY
and returns the movie data as JSON to the client */
app.get('/api/movies', async (req, res) => {
    const { search } = req.query

    try {
        // Request to OMDb API with the movie title
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${search}`) 
        const data = await response.json();

        // Send successful response to the client
        res.json(data)
    } catch (error) {
        console.error(error)
        
        // Send a 500 status response with an error message
        res.status(500).json({error : "Error fetching movie data"})
    }
})

// Start the server
// The server listens on the port specified in .env or defaults to 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})