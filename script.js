document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- Navbar Background on Scroll ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(6, 11, 19, 0.95)';
            navbar.style.padding = '0.8rem 0';
        } else {
            navbar.style.background = 'rgba(6, 11, 19, 0.8)';
            navbar.style.padding = '1.2rem 0';
        }
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS animations
                entry.target.classList.add('visible');
                
                // If the element contains skill bars, animate their widths
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                if(skillBars.length > 0) {
                    skillBars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }
                
                // Unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with .animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // Handle Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real scenario, you'd handle API call here
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                btn.style.backgroundColor = '#10b981'; // Success green
                btn.style.opacity = '1';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

});
