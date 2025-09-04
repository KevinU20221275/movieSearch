# 🎬 Movie Search App

A simple web application to search for movies using the [OMDb API](http://www.omdbapi.com/), with an Express.js backend serving the frontend and handling API requests..

## ✨ Features
- Search movies by title.
- Display movie poster, title, year, and description.
- Handles errors and missing posters gracefully.
- Simple and responsive layout with basic animations.
- API key securely stored in a **.env** file (not exposed to the frontend).

## 🔄 Usage Flow
```sql
+------------------+         1. User types movie title & presses Enter
|   Frontend       | -------------------------------------------->
|   (app.js)       |                                              
+------------------+                                              
         |                                                       
         | 2. Request sent to /api/movies?search=TITLE            
         v                                                       
+------------------+                                              
| Express Server   | 3. Uses API_KEY from .env to query OMDb API  
| (server.js)      | -------------------------------------------->
+------------------+                                              
         |                                                       
         | 4. OMDb returns movie data JSON                        
         v                                                       
+------------------+                                              
| Express Server   | 5. Sends JSON data back to frontend          
+------------------+                                              
         |                                                       
         v                                                       
+------------------+                                              
| Frontend (app.js)| 6. Processes response:                       
|                  |     - Movie found → display card             
|                  |     - Movie not found → display placeholder  
|                  |     - Error → display "Something went wrong"  
+------------------+                                              
         |                                                       
         v                                                       
      User sees results in the browser

```

## ⚙️ Installation
1. Clone the repository:
```bash
git clone https://github.com/KevinU20221275/movieSearch.git
cd movieSearch
```

2. Install dependecies:
```bash
npm install
```

3. Create a **.env** file in the project root (same level as server.js) and add your configuration:
```text
PORT=3000
API_KEY=your_omdb_api_key
```
🔑 You can request a free API key at OMDb API

4. Run the server:
```bash
npm run dev
```
or 
```bash
node server.js
```

5. Open the app in your browser:
```text
http://localhost:3000
```

## 📂 Folder structure

```text
movieSearch (root) /
│── server.js          # Express server configuration
│── package.json       # Project dependencies and scripts
│── .env               # Environment variables (user must create this file)
│
└── website/           # Frontend (served by Express)
    ├── index.html     # Main HTML page
    └── assets/
        ├── css/       # Stylesheets
        ├── js/        # JavaScript code (app.js, default.js)
        ├── img/       # Default images (fallbacks, error images)
        ├── icons/     # Icons
        └── mocks/     # Mock API responses (for testing)
│
└── docs/
    └── screenshots/   # Images used for README and documentation
```

## 📸 Screenshots

### Default load
App opens with the initial movie displayed.

![Default Movie](/docs/screenshots/default.png)

### Movie Found
Successful search showing movie details.

![Movie Found](/docs/screenshots/success.png)

### Movie Not Found
Shows placeholder when no results are found.

![Not Found](/docs/screenshots/not-found.png)

### Error
Displayed when the API request fails.

![Error](/docs/screenshots/error.png)

## 📝 Notes
- The app initializes with "Inception" as the default movie.
- Press Enter in the search input to trigger a new movie search.
- Movies without posters show a default image (defaultBg.png).
- Errors or failed API requests show an error image (badMovieRes.png).