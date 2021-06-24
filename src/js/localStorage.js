import getRefs from '../js/get-refs.js';

const refs = getRefs();
function addsToLibrary() {
  refs.modalButtonWatched.addEventListener('click', onWatchedButton);
  refs.modalButtonQueue.addEventListener('click', onQueueButton);

  //console.log(refs.modalButtonWatched)
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
function onWatchedButton(event) {
  const filmsStorage = localStorage.getItem('filmWatched');
  const filmsStorageArray = JSON.parse(filmsStorage);
  if (!filmsStorageArray.includes(event.target.id)) {
    filmsStorageArray.push(event.target.id);
    event.target.textContent = 'Remove from watched';
    event.target.classList.add('active');
    localStorage.setItem('filmWatched', JSON.stringify(filmsStorageArray));
  } else {
    event.target.textContent = 'Add to watched';
    event.target.classList.remove('active');
    const index = filmsStorageArray.indexOf(event.target.id);
    filmsStorageArray.splice(index, 1);
    localStorage.setItem('filmWatched', JSON.stringify(filmsStorageArray));
  }
}
function onQueueButton(event) {
  const filmsStorage = localStorage.getItem('filmQueue');
  const filmsStorageArray = JSON.parse(filmsStorage);
  if (!filmsStorageArray.includes(event.target.id)) {
    filmsStorageArray.push(event.target.id);
    event.target.textContent = 'Remove from queue';
    event.target.classList.add('active');
    localStorage.setItem('filmQueue', JSON.stringify(filmsStorageArray));
  } else {
    event.target.textContent = 'Add to queue';
    event.target.classList.remove('active');
    const index = filmsStorageArray.indexOf(event.target.id);
    filmsStorageArray.splice(index, 1);
    localStorage.setItem('filmQueue', JSON.stringify(filmsStorageArray));
  }
}


export { addsToLibrary}