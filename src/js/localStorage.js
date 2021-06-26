import getRefs from './get-refs';

const refs = getRefs();

function addsToLibrary() {
  if (!localStorage.getItem('filmWatched')) {
    localStorage.setItem('filmWatched', JSON.stringify([]));
  }
  if (localStorage.getItem('filmWatched')) {
    const filmsStorage = localStorage.getItem('filmWatched');
    const filmsStorageArray = JSON.parse(filmsStorage);
    if (filmsStorageArray.includes(refs.modalButtonWatched.id)) {
      refs.modalButtonWatched.textContent = 'Remove from watched';
      refs.modalButtonWatched.classList.add('active');
    }
  }
  if (!localStorage.getItem('filmQueue')) {
    localStorage.setItem('filmQueue', JSON.stringify([]));
  }
  if (localStorage.getItem('filmQueue')) {
    const filmsStorage = localStorage.getItem('filmQueue');
    const filmsStorageArray = JSON.parse(filmsStorage);
    if (filmsStorageArray.includes(refs.modalButtonWatched.id)) {
      refs.modalButtonQueue.textContent = 'Remove from queue';
      refs.modalButtonQueue.classList.add('active');
    }
  }
}

function onWatchedButton(e) {
  const filmsStorage = localStorage.getItem('filmWatched');
  const filmsStorageArray = JSON.parse(filmsStorage);
  if (!filmsStorageArray.includes(e.target.id)) {
    filmsStorageArray.push(e.target.id);
    e.target.textContent = 'Remove from watched';
    e.target.classList.add('active');
    localStorage.setItem('filmWatched', JSON.stringify(filmsStorageArray));
  } else {
    e.target.textContent = 'Add to watched';
    e.target.classList.remove('active');
    const index = filmsStorageArray.indexOf(e.target.id);
    filmsStorageArray.splice(index, 1);
    localStorage.setItem('filmWatched', JSON.stringify(filmsStorageArray));
  }
}
function onQueueButton(e) {
  const filmsStorage = localStorage.getItem('filmQueue');
  const filmsStorageArray = JSON.parse(filmsStorage);
  if (!filmsStorageArray.includes(e.target.id)) {
    filmsStorageArray.push(e.target.id);
    e.target.textContent = 'Remove from queue';
    e.target.classList.add('active');
    localStorage.setItem('filmQueue', JSON.stringify(filmsStorageArray));
  } else {
    e.target.textContent = 'Add to queue';
    e.target.classList.remove('active');
    const index = filmsStorageArray.indexOf(e.target.id);
    filmsStorageArray.splice(index, 1);
    localStorage.setItem('filmQueue', JSON.stringify(filmsStorageArray));
  }
}

export { addsToLibrary, onWatchedButton, onQueueButton };
