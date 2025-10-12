// cards.js
export function displayCards(collections) {
  const container = document.querySelector('.cards');
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
