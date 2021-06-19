import Pagination from 'tui-pagination';
import MoviesApiService from './apiService';

const moviesApiService = new MoviesApiService();

const container = document.getElementById('pagination');
const options = {
  totalItems: 1000,
  itemsPerPage: 1,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

const smoothScrool = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const pagination = new Pagination(container, options);

function chooseRender(currentPage) {
  moviesApiService.setPage(currentPage);
  // if (MoviesApiService.searchQuery === '') {
  moviesApiService.fetchPopularMovies();
  // hideSpinner();
  // } else {
  // renderSearch();
  // hideSpinner();
  // }
}

pagination.on('afterMove', function (evt) {
  // showSpinner();
  smoothScrool();
  let currentPage = evt.page;
  chooseRender(currentPage);
});

export { pagination };
