const navbutton = document.querySelector("#ham-btn");
const navbar = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navbar.classList.toggle('show');
})

// Current Page

let actualPage = window.location.pathname.split("/").pop();

let navigationLinks = document.querySelectorAll("nav a");

navigationLinks.forEach(link => {
    let linkpage = link.getAttribute("href");

    if (linkpage === actualPage) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }

})


// Get Year

const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();

year.innerHTML = `&copy; ${today.getFullYear()}`;
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;