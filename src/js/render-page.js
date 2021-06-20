import getRefs from './get-refs';
import searchFieldTpl from '../templates/search-field.hbs';
import headerBtnsTpl from '../templates/header-btns.hbs'

console.log(searchFieldTpl());
console.log(headerBtnsTpl());

const refs = getRefs();


refs.home.addEventListener('click', onHomeClick);
refs.myLibrary.addEventListener('click', onMyLibraryClick);

insertSearchField();
console.log(refs.home);
console.log(refs.myLibrary);
console.log(refs.headerDynamicContainer);


function onHomeClick(e) {
    console.log(e.target);
    clearContainer();
    insertSearchField();
}

function onMyLibraryClick(e) {
  console.log(e.target);
  clearContainer();
  insertHeaderBtns();
}

function insertSearchField() {
    refs.headerDynamicContainer.insertAdjacentHTML('beforeend', searchFieldTpl());
}

function insertHeaderBtns() {
  refs.headerDynamicContainer.insertAdjacentHTML('beforeend', headerBtnsTpl());
}

function clearContainer(){
 refs.headerDynamicContainer.innerHTML=''
}

