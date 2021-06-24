export default function getRefs() {
  return {
    moviesList: document.querySelector('.js-movies-list'),
    divPagination: document.querySelector('.tui-pagination'),
    preloader: document.querySelector('.js-preloader'),
    home: document.querySelector('[data-header="home"]'),
    myLibrary: document.querySelector('[data-header="myLiblary"]'),
    headerDynamicContainer: document.querySelector('[data-header="dynamicContainer"]'),
    goTopBtn: document.querySelector('.back_to_top'),
    modalButtonWatched: document.querySelector('.js-modal-btn-watched'),
    modalButtonQueue: document.querySelector('.js-modal-btn-queue'),
  };
}
