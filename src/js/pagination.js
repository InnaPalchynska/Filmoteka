import { func } from 'assert-plus';
import Pagination from 'tui-pagination';
import { renderPopularMoviesGrid } from './renderMovies';

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

// const smoothScrool = function () {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// };

function pagination(totalResults, currentPage) {
  if (!totalResults || totalResults < 20) {
    container.innerHTML = '';
    return;
  }
  const pagination = new Pagination(container, options);

  pagination.setTotalItems(totalResults);
  pagination.movePageTo(currentPage);

  pagination.on('afterMove', renderPopularMoviesGrid);
}

// function showPopularMovies(currentPage) {
//   moviesApiService.setPage(currentPage);
//   renderPopularMoviesGrid();
// }

// pagination.on('afterMove', function (evt) {
//   smoothScrool();
//   let currentPage = evt.page;
//   showPopularMovies(currentPage);
// });
