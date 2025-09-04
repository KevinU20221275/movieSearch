// Api Configuration
const API_ENDPOINT = '/api/movies'
const ANIMATION_DURATION = 400;
const NULL_FIELD_RESPONSE = "N/A";

// Dom elements
const $card = document.querySelector(".movie-card");
const $searchInput = document.getElementById("search");

// helper variable to store the last searched movie
let lastSearch = "";

// format API response into movie data
const formatMovieData = (data) => {
    return {
        title : data.Title,
        year : data.Year,
        poster : data.Poster !== NULL_FIELD_RESPONSE ? data.Poster : "assets/img/defaultBg.png",
        description: data.Plot !== NULL_FIELD_RESPONSE ? data.Plot : data.Actors
    }
}