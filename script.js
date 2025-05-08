// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Carousel functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-inner img');
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    document.querySelector('.next').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    // Product card interactions
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.product-details').classList.remove('hidden');
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.product-details').classList.add('hidden');
        });

        // Add to cart animation
        card.querySelector('.add-to-cart').addEventListener('click', function() {
            this.textContent = 'Added! 🎉';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
            }, 2000);
        });
    });

    // Secret feature (long press)
    let pressTimer;
    const secretTrigger = document.getElementById('secretTrigger');
    
    secretTrigger.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            document.querySelector('.tech-fact').classList.remove('hidden');
        }, 2000);
    });

    secretTrigger.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 's' && !e.target.matches('input')) {
            document.getElementById('searchInput').focus();
        }
    });

    // Form validation with real-time feedback
    const form = document.getElementById('newsletterForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Thanks for joining! Welcome to the tech family 🚀');
            form.reset();
        }
    });

    function validateForm() {
        let isValid = true;
        const name = document.getElementById('userName');
        const email = document.getElementById('userEmail');
        const password = document.getElementById('userPass');

        // Name validation
        if (name.value.trim() === '') {
            showError(name, 'name-error', 'Name is required');
            isValid = false;
        } else {
            clearError('name-error');
        }

        // Email validation
        if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email.value)) {
            showError(email, 'email-error', 'Valid email required');
            isValid = false;
        } else {
            clearError('email-error');
        }

        // Password validation
        if (password.value.length < 8) {
            showError(password, 'pass-error', 'Minimum 8 characters');
            isValid = false;
        } else {
            clearError('pass-error');
        }

        return isValid;
    }

    function showError(input, errorId, message) {
        document.querySelector(`.${errorId}`).textContent = message;
        input.classList.add('error');
    }

    function clearError(errorId) {
        document.querySelector(`.${errorId}`).textContent = '';
        document.getElementById(errorId.replace('-error', '')).classList.remove('error');
    }
});