import getRefs from './get-refs';
import { moviesApiService } from './moviesApiService.js';
import libraryMovieCardTpl from '../templates/library-movie-card.hbs';
import { insertContentTpl } from './notification';
import noFilmsTpl from '../templates/no-films-in-lib.hbs';

const refs = getRefs();

async function renderLibraryMovies(filterName = 'watched') {
  const isLibraryPage = refs.myLibrary.classList.contains('site-nav__button--active');
  if (!isLibraryPage) {
    return;
  }

  const allMoviesIds = getDataFromLocalStorage(filterName);
  if (!allMoviesIds || allMoviesIds.length === 0) {
    // const isNotifyHidden = refs.notify.classList.contains('visually-hidden');
    // if (!isNotifyHidden) {
    //   refs.notify.classList.add('visually-hidden');
    // }

    refs.moviesList.innerHTML = '';
    refs.divPagination.classList.add('hidden-tui');
    insertContentTpl(refs.moviesList, noFilmsTpl);
    return;
  }

  const moviesIds = getMoviesIdsByMediaQuery(allMoviesIds, 0);

  const movies = await Promise.all(
    moviesIds.map(async id => await moviesApiService.fetchFullInfoOfMovie(id)),
  );

  renderMovies(movies);
}

function getDataFromLocalStorage(itemName) {
  return JSON.parse(localStorage.getItem(itemName));
}

function getMoviesIdsByMediaQuery(moviesIds, startIndex) {
  const mobileMediaQuery = window.matchMedia('(max-width: 767px)');
  const tabletMediaQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
  const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');

  if (mobileMediaQuery.matches) {
    return moviesIds.slice(startIndex, 4);
  }

  if (tabletMediaQuery.matches) {
    return moviesIds.slice(startIndex, 8);
  }

  if (desktopMediaQuery.matches) {
    return moviesIds.slice(startIndex, 9);
  }
}

function renderMovies(movies) {
  movies.map(transformMovieObjectFields);
  const moviesMarkup = libraryMovieCardTpl(movies);
  refs.moviesList.innerHTML = moviesMarkup;
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

export { renderLibraryMovies };
