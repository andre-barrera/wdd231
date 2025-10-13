// cards.js
export function displayCards(collections) {
  const container = document.querySelector('.cards');
  if (!container) return;
  container.innerHTML = "";

  collections.forEach(collection => {
    const card = document.createElement("section");
    card.innerHTML = `
      <figure class="card">
      <img src="${collection.collectionImage}" alt="${collection.collectionName}">
      <figcaption>${collection.collectionName}</figcaption>
      </figure>
    `;
    container.appendChild(card);
  });
}


export function displayGallery(galleries) {
  const container = document.querySelector('.gallery-cards');
  container.innerHTML = "";

  galleries.forEach( gallery => {
    const card = document.createElement('section');
    if (!container) return;
    card.innerHTML = `
    <div class="gallery-card">
    <img src="${gallery.image}" alt="${gallery.description}">
    <div>
    <h3>${gallery.title}</h3>
    <p>Artist: ${gallery.artist} - Style: ${gallery.style} - Year: ${gallery.year}</p>
    </div>
    </div>`;
    
    container.appendChild(card);
  });
}