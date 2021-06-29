// import helperSvg from 'handlebars-helper-svg';
import getRefs from './get-refs';
import { renderLibraryMovies } from './render-library-movies';
import searchFieldTpl from '../templates/search-field.hbs';
import headerBtnsTpl from '../templates/header-btns.hbs';
import debounce from 'lodash.debounce';
import { onSearch } from './renderMovies';

const refs = getRefs();
const searchInput = document.querySelector('.js-search-field__input');
searchInput.addEventListener('input', debounce(onSearch, 500));

refs.home.addEventListener('click', onHomeClick);
refs.myLibrary.addEventListener('click', onMyLibraryClick);

insertContentTpl(refs.headerDynamicContainer, searchFieldTpl);

function onHomeClick(event) {
  toggleActiveClassOnMainPage(event);
  changeOnMainBg();
  const watchedMoviesBtn = document.querySelector("[data-header='watched']");
  const queueMoviesBtn = document.querySelector("[data-header='queue']");
  watchedMoviesBtn.removeEventListener('click', onHeaderBtnsClick);
  queueMoviesBtn.removeEventListener('click', onHeaderBtnsClick);
  clearContainer(refs.headerDynamicContainer);
  insertContentTpl(refs.headerDynamicContainer, searchFieldTpl);
  const searchInput = document.querySelector('.js-search-field__input');
  searchInput.addEventListener('input', debounce(onSearch, 500));
}

function onMyLibraryClick(event) {
  toggleActiveClassOnSecondPage(event);
  changeOnSecondaryBg();
  searchInput.removeEventListener('input', debounce(onSearch, 500));
  clearContainer(refs.headerDynamicContainer);
  insertContentTpl(refs.headerDynamicContainer, headerBtnsTpl);
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

function insertContentTpl(nameContainer, fnTemplates) {
  nameContainer.insertAdjacentHTML('beforeend', fnTemplates());
}

function clearContainer(nameContainer) {
  nameContainer.innerHTML = '';
}

function changeOnMainBg() {
  const activeBgClass = refs.headerBackgroundContainer.classList.contains(
    'header__container--home-bg',
  );
  if (!activeBgClass) {
    refs.headerBackgroundContainer.classList.add('header__container--home-bg');
  }
  refs.headerBackgroundContainer.classList.remove(
    'header__container--my-library-bg',
  );
}

function toggleActiveClassOnMainPage(e) {
  const activeClass = e.target.classList.contains('site-nav__button--active');
  if (!activeClass) {
    e.target.classList.add('site-nav__button--active');
  }
  refs.myLibrary.classList.remove('site-nav__button--active');
}

function changeOnSecondaryBg() {
  const activeBgClass = refs.headerBackgroundContainer.classList.contains(
    'header__container--my-library-bg',
  );
  if (!activeBgClass) {
    refs.headerBackgroundContainer.classList.add(
      'header__container--my-library-bg',
    );
  }
  refs.headerBackgroundContainer.classList.remove('header__container--home-bg');
}

function toggleActiveClassOnSecondPage(e) {
  const activeClass = e.target.classList.contains('site-nav__button--active');
  if (!activeClass) {
    e.target.classList.add('site-nav__button--active');
  }
  refs.home.classList.remove('site-nav__button--active');
}
