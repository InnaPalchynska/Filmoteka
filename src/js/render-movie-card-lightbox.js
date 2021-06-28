import getRefs from './get-refs';
import MoviesApiService from './apiService';
import movieCardLightboxTpl from '../templates/movie-card-lightbox.hbs';

import 'basiclightbox/src/styles/main.scss';
import * as basicLightbox from 'basiclightbox';
// import // initialSaveToLocalStorage,
// checkBtnTextContent,
// onWatchedButton,
// onQueueButton,
// './fireBase-dataBase.js';

const refs = getRefs();
const moviesApiService = new MoviesApiService();

refs.moviesList.addEventListener('click', onMovieCardClick);

async function onMovieCardClick(e) {
  const currentMovieCard = e.target;

  if (currentMovieCard.nodeName !== 'IMG') {
    return;
  }

  getFullInfoOfMovie(currentMovieCard).then(fullInfo => {
    renderMovieCardLightbox(fullInfo);
  });
}

async function getFullInfoOfMovie(currentMovieCard) {
  const currentMovieCardId = currentMovieCard.dataset.id;
  const fullInfoOfMovie = await moviesApiService.fetchFullInfoOfMovie(
    currentMovieCardId,
  );

  return fullInfoOfMovie;
}

async function renderMovieCardLightbox(fullInfo) {
  getMovieGenres(fullInfo);
  getMoviePopularity(fullInfo);

  const lightbox = basicLightbox.create(movieCardLightboxTpl(fullInfo), {
    onShow() {
      refs.body.classList.add('inactive');
    },

    onClose() {
      refs.body.classList.remove('inactive');
    },
  });

  lightbox.show();

  initialSaveToLocalStorage('watched');
  initialSaveToLocalStorage('queue');

  const modalBtnWatched = document.querySelector('.lightbox__button--watched');
  const modalBtnQueue = document.querySelector('.lightbox__button--queue');

  checkBtnTextContent(modalBtnWatched, 'watched');
  checkBtnTextContent(modalBtnQueue, 'queue');

  modalBtnWatched.addEventListener('click', onWatchedButton);
  modalBtnQueue.addEventListener('click', onQueueButton);

  const closeBtn = document.querySelector('.lightbox__close-btn');

  closeBtn.addEventListener('click', onLightboxClose);
  window.addEventListener('keydown', onEscBtnPress);

  function onLightboxClose(e) {
    lightbox.close();

    closeBtn.removeEventListener('click', onLightboxClose);
  }

  function onEscBtnPress(e) {
    if (e.code === 'Escape') {
      lightbox.close();
    }

    window.removeEventListener('keydown', onEscBtnPress);
  }
}

function getMovieGenres(fullInfo) {
  const movieGenres = fullInfo.genres
    .map(genre => {
      return genre.name;
    })
    .join(' / ');

  fullInfo.movie_genres = movieGenres;
  return movieGenres;
}

function getMoviePopularity(fullInfo) {
  const moviePopularity = fullInfo.popularity.toFixed(1);
  fullInfo.popularity = moviePopularity;

  return moviePopularity;
}
