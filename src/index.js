import 'modern-normalize';
import './sass/main.scss';
import 'material-icons';
// import './js/pagination.js';
import debounce from 'lodash.debounce';

import './js/render-page.js';
import './js/render-movie-card-lightbox.js';

import './js/dark-theme';
import './js/renderLibraryWatchedMovies.js';

// это образец для импортирования ваших js фич
// import { } from './js/.....
import 'basiclightbox/src/styles/main.scss';
import * as basicLightbox from 'basiclightbox';
// import MoviesApiService from './js/apiService.js';
import getRefs from './js/get-refs';
import movieCardTpl from './templates/movie-card.hbs';
import movieCardLightboxTpl from './templates/movie-card-lightbox.hbs';
// import movieCardTpl from './templates/movie-card.hbs';
import preloader from './js/preloader.js';
// import renderPopularMoviesGrid from './js/renderMovies.js';
import './js/renderMovies.js';
import back_to_top from './js/back_to_top.js';

// moviesApiService.query = 'Наследие';

// moviesApiService
//   .fetchMovies()
//   .then(movies => console.log(movies))
//   .catch(console.error());

// const refs = getRefs();
// const moviesApiService = new MoviesApiService();

// refs.moviesList.innerHTML = '';
// refs.preloader.classList.remove('visually-hidden');
// setTimeout(function () {
// refs.preloader.classList.add('visually-hidden');
// renderPopularMoviesGrid().catch(error => console.log(error));
// }, 500);

// export default async function renderPopularMoviesGrid() {
//   const {
//     results: movies,
//     page,
//     total_pages,
//     total_results,
//   } = await moviesApiService.fetchPopularMovies();

//   //genresList - array of objects [{id: 23, name: "Drama"}, {id: 17, name: "Action"} ...]
//   const genresListObj = await moviesApiService.fetchGenresList();
//   const genresList = genresListObj.genres;

//   transformMoviesObjectFields(movies, genresList);

//   const popularMoviesMarkup = movieCardTpl(movies);
//   refs.moviesList.insertAdjacentHTML('beforeend', popularMoviesMarkup);
// }

// function transformMoviesObjectFields(movies, genresList) {
//   movies.forEach(movie => {
//     movie.release_date = movie.release_date.slice(0, 4);
//     //genresIdsList - array of genre's ids of one movie [23, 17]
//     const genresIdsList = movie.genre_ids;
//     //in movies.genre_ids genres ids replace with genres names
//     genresIdsList.forEach((genreId, index, array) => {
//       const genresListItem = genresList.find(genre => genre.id === genreId);
//       const idx = genresList.indexOf(genresListItem);
//       array[index] = genresList[idx].name;
//     });
//     movie.genre_ids = genresIdsList.join(', ');
//   });
// }

// moviesApiService.fetchPopularMovies().then(movies => console.log);
// const getPopularMovies = async () => {
//   return await moviesApiService.fetchPopularMovies();
// };

// loadPopularMovies();

// function loadPopularMovies() {
//   refs.moviesList.innerHTML = '';
//   refs.preloader.classList.remove('visually-hidden');
//   setTimeout(function () {
//     getPopularMovies()
//       .then(({ page, results: movies, total_results, total_pages }) => {
//         refs.preloader.classList.add('visually-hidden');
//         const popularMoviesMarkup = movieCardTpl(movies);
//         refs.moviesList.insertAdjacentHTML('beforeend', popularMoviesMarkup);
//       })
//       .catch(error => console.log(error));
//   }, 2000);

// }

// refs.moviesList.addEventListener('click', onMovieCardClick);

// async function onMovieCardClick(e) {
//   const currentMovieCard = e.target;
//   // console.log(currentMovieCard.nodeName);

//   if (currentMovieCard.nodeName !== 'IMG') {
//     return;
//   }

//   getFullInfoOfMovie(currentMovieCard).then(fullInfo => {
//     renderMovieCardLightbox(fullInfo);
//   });
// }

// async function getFullInfoOfMovie(currentMovieCard) {
//   const currentMovieCardId = currentMovieCard.dataset.id;
//   const fullInfoOfMovie = await moviesApiService.fetchFullInfoOfMovie(
//     currentMovieCardId,
//   );
//   return fullInfoOfMovie;
// }

// function renderMovieCardLightbox(fullInfo) {
//   const genres = fullInfo.genres;
//   const movieGenres = genres
//     .map(genre => {
//       return genre.name;
//     })
//     .join(' / ');

//   fullInfo.movie_genres = movieGenres;
//   basicLightbox.create(movieCardLightboxTpl(fullInfo)).show();
// }
