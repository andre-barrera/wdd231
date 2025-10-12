// carousel.js
export function initCarousel(slidesData) {
  const hero = document.querySelector('.hero-carousel');
  const heroTitle = document.getElementById('hero-title');
  const heroText = document.getElementById('hero-text');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const calltoaction = document.getElementById('call-to-action');

  if (!hero || slidesData.length === 0) return;

  let index = 0;

  function showSlide(i) {
    const slide = slidesData[i];
    hero.style.backgroundImage = `url(${slide.image})`;
    heroTitle.textContent = slide.title;
    heroText.textContent = slide.text;
    calltoaction.textContent = slide.textbutton;
    calltoaction.setAttribute('href', slide.button);
    hero.classList.add('fade');
    setTimeout(() => hero.classList.remove('fade'), 500);
  }

  showSlide(index);

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slidesData.length) % slidesData.length;
    showSlide(index);
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slidesData.length;
    showSlide(index);
  });

  setInterval(() => {
    index = (index + 1) % slidesData.length;
    showSlide(index);
  }, 6000);
}
