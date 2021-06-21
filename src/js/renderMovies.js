import Pagination from 'tui-pagination';
import MoviesApiService from '../js/apiService.js';
import smoothScrool from './smoothScrool.js';
// import renderPopularMoviesGrid from '../index';
// import fetchPopularMovies from '../index';
import movieCardTpl from '../templates/movie-card.hbs';
import getRefs from '../js/get-refs.js';
// import debounce from '../node_modules/lodash.debounce';

const refs = getRefs();

const moviesApiService = new MoviesApiService();

// refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  refs.moviesList.innerHTML = '';
  const input = event.target;
  const searchQuery = input.value;
  if (!searchQuery) {
    return;
  }
  renderPopularMoviesGrid(searchQuery).catch(error => console.log(error));
}

const container = document.getElementById('pagination');
const options = {
  totalItems: 1000,
  itemsPerPage: 1,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

const pagination = new Pagination(container, options);
let currentPage = localStorage.getItem('currentPage');

async function renderPopularMoviesGrid(searchQuery) {
  console.log(searchQuery);
  const fetchMovies = searchQuery
    ? moviesApiService.fetchMoviesBySearch()
    : moviesApiService.fetchPopularMovies();

  const {
    results: movies,
    page,
    total_pages,
    total_results,
  } = await fetchMovies;

  //genresList - array of objects [{id: 23, name: "Drama"}, {id: 17, name: "Action"} ...]
  const genresListObj = await moviesApiService.fetchGenresList();
  const genresList = genresListObj.genres;

  console.log(movies);
  // transformMoviesObjectFields(movies, genresList);

  const popularMoviesMarkup = movieCardTpl(movies);
  refs.moviesList.insertAdjacentHTML('beforeend', popularMoviesMarkup);
}

function transformMoviesObjectFields(movies, genresList) {
  movies.forEach(movie => {
    if (movie.release_date != undefined) {
      movie.release_date = movie.release_date.slice(0, 4);
    }
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

function showPopularMovies(currentPage) {
  moviesApiService.setPage(currentPage);
  refs.moviesList.innerHTML = '';
  renderPopularMoviesGrid().catch(error => console.log(error));
}

pagination.on('afterMove', function (evt) {
  smoothScrool();
  currentPage = evt.page;
  localStorage.setItem('currentPage', currentPage);
  showPopularMovies(currentPage);
});

if (currentPage !== 1) {
  moviesApiService.setPage(currentPage);
  pagination.page = currentPage;

  renderPopularMoviesGrid().catch(error => console.log(error));
}
