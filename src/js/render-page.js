import helperSvg from 'handlebars-helper-svg';
import getRefs from './get-refs';
import searchFieldTpl from '../templates/search-field.hbs';
import headerBtnsTpl from '../templates/header-btns.hbs';

// console.log(searchFieldTpl());
// console.log(headerBtnsTpl());

const refs = getRefs();

refs.home.addEventListener('click', onHomeClick);
refs.myLibrary.addEventListener('click', onMyLibraryClick);

insertSearchField();
// console.log(refs.home);
// console.log(refs.myLibrary);
// console.log(refs.headerDynamicContainer);

function onHomeClick(event) {
  // console.log(event.target);
  const activClass = event.target.classList.contains(
    'site-nav__button--active',
  );
  if (activClass) {
    refs.home.classList.remove('site-nav__button--active');
  } else {
    event.target.classList.toggle('site-nav__button--active');
    refs.home.classList.toggle('site-nav__button--active');
  }
  clearContainer();
  insertSearchField();
}

function onMyLibraryClick(event) {
  // console.log(event.target);
  const activClass = event.target.classList.contains(
    'site-nav__button--active',
  );
  // console.log(activClass);
  if (!activClass) {
    event.target.classList.toggle('site-nav__button--active');
    refs.myLibrary.classList.toggle('site-nav__button--active');
  }
  clearContainer();
  insertHeaderBtns();
}

function insertSearchField() {
  refs.headerDynamicContainer.insertAdjacentHTML('beforeend', searchFieldTpl());
}

function insertHeaderBtns() {
  refs.headerDynamicContainer.insertAdjacentHTML('beforeend', headerBtnsTpl());
}

function clearContainer() {
  refs.headerDynamicContainer.innerHTML = '';
}
