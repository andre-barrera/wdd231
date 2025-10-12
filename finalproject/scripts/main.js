// main.js
import { loadGallery } from './gallery.js';

document.addEventListener('DOMContentLoaded', ()=>{
  // attach hamburger for mobile
  const hb = document.getElementById('hamburger');
  if(hb){
    hb.addEventListener('click', ()=>{
      const nav = document.querySelector('nav ul');
      if(nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
  }

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

