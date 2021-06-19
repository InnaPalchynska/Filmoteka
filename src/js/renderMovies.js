import Pagination from 'tui-pagination';
import MoviesApiService from '../js/apiService.js';
// import renderPopularMoviesGrid from '../index';
// import fetchPopularMovies from '../index';
import movieCardTpl from '../templates/movie-card.hbs';
import getRefs from '../js/get-refs.js';

const refs = getRefs();

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

let currentPage;

export default async function renderPopularMoviesGrid() {
  const {
    results: movies,
    page,
    total_pages,
    total_results,
  } = await moviesApiService.fetchPopularMovies();

  //genresList - array of objects [{id: 23, name: "Drama"}, {id: 17, name: "Action"} ...]
  const genresListObj = await moviesApiService.fetchGenresList();
  const genresList = genresListObj.genres;

  transformMoviesObjectFields(movies, genresList);

  const popularMoviesMarkup = movieCardTpl(movies);
  refs.moviesList.insertAdjacentHTML('beforeend', popularMoviesMarkup);
}

function transformMoviesObjectFields(movies, genresList) {
  movies.forEach(movie => {
    // movie.release_date = movie.release_date.slice(0, 4);
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
  let currentPage = evt.page;
  showPopularMovies(currentPage);
});
