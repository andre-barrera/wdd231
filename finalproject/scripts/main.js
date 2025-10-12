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
