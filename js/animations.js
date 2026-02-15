document.addEventListener('DOMContentLoaded', () => {
    // --- Intersection Observer for Fade Up ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    window.fadeObserver = observer; // Expose globally

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // --- Parallax Effect for Hero ---
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight) {
            const speed = 0.5;
            hero.style.backgroundPositionY = `${window.scrollY * speed}px`;
        }
    });
});
