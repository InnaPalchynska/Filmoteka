import Pagination from 'tui-pagination';
import MoviesApiService from './apiService';
import renderPopularMoviesGrid from '../index';
// import fetchPopularMovies from '../index';

const moviesApiService = new MoviesApiService();

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

const smoothScrool = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const pagination = new Pagination(container, options);

function showPopularMovies(currentPage) {
  moviesApiService.setPage(currentPage);
  renderPopularMoviesGrid();
}

pagination.on('afterMove', function (evt) {
  smoothScrool();
  let currentPage = evt.page;
  showPopularMovies(currentPage);
});

export { pagination };
