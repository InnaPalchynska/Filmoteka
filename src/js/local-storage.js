import { renderLibraryMovies } from './render-library-movies';

function initialSaveToLocalStorage(itemName) {
  if (!localStorage.getItem(itemName)) {
    localStorage.setItem(itemName, JSON.stringify([]));
  }
}

function checkBtnTextContent(btnEl, itemName) {
  if (localStorage.getItem(itemName)) {
    const filmsStorage = localStorage.getItem(itemName);
    const filmsStorageArray = JSON.parse(filmsStorage);
    if (filmsStorageArray.includes(btnEl.id)) {
      btnEl.textContent = `Remove from ${itemName}`;
      btnEl.classList.add('active');
    }
  }
}

function onWatchedButton(e) {
  updateLocalStorage(e, 'watched');
  renderLibraryMovies('watched');
}

function onQueueButton(e) {
  updateLocalStorage(e, 'queue');
  renderLibraryMovies('queue');
}

function updateLocalStorage(e, itemName) {
  const filmsStorage = localStorage.getItem(itemName);
  const filmsStorageArray = JSON.parse(filmsStorage);
  if (!filmsStorageArray.includes(e.target.id)) {
    filmsStorageArray.push(e.target.id);
    e.target.textContent = `Remove from ${itemName}`;
    e.target.classList.add('active');
    localStorage.setItem(itemName, JSON.stringify(filmsStorageArray));
  } else {
    e.target.textContent = `Add to ${itemName}`;
    e.target.classList.remove('active');
    const index = filmsStorageArray.indexOf(e.target.id);
    filmsStorageArray.splice(index, 1);
    localStorage.setItem(itemName, JSON.stringify(filmsStorageArray));
  }
}

export {
  initialSaveToLocalStorage,
  checkBtnTextContent,
  updateLocalStorage,
  onQueueButton,
  onWatchedButton,
};
