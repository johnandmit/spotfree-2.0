// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        hamburger.innerHTML = mobileNav.classList.contains('open') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
}

// Scroll animations
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => observer.observe(el));

// Header scroll shadow
window.addEventListener('scroll', () => {
    const header = document.getElementById('site-header');
    if (header) {
        header.style.boxShadow = window.scrollY > 50 ? '0 2px 12px rgba(0,0,0,0.08)' : 'none';
    }
});

// ═══════════════ AI CHAT WIDGET INJECTION ═══════════════ //
document.addEventListener('DOMContentLoaded', () => {
    // 1. Determine the correct relative path to soap-chat.html
    let pathToChat = 'soap-chat.html';
    const path = window.location.pathname;
    if (path.includes('/about/') || 
        path.includes('/services/') || 
        path.includes('/bookings/') || 
        path.includes('/contact/')) {
        pathToChat = '../soap-chat.html';
    }

    // 2. Create the floating button
    const chatBtn = document.createElement('div');
    chatBtn.className = 'floating-chat-btn';
    chatBtn.innerHTML = '🫧'; // Soap bubble emoji
    document.body.appendChild(chatBtn);

    // 3. Create the modal overlay
    const modal = document.createElement('div');
    modal.className = 'chat-modal-overlay';
    modal.innerHTML = `
        <div class="chat-modal-close">✕</div>
        <div class="chat-modal-content">
            <iframe class="chat-modal-iframe" src="${pathToChat}"></iframe>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.chat-modal-close');

    // 4. Attach event listeners
    chatBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // 5. Intercept all "Get a Free Quote" CTA buttons (header, mobile, banner)
    document.querySelectorAll('.header-cta, .mobile-cta, .btn-white, .btn-primary').forEach(btn => {
        if (btn.textContent.trim().toLowerCase().includes('free quote')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const iframe = modal.querySelector('.chat-modal-iframe');
                iframe.src = pathToChat + '#auto_quote';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });
});
