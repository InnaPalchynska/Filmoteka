import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import getRefs from './get-refs';
import movie from '../templates/movie-card.hbs'

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

export default function onPagination(event) {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=c27b75f2098a52933ae8847a9b55ad4e&page=${event.page}`;

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

function movieForHomePage(url) {
    // const spinner = new Spinner(opts).spin(refs.targetSpinner);
  getMovies(url)
    .then(data => data.results)
    .then(movies => {
      refs.moviesList.innerHTML = '';
    //   changeGenre(movies); // змінює жанр
    //   changeData(movies); // змінює дату

      // залежно від ширини viewport залишає необхідну кількість елементів
      const { newMovieData } = setItemsPerPage(movies);
      renderMarkup(newMovieData, movie, refs.moviesList); // створення розмітки по шаблону
    //   spinner.stop(); // зупиняє спінер
    });
}

export default async function getMovies(URL, page = 1) {
  try {
    const responsee = await fetch(URL);
    const data = await responsee.json();

    return data;
  } catch (error) {
    throw error;
  }
}

function renderMarkup(data, template, domElementLink) {
  const markup = template(data);
  domElementLink.insertAdjacentHTML('beforeend', markup);
}

export { renderMarkup, searchResultsMarkup };

function mainPageRender() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=c27b75f2098a52933ae8847a9b55ad4e`;
  movieForHomePage(url);
}

mainPageRender();