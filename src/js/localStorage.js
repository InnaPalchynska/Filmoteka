function addsToLibrary() {
  const modalButtonWatched = document.querySelector('.lightbox__button--watched');
  const modalButtonQueue = document.querySelector('.lightbox__button--queue');
  if (!localStorage.getItem('watched')) {
    localStorage.setItem('watched', JSON.stringify([]));
  }
  if (localStorage.getItem('watched')) {
    const filmsStorage = localStorage.getItem('watched');
    const filmsStorageArray = JSON.parse(filmsStorage);
    if (filmsStorageArray.includes(modalButtonWatched.id)) {
      modalButtonWatched.textContent = 'Remove from watched';
      modalButtonWatched.classList.add('active');
    }
  }
  if (!localStorage.getItem('queue')) {
    localStorage.setItem('queue', JSON.stringify([]));
  }
  if (localStorage.getItem('queue')) {
    const filmsStorage = localStorage.getItem('queue');
    const filmsStorageArray = JSON.parse(filmsStorage);
    if (filmsStorageArray.includes(modalButtonWatched.id)) {
      modalButtonQueue.textContent = 'Remove from queue';
      modalButtonQueue.classList.add('active');
    }
  }
}

function onWatchedButton(e) {
  const filmsStorage = localStorage.getItem('watched');
  const filmsStorageArray = JSON.parse(filmsStorage);
  if (!filmsStorageArray.includes(e.target.id)) {
    filmsStorageArray.push(e.target.id);
    e.target.textContent = 'Remove from watched';
    e.target.classList.add('active');
    localStorage.setItem('watched', JSON.stringify(filmsStorageArray));
  } else {
    e.target.textContent = 'Add to watched';
    e.target.classList.remove('active');
    const index = filmsStorageArray.indexOf(e.target.id);
    filmsStorageArray.splice(index, 1);
    localStorage.setItem('watched', JSON.stringify(filmsStorageArray));
  }
}
function onQueueButton(e) {
  const filmsStorage = localStorage.getItem('queue');
  const filmsStorageArray = JSON.parse(filmsStorage);
  if (!filmsStorageArray.includes(e.target.id)) {
    filmsStorageArray.push(e.target.id);
    e.target.textContent = 'Remove from queue';
    e.target.classList.add('active');
    localStorage.setItem('queue', JSON.stringify(filmsStorageArray));
  } else {
    e.target.textContent = 'Add to queue';
    e.target.classList.remove('active');
    const index = filmsStorageArray.indexOf(e.target.id);
    filmsStorageArray.splice(index, 1);
    localStorage.setItem('queue', JSON.stringify(filmsStorageArray));
  }
}

export { addsToLibrary, onWatchedButton, onQueueButton };
