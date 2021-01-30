const navbar = document.querySelector(".navbar");
const navicon = document.querySelector(".navbar__navicon");
const mobileMenu = document.querySelector("#mobile-menu");
const overlay = document.querySelector(".overlay");
const footerLogo = document.querySelector(".footer__logo");
let screenWidth = window.innerWidth;

navicon.addEventListener("click", toggleMobileNav);

footerLogo.addEventListener("click", e => {
    e.preventDefault();
    smoothScroll(".navbar");
});

window.addEventListener("resize", () => {
    if (screenWidth != window.innerWidth) {
        screenWidth = window.innerWidth;

        if (screenWidth > 768) {
            ariaExpandedFalse(navicon);
            inactiveMobileNav();
            enableScrolling();
        }
    }
})

function toggleMobileNav() {
    const isOpen = navicon.getAttribute("aria-expanded");

    if (isOpen == "false") {
        ariaExpandedTrue(navicon);
        activeMobileNav();
        disableScrolling();
    } else {
        ariaExpandedFalse(navicon);
        inactiveMobileNav();
        enableScrolling();
    }
}

function activeMobileNav (){
    navbar.classList.add("navbar--active");
    overlay.classList.add("overlay--active");
} 

function inactiveMobileNav (){
    navbar.classList.remove("navbar--active");
    overlay.classList.remove("overlay--active");
}

function smoothScroll(target) {
    const targetSection = document.querySelector(target);
    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime;
    let duration = 500;

    function animation(currentTime) {
        if (startTime === undefined) startTime = currentTime;

        const timeElapsed = currentTime - startTime;
        let animate = ease(timeElapsed, startPosition, distance, duration)

        window.scrollTo(0, animate);
      
        if (timeElapsed < duration) { 
          requestAnimationFrame(animation);
        }
    }

    function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    requestAnimationFrame(animation);
}

const ariaExpandedFalse = elem => elem.setAttribute("aria-expanded", "false");

const ariaExpandedTrue = elem => elem.setAttribute("aria-expanded", "true");

const disableScrolling = () => document.body.style.position = "fixed";

const enableScrolling = () => document.body.style.position = "";