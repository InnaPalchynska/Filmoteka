import getRefs from './get-refs.js';

const refs = getRefs();

window.onload = function () {
  refs.moviesList.innerHTML = '';
  refs.preloader.classList.remove('visually-hidden');
  window.setTimeout(function () {
    refs.preloader.classList.add('visually-hidden');
  }, 500);
};
