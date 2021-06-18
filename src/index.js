import './sass/main.scss';
import 'normalize.css';

// это образец для импортирования ваших js фич
// import { } from './js/.....
import * as basicLightbox from 'basiclightbox';
import MoviesApiService from './js/apiService.js';
import getRefs from './js/get-refs';
import movieCardTpl from './templates/movie-card.hbs';

const refs = getRefs();
const moviesApiService = new MoviesApiService();

// moviesApiService.query = 'Наследие';

// moviesApiService
//   .fetchMovies()
//   .then(movies => console.log(movies))
//   .catch(console.error());

// moviesApiService.fetchPopularMovies().then(movies => console.log);
const getPopularMovies = async () => {
  return await moviesApiService.fetchPopularMovies();
};

loadPopularMovies();

function loadPopularMovies() {
  refs.moviesList.innerHTML = '';
  refs.preloader.classList.remove('visually-hidden');
  setTimeout(function () {
    getPopularMovies()
      .then(({ page, results: movies, total_results, total_pages }) => {
        refs.preloader.classList.add('visually-hidden');
        const popularMoviesMarkup = movieCardTpl(movies);
        refs.moviesList.insertAdjacentHTML('beforeend', popularMoviesMarkup);
      })
      .catch(error => console.log(error));
  }, 2000);
}
