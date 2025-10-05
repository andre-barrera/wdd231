/**
 * scripts/discover.js
 * - Loads data/discover.json and creates 8 cards (h2, figure>img, address, p, button)
 * - Adds classes card-1 ... card-8 so CSS grid-template-areas map them
 * - Handles localStorage last-visit messages
 * - Graceful error handling
 */

document.addEventListener('DOMContentLoaded', () => {
  const GALLERY = document.getElementById('gallery');
  const VISIT_MSG = document.getElementById('visit-message');
  const DATA_URL = 'data/discover.json';
  const LS_KEY = 'discover_last_visit';

  // 1) last-visit logic
  (function handleLastVisit(){
    try {
      const now = Date.now();
      const last = localStorage.getItem(LS_KEY);
      if (!last) {
        VISIT_MSG.textContent = 'Welcome! Let us know if you have any questions.';
      } else {
        const diffMs = now - Number(last);
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (days === 0) {
          VISIT_MSG.textContent = 'Back so soon! Awesome!';
        } else if (days === 1) {
          VISIT_MSG.textContent = 'You last visited 1 day ago.';
        } else {
          VISIT_MSG.textContent = `You last visited ${days} days ago.`;
        }
      }
      localStorage.setItem(LS_KEY, String(now));
    } catch (err) {
      // localStorage may be unavailable (privacy mode) — show neutral message
      try { VISIT_MSG.textContent = 'Welcome! Let us know if you have any questions.'; } catch(e) {}
      console.warn('LocalStorage unavailable or error reading/writing.', err);
    }
  })();

  // 2) Fetch JSON and render cards
  async function loadCards() {
    if (!GALLERY) return;
    try {
      const res = await fetch(DATA_URL, {cache: 'no-cache'});
      if (!res.ok) throw new Error(`Failed to fetch ${DATA_URL} (${res.status})`);
      const items = await res.json();
      if (!Array.isArray(items) || items.length === 0) {
        GALLERY.innerHTML = '<p>No discovery items found in data/discover.json.</p>';
        return;
      }

      // Create up to 8 cards (if JSON contains more, we take first 8)
      const toShow = items.slice(0, 8);
      toShow.forEach((it, idx) => {
        const card = document.createElement('article');
        card.className = `card card-${idx+1}`; // card-1 .. card-8 for grid areas

        // figure > img
        const fig = document.createElement('figure');
        const img = document.createElement('img');
        img.src = `images/${it.image}`;
        img.alt = it.title || `Image ${idx+1}`;
        // set loading attribute for performance
        img.loading = 'lazy';
        fig.appendChild(img);

        // content container with title/address/description
        const content = document.createElement('div');
        content.className = 'card-content';

        const h2 = document.createElement('h2');
        h2.textContent = it.title || 'Untitled';

        const addr = document.createElement('address');
        addr.textContent = it.address || '';

        const desc = document.createElement('p');
        desc.textContent = it.description || '';

        content.appendChild(h2);
        content.appendChild(addr);
        content.appendChild(desc);

        // actions
        const actions = document.createElement('div');
        actions.className = 'card-actions';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = 'Learn more';
        btn.addEventListener('click', () => {
          // placeholder behaviour — you can change to open modal or details page
          alert(it.title + '\n\n' + (it.description || ''));
        });
        actions.appendChild(btn);

        // assemble
        card.appendChild(fig);
        card.appendChild(content);
        card.appendChild(actions);

        GALLERY.appendChild(card);
      });
    } catch (err) {
      console.error('Error loading discovery items:', err);
      GALLERY.innerHTML = '<p>Could not load discovery items. Ensure <code>data/discover.json</code> exists and that images are placed in <code>images/discover/</code>.</p>';
    }
  }

  loadCards();
});


// Wayfinding
const navLinks = document.querySelectorAll(".navigation a");
const currentPath = window.location.pathname;

navLinks.forEach(link => {
    if (link.getAttribute("href") !== "#" && currentPath.includes(link.getAttribute("href"))) {
        link.classList.add("active");
    }
});


// Last modified

const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();

year.innerHTML = `&copy; ${today.getFullYear()}`;
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

// hmb button

const navbutton = document.querySelector("#ham-btn");
const navbar = document.querySelector(".navigation");

navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    navbar.classList.toggle("show");
});