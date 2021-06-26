import getRefs from './get-refs';
import MovieApiService from './apiService';
import libraryMovieCardTpl from '../templates/library-movie-card.hbs';

const movieApiService = new MovieApiService();

const refs = getRefs();
console.log(refs);
refs.myLibrary.addEventListener('click', onBtnMyLibraryClick);

async function onBtnMyLibraryClick(e) {
  const allWatchedMoviesIds = getDataFromLocalStorage('filmWatched');

  const watchedMoviesIds = getMoviesIdsByMediaQuery(allWatchedMoviesIds);

  const watchedMovies = await Promise.all(
    watchedMoviesIds.map(async id => await movieApiService.fetchFullInfoOfMovie(id)),
  );

  renderLibraryMovies(watchedMovies);
}

function getDataFromLocalStorage(item) {
  return JSON.parse(localStorage.getItem(item));
}

function getMoviesIdsByMediaQuery(moviesIds) {
  const mobileMediaQuery = window.matchMedia('(max-width: 767px)');
  const tabletMediaQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
  const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');

  if (mobileMediaQuery.matches) {
    return moviesIds.slice(0, 4);
  }

  if (tabletMediaQuery.matches) {
    return moviesIds.slice(0, 8);
  }

  if (desktopMediaQuery.matches) {
    return moviesIds.slice(0, 9);
  }
}

function renderLibraryMovies(movies) {
  movies.map(transformMovieObjectFields);
  const watchedMoviesMarkup = libraryMovieCardTpl(movies);
  refs.moviesList.innerHTML = watchedMoviesMarkup;
}

function transformMovieObjectFields(movie) {
  movie.placeholder = !movie.poster_path ? true : false;

  let genresList = [];
  movie.genres.map(genre => {
    genresList.push(genre.name);
  });
  movie.genres = genresList.join(', ');

  movie.release_date = null ? '' : movie.release_date.slice(0, 4);
  movie.vote_average = movie.vote_average.toFixed(1);
}
