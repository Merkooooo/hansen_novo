async function loadServices() {
    try {
        const response = await fetch('data/services.json');
        if (!response.ok) throw new Error('Failed to load services');
        const services = await response.json();

        const grid = document.getElementById('services-grid');
        if (!grid) return; // Not on home page

        grid.innerHTML = ''; // Clear fallback content

        services.forEach((service, index) => {
            const card = document.createElement('div');
            card.className = 'service-card fade-up';
            card.style.transitionDelay = `${(index + 1) * 0.1}s`; // Staggered delay logic manually applied or handled by CSS if dynamic

            // Map standard icons (simplified for demo)
            let iconClass = 'fas fa-cogs';
            if (service.icon === 'wind') iconClass = 'fas fa-wind';
            if (service.icon === 'fan') iconClass = 'fas fa-fan';
            if (service.icon === 'tools') iconClass = 'fas fa-tools';

            card.innerHTML = `
                <div class="icon-box"><i class="${iconClass}"></i></div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <a href="products.html?id=${service.id}" class="link-arrow">Več o tem &rarr;</a>
            `;

            grid.appendChild(card);

            // Observe the new element for animation
            // Note: In a real app we might need to re-trigger observer or use MutationObserver
            // For now, we assume observer is initialized AFTER this runs or we manualy observe
            // Use a slight helper or global observer
            if (window.intersectionObserverInstance) {
                window.intersectionObserverInstance.observe(card);
            } else {
                // Fallback: just make it visible immediately if observer system not ready
                setTimeout(() => card.classList.add('visible'), 100 + (index * 100));
            }
        });

    } catch (error) {
        console.error('Error loading services:', error);
        // Fallback content remains if error
    }
}

document.addEventListener('DOMContentLoaded', loadServices);
