// sections.mjs
export function setSectionSelection(sections) {
  const sectionSelect = document.querySelector("#sectionNumber");
  sectionSelect.innerHTML = ""; // clear old options

  sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNumber;
    option.textContent = section.sectionNumber;
    sectionSelect.appendChild(option);
  });
}

export function populateSections(sections) {
  setSectionSelection(sections);
}
