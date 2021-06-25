import getRefs from '../js/get-refs';
import footerLightboxTpl from '../templates/footer-lightbox.hbs';

import '../sass/components/_basic-lightbox.scss';
import * as basicLightbox from 'basiclightbox';

const refs = getRefs();
refs.footerBtn.addEventListener('click', onFooterBtnClick);

function onFooterBtnClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  onLightboxOpen(e);
}

function onLightboxOpen(e) {
  const lightbox = basicLightbox.create(footerLightboxTpl(), {
    onShow() {
      refs.body.classList.add('inactive');
    },

    onClose() {
      refs.body.classList.remove('inactive');
    },
  });

  lightbox.show();

  const photo1 = document.querySelector('[data-photo="photo--Inna"]');
  const photo2 = document.querySelector('[data-photo="photo--Anastasia"]');
  const photo3 = document.querySelector('[data-photo="photo--Halyna"]');
  const photo4 = document.querySelector('[data-photo="photo--Dariia"]');
  const photo5 = document.querySelector('[data-photo="photo--Kateryna"]');
  const photo6 = document.querySelector('[data-photo="photo--Sergiy"]');

  console.log(photo1);
  photo1.src = '../images/team/team__2__mob.jpg';
  console.log(photo1.src);

  const closeBtn = document.querySelector('.footer-lightbox__close-btn');

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
