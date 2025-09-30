import LazyLoad from "vanilla-lazyload";

// Работает с объектами с классом ._lazy

window.addEventListener('load', () => {
  const lazyMedia = new LazyLoad({
    elements_selector: '[data-src],[data-srcset]',
    class_loaded: '_lazy-loaded',
  });
})

// Обновить модуль
//lazyMedia.update();