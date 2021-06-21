import Pagination from 'tui-pagination';
import MoviesApiService from '../js/apiService.js';
import smoothScrool from './smoothScrool.js';
import debounce from 'lodash.debounce';

import movieCardTpl from '../templates/movie-card.hbs';
import getRefs from '../js/get-refs.js';

const refs = getRefs();

const moviesApiService = new MoviesApiService();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

let searchQuery = '';
function onSearch(event) {
  refs.moviesList.innerHTML = '';
  const input = event.target;
  searchQuery = input.value;
  if (!searchQuery) {
    return;
  }
  moviesApiService.query = searchQuery;
  renderPopularMoviesGrid(searchQuery).catch(error => console.log(error));
}

const container = document.getElementById('pagination');
const options = {
  totalItems: 500,
  itemsPerPage: 1,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination(container, options);
let currentPage = localStorage.getItem('currentPage');

async function renderPopularMoviesGrid(searchQuery) {
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

  transformMoviesObjectFields(movies, genresList);

  const popularMoviesMarkup = movieCardTpl(movies);
  refs.moviesList.insertAdjacentHTML('beforeend', popularMoviesMarkup);
}

function transformMoviesObjectFields(movies, genresList) {
  movies.forEach(movie => {
    if (movie.release_date != undefined) {
      movie.release_date = movie.release_date.slice(0, 4);
    }
    console.log(movie.id);
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
  renderPopularMoviesGrid(searchQuery).catch(error => console.log(error));
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
