import {Splide} from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { mhzModules } from './modules';
// Default theme
// import '@splidejs/splide/css';

// or only core styles
import '@splidejs/splide/css/core';



function initSliders() {
  const gallerySliders = document.querySelectorAll('[data-gallery-slider]');
  if (gallerySliders.length) {
    for (let index = 0; index < gallerySliders.length; index++) {
      const gallerySlider = gallerySliders[index];

      const slides = gallerySlider.querySelectorAll('.splide__slide');
      
      let splide = new Splide(gallerySlider, {
        type: 'slide',
        pagination: false,
        gap: 10,
        arrows: slides.length > 1,
        perMove: 1,
        perPage: 1,
      })
      
      splide.mount();
    }
  }

  const platformHeroSlider = document.querySelector('.platform-hero__slider');
  if (platformHeroSlider) {
      let splide = new Splide(platformHeroSlider, {
        type: 'loop',
        pagination: false,
        gap: 52,
        arrows: false,
        perMove: 1,
        autoWidth: true,
        drag: false,
        autoScroll: {
          speed: 1
        },
        breakpoints: {
          1240: {
            gap: 30
          },
          768: {
            gap: 20
          },
        }
      })
      
      splide.mount({AutoScroll});
  }

  const visualizationSliders = document.querySelectorAll('.item-visualization__gallery');
  if (visualizationSliders.length) {
    for (let index = 0; index < visualizationSliders.length; index++) {
      const visualizationSlider = visualizationSliders[index];

      if (visualizationSlider.closest('.item-visualization_gallery')) {
        remakeVisualizationSlider(visualizationSlider);
      }
      
      const slides = visualizationSlider.querySelectorAll('.splide__slide');
    
      let splide = new Splide(visualizationSlider, {
        type: 'slide',
        pagination: false,
        gap: 10,
        arrows: slides.length > 1,
        perMove: 1,
        perPage: 1,
      })

      splide.mount();
    }
  }
}

function remakeVisualizationSlider(visualizationSlider) {
  const slides = visualizationSlider.querySelectorAll('.item-visualization__slide');

  let border = 1;
  let idx = 0;
  if (mhzModules.mmd3.matches) {
    border = 5
  }

  let arr = [];
  let subarr = [];

  for (let index = 0; index < slides.length; index++) {
    const slide = slides[index];
    if (idx < border) {
      subarr.push(slide);
      idx++;
    } else {
      arr.push(subarr);
      subarr = [slide];
      idx = 1;
    }

    if (index === slides.length-1) {
      arr.push(subarr);
    }
  }

  visualizationSlider.classList.add('splide');

  let slidesStr = ``;
  for (let index = 0; index < arr.length; index++) {
    const subarr = arr[index];
    if (!subarr.length) continue;

    let slideStr = ''

    for (let index = 0; index < subarr.length; index++) {
      const item = subarr[index];
      slideStr += item.outerHTML.trim();
    }

    slidesStr += `<div class="splide__slide">${slideStr}</div>\n`;
  }

  visualizationSlider.innerHTML = `
  <div class="splide__track item-visualization__track">
    <div class="splide__list item-visualization__list">
      ${slidesStr}
    </div>
  </div>`.trim();
}

window.addEventListener("load", function (e) {
	initSliders();
});