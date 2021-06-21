const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const bodyRef = document.querySelector('body');
const switchEl = document.querySelector('#theme-switch-toggle');
switchEl.addEventListener('change', onChangedSwitch);

if (localStorage.getItem('theme') === Theme.DARK) {
  bodyRef.classList.add(Theme.DARK);
  switchEl.checked = 'true';
} else {
  localStorage.setItem('theme', Theme.LIGHT);
  bodyRef.classList.add(Theme.LIGHT);
}

function onChangedSwitch() {
  if (localStorage.theme === Theme.LIGHT) {
    bodyRef.classList.replace(Theme.LIGHT, Theme.DARK);
    localStorage.setItem('theme', Theme.DARK);
  } else {
    bodyRef.classList.replace(Theme.DARK, Theme.LIGHT);
    localStorage.setItem('theme', Theme.LIGHT);
  }
}
