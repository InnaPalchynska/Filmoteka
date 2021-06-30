import getRefs from '../js/get-refs.js';
import { moviesApiService } from './moviesApiService.js';
import smoothScrool from './smoothScrool.js';
import movieCardTpl from '../templates/movie-card.hbs';
// import Pagination from 'tui-pagination';
import { pagination, options, setPaginationPages } from './pagination.js';
import { layerService } from './layerService.js';
import { showTextError, insertContentTpl, clearContainer } from './notification';
import errorTpl from '../templates/error-not-found-film.hbs';

const refs = getRefs();
refs.home.addEventListener('click', onLogoAndHomeClick);
refs.logoLink.addEventListener('click', onLogoAndHomeClick);

let searchQuery = '';
function onSearch(event) {
  event.preventDefault();

  pagination.movePageTo(1);
  refs.moviesList.innerHTML = '';

  const input = event.target;
  searchQuery = input.value;
  if (!searchQuery) {
    return;
  }
  moviesApiService.query = searchQuery;
  renderPopularMoviesGrid(searchQuery).catch(error => console.log(error));
}

let currentPage = localStorage.getItem('currentPage');

async function renderPopularMoviesGrid(searchQuery) {
  const query = searchQuery || moviesApiService.query;
  const fetchMovies = query
    ? moviesApiService.fetchMoviesBySearch()
    : moviesApiService.fetchPopularMovies();

  const { results: movies, page, total_pages, total_results } = await fetchMovies;

  if (movies.length === 0) {
    const notifyErrorHeader = document.querySelector('.js-search-field__error-text');
    showTextError(
      notifyErrorHeader,
      'Search result not successful. Enter the correct movie name and',
    );
    setTimeout(() => (notifyErrorHeader.innerHTML = ''), 3500);
    clearContainer(refs.moviesList);
    insertContentTpl(refs.moviesList, errorTpl);
    refs.divPagination.classList.add('hidden-tui');
    return;
  }

  // genresList - array of objects [{id: 23, name: "Drama"}, {id: 17, name: "Action"} ...]
  const genresListObj = await moviesApiService.fetchGenresList();
  const genresList = genresListObj.genres;

  transformMoviesObjectFields(movies, genresList);
  setPaginationPages(total_pages);

  const popularMoviesMarkup = movieCardTpl(movies);
  refs.moviesList.innerHTML = '';
  refs.moviesList.insertAdjacentHTML('beforeend', popularMoviesMarkup);
}

function transformMoviesObjectFields(movies, genresList) {
  movies.forEach(movie => {
    movie.placeholder = !movie.poster_path ? true : false;

    if (movie.release_date !== undefined) {
      movie.release_date = movie.release_date.slice(0, 4);
    }
    // genresIdsList - array of genre's ids of one movie [23, 17]
    const genresIdsList = movie.genre_ids;

    // in movies.genre_ids genres ids replace with genres names
    genresIdsList.forEach((genreId, index, array) => {
      const genresListItem = genresList.find(genre => genre.id === genreId);
      const idx = genresList.indexOf(genresListItem);
      array[index] = genresList[idx].name;
    });
    movie.genre_ids = genresIdsList.join(', ');
  });
}

function showPopularMovies(currentPage) {
  moviesApiService.setPage(currentPage);
  refs.moviesList.innerHTML = '';
  renderPopularMoviesGrid().catch(error => console.log(error));
}

function onLogoAndHomeClick() {
  searchQuery = '';
  moviesApiService.query = searchQuery;
  currentPage = 1;
  localStorage.setItem('currentPage', currentPage);
  showPopularMovies(currentPage);
}

pagination.on('afterMove', function (evt) {
  if (layerService.getName() !== 'home') {
    return;
  }
  smoothScrool();
  currentPage = evt.page;
  localStorage.setItem('currentPage', currentPage);
  showPopularMovies(currentPage);
});

if (currentPage === null) {
  moviesApiService.setPage(1);
  refs.moviesList.innerHTML = '';
  renderPopularMoviesGrid().catch(error => console.log(error));
} else {
  moviesApiService.setPage(currentPage);
  refs.moviesList.innerHTML = '';
  showPopularMovies(currentPage);
}

export { onSearch };
