// Подключение функционала "Чертоги Фрилансера"
import { debounce, isMobile, wrap } from "./functions.js";
// Подключение списка активных модулей
import { mhzModules } from "./modules.js";

import CloudImage360 from 'js-cloudimage-360-view';


document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.cloudimage-360')) {
    const cloudimage360 = new CloudImage360();
    cloudimage360.initAll('cloudimage-360');
  }
  
  const formRows = document.querySelectorAll('.form__row');
  if (formRows.length) {
    formRows.forEach(formRow=>{
      setFormRowCols(formRow);
    })
  }

  const withGrayBgs = document.querySelectorAll('.visualization_graybg');
  if (withGrayBgs.length) {
    withGrayBgs.forEach(withGrayBg => {
      setGrayBgSize(withGrayBg);
    })
    window.addEventListener('resize', () => {
      withGrayBgs.forEach(withGrayBg => {
        setGrayBgSize(withGrayBg);
      })
    });
  }

  const dateTimeInputs = document.querySelectorAll('input[data-tariff-datetime-hid]');
  if (dateTimeInputs.length) {
    dateTimeInputs.forEach(dateTimeInput => {
      const opts = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      const date = new Date().toLocaleDateString('ru-RU', opts).replaceAll('.','-').replace(',','');
      dateTimeInput.value = date;
    })
  }
})

document.addEventListener('click', (e) => {
  const mobileDropdownTrigger = e.target.closest('.main-menu__item--parent>a') || e.target.closest('.submenu__item--is-parent>a');
  if (mobileDropdownTrigger) {
    const parent = mobileDropdownTrigger.closest('.submenu__item--is-parent') || mobileDropdownTrigger.closest('.main-menu__item--parent');
    if (parent) {
      e.preventDefault();
      parent.classList.toggle('is-open');
    }
  }
})

function setFormRowCols(formRow) {
  const cols = formRow.querySelectorAll('&>*');
  
  formRow.style.setProperty('--cols', cols.length || 1);
}

function setGrayBgSize(withGrayBg) {
  const prev = withGrayBg.previousElementSibling;
  const next = withGrayBg.nextElementSibling;

  let topOffset = 0, bottomOffset = 0;

  if (prev) {
    topOffset = (withGrayBg.offsetTop - prev.offsetTop) / 2;
  }
  if (next) {
    bottomOffset = (next.offsetHeight / 2);
  }
  
  withGrayBg.style.setProperty('--bg-offset-top', `${topOffset}px`);
  withGrayBg.style.setProperty('--bg-offset-bottom', `${bottomOffset}px`);
}


window.mhzModules = mhzModules;