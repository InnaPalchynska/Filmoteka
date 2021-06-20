export default function getRefs() {
  return {
    moviesList: document.querySelector('.js-movies-list'),
    divPagination: document.querySelector('.tui-pagination'),
    preloader: document.querySelector('.js-preloader'),
    home: document.querySelector('[data-header="home"]'),
    myLibrary: document.querySelector('[data-header="home"]'),
    headerDynamicContainer: document.querySelector('[data-header="dynamicContainer"]'),
  };
}
