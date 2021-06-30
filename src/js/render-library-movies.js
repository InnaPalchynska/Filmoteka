import getRefs from './get-refs';
import { moviesApiService } from './moviesApiService.js';
import libraryMovieCardTpl from '../templates/library-movie-card.hbs';
import { insertContentTpl } from './notification';
import { layerService } from './layerService.js';
import noFilmsTpl from '../templates/no-films-in-lib.hbs';
import { pagination, setPaginationPages } from './pagination';
import smoothScrool from './smoothScrool';

const refs = getRefs();

async function renderLibraryMovies(startIndex = 1, filterName = 'watched') {
  startIndex = startIndex ? startIndex : 1;
  const isLibraryPage = refs.myLibrary.classList.contains('site-nav__button--active');
  if (!isLibraryPage) {
    return;
  }

  const allWatchedMoviesIds = getDataFromLocalStorage(filterName);

  if (!allWatchedMoviesIds || allWatchedMoviesIds.length === 0) {
    // const isNotifyHidden = refs.notify.classList.contains('visually-hidden');
    // if (!isNotifyHidden) {
    //   refs.notify.classList.add('visually-hidden');
    // }

    refs.moviesList.innerHTML = '';
    refs.divPagination.classList.add('hidden-tui');
    insertContentTpl(refs.moviesList, noFilmsTpl);
    return;
  }

  const watchedMoviesIds = getMoviesIdsByMediaQuery(allWatchedMoviesIds, startIndex);
  const watchedMovies = await Promise.all(
    watchedMoviesIds.map(async id => await moviesApiService.fetchFullInfoOfMovie(id)),
  );
  renderMovies(watchedMovies);
}

function getDataFromLocalStorage(itemName) {
  return JSON.parse(localStorage.getItem(itemName));
}

function getMoviesIdsByMediaQuery(moviesIds, startIndex) {
  const mobileMediaQuery = window.matchMedia('(max-width: 767px)');
  const tabletMediaQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
  const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');
  let itemsOnPage = 0;
  if (mobileMediaQuery.matches) {
    itemsOnPage = 4;
  }

  if (tabletMediaQuery.matches) {
    itemsOnPage = 8;
  }

  if (desktopMediaQuery.matches) {
    itemsOnPage = 9;
  }
  const slicedMoviesIds = moviesIds.slice((startIndex - 1) * itemsOnPage, itemsOnPage * startIndex);
  setPaginationPages(moviesIds.length / itemsOnPage);
  return slicedMoviesIds;
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

pagination.on('afterMove', function (eventData) {
  if (layerService.getName() !== 'library') {
    return;
  }
  smoothScrool();
  localStorage.setItem('currentPage', eventData.page);
  renderLibraryMovies(eventData.page);
});

export { renderLibraryMovies };
