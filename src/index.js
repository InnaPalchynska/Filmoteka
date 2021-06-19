import './sass/main.scss';
// это образец для импортирования ваших js фич
// import { } from './js/.....
import * as basicLightbox from 'basiclightbox';
import MoviesApiService from './js/apiService.js';
import getRefs from './js/get-refs';
import movieCardTpl from './templates/movie-card.hbs';
import 'normalize.css';

const refs = getRefs();
const moviesApiService = new MoviesApiService();

// moviesApiService.query = 'Наследие';

// moviesApiService
//   .fetchMovies()
//   .then(movies => console.log(movies))
//   .catch(console.error());

renderPopularMoviesGrid();

async function renderPopularMoviesGrid() {
  const {
    results: movies,
    page,
    total_pages,
    total_results,
  } = await moviesApiService.fetchPopularMovies();

  //genresList - array of objects [{id: 23, name: "Drama"}, {id: 17, name: "Action"} ...]
  const genresListObj = await moviesApiService.fetchGenresList();
  const genresList = genresListObj.genres;

  transformMoviesObjectFields(movies, genresList);

  const popularMoviesMarkup = movieCardTpl(movies);
  refs.moviesList.insertAdjacentHTML('beforeend', popularMoviesMarkup);
}

function transformMoviesObjectFields(movies, genresList) {
  movies.forEach(movie => {
    movie.release_date = movie.release_date.slice(0, 4);
    //genresIdsList - array of genre's ids of one movie [23, 17]
    const genresIdsList = movie.genre_ids;
    //in movies.genre_ids genres ids replace with genres names
    genresIdsList.forEach((genreId, index, array) => {
      const genresListItem = genresList.find(genre => genre.id === genreId);
      const idx = genresList.indexOf(genresListItem);
      array[index] = genresList[idx].name;
    });
    movie.genre_ids = genresIdsList.join(', ');
  });
}
