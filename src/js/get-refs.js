export default function getRefs() {
  return {
    body: document.querySelector('body'),
    moviesList: document.querySelector('.js-movies-list'),
    divPagination: document.querySelector('.tui-pagination'),
    preloader: document.querySelector('.js-preloader'),
    home: document.querySelector('[data-header="home"]'),
    myLibrary: document.querySelector('[data-header="myLiblary"]'),
    headerDynamicContainer: document.querySelector('[data-header="dynamicContainer"]'),
    goTopBtn: document.querySelector('.back_to_top'),
    headerBackgroundContainer: document.querySelector('.js-container-header-bg'),
    footerBtn: document.querySelector('.footer__button'),
    notify: document.querySelector('.js-notify'),
    logoLink: document.querySelector('[data-header="logo"]'),
    filterWrapper: document.querySelector('.js-filter-wrapper'),
  };
}
