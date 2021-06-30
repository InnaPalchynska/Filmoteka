import getRefs from '../js/get-refs';
import headerLightboxTpl from '../templates/header-lightbox.hbs';

import '../sass/components/_basic-lightbox.scss';
import * as basicLightbox from 'basiclightbox';

const refs = getRefs();
refs.logInBtn.addEventListener('click', onlogInBtnClick);

function onlogInBtnClick(e) {
  console.log(e.target);

  e.preventDefault();

  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  onLightboxOpen(e);
}

function onLightboxOpen(e) {
  const lightbox = basicLightbox.create(headerLightboxTpl(), {
    onShow() {
      refs.body.classList.add('inactive');
    },

    onClose() {
      refs.body.classList.remove('inactive');
    },
  });

  lightbox.show();

  const closeBtn = document.querySelector('.header-lightbox__close-btn');

  closeBtn.addEventListener('click', onLightboxClose);
  window.addEventListener('keydown', onEscBtnPress);

  function onLightboxClose(e) {
    lightbox.close();

    closeBtn.removeEventListener('click', onLightboxClose);
  }

  function onEscBtnPress(e) {
    if (e.code === 'Escape') {
      lightbox.close();
    }

    window.removeEventListener('keydown', onEscBtnPress);
  }
}
