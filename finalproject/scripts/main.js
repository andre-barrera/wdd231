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
  const randomTop = Math.random() * -80 + 40; 
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


