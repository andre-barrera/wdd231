// Hamburger button

const navbutton = document.querySelector("#ham-btn");
const navbar = document.querySelector(".navigation");

navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    navbar.classList.toggle("show");
});

// Wayfinding

const navLinks = document.querySelectorAll(".navigation a");
const currentPath = window.location.pathname;

navLinks.forEach(link => {
    if (link.getAttribute("href") !== "#" && currentPath.includes(link.getAttribute("href"))) {
        link.classList.add("active");
    }
});

// Last Modification

const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();

year.innerHTML = `&copy; ${today.getFullYear()}`;
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

//fetch

async function fetchMembership() {
    try{
        const response = await fetch("data/membership.json");
        if (!response.ok) throw new Error("Could not load JSON file");
        const membership = await response.json();
        displayMembershipC(membership);        
    } catch (error) {
        console.error("Error while loading the available memberships", error);
    }
}


// Cards

function displayMembershipC(membership){
    const memContainer = document.querySelector("#membership-c");
    memContainer.innerHTML ="";
    
    membership.memberships.forEach(membershipC => {
        const card = document.createElement("section");

        card.innerHTML = `
        <h2>${membershipC.title}</h2>
        <button>Learn More</button>
        `
        card.addEventListener("click", () => {
            displayDialogue(membershipC);
        })

        memContainer.appendChild(card);
    })
}


function displayDialogue(membershipC){
    dialogTitle.innerHTML = membershipC.title;
    dialogText.innerHTML = `
    <ul>
    ${membershipC.benefits.map(b => `<li>${b}</li>`).join("")}
    </ul>`;
    
    dialog.showModal();
}

// Dialog

const dialog = document.querySelector("#mydialog");
const dialogTitle = document.querySelector("#mydialog h2");
const dialogClose = document.querySelector("#mydialog button");
const dialogText = document.querySelector("#mydialog p");

dialogClose.addEventListener("click", () => {dialog.close()});


fetchMembership();



document.addEventListener("DOMContentLoaded", () => {
  const tsField = document.getElementById("timestamp");
  if (tsField) {
    const now = new Date();
    tsField.value = now.toLocaleString();  
  }
});