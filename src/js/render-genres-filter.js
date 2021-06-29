import getRefs from './get-refs';
import { moviesApiService } from './moviesApiService';
import genresFiltersTpl from '../templates/genres-filters.hbs';

const refs = getRefs();

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
