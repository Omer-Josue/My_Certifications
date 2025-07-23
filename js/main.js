// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const newsletterPopup = document.getElementById('newsletter-popup');
const popupClose = document.getElementById('popup-close');
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');
const popupNewsletterForm = document.getElementById('popup-newsletter-form');

// Mobile Navigation
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// Newsletter Popup
let popupShown = false;

const showNewsletterPopup = () => {
    if (!popupShown && newsletterPopup) {
        setTimeout(() => {
            newsletterPopup.classList.add('show');
            popupShown = true;
            localStorage.setItem('newsletterPopupShown', 'true');
        }, 10000); // Show after 10 seconds
    }
};

const hideNewsletterPopup = () => {
    if (newsletterPopup) {
        newsletterPopup.classList.remove('show');
    }
};

// Check if popup was already shown
if (localStorage.getItem('newsletterPopupShown') !== 'true') {
    showNewsletterPopup();
} else {
    popupShown = true;
}

// Close popup events
popupClose?.addEventListener('click', hideNewsletterPopup);

newsletterPopup?.addEventListener('click', (e) => {
    if (e.target === newsletterPopup) {
        hideNewsletterPopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideNewsletterPopup();
    }
});

// Product Category Filtering
const categoryButtons = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter products
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// AI Tools Category Filtering
const toolCategoryButtons = document.querySelectorAll('.tool-category-btn');
const toolCards = document.querySelectorAll('.tool-card');

toolCategoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Update active button
        toolCategoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter tools
        toolCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Form Handling
const handleFormSubmission = (form, successMessage) => {
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success message
            showNotification(successMessage, 'success');
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Hide popup if it's the newsletter popup form
            if (form.id === 'popup-newsletter-form') {
                hideNewsletterPopup();
            }
            
            console.log('Form submitted:', data);
        }, 2000);
    });
};

// Initialize form handlers
handleFormSubmission(contactForm, 'Thank you! Your message has been sent successfully.');
handleFormSubmission(newsletterForm, 'Thank you for subscribing to our newsletter!');
handleFormSubmission(popupNewsletterForm, 'Thank you for subscribing! Check your email for your free AI guide.');

// Notification System
const showNotification = (message, type = 'info') => {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
        color: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '10001',
        maxWidth: '400px',
        animation: 'slideInRight 0.3s ease-out',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    });
    
    // Add notification to DOM
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
};

// Add notification animations to CSS
const notificationStyles = `
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
        gap: 12px;
        width: 100%;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Learn More Tool Function
window.learnMore = (toolName) => {
    const toolInfo = {
        chatgpt: {
            title: 'ChatGPT',
            description: 'ChatGPT is an advanced AI language model that can help you with content creation, coding, problem-solving, and much more. Perfect for automating writing tasks and getting intelligent responses.',
            features: ['Natural language processing', 'Code generation', 'Content creation', 'Problem solving', 'Multiple languages'],
            pricing: 'Free tier available, ChatGPT Plus for $20/month',
            url: 'https://chat.openai.com'
        },
        midjourney: {
            title: 'Midjourney',
            description: 'Midjourney is a powerful AI image generator that creates stunning artwork from text prompts. Ideal for creating unique visuals for your business, social media, or creative projects.',
            features: ['Text-to-image generation', 'Multiple art styles', 'High-resolution outputs', 'Community gallery', 'Commercial usage rights'],
            pricing: 'Starting at $10/month for basic plan',
            url: 'https://midjourney.com'
        },
        copyai: {
            title: 'Copy.ai',
            description: 'Copy.ai is an AI-powered copywriting tool that helps you create marketing copy, social media posts, emails, and more in seconds. Perfect for marketers and entrepreneurs.',
            features: ['Marketing copy generation', 'Social media content', 'Email templates', 'Blog post ideas', 'Multiple languages'],
            pricing: 'Free tier available, Pro plans starting at $36/month',
            url: 'https://copy.ai'
        },
        notion: {
            title: 'Notion AI',
            description: 'Notion AI enhances your workspace with intelligent writing assistance, helping you create, edit, and organize content more efficiently within your Notion pages.',
            features: ['AI writing assistant', 'Content organization', 'Task automation', 'Template generation', 'Team collaboration'],
            pricing: 'Add-on to Notion plans for $8/month per user',
            url: 'https://notion.so'
        }
    };
    
    const tool = toolInfo[toolName];
    if (!tool) return;
    
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>${tool.title}</h3>
                <p class="tool-modal-description">${tool.description}</p>
                <div class="tool-modal-features">
                    <h4>Key Features:</h4>
                    <ul>
                        ${tool.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="tool-modal-pricing">
                    <h4>Pricing:</h4>
                    <p>${tool.pricing}</p>
                </div>
                <div class="tool-modal-actions">
                    <a href="${tool.url}" target="_blank" class="btn btn-primary">Try ${tool.title}</a>
                    <button class="btn btn-outline modal-close-btn">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '10002',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
    });
    
    const backdrop = modal.querySelector('.modal-backdrop');
    Object.assign(backdrop.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
    });
    
    const content = modal.querySelector('.modal-content');
    Object.assign(content.style, {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        maxHeight: '80vh',
        overflowY: 'auto'
    });
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = () => modal.remove();
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
    });
    
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
};

// Intersection Observer for Animations
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
    const animatedElements = document.querySelectorAll('.product-card, .tool-card, .testimonial-card, .blog-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Testimonial Slider (Auto-rotate testimonials)
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

if (testimonialCards.length > 3) {
    const rotateTestimonials = () => {
        testimonialCards.forEach((card, index) => {
            card.style.display = index >= currentTestimonial && index < currentTestimonial + 3 ? 'block' : 'none';
        });
        
        currentTestimonial = (currentTestimonial + 1) % (testimonialCards.length - 2);
    };
    
    // Auto-rotate every 5 seconds
    setInterval(rotateTestimonials, 5000);
}

// Product Search Functionality
const addProductSearch = () => {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search products...';
    searchInput.className = 'product-search';
    
    Object.assign(searchInput.style, {
        width: '100%',
        maxWidth: '400px',
        padding: '12px 16px',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '16px',
        marginBottom: '24px'
    });
    
    const productCategories = document.querySelector('.product-categories');
    if (productCategories) {
        productCategories.parentNode.insertBefore(searchInput, productCategories);
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            productCards.forEach(card => {
                const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.product-description')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
};

// Initialize product search
addProductSearch();

// Lazy Loading for Images
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Scroll to Top Button
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    
    Object.assign(button.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#1e3d94',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });
    
    document.body.appendChild(button);
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
};

// Initialize scroll to top button
createScrollToTopButton();

// Performance Optimization - Debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

console.log('Royal Data website loaded successfully! 🚀');