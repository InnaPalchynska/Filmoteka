import './sass/main.scss';
import 'normalize.css';

import preloader from './js/preloader.js';
// это образец для импортирования ваших js фич
// import { } from './js/.....
import * as basicLightbox from 'basiclightbox';
import MoviesApiService from './js/apiService.js';
import getRefs from './js/get-refs';
import movieCardTpl from './templates/movie-card.hbs';

preloader();

const refs = getRefs();
const moviesApiService = new MoviesApiService();

// moviesApiService.query = 'Наследие';

// moviesApiService
//   .fetchMovies()
//   .then(movies => console.log(movies))
//   .catch(console.error());

// moviesApiService.fetchPopularMovies().then(movies => console.log);

moviesApiService
  .fetchPopularMovies()
  .then(({ page, results: movies, total_results, total_pages }) => {
    // console.log(movies);
    // console.log(page);
    // console.log(total_results);
    // console.log(total_pages);
    const popularMoviesMarkup = movieCardTpl(movies);
    refs.moviesList.insertAdjacentHTML('beforeend', popularMoviesMarkup);
  })
  .catch(error => console.log(error));
