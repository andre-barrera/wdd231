async function fetchMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Could not load JSON");
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    const container = document.querySelector(".business-cards");
    container.innerHTML = "";

    members.slice(0, 3).forEach(member => {
        const card = document.createElement("section");
        card.className = "b-card";
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo">
            <div>
                <h2>${member.name}</h2>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                <p><strong>Membership:</strong> ${getMembershipLevel(member.membership)}</p>
                <p>${member.description}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function getMembershipLevel(level) {
    return level === 3 ? "Gold" : level === 2 ? "Silver" : "Member";
}

fetchMembers();


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
