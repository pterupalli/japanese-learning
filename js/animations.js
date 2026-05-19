// Animations and Interactions for Landing Page with Landscape Parallax

// ============================================
// Landscape Parallax Scrolling Effect
// ============================================

const landscape = document.querySelector('.landscape-scene');
const clouds = document.querySelectorAll('.cloud');
const mountFuji = document.querySelector('.mount-fuji');
const mountains = document.querySelectorAll('.mountain-layer');
const fields = document.querySelectorAll('.field');
const petals = document.querySelectorAll('.petal');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const scrollFactor = scrolled * 0.5;
    
    // Sky stays fixed
    
    // Clouds move slowly
    clouds.forEach((cloud, index) => {
        const speed = 0.15 + (index * 0.05);
        cloud.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Mount Fuji moves at medium speed
    if (mountFuji) {
        mountFuji.style.transform = `translate(-50%, ${scrolled * 0.3}px)`;
    }
    
    // Distant mountains
    mountains.forEach((mountain, index) => {
        const speed = 0.2 + (index * 0.1);
        mountain.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Fields move faster (foreground)
    fields.forEach((field, index) => {
        const speed = 0.4 + (index * 0.15);
        field.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// Mouse Parallax Effect for Landscape
// ============================================

document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    
    // Move clouds slightly with mouse
    clouds.forEach((cloud, index) => {
        const depth = 5 + (index * 2);
        const moveX = mouseX * depth;
        const moveY = mouseY * depth;
        cloud.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    // Move Mount Fuji subtly
    if (mountFuji) {
        const moveX = mouseX * 15;
        const moveY = mouseY * 15;
        mountFuji.style.transform = `translate(calc(-50% + ${moveX}px), ${moveY}px)`;
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateX(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

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

// ============================================
// Navbar Scroll Effect
// ============================================

let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
    } else {
        nav.style.boxShadow = '';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Feature Card Tilt Effect
// ============================================

const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.1s ease';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'transform 0.3s ease';
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// Loading Animation
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Add ripple effect to buttons
// ============================================

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');
    
    const rippleElement = button.getElementsByClassName('ripple')[0];
    if (rippleElement) {
        rippleElement.remove();
    }
    
    button.appendChild(ripple);
}

const buttons = document.querySelectorAll('.btn-primary, .btn-hero');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-hero {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
