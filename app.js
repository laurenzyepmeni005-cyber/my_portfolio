const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navigation a');
const menuIcon = document.querySelector('#menu-burger'); 
const nav = document.querySelector('.navigation');

// --- Menu burger section---
const burgerActive = () => {
    menuIcon.classList.toggle('bx-x');
    nav.classList.toggle('active');
};

menuIcon.addEventListener('click', burgerActive);

// --- Highlight  Navigation---
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; 
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                // links for the id
                document.querySelector('.navigation a[href*=' + id + ']').classList.add('active');
            })
        }
    })

    // Optionnel : Adding  "sticky" for scrollling classe
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // close Menu burger when we scrolling
    menuIcon.classList.remove('bx-x');
    nav.classList.remove('active');
}

ScrollReveal({
    reset: true,
    distance :'80 px',
    duration : 2000,
    delay:200,
});



ScrollReveal().reveal ('.home-content,.section-title',{origin:'top'})
ScrollReveal().reveal ('.home-img,.service-content,.portfolio-box,.contact-form',{origin:'bottom'})
ScrollReveal().reveal ('.home-content h3,.about-img',{origin:'left'})
ScrollReveal().reveal ('.home-content p,.about-content',{origin:'right'})

// --- Animation of  the Text ( type.js)
const typed = new Typed('.multiple', {
    strings: [" Web developer", "Web Designer", "Freelancer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})



