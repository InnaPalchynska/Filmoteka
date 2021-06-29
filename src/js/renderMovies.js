import getRefs from '../js/get-refs.js';
import { moviesApiService } from './moviesApiService.js';
import smoothScrool from './smoothScrool.js';
import movieCardTpl from '../templates/movie-card.hbs';
// import Pagination from 'tui-pagination';
import { pagination, options } from './pagination.js';

import { showTextError, insertContentTpl, clearContainer } from './notification';
import errorTpl from '../templates/error-not-found-film.hbs'

const refs = getRefs();
refs.home.addEventListener('click', onLogoAndHomeClick);
refs.logoLink.addEventListener('click', onLogoAndHomeClick);

let searchQuery = '';
function onSearch(event) {
  // event.preventDefault();

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

// options = {
//   page: parseInt(currentPage, 10) || 1,
//   currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
// };

// const container = document.getElementById('pagination');
// const options = {
//   totalItems: 500,
//   itemsPerPage: 1,
//   visiblePages: 5,
//   page: parseInt(currentPage, 10) || 1,
//   centerAlign: true,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',
//   template: {
//     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     currentPage:
//       '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//     moveButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</a>',
//     disabledMoveButton:
//       '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</span>',
//     moreButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//       '<span class="tui-ico-ellip">...</span>' +
//       '</a>',
//   },
// };

// const pagination = new Pagination(container, options);

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

  if (movies.length === 0) {
    const notifyErrorHeader = document.querySelector('.js-search-field__error-text');
    showTextError(
      notifyErrorHeader,
      'Search result not successful. Enter the correct movie name and',
    );
    setTimeout(() => (notifyErrorHeader.innerHTML = ''), 3500);
    clearContainer(refs.moviesList);
    insertContentTpl(refs.moviesList,errorTpl);
    refs.divPagination.classList.add('hidden-tui');
    return
  }

  //genresList - array of objects [{id: 23, name: "Drama"}, {id: 17, name: "Action"} ...]
  const genresListObj = await moviesApiService.fetchGenresList();
  const genresList = genresListObj.genres;

  transformMoviesObjectFields(movies, genresList);

  if (total_pages <= 1) {
    refs.divPagination.classList.add('hidden-tui');
  } else {
    refs.divPagination.classList.remove('hidden-tui');
    pagination.setTotalItems(total_pages);
  }
  refs.moviesList.innerHTML = '';
  const popularMoviesMarkup = movieCardTpl(movies);
  refs.moviesList.insertAdjacentHTML('beforeend', popularMoviesMarkup);
}

function transformMoviesObjectFields(movies, genresList) {
  movies.forEach(movie => {
    movie.placeholder = !movie.poster_path ? true : false;

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
  renderPopularMoviesGrid( ).catch(error => console.log(error));
}

function onLogoAndHomeClick() {
  searchQuery = '';
  moviesApiService.query = searchQuery;
  currentPage = 1;
  localStorage.setItem('currentPage', currentPage);
  showPopularMovies(currentPage);
}

pagination.on('afterMove', function (evt) {
  smoothScrool();
  currentPage = evt.page;
  localStorage.setItem('currentPage', currentPage);
  showPopularMovies(currentPage);
});

if (currentPage === null) {
  moviesApiService.setPage(1);
  // pagination.page = 1;
  refs.moviesList.innerHTML = '';
  renderPopularMoviesGrid().catch(error => console.log(error));
} else {
  moviesApiService.setPage(currentPage);
  // pagination.page = currentPage;
  refs.moviesList.innerHTML = '';
  showPopularMovies(currentPage);
  // renderPopularMoviesGrid().catch(error => console.log(error));
}

export { onSearch };
