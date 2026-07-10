const slides = Array.from(document.querySelectorAll('.project-slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const buttons = Array.from(document.querySelectorAll('.carousel-btn'));

let currentIndex = 0;

function showSlide(index) {
  currentIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === currentIndex);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function changeSlide(direction) {
  showSlide(currentIndex + direction);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.direction === 'next' ? 1 : -1;
    changeSlide(direction);
  });
});

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.index));
  });
});

showSlide(0);
