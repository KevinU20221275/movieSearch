import { DEFAULT_RESPONSES } from "./defaults.js";

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


// generate HTML template for a movie card
const cardTemplate = ({title, year, poster, description}) => {
    return `
        <div class="movie-card__overlay">
            <picture>
                <img src="${poster}"  alt="" class="movie-card__overlay card-element fade-in">
            </picture>
        </div>

        <article class="movie-card__header flex-col">
            <h2 class="movie-card__title card-element fade-in">${title}</h2>
            <h2 class="movie-card__year card-element fade-in">${year}</h2> 
            <picture>
                <img src="${poster}" alt="poster of the movie ${title}" class="movie-card__poster card-element fade-in">
            </picture> 
        </article>
        <article>
            <p class="movie-card__description card-element fade-in grow-up">
                ${description}
            </p>
        </article>
        
    `
}

// add fade-out animation to all card elements
const fadeOutElements = () => {
    document.querySelectorAll('.card-element').forEach(el => {
        el.classList.add("fade-out");
    })
}

// render a movie card into the DOM
const renderMovie = (movie) => {
    $card.innerHTML = cardTemplate(movie);
}

// fetch movie data from the API by title
const getMovie =  async (search) => {
    try {
        const res = await fetch(`${API_ENDPOINT}?search=${search}`)

        if (!res.ok){
            throw new Error(`Server error: ${res.status}`)
        }
        
        const data = await res.json();

        if (data.Response === 'True'){

            // add animation fade out for elements
            if ($card.innerHTML){
                fadeOutElements(); 
            }

            setTimeout(() => {
                renderMovie(formatMovieData(data));
            }, ANIMATION_DURATION) 
        } else {
            renderMovie(DEFAULT_RESPONSES.notFound)
        }
    } catch (e) {
        console.error(e)
        renderMovie(DEFAULT_RESPONSES.error)
    }
}

// initialize app with a default movie
getMovie("inception")

// listen for Enter key to trigger a movie search
document.addEventListener('keydown', (e) => {
    if (e.key === "Enter"){
        const searchParam = $searchInput.value;

        // prevent search if input is empty or same as the last searched movie
        if (searchParam.trim() != "" && searchParam.toLocaleLowerCase() !== lastSearch.toLocaleLowerCase()){
            lastSearch = searchParam
            
            getMovie(searchParam);
        } 
    }
})