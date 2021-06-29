import {
  initialSaveToLocalStorage,
  checkBtnTextContent,
} from './local-storage';

function addOverlayListeners(e) {
  initialSaveToLocalStorage('watched');
  initialSaveToLocalStorage('queue');

  const overlayBtnWatched = document.querySelector('.overlay__button--watched');
  const overlayBtnQueue = document.querySelector('.overlay__button--queue');
  console.log(overlayBtnQueue);

  checkBtnTextContent(overlayBtnWatched, 'watched');
  checkBtnTextContent(overlayBtnQueue, 'queue');

  overlayBtnWatched.addEventListener('click', onWatchedButton);
  overlayBtnQueue.addEventListener('click', onQueueButton);
}

function onWatchedButton(e) {
  console.log(e.target);
  updateLocalStorage(e, 'watched');
  renderLibraryMovies('watched');
}

function onQueueButton(e) {
  updateLocalStorage(e, 'queue');
  renderLibraryMovies('queue');
}

export { addOverlayListeners, initialSaveToLocalStorage, checkBtnTextContent };

// initialSaveToLocalStorage('watched');
// initialSaveToLocalStorage('queue');

// const overlayBtnWatched = document.querySelector('.overlay__button--watched');
// const overlayBtnQueue = document.querySelector('.overlay__button--queue');

// checkBtnTextContent(overlayBtnWatched, 'watched');
// checkBtnTextContent(overlayBtnQueue, 'queue');

// overlayBtnWatched.addEventListener('click', onWatchedButton);
// overlayBtnQueue.addEventListener('click', onQueueButton);
