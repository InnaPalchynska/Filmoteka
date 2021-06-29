import getRefs from './get-refs';
// import MoviesApiService from './apiService';
import { moviesApiService } from './renderMovies';
import genresFiltersTpl from '../templates/genres-filters.hbs';

const refs = getRefs();
// const moviesApiService = new MoviesApiService();

async function renderGenresFilters() {
  const genres = await moviesApiService.fetchGenresList();
  const genresMarkup = genresFiltersTpl(genres.genres);
  refs.genresFilter.innerHTML = genresMarkup;
}

async function onFilterClick(e) {
  const genreId = e.target.dataset.id;
  const movies = await moviesApiService.fetchMoviesByGenre(String(genreId));
  return movies;
}

export { renderGenresFilters, onFilterClick };
