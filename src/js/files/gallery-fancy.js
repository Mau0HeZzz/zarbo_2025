import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";


document.addEventListener('DOMContentLoaded', () => {
  setFancyWithIframeHref();
  // console.log(Fancybox)
  const tpl = `<dialog class="fancybox__dialog">
    <div class="fancybox__container" tabindex="0" aria-label="{{MODAL}}">
      <div class="fancybox__backdrop"></div>
      <div class="fancybox__carousel">
        <h2 class="section-title"></h2>
      </div>
    </div>
  </dialog>`
  Fancybox.bind("[data-fancybox]", {
    wheel: 'slide',
    mainTpl: tpl,
    on: {
      "Carousel.change": (instance, carouselInstance) => {
        const slides = carouselInstance.getSlides();
        const idx = carouselInstance.getPageIndex();
        for (let index = 0; index < slides.length; index++) {
          const slide = slides[index];
          if (slide.index !== idx&&slide.el.querySelector('video')) {
            slide.el.querySelector('video').pause();
          }
        }
      },
      initCarousel: (instance) => {
        const id = instance.getOptions()?.triggerEl?.getAttribute?.('data-fancybox')
        const title = document.querySelector(`[data-fancybox-title="${id}"]`);
        const instanceTitle = instance.getContainer()?.querySelector('.section-title');
        if (!title||!instanceTitle) return;

        instanceTitle.innerHTML = title.innerHTML;
      }
    },
    Carousel: {
      infinite: false,
      Thumbs: {
        showOnStart: false
      },
      Toolbar: {
        enabled: true,
        display: {
          left: [],
          middle: [],
          right: ['close']
        }
      },
    },
    l10n: {
      CLOSE: "Закрыть",
      NEXT: "Далее",
      PREV: "Назад",
      ERROR: "Контент не может быть загружен. <br/> Попробуйте позже.",
      PLAY_START: "Слайдшоу",
      PLAY_STOP: "Остановить слайдшоу",
      FULL_SCREEN: "На весь экран",
      THUMBS: "Превью",
      DOWNLOAD: "Скачать",
      SHARE: "Поделиться",
      ZOOM: "Увеличить"
    },
  });
})


function setFancyWithIframeHref() {
  const fancyLinksWithIframe = document.querySelectorAll('[data-fancybox][data-type="iframe"]');
  if (fancyLinksWithIframe.length) {
    for (let index = 0; index < fancyLinksWithIframe.length; index++) {
      const link = fancyLinksWithIframe[index];
      const linkHref = link.getAttribute('href');
      if (linkHref.trim()&&linkHref !== '#') continue;

      const iframe = link.querySelector('iframe');
      if (!iframe) continue;

      const src = iframe.getAttribute('src') || iframe.getAttribute('data-src');
      if (!src) continue;

      link.setAttribute('href', src);
    }
  }
}