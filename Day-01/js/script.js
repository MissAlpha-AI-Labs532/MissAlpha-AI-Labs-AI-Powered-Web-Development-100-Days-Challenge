// Chatbot Functionality
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.responses = {
            'hello': 'Hello! I\'m Shalini Verma, your friendly tech guide! 😊 Have a wonderful day! I\'d love to help you with any learning guidance or questions about my work. What would you like to know?',
            'hi': 'Hi there! 👋 I\'m Shalini, and I\'m excited to chat with you! Whether you\'re interested in learning programming, want to know about my projects, or just want to say hello, I\'m here for you!',
            'hey': 'Hey! 😄 Great to see you here! I\'m Shalini, and I love helping people learn and grow in tech. What\'s on your mind today?',
            'how are you': 'I\'m doing fantastic, thank you for asking! 😊 I love connecting with fellow tech enthusiasts and learners. How are you doing today?',
            'good morning': 'Good morning! ☀️ What a beautiful day to learn something new! I\'m here to help you with any questions about programming, my projects, or training programs.',
            'good afternoon': 'Good afternoon! 🌤️ Hope your day is going great! I\'m Shalini, and I\'m here to help you with anything tech-related or just have a friendly chat.',
            'good evening': 'Good evening! 🌙 Perfect time to explore some amazing tech topics! I\'m here to help you learn and grow. What would you like to know?',
            'skills': 'I specialize in Java, Spring Boot, React, Python, MERN Stack, and full-stack development! 🚀 I have expertise in building scalable, high-performance applications and training over 5000+ students in these technologies. You can see my detailed skills in the Skills section above! What interests you most?',
            'projects': 'I have 93+ GitHub repositories including FrontEnd-Batch-10th-Feb-2025, Core-Java-Programming-Batch-22ndMarch-2025, and Python-Programming-Batch-10th-June-2025! 💻 These are training repositories designed to help students master programming step-by-step. Check out the Projects section to see my work! Which technology would you like to learn?',
            'contact': 'You can reach me at shalini.verma@example.com or connect with me on LinkedIn, GitHub, YouTube, and Twitter! 📧 I\'m available for Freelance Projects, Remote Training, and Collaborative Opportunities. Feel free to use the contact form above! I\'d love to hear from you!',
            'experience': 'I\'m a Senior Software Engineer & Corporate Trainer with expertise in Java, Spring Boot, React, Python, and MERN stack! 🎓 I\'ve trained over 5000+ students and professionals through bootcamps, webinars, and mentorships. It\'s been an amazing journey helping others grow!',
            'education': 'I focus on project-based learning and building real-world applications! 📚 My training programs include Java Full Stack Training, Industry-Standard Java Technical Training, and Interview Preparation with Career Guidance. Learning should be fun and practical!',
            'training': 'I offer comprehensive training programs including Java Full Stack Training with Real-World Projects, Industry-Standard Java Technical Training, Interview Preparation & Career Guidance, and Custom Java Solutions for Startups & Enterprises! 🎯 Let\'s make learning exciting together!',
            'github': 'I have 93 repositories on GitHub with 75 followers! 🌟 My repositories include training materials for Frontend, Java, Python, C++, and MERN Stack development. You can find me at github.com/ShaliniVerma21. Feel free to explore and contribute!',
            'favorite': 'My favorite part of teaching is seeing that "aha!" moment when students finally understand a concept! 💡 I love Java and React the most - they\'re like old friends to me now. What\'s your favorite programming language?',
            'hobby': 'When I\'m not coding or teaching, I love reading tech blogs, experimenting with new frameworks, and mentoring aspiring developers! 📖 I believe in continuous learning and sharing knowledge. What do you enjoy doing in your free time?',
            'advice': 'My best advice for anyone starting in tech: "Excellence is a continuous process and not an accident." 🌟 Start with the basics, build projects, never stop learning, and don\'t be afraid to make mistakes - that\'s how we grow!',
            'motivation': 'Remember: Every expert was once a beginner! 🚀 Don\'t let imposter syndrome hold you back. Focus on progress, not perfection. You have the power to create amazing things with code!',
            'thank': 'You\'re absolutely welcome! 😊 It\'s my pleasure to help you on your learning journey. Is there anything else you\'d like to know about my work, training programs, or how we can collaborate?',
            'bye': 'Goodbye! 👋 It was wonderful chatting with you! Feel free to come back if you have more questions. Remember: "Excellence is a continuous process and not an accident." Have a fantastic day ahead!',
            'default': 'Hello there! 😊 I\'m Shalini Verma, your friendly tech guide and mentor. I\'m here to help! You can ask me about my skills, projects, training programs, experience, or just have a friendly chat. What would you like to know?'
        };
        this.init();
    }

    init() {
        this.bindEvents();
        this.hideNotification();
    }

    bindEvents() {
        const toggle = document.getElementById('chatbotToggle');
        const close = document.getElementById('chatbotClose');
        const send = document.getElementById('chatbotSend');
        const input = document.getElementById('chatbotInput');
        const suggestions = document.querySelectorAll('.suggestion-btn');

        if (toggle) {
            toggle.addEventListener('click', () => this.toggleChat());
        }

        if (close) {
            close.addEventListener('click', () => this.closeChat());
        }

        if (send) {
            send.addEventListener('click', () => this.sendMessage());
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        suggestions.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.getAttribute('data-message');
                this.addUserMessage(message);
                this.processMessage(message);
            });
        });
    }

    toggleChat() {
        const container = document.getElementById('chatbotContainer');
        if (container) {
            this.isOpen = !this.isOpen;
            container.classList.toggle('active', this.isOpen);
            this.hideNotification();
            
            if (this.isOpen) {
                this.scrollToBottom();
            }
        }
    }

    closeChat() {
        const container = document.getElementById('chatbotContainer');
        if (container) {
            this.isOpen = false;
            container.classList.remove('active');
        }
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        if (input && input.value.trim()) {
            const message = input.value.trim();
            this.addUserMessage(message);
            this.processMessage(message);
            input.value = '';
        }
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (messagesContainer) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message user-message';
            messageDiv.innerHTML = `
                <div class="message-content">
                    <i class="fas fa-user"></i>
                    <p>${this.escapeHtml(message)}</p>
                </div>
                <div class="message-time">${this.getCurrentTime()}</div>
            `;
            messagesContainer.appendChild(messageDiv);
            this.scrollToBottom();
        }
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (messagesContainer) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot-message';
            messageDiv.innerHTML = `
                <div class="message-content">
                    <i class="fas fa-robot"></i>
                    <p>${this.escapeHtml(message)}</p>
                </div>
                <div class="message-time">${this.getCurrentTime()}</div>
            `;
            messagesContainer.appendChild(messageDiv);
            this.scrollToBottom();
        }
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (messagesContainer) {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing-indicator';
            typingDiv.id = 'typing-indicator';
            typingDiv.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            messagesContainer.appendChild(typingDiv);
            this.scrollToBottom();
        }
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = this.responses.default;

        // Check for friendly greetings and casual conversation
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            response = this.responses.hello;
        } else if (lowerMessage.includes('how are you') || lowerMessage.includes('how r u')) {
            response = this.responses['how are you'];
        } else if (lowerMessage.includes('good morning')) {
            response = this.responses['good morning'];
        } else if (lowerMessage.includes('good afternoon')) {
            response = this.responses['good afternoon'];
        } else if (lowerMessage.includes('good evening')) {
            response = this.responses['good evening'];
        } else if (lowerMessage.includes('favorite') || lowerMessage.includes('favourite')) {
            response = this.responses.favorite;
        } else if (lowerMessage.includes('hobby') || lowerMessage.includes('hobbies') || lowerMessage.includes('free time')) {
            response = this.responses.hobby;
        } else if (lowerMessage.includes('advice') || lowerMessage.includes('tip') || lowerMessage.includes('suggestion')) {
            response = this.responses.advice;
        } else if (lowerMessage.includes('motivation') || lowerMessage.includes('motivate') || lowerMessage.includes('inspire')) {
            response = this.responses.motivation;
        }
        // Check for professional topics
        else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
            response = this.responses.skills;
        } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
            response = this.responses.projects;
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
            response = this.responses.contact;
        } else if (lowerMessage.includes('experience') || lowerMessage.includes('years') || lowerMessage.includes('background')) {
            response = this.responses.experience;
        } else if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('study')) {
            response = this.responses.education;
        } else if (lowerMessage.includes('training') || lowerMessage.includes('teach') || lowerMessage.includes('mentor')) {
            response = this.responses.training;
        } else if (lowerMessage.includes('github') || lowerMessage.includes('repo')) {
            response = this.responses.github;
        } else if (lowerMessage.includes('thank')) {
            response = this.responses.thank;
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            response = this.responses.bye;
        }

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate typing delay
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addBotMessage(response);
        }, 1000 + Math.random() * 1000);
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    hideNotification() {
        const notification = document.getElementById('chatNotification');
        if (notification) {
            notification.style.display = 'none';
        }
    }

    showNotification() {
        const notification = document.getElementById('chatNotification');
        if (notification) {
            notification.style.display = 'flex';
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new Chatbot();
    
    // Show notification after 5 seconds if chat is not opened
    setTimeout(() => {
        if (!chatbot.isOpen) {
            chatbot.showNotification();
        }
    }, 5000);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.section-title, .about-content, .skills-grid, .projects-grid, .contact-content, .stat-item, .skill-item, .project-card');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Typing effect for hero title
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
window.addEventListener('load', () => {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const originalText = heroName.textContent;
        setTimeout(() => {
            typeWriter(heroName, originalText, 150);
        }, 1000);
    }
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards parallax effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation
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
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const profileCard = document.querySelector('.profile-card');
    
    if (hero && profileCard) {
        const rate = scrolled * -0.5;
        profileCard.style.transform = `translateY(${rate}px)`;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Floating elements animation enhancement
document.querySelectorAll('.floating-icon').forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.5}s`;
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Cursor trail effect
let mouseX = 0;
let mouseY = 0;
let cursorTrail = [];

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create cursor trail element
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${mouseX - 3}px;
        top: ${mouseY - 3}px;
        opacity: 0.7;
        transition: all 0.1s ease;
    `;
    
    document.body.appendChild(trail);
    cursorTrail.push(trail);
    
    // Remove trail elements after animation
    setTimeout(() => {
        if (trail.parentNode) {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.remove();
                }
            }, 100);
        }
    }, 500);
    
    // Limit trail elements
    if (cursorTrail.length > 10) {
        const oldTrail = cursorTrail.shift();
        if (oldTrail && oldTrail.parentNode) {
            oldTrail.remove();
        }
    }
});

// Add some interactive hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Save preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    // On load, set theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Scroll Progress Indicator
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Animated Skill Bars
function animateSkillBars() {
    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}
window.addEventListener('DOMContentLoaded', animateSkillBars);

// Enhanced Testimonials Carousel with smooth transitions and swipe support
document.addEventListener('DOMContentLoaded', function() {
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const testimonialsCarousel = document.querySelector('.testimonials-carousel');
  let currentTestimonial = 0;
  let testimonialInterval;
  let isAnimating = false;

  function showTestimonial(index) {
    if (isAnimating) return;
    isAnimating = true;
    testimonials.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
    if (dots.length) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
    setTimeout(() => { isAnimating = false; }, 700); // match CSS transition
  }

  function startTestimonialAutoplay() {
    testimonialInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 6000);
  }
  /**
   * Stops the testimonial autoplay.
   */

  function stopTestimonialAutoplay() {
    clearInterval(testimonialInterval);
  }

  if (prevBtn && nextBtn && testimonials.length) {
    prevBtn.addEventListener('click', () => {
      if (isAnimating) return;
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
    });
    nextBtn.addEventListener('click', () => {
      if (isAnimating) return;
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    });
    showTestimonial(currentTestimonial);
    startTestimonialAutoplay();
  }

  if (dots.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        if (isAnimating) return;
        currentTestimonial = i;
        showTestimonial(currentTestimonial);
      });
    });
  }

  if (testimonialsCarousel) {
    testimonialsCarousel.addEventListener('mouseenter', stopTestimonialAutoplay);
    testimonialsCarousel.addEventListener('mouseleave', startTestimonialAutoplay);
    // Swipe support for mobile
    let startX = 0;
    testimonialsCarousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    testimonialsCarousel.addEventListener('touchend', (e) => {
      let endX = e.changedTouches[0].clientX;
      if (endX < startX - 30) {
        if (isAnimating) return;
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
      } else if (endX > startX + 30) {
        if (isAnimating) return;
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
      }
    });
  }
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can go here
}, 16)); // ~60fps

// Enhanced Skills Functionality
function initializeSkills() {
    // Add data attributes for skill levels
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const levelElement = item.querySelector('.skill-level');
        if (levelElement) {
            const level = levelElement.textContent;
            levelElement.setAttribute('data-level', level);
            
            // Add click functionality to show skill details
            item.addEventListener('click', () => {
                showSkillDetails(item);
            });
        }
    });

    // Animate skill bars on scroll
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

// Enhanced skill bar animation
function animateSkillBars() {
    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
            bar.style.setProperty('--target-width', width);
        }, index * 200);
    });
}

// Show skill details modal
function showSkillDetails(skillItem) {
    const skillName = skillItem.querySelector('span').textContent;
    const skillLevel = skillItem.querySelector('.skill-level').textContent;
    const skillIcon = skillItem.querySelector('i').className;
    
    // Create modal content
    const modalContent = `
        <div class="skill-modal">
            <div class="skill-modal-content">
                <div class="skill-modal-header">
                    <i class="${skillIcon}"></i>
                    <h3>${skillName}</h3>
                    <span class="skill-level-badge" data-level="${skillLevel}">${skillLevel}</span>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="skill-modal-body">
                    <p>${getSkillDescription(skillName)}</p>
                    <div class="skill-projects">
                        <h4>Related Projects:</h4>
                        <ul>
                            ${getSkillProjects(skillName)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    const modal = document.createElement('div');
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .skill-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .skill-modal-content {
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideIn 0.3s ease;
        }
        
        .skill-modal-header {
            padding: 30px;
            border-bottom: 1px solid #eee;
            display: flex;
            align-items: center;
            gap: 15px;
            position: relative;
        }
        
        .skill-modal-header i {
            font-size: 2rem;
            color: var(--primary-color);
        }
        
        .skill-modal-header h3 {
            margin: 0;
            font-size: 1.5rem;
            color: var(--text-primary);
        }
        
        .skill-level-badge {
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .skill-level-badge[data-level="Expert"] {
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
        }
        
        .skill-level-badge[data-level="Advanced"] {
            background: linear-gradient(135deg, #2196F3, #1976D2);
            color: white;
        }
        
        .skill-level-badge[data-level="Intermediate"] {
            background: linear-gradient(135deg, #FF9800, #F57C00);
            color: white;
        }
        
        .skill-level-badge[data-level="Basic"] {
            background: linear-gradient(135deg, #9E9E9E, #757575);
            color: white;
        }
        
        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #999;
            transition: color 0.3s ease;
        }
        
        .modal-close:hover {
            color: var(--primary-color);
        }
        
        .skill-modal-body {
            padding: 30px;
        }
        
        .skill-modal-body p {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 20px;
        }
        
        .skill-projects h4 {
            color: var(--text-primary);
            margin-bottom: 15px;
        }
        
        .skill-projects ul {
            list-style: none;
            padding: 0;
        }
        
        .skill-projects li {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            color: var(--text-secondary);
        }
        
        .skill-projects li:last-child {
            border-bottom: none;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .dark-mode .skill-modal-content {
            background: #1a1a2e;
            color: white;
        }
        
        .dark-mode .skill-modal-header {
            border-bottom-color: #333;
        }
        
        .dark-mode .skill-projects li {
            border-bottom-color: #333;
        }
    `;
    document.head.appendChild(style);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.skill-modal');
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modal.remove();
            style.remove();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            style.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Get skill descriptions
function getSkillDescription(skillName) {
    const descriptions = {
        'Java': 'Core Java programming with expertise in OOP, collections, multithreading, and enterprise development. Extensive experience with Spring Framework ecosystem.',
        'Python': 'Python programming for web development, data science, and automation. Proficient in Django, Flask, and data analysis libraries.',
        'JavaScript': 'Modern JavaScript (ES6+) for frontend and backend development. Expert in React ecosystem and Node.js.',
        'React': 'React.js development with hooks, context API, and state management. Experience with Next.js and modern React patterns.',
        'Spring Boot': 'Enterprise Java development with Spring Boot, including REST APIs, security, and microservices architecture.',
        'MongoDB': 'NoSQL database design and management. Experience with Mongoose ODM and MongoDB Atlas.',
        'MySQL': 'Relational database design, optimization, and administration. Proficient in complex queries and stored procedures.',
        'Git': 'Version control with Git and GitHub. Experience with branching strategies and collaborative development.',
        'Docker': 'Containerization with Docker for application deployment and development environment standardization.',
        'AWS': 'Cloud services on Amazon Web Services including EC2, S3, RDS, and Lambda functions.',
        'TypeScript': 'TypeScript for type-safe JavaScript development. Experience with interfaces, generics, and advanced types.',
        'Redux': 'State management with Redux and Redux Toolkit. Experience with middleware and async actions.',
        'Django': 'Full-stack web development with Django framework. Experience with Django REST framework and ORM.',
        'Node.js': 'Server-side JavaScript development with Node.js and Express.js. Experience with REST APIs and middleware.',
        'Express.js': 'Web application framework for Node.js. Experience with routing, middleware, and API development.',
        'Bootstrap': 'Frontend framework for responsive web design. Experience with components and customization.',
        'Tailwind CSS': 'Utility-first CSS framework for rapid UI development. Experience with custom configurations.',
        'Hibernate': 'Java ORM framework for database operations. Experience with JPA annotations and query optimization.',
        'JPA': 'Java Persistence API for database operations. Experience with entity relationships and transactions.',
        'REST API': 'Design and development of RESTful APIs. Experience with authentication, validation, and documentation.',
        'Microservices': 'Microservices architecture design and implementation. Experience with service communication and deployment.',
        'JWT': 'JSON Web Token implementation for authentication and authorization in web applications.',
        'OAuth2': 'OAuth 2.0 implementation for third-party authentication and authorization.',
        'MVC': 'Model-View-Controller architecture pattern implementation in web applications.',
        'Agile': 'Agile development methodologies including Scrum and Kanban. Experience with sprint planning and retrospectives.',
        'NumPy': 'Numerical computing with NumPy arrays and mathematical operations for data science applications.',
        'Pandas': 'Data manipulation and analysis with Pandas DataFrames. Experience with data cleaning and transformation.',
        'Matplotlib': 'Data visualization with Matplotlib for creating charts, graphs, and plots.',
        'Seaborn': 'Statistical data visualization with Seaborn for creating attractive and informative plots.',
        'Scikit-learn': 'Machine learning with Scikit-learn for classification, regression, and clustering algorithms.',
        'TensorFlow': 'Deep learning with TensorFlow for neural network development and training.',
        'OpenCV': 'Computer vision with OpenCV for image processing and analysis.',
        'VS Code': 'Primary code editor with extensive customization and extension usage.',
        'IntelliJ IDEA': 'Java IDE with advanced features for enterprise development and debugging.',
        'Eclipse': 'Java IDE with plugin ecosystem for various development tasks.',
        'Android Studio': 'Android app development IDE with emulator and debugging tools.',
        'Jupyter': 'Interactive computing environment for data science and machine learning.',
        'Postman': 'API testing and development tool for RESTful services.',
        'GitHub': 'Version control platform with experience in collaborative development and project management.',
        'Jenkins': 'Continuous Integration/Continuous Deployment (CI/CD) pipeline automation.',
        'Heroku': 'Cloud platform for deploying and managing web applications.',
        'Kubernetes': 'Container orchestration platform for managing containerized applications.',
        'Oracle': 'Enterprise database management system with experience in administration and optimization.',
        'SQLite': 'Lightweight database engine for embedded applications and development.',
        'SQL Server': 'Microsoft SQL Server database management and administration.',
        'Flask': 'Lightweight Python web framework for building web applications and APIs.',
        'FastAPI': 'Modern Python web framework for building APIs with automatic documentation.',
        'Next.js': 'React framework for production with server-side rendering and static site generation.',
        'C++': 'Systems programming with C++ for performance-critical applications and algorithms.'
    };
    
    return descriptions[skillName] || `Experience with ${skillName} in various projects and applications.`;
}

// Get skill-related projects
function getSkillProjects(skillName) {
    const projects = {
        'Java': '<li>Core Java Programming Batch Training</li><li>Spring Boot Enterprise Applications</li><li>Java Swing Desktop Applications</li>',
        'Python': '<li>Python Programming Batch Training</li><li>Django Web Applications</li><li>Data Science Projects</li>',
        'React': '<li>Frontend Development Training</li><li>Modern React Applications</li><li>Component Library Development</li>',
        'Spring Boot': '<li>REST API Development</li><li>Microservices Architecture</li><li>Enterprise Software Solutions</li>',
        'MongoDB': '<li>MERN Stack Applications</li><li>NoSQL Database Design</li><li>Data Modeling Projects</li>',
        'MySQL': '<li>Database Design and Optimization</li><li>SQL Query Training</li><li>Relational Database Projects</li>',
        'Git': '<li>Version Control Training</li><li>Collaborative Development</li><li>GitHub Repository Management</li>',
        'Docker': '<li>Containerized Applications</li><li>Development Environment Setup</li><li>Deployment Automation</li>',
        'AWS': '<li>Cloud Infrastructure Setup</li><li>Serverless Applications</li><li>Cloud Migration Projects</li>',
        'TypeScript': '<li>Type-Safe JavaScript Development</li><li>React TypeScript Projects</li><li>API Type Definitions</li>',
        'Redux': '<li>State Management Solutions</li><li>React Redux Applications</li><li>Complex State Logic</li>',
        'Django': '<li>Full-Stack Web Applications</li><li>Django REST Framework APIs</li><li>Admin Interface Customization</li>',
        'Node.js': '<li>Backend API Development</li><li>Real-time Applications</li><li>Server-side JavaScript</li>',
        'Express.js': '<li>RESTful API Development</li><li>Middleware Implementation</li><li>Web Application Backends</li>',
        'Bootstrap': '<li>Responsive Web Design</li><li>UI Component Libraries</li><li>Mobile-First Development</li>',
        'Tailwind CSS': '<li>Utility-First Styling</li><li>Custom Design Systems</li><li>Rapid UI Development</li>',
        'Hibernate': '<li>Java ORM Implementation</li><li>Database Entity Management</li><li>Query Optimization</li>',
        'JPA': '<li>Java Persistence Solutions</li><li>Entity Relationship Mapping</li><li>Transaction Management</li>',
        'REST API': '<li>API Design and Development</li><li>Authentication Systems</li><li>API Documentation</li>',
        'Microservices': '<li>Distributed System Architecture</li><li>Service Communication</li><li>Scalable Applications</li>',
        'JWT': '<li>Authentication Systems</li><li>Secure API Development</li><li>Token-Based Security</li>',
        'OAuth2': '<li>Third-Party Authentication</li><li>Social Login Integration</li><li>Authorization Systems</li>',
        'MVC': '<li>Web Application Architecture</li><li>Separation of Concerns</li><li>Maintainable Code Structure</li>',
        'Agile': '<li>Sprint Planning and Execution</li><li>Team Collaboration</li><li>Iterative Development</li>',
        'NumPy': '<li>Numerical Computing Projects</li><li>Data Analysis Applications</li><li>Mathematical Operations</li>',
        'Pandas': '<li>Data Manipulation Projects</li><li>Data Cleaning Applications</li><li>Statistical Analysis</li>',
        'Matplotlib': '<li>Data Visualization Projects</li><li>Chart and Graph Creation</li><li>Analytics Dashboards</li>',
        'Seaborn': '<li>Statistical Visualization</li><li>Data Storytelling</li><li>Advanced Plotting</li>',
        'Scikit-learn': '<li>Machine Learning Models</li><li>Predictive Analytics</li><li>Classification Projects</li>',
        'TensorFlow': '<li>Deep Learning Models</li><li>Neural Network Development</li><li>AI Applications</li>',
        'OpenCV': '<li>Computer Vision Projects</li><li>Image Processing Applications</li><li>Video Analysis</li>',
        'VS Code': '<li>Development Environment Setup</li><li>Extension Configuration</li><li>Productivity Optimization</li>',
        'IntelliJ IDEA': '<li>Java Development Environment</li><li>Debugging and Profiling</li><li>Enterprise Development</li>',
        'Eclipse': '<li>Java IDE Configuration</li><li>Plugin Development</li><li>RCP Applications</li>',
        'Android Studio': '<li>Android App Development</li><li>Mobile Application Projects</li><li>App Store Deployment</li>',
        'Jupyter': '<li>Data Science Notebooks</li><li>Interactive Analysis</li><li>Research Projects</li>',
        'Postman': '<li>API Testing and Development</li><li>Request Collections</li><li>Automated Testing</li>',
        'GitHub': '<li>Repository Management</li><li>Collaborative Development</li><li>Open Source Contributions</li>',
        'Jenkins': '<li>CI/CD Pipeline Setup</li><li>Automated Testing</li><li>Deployment Automation</li>',
        'Heroku': '<li>Cloud Application Deployment</li><li>Web Application Hosting</li><li>Database Management</li>',
        'Kubernetes': '<li>Container Orchestration</li><li>Scalable Deployments</li><li>Cluster Management</li>',
        'Oracle': '<li>Enterprise Database Management</li><li>Performance Optimization</li><li>Administration Tasks</li>',
        'SQLite': '<li>Embedded Database Applications</li><li>Development Databases</li><li>Lightweight Solutions</li>',
        'SQL Server': '<li>Microsoft Database Solutions</li><li>Enterprise Data Management</li><li>Performance Tuning</li>',
        'Flask': '<li>Lightweight Web Applications</li><li>API Development</li><li>Prototype Development</li>',
        'FastAPI': '<li>Modern API Development</li><li>Automatic Documentation</li><li>High-Performance APIs</li>',
        'Next.js': '<li>Production React Applications</li><li>Server-Side Rendering</li><li>Static Site Generation</li>',
        'C++': '<li>Systems Programming</li><li>Performance-Critical Applications</li><li>Algorithm Implementation</li>'
    };
    
    return projects[skillName] || '<li>Various projects and applications</li><li>Training and mentorship programs</li><li>Real-world implementations</li>';
}

// Initialize skills when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSkills();
});

// Smart Features Functionality
class SmartFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.initSkillAnalyzer();
        this.initCodeEditor();
        this.initTimeline();
        this.initSmartContact();
    }

    // Skill Analyzer
    initSkillAnalyzer() {
        const interestBtns = document.querySelectorAll('.interest-btn');
        const recommendationDisplay = document.getElementById('recommendationDisplay');

        const recommendations = {
            frontend: {
                title: 'Frontend Development Path',
                skills: [
                    { name: 'HTML5 & CSS3', level: 'Expert', description: 'Master modern web standards and responsive design' },
                    { name: 'JavaScript (ES6+)', level: 'Expert', description: 'Advanced JavaScript with modern frameworks' },
                    { name: 'React.js', level: 'Expert', description: 'Build interactive user interfaces' },
                    { name: 'Next.js', level: 'Advanced', description: 'Full-stack React framework' },
                    { name: 'Tailwind CSS', level: 'Advanced', description: 'Utility-first CSS framework' }
                ]
            },
            backend: {
                title: 'Backend Development Path',
                skills: [
                    { name: 'Java & Spring Boot', level: 'Expert', description: 'Enterprise-grade backend development' },
                    { name: 'Node.js & Express', level: 'Advanced', description: 'JavaScript backend development' },
                    { name: 'Python & Django', level: 'Advanced', description: 'Rapid web development' },
                    { name: 'REST APIs', level: 'Expert', description: 'Design and implement APIs' },
                    { name: 'Microservices', level: 'Advanced', description: 'Scalable architecture patterns' }
                ]
            },
            mobile: {
                title: 'Mobile Development Path',
                skills: [
                    { name: 'React Native', level: 'Advanced', description: 'Cross-platform mobile development' },
                    { name: 'Android Development', level: 'Intermediate', description: 'Native Android apps' },
                    { name: 'Mobile UI/UX', level: 'Advanced', description: 'Design mobile-first interfaces' },
                    { name: 'PWA Development', level: 'Advanced', description: 'Progressive Web Apps' },
                    { name: 'Mobile APIs', level: 'Advanced', description: 'Backend for mobile apps' }
                ]
            },
            ai: {
                title: 'AI & Machine Learning Path',
                skills: [
                    { name: 'Python', level: 'Advanced', description: 'Primary language for AI/ML' },
                    { name: 'NumPy & Pandas', level: 'Advanced', description: 'Data manipulation and analysis' },
                    { name: 'Scikit-learn', level: 'Intermediate', description: 'Machine learning algorithms' },
                    { name: 'TensorFlow', level: 'Basic', description: 'Deep learning framework' },
                    { name: 'Data Visualization', level: 'Intermediate', description: 'Matplotlib & Seaborn' }
                ]
            }
        };

        interestBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                interestBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const interest = btn.getAttribute('data-interest');
                const recommendation = recommendations[interest];

                if (recommendation) {
                    this.displayRecommendation(recommendation);
                }
            });
        });
    }

    displayRecommendation(recommendation) {
        const recommendationDisplay = document.getElementById('recommendationDisplay');
        
        const skillsHTML = recommendation.skills.map(skill => `
            <div class="skill-recommendation">
                <h6>${skill.name}</h6>
                <span class="skill-level-badge">${skill.level}</span>
                <p>${skill.description}</p>
            </div>
        `).join('');

        recommendationDisplay.innerHTML = `
            <div class="recommendation-content">
                <h5>${recommendation.title}</h5>
                ${skillsHTML}
            </div>
        `;

        // Animate the recommendations
        const skillRecommendations = recommendationDisplay.querySelectorAll('.skill-recommendation');
        skillRecommendations.forEach((rec, index) => {
            rec.style.opacity = '0';
            rec.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                rec.style.transition = 'all 0.5s ease';
                rec.style.opacity = '1';
                rec.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    // Live Code Editor
    initCodeEditor() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const editorPanels = document.querySelectorAll('.editor-panel');
        const codeInputs = document.querySelectorAll('.code-input');
        const previewFrame = document.getElementById('previewFrame');

        // Tab switching
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                
                // Update active tab
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update active panel
                editorPanels.forEach(panel => panel.classList.remove('active'));
                document.getElementById(`${tab}-panel`).classList.add('active');
            });
        });

        // Live preview update
        let updateTimeout;
        codeInputs.forEach(input => {
            input.addEventListener('input', () => {
                clearTimeout(updateTimeout);
                updateTimeout = setTimeout(() => {
                    this.updatePreview();
                }, 500);
            });
        });
    }

    updatePreview() {
        const htmlInput = document.querySelector('#html-panel .code-input');
        const cssInput = document.querySelector('#css-panel .code-input');
        const jsInput = document.querySelector('#js-panel .code-input');
        const previewFrame = document.getElementById('previewFrame');

        try {
            const html = htmlInput.value;
            const css = cssInput.value;
            const js = jsInput.value;

            const previewHTML = `
                <style>${css}</style>
                ${html}
                <script>${js}</script>
            `;

            previewFrame.innerHTML = previewHTML;
        } catch (error) {
            console.log('Preview update error:', error);
        }
    }

    // Interactive Timeline
    initTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });

        // Add click interactions
        timelineItems.forEach(item => {
            item.addEventListener('click', () => {
                const year = item.getAttribute('data-year');
                this.showTimelineDetails(year);
            });
        });
    }

    showTimelineDetails(year) {
        const details = {
            '2020': 'Started my journey as a corporate trainer, focusing on Java and web development fundamentals.',
            '2021': 'Reached the milestone of training 500+ students, developing comprehensive learning methodologies.',
            '2022': 'Expanded expertise to MERN stack and full-stack development, creating industry-relevant projects.',
            '2023': 'Achieved 2000+ students trained, launched advanced training programs with real-world projects.',
            '2024': 'Current milestone: 5000+ students trained and 93+ GitHub repositories with extensive open-source contributions.'
        };

        // Create a modal or tooltip with details
        this.showNotification(details[year] || 'Details not available', 'info');
    }

    // Smart Contact Form
    initSmartContact() {
        const smartForm = document.getElementById('smartForm');
        const smartPurpose = document.getElementById('smartPurpose');
        const smartSuggestions = document.getElementById('smartSuggestions');

        const purposeSuggestions = {
            training: 'I offer comprehensive training programs in Java, React, Python, and full-stack development. Let me know your current skill level and learning goals!',
            project: 'I\'m available for freelance projects and collaborations. Tell me about your project requirements and timeline.',
            mentorship: 'I provide personalized mentorship for career guidance and skill development. What specific areas would you like to focus on?',
            consultation: 'I offer technical consultation for startups and enterprises. What challenges are you facing?',
            other: 'I\'m here to help! Please describe what you\'re looking for, and I\'ll provide the best assistance possible.'
        };

        smartPurpose.addEventListener('change', () => {
            const purpose = smartPurpose.value;
            if (purposeSuggestions[purpose]) {
                smartSuggestions.innerHTML = `<p>${purposeSuggestions[purpose]}</p>`;
            }
        });

        smartForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSmartFormSubmit(smartForm);
        });

        // Add real-time form validation
        const inputs = smartForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateSmartFormField(input);
            });
        });
    }

    validateSmartFormField(field) {
        const value = field.value.trim();
        const isValid = value.length > 0;
        
        if (isValid) {
            field.style.borderColor = '#667eea';
            field.style.backgroundColor = 'white';
        } else {
            field.style.borderColor = '#e0e0e0';
            field.style.backgroundColor = '#f8f9fa';
        }
    }

    handleSmartFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = form.querySelector('.smart-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            // Show success message
            this.showNotification('Thank you! I\'ll get back to you soon with personalized recommendations.', 'success');
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1500);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `smart-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <p>${message}</p>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#667eea'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// Initialize Smart Features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SmartFeatures();
    initFooter(); // Call footer initialization
});

function initFooter() {
    // Dynamic year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Coffee icon interaction
    const coffeeIcon = document.querySelector('.footer-coffee');
    if (coffeeIcon) {
        coffeeIcon.addEventListener('click', () => {
            const messages = [
                'Powered by lots of coffee! ☕',
                'Ah, a fresh brew! The fuel of developers.',
                'Coffee level: 99%... and rising!',
                'Another cup, please! Ideas are brewing.',
                'Fun fact: This portfolio was built on coffee.',
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            // Re-use the smart notification system
            if (typeof SmartFeatures !== 'undefined') {
                 new SmartFeatures().showNotification(randomMessage, 'info');
            } else {
                alert(randomMessage); // Fallback if SmartFeatures class is not available
            }
        });
    }
}
