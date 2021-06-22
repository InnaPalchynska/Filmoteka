const modalButtonWatched = document.querySelector('.js-modal-btn-watched');
const modalButtonQueue = document.querySelector('.js-modal-btn-queue');

modalButtonWatched.addEventListener('click', onWatchedButton);


if (!localStorage.getItem('filmWatched')) {
  localStorage.setItem('filmWatched', JSON.stringify([]));
}
if (localStorage.getItem('filmWatched')) {
  const filmsStorage = localStorage.getItem('filmWatched');
  const filmsStorageArray = JSON.parse(filmsStorage);
  if (filmsStorageArray.includes(modalButtonWatched.id)) {
    modalButtonWatched.textContent = 'Remove from watched';
    modalButtonWatched.classList.add('active');
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
