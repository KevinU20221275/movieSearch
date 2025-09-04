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


// Start the server
// The server listens on the port specified in .env or defaults to 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})