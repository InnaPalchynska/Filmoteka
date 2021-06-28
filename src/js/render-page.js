// import helperSvg from 'handlebars-helper-svg';
import getRefs from './get-refs';
import { renderLibraryMovies } from './render-library-movies';
import searchFieldTpl from '../templates/search-field.hbs';
import headerBtnsTpl from '../templates/header-btns.hbs';
// import renderLibrary from './renderLibrary';

const refs = getRefs();

refs.home.addEventListener('click', onHomeClick);
refs.myLibrary.addEventListener('click', onMyLibraryClick);

insertContent(refs.headerDynamicContainer, searchFieldTpl);
// console.log(refs.home);
// console.log(refs.myLibrary);
// console.log(refs.headerDynamicContainer);

function onHomeClick(event) {
  // console.log(event.target);

  toggleActivClassOnMainPage(event);
  changeOnMainBg();
  clearContainer(refs.headerDynamicContainer);
  insertContent(refs.headerDynamicContainer, searchFieldTpl);
}

function onMyLibraryClick(event) {
  // console.log(event.target);
  toggleActivClassOnSecondPage(event);
  changeOnSecondaryBg();
  clearContainer(refs.headerDynamicContainer);
  insertContent(refs.headerDynamicContainer, headerBtnsTpl);

  const watchedMoviesBtn = document.querySelector("[data-header='watched']");
  const queueMoviesBtn = document.querySelector("[data-header='queue']");
  watchedMoviesBtn.addEventListener('click', onHeaderBtnsClick);
  queueMoviesBtn.addEventListener('click', onHeaderBtnsClick);
  renderLibraryMovies();
}

function onHeaderBtnsClick(e) {
  switchActiveClass(e, 'header-buttons__btn--active');
  const itemName = e.target.dataset.header;
  renderLibraryMovies(itemName);
}

function switchActiveClass(e, className) {
  document.querySelector(`.${className}`).classList.remove(className);
  e.target.classList.add(className);
}

function insertContent(nameContainer, fnTemplates) {
  nameContainer.insertAdjacentHTML('beforeend', fnTemplates());
}

function clearContainer(nameContainer) {
  nameContainer.innerHTML = '';
}

function changeOnMainBg() {
  const activBgClass = refs.headerBackgroundContainer.classList.contains(
    'header__container--home-bg',
  );
  if (!activBgClass) {
    refs.headerBackgroundContainer.classList.add('header__container--home-bg');
  }
  refs.headerBackgroundContainer.classList.remove('header__container--my-library-bg');
}

function toggleActivClassOnMainPage(e) {
  const activClass = e.target.classList.contains('site-nav__button--active');
  if (!activClass) {
    e.target.classList.add('site-nav__button--active');
  }
  refs.myLibrary.classList.remove('site-nav__button--active');
}

function changeOnSecondaryBg() {
  const activBgClass = refs.headerBackgroundContainer.classList.contains(
    'header__container--my-library-bg',
  );
  if (!activBgClass) {
    refs.headerBackgroundContainer.classList.add('header__container--my-library-bg');
  }
  refs.headerBackgroundContainer.classList.remove('header__container--home-bg');
}

function toggleActivClassOnSecondPage(e) {
  const activClass = e.target.classList.contains('site-nav__button--active');
  if (!activClass) {
    e.target.classList.add('site-nav__button--active');
  }
  refs.home.classList.remove('site-nav__button--active');
}
