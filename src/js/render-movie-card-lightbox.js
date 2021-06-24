import 'basiclightbox/src/styles/main.scss';
import * as basicLightbox from 'basiclightbox';
import MoviesApiService from '../js/apiService.js';
import getRefs from '../js/get-refs';
import movieCardLightboxTpl from '../templates/movie-card-lightbox.hbs';
import { addsToLibrary } from './localStorage';

const refs = getRefs();
const moviesApiService = new MoviesApiService();

refs.moviesList.addEventListener('click', onMovieCardClick);

async function onMovieCardClick(e) {
  const currentMovieCard = e.target;
  //console.log(currentMovieCard.nodeName);

  if (currentMovieCard.nodeName !== 'IMG') {
    return;
  }

  getFullInfoOfMovie(currentMovieCard).then(fullInfo => {
    renderMovieCardLightbox(fullInfo);
  });
}

async function getFullInfoOfMovie(currentMovieCard) {
  const currentMovieCardId = currentMovieCard.dataset.id;
  console.log(currentMovieCardId)
  addsToLibrary(currentMovieCardId);
  
  const fullInfoOfMovie = await moviesApiService.fetchFullInfoOfMovie(currentMovieCardId);
  
  return fullInfoOfMovie;
}

function renderMovieCardLightbox(fullInfo) {
  const genres = fullInfo.genres;

  const movieGenres = genres
    .map(genre => {
      return genre.name;
    })
    .join(' / ');

  fullInfo.movie_genres = movieGenres;

  basicLightbox.create(movieCardLightboxTpl(fullInfo)).show();
}
