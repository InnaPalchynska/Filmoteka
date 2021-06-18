import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import getRefs from './get-refs';

const refs = getRefs();

export default function createPagination(totalItems, itemsPerPage, visiblePages, callback) {
  const options = {
    totalItems: totalItems,
    itemsPerPage: itemsPerPage,
    visiblePages: visiblePages,
    centerAlign: true,
  };
  const pagination = new Pagination(refs.divPagination, options);
  pagination.on('afterMove', callback);
}

const { visiblePages } = setItemsPerPage();
createPagination(20000, 20, visiblePages, onPagination);

export default function onPagination(eventData) {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=bf08c0c07642287cbabe383c02818eb3&page=${eventData.page}`;

  movieForHomePage(url);
}

export default function setItemsPerPage(movieData = []) {
  let itemsPerPage;
  let visiblePages;
  let newMovieData = [];
  const viewportWidth = document.documentElement.clientWidth;

  if (viewportWidth < 768) {
    itemsPerPage = 4;
    visiblePages = 3;
    newMovieData = movieData.slice(0, 4);
  } else if (viewportWidth >= 768 && viewportWidth < 1024) {
    itemsPerPage = 8;
    visiblePages = 8;
    newMovieData = movieData.slice(0, 8);
  } else if (viewportWidth >= 1024) {
    itemsPerPage = 9;
    visiblePages = 8;
    newMovieData = movieData.slice(0, 9);
  }
  return { itemsPerPage, visiblePages, newMovieData };
}
