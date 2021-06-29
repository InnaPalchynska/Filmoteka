import getRefs from '../js/get-refs.js';
const refs = getRefs();
import {
    initialSaveToLocalStorage,
    checkBtnTextContent,
  } from './local-storage';
  
function addOverlayListeners(e) {
    initialSaveToLocalStorage('watched');
    initialSaveToLocalStorage('queue');
  
    const overlayBtnWatched = document.querySelector('.overlay__button--watched');
    const overlayBtnQueue = document.querySelector('.overlay__button--queue');
      
    checkBtnTextContent(overlayBtnWatched, 'watched');
    checkBtnTextContent(overlayBtnQueue, 'queue');
  
    overlayBtnWatched.addEventListener('click', onoverlayWatchedButton);
    overlayBtnQueue.addEventListener('click', onoverlayQueueButton);
      
    console.log(overlayBtnWatched.addEventListener('click', onoverlayWatchedButton))
    console.log(overlayBtnQueue.addEventListener('click', onoverlayQueueButton));

    refs.moviesList.addEventListener('click', onMovieBtnClick);

    async function onMovieBtnClick(e) {
        const currentMovieBtn = e.target;

        if (currentMovieBtn.nodeName !== 'BUTTON') {
            return;
        }        
    }
    // function onoverlayWatchedButton(e) {
    //     console.log(e.target);
    //     updateLocalStorage(e, 'watched');
    //     renderLibraryMovies('watched');
    // }
    
    // function onoverlayQueueButton(e) {
    //     updateLocalStorage(e, 'queue');
    //     renderLibraryMovies('queue');
    // }
      
}


  export { addOverlayListeners, initialSaveToLocalStorage, checkBtnTextContent };