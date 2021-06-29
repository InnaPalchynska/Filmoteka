import getRefs from './get-refs';
import { moviesApiService } from './moviesApiService';
import { pagination, options } from './pagination.js';
import { insertContentTpl, clearContainer } from './notification';
import movieCardTpl from '../templates/movie-card.hbs';
import genresFiltersTpl from '../templates/genres-filters.hbs';
import errorTpl from '../templates/error-not-found-film.hbs';

const refs = getRefs();

async function renderGenresFilters() {
  const genres = await moviesApiService.fetchGenresList();
  const genresMarkup = genresFiltersTpl(genres.genres);
  refs.filterWrapper.innerHTML = genresMarkup;
}

async function onFilterClick(e) {
  e.target.classList.toggle('checked');
  const checkedLis = refs.genresFilter.querySelectorAll('li.checked');
  const genresIds = [...checkedLis].map(li => li.dataset.id).join(',');
  const {
    results: movies,
    page,
    total_pages,
    total_results,
  } = await moviesApiService.fetchMoviesByGenre(genresIds);

  if (movies.length === 0) {
    // onHideBtnClick();
    clearContainer(refs.moviesList);
    // refs.filterChooseBtn.classList.add('visually-hidden');
    insertContentTpl(refs.moviesList, errorTpl);
    refs.divPagination.classList.add('hidden-tui');
    return;
  }

  const genresListObj = await moviesApiService.fetchGenresList();
  const genresList = genresListObj.genres;

  transformMoviesObjectFields(movies, genresList);

  if (total_pages <= 1) {
    refs.divPagination.classList.add('hidden-tui');
  } else {
    refs.divPagination.classList.remove('hidden-tui');
    pagination.setTotalItems(total_pages);
  }

  const popularMoviesMarkup = movieCardTpl(movies);
  refs.moviesList.innerHTML = popularMoviesMarkup;
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

function showResetBtn(e) {
  refs.filterResetBtn.classList.remove('visually-hidden');
}

function onChooseBtnClick(e) {
  e.target.classList.add('visually-hidden');
  refs.filterHideBtn.classList.remove('visually-hidden');
  refs.genresFilter.classList.remove('visually-hidden');
}

function onHideBtnClick(e) {
  refs.filterChooseBtn.classList.remove('visually-hidden');
  refs.filterHideBtn.classList.add('visually-hidden');
  refs.filterResetBtn.classList.add('visually-hidden');
  refs.genresFilter.addEventListener('click', showResetBtn, { once: true });
  refs.genresFilter.classList.add('visually-hidden');
  uncheckClass();
}

function onResetBtnClick(e) {
  uncheckClass();
  refs.genresFilter.addEventListener('click', showResetBtn, { once: true });
  e.target.classList.add('visually-hidden');
}

function uncheckClass() {
  const checkedLis = refs.genresFilter.querySelectorAll('.checked');
  if (checkedLis) {
    checkedLis.forEach(li => li.classList.toggle('checked'));
  }
}

async function addFilterListeners() {
  await renderGenresFilters();
  refs.genresFilter = document.querySelector('.js-genres-filter');
  refs.genresFilter.addEventListener('click', onFilterClick);
  refs.genresFilter.addEventListener('click', showResetBtn, { once: true });
  refs.filterChooseBtn = document.querySelector('.js-choose-btn');
  refs.filterHideBtn = document.querySelector('.js-hide-btn');
  refs.filterResetBtn = document.querySelector('.js-reset-btn');
  refs.filterChooseBtn.addEventListener('click', onChooseBtnClick);
  refs.filterHideBtn.addEventListener('click', onHideBtnClick);
  refs.filterResetBtn.addEventListener('click', onResetBtnClick);
}

function removeFilterListeners() {
  onHideBtnClick();
  refs.genresFilter.removeEventListener('click', onFilterClick);
  refs.genresFilter.removeEventListener('click', showResetBtn);
  refs.filterChooseBtn.removeEventListener('click', onChooseBtnClick);
  refs.filterHideBtn.removeEventListener('click', onHideBtnClick);
  refs.filterResetBtn.removeEventListener('click', onResetBtnClick);
}

export { addFilterListeners, removeFilterListeners };
