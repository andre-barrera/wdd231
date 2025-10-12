// main.js
import { loadGallery } from './gallery.js';

document.addEventListener('DOMContentLoaded', ()=>{
  // If gallery container exists, initialize gallery
  if(document.querySelector('#gallery-container')){
    loadGallery('#gallery-container', '#sidebar');
  }
});


const airplane = document.querySelector('.airplane');

function randomizeVerticalPosition() {
  // Choose a random top value between 20px and 150px
  const randomTop = Math.random() * -80 + 60; 
  airplane.style.top = `${randomTop}px`;
}

// Set an initial random position
randomizeVerticalPosition();

// Change position each time the animation restarts
airplane.addEventListener('animationiteration', randomizeVerticalPosition);


//const navbutton = document.querySelector("#ham-btn");

const navbutton = document.querySelector("#ham-btn"); // uncomment and use this
const navbar = document.querySelector(".navigation");

navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    navbar.classList.toggle("show");
});

//Wayfinding
const navLinks = document.querySelectorAll(".navigation a");
const currentPath = window.location.pathname;

navLinks.forEach(link => {
    if (link.getAttribute("href") !== "#" && currentPath.includes(link.getAttribute("href"))) {
        link.classList.add("active");
    }
});


// Gallery

// main.js

// Load JSON data
fetch('data/artworks.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Separate artworks and slides
    const artworks = data.filter(item => item.id);
    const slides = data.filter(item => !item.id && item.title);

    // ✅ HERO CAROUSEL
    const hero = document.querySelector('.hero-carousel');
    const heroTitle = document.getElementById('hero-title');
    const heroText = document.getElementById('hero-text');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const calltoaction = document.getElementById('call-to-action')

    if (hero && slides.length > 0) {
      let index = 0;

      function showSlide(i) {
        const slide = slides[i];
        hero.style.backgroundImage = `url(${slide.image})`;
        heroTitle.textContent = slide.title;
        heroText.textContent = slide.text;
        calltoaction.textContent = slide.textbutton;
        hero.classList.add('fade');
        setTimeout(() => hero.classList.remove('fade'), 500);
      }

      // Show first slide
      showSlide(index);

      // Navigation
      prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
      });

      nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        showSlide(index);
      });

      // Auto rotate every 6 seconds
      setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
      }, 6000);
    }
  })
  .catch(err => console.error('Error loading JSON:', err));





