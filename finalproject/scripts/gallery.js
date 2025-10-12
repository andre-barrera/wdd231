// gallery.js
import { openModal } from './modal.js';

const DATA_URL = '/final/data/artworks.json'; // adjust path if needed

export async function loadGallery(containerSelector, sidebarSelector){
  const container = document.querySelector(containerSelector);
  const sidebar = document.querySelector(sidebarSelector);
  try {
    const resp = await fetch(DATA_URL);
    if(!resp.ok) throw new Error('Network response not ok');
    const data = await resp.json();

    // Use array methods: filter, map, forEach
    // Keep at least 15 items — the JSON includes 15
    const items = data.slice(0, 15);

    // Save to localStorage for caching
    localStorage.setItem('pixel-art-data', JSON.stringify(items));

    renderGallery(items, container);
    renderSidebar(items, sidebar);
  } catch (err) {
    console.error('Fetch error', err);
    // Try to use cached local data if fetch failed
    const cached = localStorage.getItem('pixel-art-data');
    if(cached) renderGallery(JSON.parse(cached), container);
    else container.innerHTML = `<p>Unable to load content. ${err.message}</p>`;
  }
}

function renderGallery(items, container){
  container.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'cards';

  items.forEach(item => {
    const div = document.createElement('article');
    div.className = 'card';
    div.innerHTML = `
      <img class="thumb" src="${item.image}" alt="${escapeHTML(item.title)}">
      <h3>${escapeHTML(item.title)}</h3>
      <p><small>by ${escapeHTML(item.artist)} • ${escapeHTML(item.style)}</small></p>
      <button class="btn btn-primary" data-id="${item.id}">View</button>
      <button class="btn js-fav" data-id="${item.id}">♡</button>
    `;
    grid.appendChild(div);
  });

  container.appendChild(grid);

  // attach event listeners
  container.querySelectorAll('.card .btn-primary').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const id = e.currentTarget.dataset.id;
      const item = items.find(x=>x.id===id);
      if(item) showDetails(item);
    });
  });

  container.querySelectorAll('.js-fav').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const id = e.currentTarget.dataset.id;
      toggleFavorite(id);
    });
  });
}

function renderSidebar(items, sidebar){
  sidebar.innerHTML = `
    <div class="card">
      <h4>Random Pixel</h4>
      <div id="random-pixel" style="min-height:120px"></div>
      <h4>Filter</h4>
      <select id="style-filter">
        <option value="">All</option>
        <option value="8-bit">8-bit</option>
        <option value="16-bit">16-bit</option>
        <option value="modern">modern</option>
      </select>
    </div>
  `;
  const randDiv = sidebar.querySelector('#random-pixel');
  const r = items[Math.floor(Math.random()*items.length)];
  randDiv.innerHTML = `<img src="${r.image}" alt="${escapeHTML(r.title)}" style="max-width:100%"> <p>${escapeHTML(r.title)}</p>`;

  sidebar.querySelector('#style-filter').addEventListener('change', (e)=>{
    const v = e.target.value;
    const allCards = document.querySelector('.cards');
    // use filter method to get items
    const cached = JSON.parse(localStorage.getItem('pixel-art-data') || '[]');
    const filtered = v ? cached.filter(x=>x.style===v) : cached;
    renderGallery(filtered, document.querySelector('.grid .cards') ? document.querySelector('.grid .cards').parentElement : document.querySelector('main .cards') );
    // fallback: re-render main container
    renderGallery(filtered, document.querySelector('main .grid') || document.querySelector('main'));
  });
}

function showDetails(item){
  const content = document.createElement('div');
  content.innerHTML = `
    <img src="${item.image}" alt="${escapeHTML(item.title)}" style="max-width:200px; display:block; margin-bottom:.5rem;">
    <h3>${escapeHTML(item.title)}</h3>
    <p><strong>Artist:</strong> ${escapeHTML(item.artist)}</p>
    <p><strong>Style:</strong> ${escapeHTML(item.style)}</p>
    <p>${escapeHTML(item.description)}</p>
    <button id="fav-detail" class="btn btn-accent">${isFavorite(item.id) ? 'Remove Favorite' : 'Add to Favorites'}</button>
  `;
  openModal(content, item.title);

  document.getElementById('fav-detail').addEventListener('click', ()=>{
    toggleFavorite(item.id);
    closeSelfModal();
  });
}

function escapeHTML(s = ''){
  return String(s).replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// localStorage favorites functions
function favoritesList(){
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}
function isFavorite(id){
  return favoritesList().includes(id);
}
function toggleFavorite(id){
  const favs = favoritesList();
  const idx = favs.indexOf(id);
  if(idx === -1) favs.push(id);
  else favs.splice(idx,1);
  localStorage.setItem('favorites', JSON.stringify(favs));
  alert(isFavorite(id) ? 'Added to favorites' : 'Removed from favorites');
}

function closeSelfModal(){
  const backdrop = document.getElementById('modal-backdrop');
  if(backdrop) backdrop.classList.remove('show');
}
