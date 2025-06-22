// Main JavaScript file for InProKom website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.header__nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Check if it's an internal link for smooth scrolling
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // For external links, do nothing and let the browser navigate
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Button click handlers
    const primaryButtons = document.querySelectorAll('.btn--primary');
    
    primaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle different button actions
            const buttonText = this.textContent.trim();
            
            if (buttonText === 'Начать проект') {
                // Scroll to contact section or open modal
                const ctaSection = document.querySelector('.cta');
                if (ctaSection) {
                    ctaSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else if (buttonText === 'Связаться с нами') {
                // Open contact modal or redirect
                alert('Форма связи будет добавлена позже');
            }
        });
    });

    // Secondary button handlers
    const secondaryButtons = document.querySelectorAll('.btn--secondary');
    
    secondaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Scroll to about section
            const aboutSection = document.querySelector('.about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Phone number click handler
    const phoneLinks = document.querySelectorAll('.header__phone, .footer__link[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click feedback
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '';
            }, 200);
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .stat, .about__img');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Feature cards hover effect enhancement
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat__number');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 30);
    };

    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const text = numberElement.textContent;
                const target = parseInt(text.replace('+', ''));
                
                animateCounter(numberElement, target);
                statsObserver.unobserve(numberElement);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const header = document.querySelector('.header');
        const nav = document.querySelector('.header__nav');
        
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-menu-toggle';
            toggle.innerHTML = '<span></span><span></span><span></span>';
            toggle.style.display = 'none';
            
            header.querySelector('.header__content').appendChild(toggle);
            
            toggle.addEventListener('click', function() {
                nav.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    
    // Handle window resize
    window.addEventListener('resize', createMobileMenu);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Form validation (for future forms)
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    };

    // Export functions for global use
    window.InProKom = {
        validateForm,
        animateCounter
    };

    // Slider Logic
    const slider = document.querySelector('.vacancies__slider');
    if (slider) {
        const track = slider.querySelector('.slider__track');
        const items = Array.from(track.children);
        const nextButton = slider.querySelector('.slider__arrow--next');
        const prevButton = slider.querySelector('.slider__arrow--prev');
        
        if (track && items.length > 0 && nextButton && prevButton) {
            let currentIndex = 0;
            let itemWidth = 0;

            const setupSlider = () => {
                const visibleItems = getVisibleItems();
                itemWidth = slider.querySelector('.slider__track-container').getBoundingClientRect().width / visibleItems;
                
                // Clear old clones
                const clones = track.querySelectorAll('.clone');
                clones.forEach(clone => clone.remove());
                
                // Clone items for infinite loop effect
                const itemsToPrepend = items.slice(items.length - visibleItems).map(item => {
                    const clone = item.cloneNode(true);
                    clone.classList.add('clone');
                    return clone;
                });
                const itemsToAppend = items.slice(0, visibleItems).map(item => {
                    const clone = item.cloneNode(true);
                    clone.classList.add('clone');
                    return clone;
                });
                
                track.append(...itemsToAppend);
                track.prepend(...itemsToPrepend);
                
                updateSliderPosition(false);
            };

            const getVisibleItems = () => {
                return 1; // Always show 1 item
            }

            const updateSliderPosition = (transition = true) => {
                track.style.transition = transition ? 'transform 0.5s ease-in-out' : 'none';
                const offset = (items.length > getVisibleItems()) ? getVisibleItems() : 0;
                track.style.transform = `translateX(-${(currentIndex + offset) * itemWidth}px)`;
            };

            const handleTransitionEnd = () => {
                if (currentIndex >= items.length) {
                    currentIndex = 0;
                    updateSliderPosition(false);
                }
                if (currentIndex < 0) {
                    currentIndex = items.length - 1;
                    updateSliderPosition(false);
                }
            }

            nextButton.addEventListener('click', () => {
                currentIndex++;
                updateSliderPosition();
            });

            prevButton.addEventListener('click', () => {
                currentIndex--;
                updateSliderPosition();
            });
            
            track.addEventListener('transitionend', handleTransitionEnd);
            
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    setupSlider();
                }, 250);
            });

            setupSlider();
        }
    }

    // Mobile Menu Logic
    const menuToggle = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.header__nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('header__nav--open');
            menuToggle.classList.toggle('header__menu-toggle--open');
            document.body.classList.toggle('no-scroll');
        });
    }
});

// Utility functions
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

// Performance optimization
const optimizedScrollHandler = debounce(function() {
    // Handle scroll events efficiently
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

function goToContacts() {
    window.location.href = 'contacts.html';
}
function goToServices() {
    window.location.href = 'uslugi.html';
} 