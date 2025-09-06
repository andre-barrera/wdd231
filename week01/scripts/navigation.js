const navbutton = document.querySelector('#ham-btn');

// Navigation menu
const navBar = document.querySelector('#nav-bar');


navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');
});



