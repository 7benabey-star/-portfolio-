// Typewriter Effect
const words = ["creative computing","UI/UX","Tech Enthusiast","Problem Solver"];
let currentWordIndex = 0;
let isDeleting = false;
let typeTimer;
let charIndex = 0;

function typeWriter() {
    const heading = document.getElementById("typewriter");
    if (!heading) return;

    const word = words[currentWordIndex];
    
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    heading.innerText = word.substring(0, charIndex);

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === word.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    typeTimer = setTimeout(typeWriter, typeSpeed);
}

// Scroll Reveal Animation
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-menu-btn');
    const links = document.querySelectorAll('.mobile-link');

    if (!btn || !menu) return;

    function toggleMenu() {
        const isClosed = menu.classList.contains('translate-x-full');
        if (isClosed) {
            menu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        } else {
            menu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        }
    }

    btn.addEventListener('click', toggleMenu);
    if(closeBtn) closeBtn.addEventListener('click', toggleMenu);
    links.forEach(link => link.addEventListener('click', toggleMenu));
}

// Navbar Scroll Effect
function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dark-900/90', 'shadow-lg', 'backdrop-blur-md');
            navbar.classList.remove('py-6');
            navbar.classList.add('py-4');
        } else {
            navbar.classList.remove('bg-dark-900/90', 'shadow-lg', 'backdrop-blur-md');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-6');
        }
    });
}

// Contact Form Handling
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    if (!form || !toast) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button');
        const originalContent = btn.innerHTML;
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        // Send data using FormSubmit API
        fetch("https://formsubmit.co/ajax/7benabey@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            // Reset form
            form.reset();
            btn.innerHTML = originalContent;
            btn.disabled = false;

            // Show toast
            toast.classList.remove('translate-y-24');
            setTimeout(() => {
                toast.classList.add('translate-y-24');
            }, 3000);
        })
        .catch(error => {
            console.error(error);
            btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error Sending';
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
            }, 3000);
        });
    });
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    setupIntersectionObserver();
    setupMobileMenu();
    setupNavbarScroll();
    setupContactForm();
});
