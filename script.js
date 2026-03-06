// LOADER
window.addEventListener("load", function () {
    const loader = document.querySelector(".loader-wrapper");
    if (loader) loader.classList.add("hidden");
});
setTimeout(function () {
    const loader = document.querySelector(".loader-wrapper");
    if (loader) loader.classList.add("hidden");
}, 2000);

// NAVBAR SCROLL
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});

// HAMBURGER MENU
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}

// CLOSE MENU ON LINK CLICK
document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        if (navLinks) navLinks.classList.remove("active");
    });
});

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach(function (el) {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ACTIVE NAV LINK
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav-links a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.add("active");
    }
});

// CONTACT FORM
function sendContactForm() {
    const name = document.getElementById("contactName");
    const phone = document.getElementById("contactPhone");
    const message = document.getElementById("contactMessage");

    if (!name || !phone || !message) return;

    if (!name.value.trim()) {
        alert("Please enter your name.");
        return;
    }
    if (!phone.value.trim()) {
        alert("Please enter your phone number.");
        return;
    }
    if (!message.value.trim()) {
        alert("Please enter your message.");
        return;
    }

    document.getElementById("contactFormWrapper").style.display = "none";
    document.getElementById("contactSuccess").style.display = "block";
}

// RESERVATION FORM
function sendReservation() {
    emailjs.init("NeUue__k7rbn7JL5e");

    const name = document.getElementById("resName");
    const phone = document.getElementById("resPhone");
    const date = document.getElementById("resDate");
    const time = document.getElementById("resTime");
    const guests = document.getElementById("resGuests");
    const special = document.getElementById("resSpecial");

    if (!name || !phone || !date || !time || !guests) return;

    if (!name.value.trim()) {
        alert("Please enter your name.");
        return;
    }
    if (!phone.value.trim()) {
        alert("Please enter your phone number.");
        return;
    }
    if (!date.value) {
        alert("Please select a date.");
        return;
    }
    if (!time.value) {
        alert("Please select a time.");
        return;
    }
    if (!guests.value) {
        alert("Please select number of guests.");
        return;
    }

    const ownerParams = {
        customer_name: name.value,
        customer_phone: phone.value,
        reservation_date: date.value,
        reservation_time: time.value,
        guests: guests.value,
        special_request: special.value || "None"
    };

    const customerParams = {
        customer_name: name.value,
        customer_phone: phone.value,
        reservation_date: date.value,
        reservation_time: time.value,
        guests: guests.value
    };

    emailjs.send("service_99k4iig", "template_xeiac2b", ownerParams)
        .then(function () {
            return emailjs.send("service_99k4iig", "template_n1ogb2r", customerParams);
        })
        .then(function () {
            document.getElementById("reservationFormWrapper").style.display = "none";
            document.getElementById("reservationSuccess").style.display = "block";
        })
        .catch(function (error) {
            console.error("EmailJS error:", error);
            document.getElementById("reservationFormWrapper").style.display = "none";
            document.getElementById("reservationSuccess").style.display = "block";
        });
}