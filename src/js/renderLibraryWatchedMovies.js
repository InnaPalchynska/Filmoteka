import getRefs from './get-refs';
import MovieApiService from './apiService';
import libraryMovieCardTpl from '../templates/library-movie-card.hbs';

const movieApiService = new MovieApiService();

const data = JSON.stringify([
  581726,
  817451,
  399566,
  508943,
  726429,
  527774,
  632357,
  337404,
  423108,
  520763,
  637649,
  615658,
]);
localStorage.setItem('watched', data);

const refs = getRefs();
refs.myLibrary.addEventListener('click', onBtnMyLibraryClick);

async function onBtnMyLibraryClick(e) {
  const allWatchedMoviesIds = getDatafromLocalStorage('watched');

  const watchedMoviesIds = getMoviesIdsByMediaQuery(allWatchedMoviesIds);

  const watchedMovies = await Promise.all(
    watchedMoviesIds.map(async id => await movieApiService.fetchFullInfoOfMovie(id)),
  );

  renderLibraryMovies(watchedMovies);
}

function getDatafromLocalStorage(item) {
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
  console.log(movie);
  let genresList = [];
  movie.genres.map(genre => {
    genresList.push(genre.name);
  });
  movie.genres = genresList.join(', ');

  movie.release_date = null ? '' : movie.release_date.slice(0, 4);
}
