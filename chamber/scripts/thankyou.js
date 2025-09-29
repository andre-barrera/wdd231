// thank you page

const params = new URLSearchParams(window.location.search);


document.getElementById("out-firstname").textContent = params.get("firstname") || "";
document.getElementById("out-lastname").textContent = params.get("lastname") || "";
document.getElementById("out-email").textContent = params.get("email") || "";
document.getElementById("out-phone").textContent = params.get("phone") || "";
document.getElementById("out-organization").textContent = params.get("organization") || "";
document.getElementById("out-timestamp").textContent = params.get("timestamp") || "";


// Last Modification

const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();

year.innerHTML = `&copy; ${today.getFullYear()}`;
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

// Hamburger button

const navbutton = document.querySelector("#ham-btn");
const navbar = document.querySelector(".navigation");

navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    navbar.classList.toggle("show");
});