import getRefs from './get-refs';
import MoviesApiService from './apiService';
import movieCardLightboxTpl from '../templates/movie-card-lightbox.hbs';

import '../sass/components/_basic-lightbox.scss';
import * as basicLightbox from 'basiclightbox';
import {
  initialSaveToLocalStorage,
  checkBtnTextContent,
  onWatchedButton,
  onQueueButton,
} from './local-storage';

const refs = getRefs();
const moviesApiService = new MoviesApiService();

let trailerLightbox;

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
  const fullInfoOfMovie = await moviesApiService.fetchFullInfoOfMovie(currentMovieCardId);

  return fullInfoOfMovie;
}

async function renderMovieCardLightbox(fullInfo) {
  getMovieGenres(fullInfo);
  getMoviePopularity(fullInfo);
  getMoviePoster(fullInfo);

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

  // youtube trailer
  const trailerBtn = document.querySelector('.trailer');
  trailerBtn.addEventListener('click', showTrailer);

  function showTrailer(event) {
    event.preventDefault();
    const movieName = fullInfo.original_title;
    // console.log(movieName);

    moviesApiService.getTrailer(movieName).then(YouTube_MovieID => {
      openTrailerLightbox(YouTube_MovieID);
    });
  }
  window.addEventListener('keydown', onEscBtnPress);

  function openTrailerLightbox(YouTube_MovieID) {
    trailerLightbox = basicLightbox.create(
      `<iframe width="70%" height="70%" src="https://www.youtube.com/embed/${YouTube_MovieID}"></iframe>`,
      {
        onShow() {
          refs.body.classList.add('inactive');
        },

        onClose() {
          refs.body.classList.remove('inactive');
        },
      },
    );
    window.removeEventListener('keydown', onEscBtnPress);
    trailerLightbox.show();
    window.addEventListener('keydown', onTrailerClose);
  }
}

function onTrailerClose(e) {
  if (e.code === 'Escape') {
    trailerLightbox.close();
  }

  window.removeEventListener('keydown', onTrailerClose);
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

function getMoviePoster(fullInfo) {
  fullInfo.placeholder = !fullInfo.poster_path ? true : false; 
 }
