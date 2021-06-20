export default function getRefs() {
  return {
    moviesList: document.querySelector('.js-movies-list'),
    divPagination: document.querySelector('.tui-pagination'),
    preloader: document.querySelector('.js-preloader'),
    goTopBtn: document.querySelector('.back_to_top'),
  };
}
