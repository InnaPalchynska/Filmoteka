import getRefs from './get-refs';
import searchFieldTpl from '../templates/search-field.hbs';
import headerBtnsTpl from '../templates/header-btns.hbs'

// console.log(searchFieldTpl());
// console.log(headerBtnsTpl());

const refs = getRefs();


refs.home.addEventListener('click', onHomeClick);
refs.myLibrary.addEventListener('click', onMyLibraryClick);

insertContent(refs.headerDynamicContainer, searchFieldTpl);
// console.log(refs.home);
// console.log(refs.myLibrary);
// console.log(refs.headerDynamicContainer);


function onHomeClick(event) {
  // console.log(event.target);
  const activClass = event.target.classList.contains('site-nav__button--active');
  if (!activClass) {
    event.target.classList.add('site-nav__button--active');
  }
  refs.myLibrary.classList.remove('site-nav__button--active');

  const activBgClass = refs.headerBackgroundContainer.classList.contains(
    'header__container--home-bg',
  );
  // console.log(refs.headerBackgroundContainer.classList);
  if (!activBgClass) {
    refs.headerBackgroundContainer.classList.add('header__container--home-bg');
  }
  refs.headerBackgroundContainer.classList.remove('header__container--my-library-bg');
  clearContainer(refs.headerDynamicContainer);
  insertContent(refs.headerDynamicContainer, searchFieldTpl);
}

function onMyLibraryClick(event) {
  // console.log(event.target);
  const activClass = event.target.classList.contains('site-nav__button--active');
  // console.log(activClass);
  if (!activClass) {
    event.target.classList.add('site-nav__button--active');
  }
  refs.home.classList.remove('site-nav__button--active');

  const activBgClass = refs.headerBackgroundContainer.classList.contains(
    'header__container--my-library-bg',
  );
  if (!activBgClass) {
    refs.headerBackgroundContainer.classList.add('header__container--my-library-bg');
  }
  refs.headerBackgroundContainer.classList.remove('header__container--home-bg');
  clearContainer(refs.headerDynamicContainer);
  insertContent(refs.headerDynamicContainer, headerBtnsTpl);
}

function insertContent(nameContainer,fnTemplates) {
  nameContainer.insertAdjacentHTML('beforeend', fnTemplates());
}

function clearContainer(nameContainer) {
  nameContainer.innerHTML = '';
}

