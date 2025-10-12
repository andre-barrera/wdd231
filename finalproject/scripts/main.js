
import { initCarousel } from './carousel.js';
import { displayCards } from './cards.js';

// Header mobile menu

const airplane = document.querySelector('.airplane');

function randomizeVerticalPosition() {
  const randomTop = Math.random() * -80 + 60; 
  airplane.style.top = `${randomTop}px`;
}


randomizeVerticalPosition();

airplane.addEventListener('animationiteration', randomizeVerticalPosition);


// Humburger button

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

// Last Modified


// Carousel / Cards

async function loadArtworks() {
  try {
    const response = await fetch('data/artworks.json');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    const slides = data.heroSlides || [];
    const collections = data.collections || [];

    // Initialize carousel and cards
    initCarousel(slides);
    displayCards(collections);

  } catch (err) {
    console.error('Error loading JSON:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadArtworks);


const year = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");
const today = new Date();

year.innerHTML= `&copy; ${today.getFullYear()}`;
lastModified.innerHTML =`Last Modification: ${document.lastModified}`;