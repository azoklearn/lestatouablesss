// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.setAttribute('aria-label', 'Ouvrir le menu');
hamburger.setAttribute('aria-expanded', 'false');
hamburger.setAttribute('aria-controls', 'menu');

hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    hamburger.setAttribute('aria-label', isActive ? 'Fermer le menu' : 'Ouvrir le menu');
});

// Close menu only when clicking on a leaf link (sans sous-menu) ou un lien de sous-menu
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const li = link.parentElement;
        const hasDirectSubmenu = li && li.querySelector(':scope > .nav-submenu');
        if (hasDirectSubmenu) {
            // Parent avec sous-menu: ne pas fermer ici (le toggle gère l'ouverture)
            return;
        }
        // Lien de sous-menu ou lien simple: fermer le panneau
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Ouvrir le menu');
    });
});

// Toggle sous-menus dans le panneau hamburger (tous écrans)
document.querySelectorAll('.nav-menu > li > a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const parent = anchor.parentElement;
        const submenu = parent.querySelector('.nav-submenu');
        if (submenu) {
            e.preventDefault();
            parent.classList.toggle('is-open');
        }
    });
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 15, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Veuillez entrer une adresse email valide', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Votre message a été envoyé avec succès ! Je vous répondrai bientôt.', 'success');
    
    // Reset form
    this.reset();
    
    // In a real application, you would send the data to a server
    // For now, we'll just show a success message
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .about-text, .about-image, .contact-info, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Portfolio item hover effects
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card hover effects
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Add loading animation for images (if any are added later)
function addLoadingAnimation() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const show = () => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        };
        // Si l'image est déjà chargée (cache), afficher directement
        if (img.complete && img.naturalWidth > 0) {
            show();
            return;
        }
        // Sinon, appliquer l'animation de fade-in à la fin du chargement
        img.addEventListener('load', show, { once: true });
        img.style.opacity = '0';
        img.style.transform = 'scale(0.98)';
        img.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
}

// Initialize loading animations
addLoadingAnimation();

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Delay the typing effect to work with CSS animations
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 500);
    }
    
});

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    // In a real application, you would send this data to your analytics service
    console.log(`Tracked: ${action} on ${element}`);
}

// Add click tracking to important elements
document.querySelectorAll('.btn, .nav-link, .portfolio-item, .service-card').forEach(element => {
    element.addEventListener('click', (e) => {
        trackClick(e.target, 'click');
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close any open notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #667eea';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ============================
// Flash (localStorage) — lecture + filtre
// ============================
const FLASH_KEY = 'flashItems';

function readFlashItems(){
    try{
        const raw = localStorage.getItem(FLASH_KEY);
        if(!raw){ return []; }
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr : [];
    }catch(e){
        console.error('Erreur de lecture flashItems', e);
        return [];
    }
}

function renderFlashList(items){
    const grid = document.getElementById('flash-grid');
    const tpl = document.getElementById('flash-card-template');
    if(!grid || !tpl) return;
    grid.innerHTML = '';
    if(!items || items.length === 0){
        const empty = document.createElement('div');
        empty.className = 'flash-empty';
        empty.textContent = 'Aucun flash pour le moment. Ajoutez-en via la page Admin.';
        grid.appendChild(empty);
        return;
    }
    items.forEach(item => {
        const node = tpl.content.cloneNode(true);
        const img = node.querySelector('.flash-img');
        const cap = node.querySelector('.flash-caption');
        img.src = item.imageData || 'https://placehold.co/600x600?text=Flash';
        img.alt = item.title || 'Tatouage flash';
        cap.textContent = item.title || '';
        grid.appendChild(node);
    });
}

function initFlash(){
    const search = document.getElementById('flash-search');
    const clear = document.getElementById('flash-clear');
    // Seed initial si vide (une seule fois)
    let items = readFlashItems();
    try{
        const seeded = localStorage.getItem('flashSeeded');
        if((!items || items.length === 0) && !seeded){
            items = [
                { id: 'seed1', title: "Flash Manga #1", tags: ['manga','couleur'], imageData: 'https://placehold.co/800x800?text=Flash+Manga+1' },
                { id: 'seed2', title: "Flash Anime #2", tags: ['anime','line'], imageData: 'https://placehold.co/800x800?text=Flash+Anime+2' },
                { id: 'seed3', title: "Pop Culture #3", tags: ['pop','culture'], imageData: 'https://placehold.co/800x800?text=Pop+Culture+3' }
            ];
            localStorage.setItem(FLASH_KEY, JSON.stringify(items));
            localStorage.setItem('flashSeeded', '1');
        }
    }catch(e){ console.warn('Seed flash ignoré:', e); }
    renderFlashList(items);

    function applyFilter(){
        const q = (search?.value || '').toLowerCase().trim();
        if(!q){ renderFlashList(items); return; }
        const filtered = items.filter(x => {
            const bucket = [x.title, ...(x.tags || [])].join(' ').toLowerCase();
            return bucket.includes(q);
        });
        renderFlashList(filtered);
    }

    search?.addEventListener('input', applyFilter);
    clear?.addEventListener('click', () => { if(search){ search.value=''; } applyFilter(); });
    window.addEventListener('storage', (ev) => {
        if(ev.key === FLASH_KEY){
            items = readFlashItems();
            applyFilter();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initFlash();
});
