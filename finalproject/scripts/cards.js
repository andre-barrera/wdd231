// cards.js
export function displayCards(collections) {
  const container = document.querySelector('.cards');
  if (!container) return;
  container.innerHTML = "";

  collections.forEach(collection => {
    const cardSection = document.createElement("section");

  
    const cardFigure = document.createElement("figure");
    cardFigure.classList.add("card");
    cardFigure.innerHTML = `
      <img src="${collection.collectionImage}" alt="${collection.collectionName}">
      <figcaption>${collection.collectionName}</figcaption>
    `;

    
    const cardDialog = document.createElement("dialog");
    cardDialog.innerHTML = `
      <h3>${collection.collectionName}</h3>
      <p>${collection.description || "No description available."}</p>
      <button class="close-dialog">Close</button>
    `;

    cardFigure.addEventListener("click", () => {
      cardDialog.showModal();
    });


    cardDialog.querySelector(".close-dialog").addEventListener("click", () => {
      cardDialog.close();
    });

    cardSection.appendChild(cardFigure);
    cardSection.appendChild(cardDialog);
    container.appendChild(cardSection);
  });
}



export function displayGallery(galleries) {
  const container = document.querySelector('.gallery-cards');
  if (!container) return;  
  container.innerHTML = "";

  galleries.forEach(gallery => {
    const card = document.createElement('section');
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