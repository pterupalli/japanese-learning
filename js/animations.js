// ============================================================
// ANIMATIONS.JS — Landing page interactions
// ============================================================

// ── Element refs ──────────────────────────────────────────────

const clouds    = document.querySelectorAll('.cloud');
const mountFuji = document.querySelector('.mount-fuji');
const mountains = document.querySelectorAll('.mountain-layer');
const fields    = document.querySelectorAll('.field');

// ── Scroll parallax — rAF throttled ──────────────────────────
// Running transform calculations on every scroll event causes
// layout thrashing. Using rAF ensures we only paint once per frame.

let scrollY    = 0;
let scrollRafId = null;

window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset;
    if (!scrollRafId) {
        scrollRafId = requestAnimationFrame(_applyScrollParallax);
    }
}, { passive: true });

function _applyScrollParallax() {
    scrollRafId = null;

    clouds.forEach((cloud, i) => {
        cloud.style.transform = `translateY(${scrollY * (0.15 + i * 0.05)}px)`;
    });

    if (mountFuji) {
        mountFuji.style.transform = `translate(-50%, ${scrollY * 0.3}px)`;
    }

    mountains.forEach((m, i) => {
        m.style.transform = `translateY(${scrollY * (0.2 + i * 0.1)}px)`;
    });

    fields.forEach((f, i) => {
        f.style.transform = `translateY(${scrollY * (0.4 + i * 0.15)}px)`;
    });
}

// ── Mouse parallax — rAF throttled ───────────────────────────

let mouseX = 0, mouseY = 0;
let mouseRafId = null;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    if (!mouseRafId) {
        mouseRafId = requestAnimationFrame(_applyMouseParallax);
    }
}, { passive: true });

function _applyMouseParallax() {
    mouseRafId = null;

    clouds.forEach((cloud, i) => {
        const d = 5 + i * 2;
        cloud.style.transform = `translate(${mouseX * d}px, ${mouseY * d}px)`;
    });

    if (mountFuji) {
        mountFuji.style.transform = `translate(calc(-50% + ${mouseX * 15}px), ${mouseY * 15}px)`;
    }
}

// ── Intersection observer — scroll-in animations ─────────────

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0) translateX(0)';
            observer.unobserve(entry.target); // stop watching once visible
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
});

// ── Smooth anchor scrolling ───────────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(a.getAttribute('href'))
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ── Navbar shadow on scroll ───────────────────────────────────

const nav = document.querySelector('.nav');
if (nav) {
    window.addEventListener('scroll', () => {
        nav.style.boxShadow = window.pageYOffset > 100
            ? '0 4px 12px rgba(0,0,0,0.08)'
            : '';
    }, { passive: true });
}

// ── Feature card 3-D tilt ─────────────────────────────────────

document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const rotX = ((e.clientY - top)  - height / 2) / 20;
        const rotY = (width / 2 - (e.clientX - left)) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.3s ease';
        card.style.transform  = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ── Button ripple effect ──────────────────────────────────────

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn-primary, .btn-hero { position: relative; overflow: hidden; }
    .ripple {
        position: absolute; border-radius: 50%;
        background: rgba(255,255,255,0.5);
        transform: scale(0); pointer-events: none;
        animation: ripple-anim 0.6s ease-out forwards;
    }
    @keyframes ripple-anim { to { transform: scale(4); opacity: 0; } }
`;
document.head.appendChild(rippleStyle);

document.querySelectorAll('.btn-primary, .btn-hero').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const existing = btn.querySelector('.ripple');
        if (existing) existing.remove();

        const diameter = Math.max(btn.clientWidth, btn.clientHeight);
        const ripple   = document.createElement('span');
        ripple.className  = 'ripple';
        ripple.style.cssText = [
            `width:${diameter}px`,
            `height:${diameter}px`,
            `left:${e.clientX - btn.offsetLeft - diameter / 2}px`,
            `top:${e.clientY - btn.offsetTop  - diameter / 2}px`
        ].join(';');
        btn.appendChild(ripple);
    });
});

// ── Page fade-in ──────────────────────────────────────────────

window.addEventListener('load', () => {
    document.body.style.opacity    = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    // Use rAF to ensure the initial opacity:0 has been painted before fading in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => { document.body.style.opacity = '1'; });
    });
});
