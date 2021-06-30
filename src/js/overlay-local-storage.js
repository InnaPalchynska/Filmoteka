import getRefs from './get-refs';
import {
  initialSaveToLocalStorage,
  checkBtnTextContent,
  updateLocalStorage,
} from './local-storage';

const refs = getRefs();

function addOverlayListener() {
  initialSaveToLocalStorage('watched');
  initialSaveToLocalStorage('queue');

  const watchedButtons = refs.moviesList.querySelectorAll('.overlay__button--watched');
  watchedButtons.forEach(btn => checkBtnTextContent(btn, 'watched'));

  const queueButtons = refs.moviesList.querySelectorAll('.overlay__button--queue');
  queueButtons.forEach(btn => checkBtnTextContent(btn, 'queue'));

  refs.moviesList.addEventListener('click', onOverlayBtnClick);
}

function onOverlayBtnClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const currentBtn = e.target;
  const itemName = currentBtn.dataset.name;
  updateLocalStorage(e, itemName);
}

function removeOverlayListener() {
  refs.moviesList.removeEventListener('click', onOverlayBtnClick);
}

export { addOverlayListener, removeOverlayListener };
