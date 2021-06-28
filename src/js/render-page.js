// import helperSvg from 'handlebars-helper-svg';
import getRefs from './get-refs';
import searchFieldTpl from '../templates/search-field.hbs';
import headerBtnsTpl from '../templates/header-btns.hbs';
import renderLibrary from './renderLibrary';
import debounce from 'lodash.debounce';
import {onSearch} from './renderMovies'
// console.log(onSearch);
// console.log(searchFieldTpl());
// console.log(headerBtnsTpl());

const refs = getRefs();

refs.home.addEventListener('click', onHomeClick);
refs.myLibrary.addEventListener('click', onMyLibraryClick);


insertContentTpl(refs.headerDynamicContainer, searchFieldTpl);
const searchInputRef = document.querySelector('.js-search-field__input');
  // console.log(searchInputRef);
searchInputRef.addEventListener('input', debounce(onSearch, 500));
  // console.log(refs.home);
  // console.log(refs.myLibrary);
  // console.log(refs.headerDynamicContainer);

function onHomeClick(event) {
  // console.log(event.target);

  toggleActivClassOnMainPage(event);
  changeOnMainBg();
  clearContainer(refs.headerDynamicContainer);
  insertContentTpl(refs.headerDynamicContainer, searchFieldTpl);
  const searchInputRef = document.querySelector('.js-search-field__input');
  searchInputRef.addEventListener('input', debounce(onSearch, 500));
  
}

function onMyLibraryClick(event) {
  // console.log(event.target);
  toggleActivClassOnSecondPage(event);
  changeOnSecondaryBg();
  searchInputRef.removeEventListener('input', debounce(onSearch, 500));
  clearContainer(refs.headerDynamicContainer);
  insertContentTpl(refs.headerDynamicContainer, headerBtnsTpl);
  // renderLibrary();
  
}

function insertContentTpl(nameContainer, fnTemplates) {
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
  refs.headerBackgroundContainer.classList.remove(
    'header__container--my-library-bg',
  );
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
    refs.headerBackgroundContainer.classList.add(
      'header__container--my-library-bg',
    );
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
