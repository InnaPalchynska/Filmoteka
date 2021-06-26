import Pagination from 'tui-pagination';
import smoothScrool from './smoothScrool.js';

import movieCardTpl from '../templates/movie-card.hbs';
import getRefs from '../js/get-refs.js';

const refs = getRefs();

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
// let currentPage = localStorage.getItem('currentPage');

function showPopularMovies(currentPage) {
  // moviesApiService.setPage(currentPage);
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
  // moviesApiService.setPage(currentPage);
  pagination.page = currentPage;
  refs.moviesList.innerHTML = '';
  renderPopularMoviesGrid().catch(error => console.log(error));
}
