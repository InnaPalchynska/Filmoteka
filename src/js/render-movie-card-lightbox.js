import getRefs from '../js/get-refs';
import MoviesApiService from '../js/apiService.js';
import movieCardLightboxTpl from '../templates/movie-card-lightbox.hbs';

import '../sass/components/_basic-lightbox';
import * as basicLightbox from 'basiclightbox';
import {addsToLibrary, onWatchedButton, onQueueButton} from './localStorage'

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
  const fullInfoOfMovie = await moviesApiService.fetchFullInfoOfMovie(currentMovieCardId);

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

  const modalButtonWatched = document.querySelector('.lightbox__button--watched');
  const modalButtonQueue = document.querySelector('.lightbox__button--queue');
  addsToLibrary();


  modalButtonWatched.addEventListener('click', onWatchedButton);
  modalButtonQueue.addEventListener('click', onQueueButton);
  
 

 


  const closeBtn = document.querySelector('.lightbox__close-button');

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

// function getMovieOverview(fullInfo) {
//   const movieOverview = fullInfo.overview;
//   console.log(typeof movieOverview);

//   // const length =
//   // console.log(length);

//   if (movieOverview.length > 500) {
//     movieOverview.slice(500);
//     console.log(movieOverview);
//   }

//   console.log(movieOverview);
//   fullInfo.overview = movieOverview;

//   return movieOverview;
// }

