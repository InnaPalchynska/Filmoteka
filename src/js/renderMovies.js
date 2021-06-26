import MoviesApiService from '../js/apiService.js';
import debounce from 'lodash.debounce';

import movieCardTpl from '../templates/movie-card.hbs';
import getRefs from '../js/get-refs.js';

import pagination from './pagination.js';

const refs = getRefs();

const moviesApiService = new MoviesApiService();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

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

async function renderPopularMoviesGrid(searchQuery) {
  console.log(pagination);
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

// function showPopularMovies(currentPage) {
//   moviesApiService.setPage(currentPage);
//   refs.moviesList.innerHTML = '';
//   renderPopularMoviesGrid(searchQuery).catch(error => console.log(error));
// }

// pagination.on('afterMove', function (evt) {
//   smoothScrool();
//   currentPage = evt.page;
//   localStorage.setItem('currentPage', currentPage);
//   showPopularMovies(currentPage);
// });

// if (currentPage !== 1) {
//   moviesApiService.setPage(currentPage);
//   pagination.page = currentPage;
//   refs.moviesList.innerHTML = '';
//   renderPopularMoviesGrid().catch(error => console.log(error));
// }
renderPopularMoviesGrid(searchQuery).catch(error => console.log(error));
