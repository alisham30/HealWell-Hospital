document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Mobile Menu Toggle
    // ======================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        this.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });

    // ======================
    // Sticky Header
    // ======================
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if href is just '#'
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });

    // ======================
    // Back to Top Button
    // ======================
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        history.pushState(null, null, ' ');
    });

    // ======================
    // Testimonial Slider
    // ======================
    const initTestimonialSlider = () => {
        const slider = document.querySelector('.testimonials-slider');
        if (!slider) return;
        
        const slides = Array.from(document.querySelectorAll('.testimonial-card'));
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Initialize slider
        showSlide(currentSlide);
        
        // Auto-rotate testimonials every 5 seconds
        const slideInterval = setInterval(nextSlide, 5000);
        
        // Pause on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    };
    initTestimonialSlider();

    // ======================
    // Form Validation
    // ======================
    const initFormValidation = () => {
        const appointmentForm = document.querySelector('.appointment-form');
        if (!appointmentForm) return;
        
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                // Reset error state
                input.classList.remove('error');
                
                // Check required fields
                if (input.required && !input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        input.classList.add('error');
                        isValid = false;
                    }
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                
                // Simulate API call
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    alert('Appointment request submitted successfully! We will contact you shortly.');
                    this.reset();
                }, 1500);
            } else {
                // Scroll to first error
                const firstError = this.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    };
    initFormValidation();

    // ======================
    // Newsletter Form
    // ======================
    const initNewsletterForm = () => {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (!newsletterForm) return;
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (emailInput.value.trim()) {
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                // Simulate subscription
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 1500);
                }, 1000);
            }
        });
    };
    initNewsletterForm();

    // ======================
    // Lazy Loading Images
    // ======================
    const initLazyLoading = () => {
        const lazyImages = document.querySelectorAll('.lazy-img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Handle potential data-src attribute
                        const src = img.getAttribute('data-src') || img.src;
                        img.src = src;
                        
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '200px 0px',
                threshold: 0.01
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.classList.add('loaded');
            });
        }
    };
    initLazyLoading();

    // ======================
    // Animation on Scroll
    // ======================
    const initScrollAnimations = () => {
        const animatableElements = document.querySelectorAll(
            '.feature-card, .service-card, .doctor-card, .news-card, .stat'
        );
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatableElements.forEach(element => {
            observer.observe(element);
        });
    };
    initScrollAnimations();

    // ======================
    // Current Year in Footer
    // ======================
    const updateFooterYear = () => {
        const yearElement = document.querySelector('.footer-bottom p');
        if (yearElement) {
            yearElement.innerHTML = `&copy; ${new Date().getFullYear()} HealWell Hospital. All Rights Reserved.`;
        }
    };
    updateFooterYear();

    // ======================
    // Image Hover Effects
    // ======================
    const initImageHoverEffects = () => {
        document.querySelectorAll('.img-hover-zoom').forEach(container => {
            const img = container.querySelector('img');
            if (!img) return;
            
            container.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
            });
            
            container.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        });
    };
    initImageHoverEffects();
});


// Counter Animation
function animateCounters() {
    const stats = document.querySelectorAll('.stat');
    const aboutSection = document.querySelector('.about');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    // Add animation class
                    stat.classList.add('animated');
                    
                    // Get target number (remove '+' and commas)
                    const target = parseInt(stat.querySelector('h4').textContent.replace(/[+,]/g, ''));
                    let current = 0;
                    const increment = target / 30; // Adjust speed (higher = faster)
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            clearInterval(timer);
                            // Restore original text (with '+' if it had it)
                            const h4 = stat.querySelector('h4');
                            h4.textContent = h4.textContent.includes('+') 
                                ? target.toLocaleString() + '+' 
                                : target.toLocaleString();
                        } else {
                            stat.querySelector('h4').textContent = Math.floor(current).toLocaleString();
                        }
                    }, 30);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    observer.observe(aboutSection);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', animateCounters);

// Advanced Medical Chatbot
class MedicalChatbot {
    constructor() {
      this.chatbot = document.querySelector('.med-ai-chatbot');
      this.launcher = document.querySelector('.med-ai-launcher');
      this.closeBtn = document.querySelector('.med-ai-close');
      this.minimizeBtn = document.querySelector('.med-ai-minimize');
      this.sendBtn = document.querySelector('.med-ai-send');
      this.micBtn = document.querySelector('.med-ai-mic');
      this.input = document.querySelector('.med-ai-input');
      this.messages = document.querySelector('.med-ai-messages');
      this.quickBtns = document.querySelectorAll('.med-ai-quick-btn');
      this.isOpen = false;
      this.speechRecognition = null;
      
      this.init();
    }
    
    init() {
      this.setupEventListeners();
      this.setupSpeechRecognition();
    }
    
    setupEventListeners() {
      this.launcher.addEventListener('click', () => this.toggleChatbot());
      this.closeBtn.addEventListener('click', () => this.closeChatbot());
      this.minimizeBtn.addEventListener('click', () => this.minimizeChatbot());
      this.sendBtn.addEventListener('click', () => this.processUserInput());
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.processUserInput();
      });
      
      this.quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.addUserMessage(btn.textContent);
          this.processMedicalQuery(btn.textContent);
        });
      });
    }
    
    setupSpeechRecognition() {
      if ('webkitSpeechRecognition' in window) {
        this.speechRecognition = new webkitSpeechRecognition();
        this.speechRecognition.continuous = false;
        this.speechRecognition.interimResults = false;
        this.speechRecognition.lang = 'en-US';
        
        this.micBtn.addEventListener('click', () => {
          if (this.micBtn.classList.contains('listening')) {
            this.speechRecognition.stop();
            this.micBtn.classList.remove('listening');
            this.micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
          } else {
            this.speechRecognition.start();
            this.micBtn.classList.add('listening');
            this.micBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
          }
        });
        
        this.speechRecognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          this.input.value = transcript;
          this.micBtn.classList.remove('listening');
          this.micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        };
        
        this.speechRecognition.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          this.micBtn.classList.remove('listening');
          this.micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        };
      } else {
        this.micBtn.style.display = 'none';
      }
    }
    
    toggleChatbot() {
      this.isOpen = !this.isOpen;
      this.chatbot.classList.toggle('active', this.isOpen);
    }
    
    closeChatbot() {
      this.isOpen = false;
      this.chatbot.classList.remove('active');
    }
    
    minimizeChatbot() {
      this.isOpen = false;
      this.chatbot.classList.remove('active');
    }
    
    addUserMessage(text) {
      if (!text.trim()) return;
      
      const msgDiv = document.createElement('div');
      msgDiv.className = 'med-ai-user-msg';
      msgDiv.innerHTML = `
        <div class="med-ai-avatar"><i class="fas fa-user"></i></div>
        <div class="med-ai-msg-content">
          <p>${text}</p>
        </div>
      `;
      
      this.messages.appendChild(msgDiv);
      this.scrollToBottom();
    }
    
    addBotMessage(text, isTyping = false) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'med-ai-bot-msg';
      
      if (isTyping) {
        msgDiv.innerHTML = `
          <div class="med-ai-avatar"><i class="fas fa-user-md"></i></div>
          <div class="med-ai-msg-content">
            <div class="med-ai-typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        `;
      } else {
        msgDiv.innerHTML = `
          <div class="med-ai-avatar"><i class="fas fa-user-md"></i></div>
          <div class="med-ai-msg-content">${text}</div>
        `;
      }
      
      this.messages.appendChild(msgDiv);
      this.scrollToBottom();
      return msgDiv;
    }
    
    scrollToBottom() {
      this.messages.scrollTop = this.messages.scrollHeight;
    }
    
    processUserInput() {
      const text = this.input.value.trim();
      if (!text) return;
      
      this.addUserMessage(text);
      this.input.value = '';
      this.processMedicalQuery(text);
    }
    
    processMedicalQuery(query) {
      // Show typing indicator
      const typingMsg = this.addBotMessage('', true);
      
      // Simulate processing delay
      setTimeout(() => {
        // Remove typing indicator
        this.messages.removeChild(typingMsg);
        
        // Generate response
        const response = this.generateMedicalResponse(query);
        this.addBotMessage(response);
      }, 1500);
    }
    
    generateMedicalResponse(query) {
      query = query.toLowerCase();
      
      // Medical knowledge base
      const medicalResponses = {
        // General health queries
        'symptom': `I can help assess symptoms, but please consult a doctor for accurate diagnosis. Could you describe:<br>
          - Your main symptom<br>
          - When it started<br>
          - Severity (1-10)<br>
          - Any other symptoms?`,
  
        'pain': `Pain can indicate various conditions. Please specify:<br>
          - Location (head, chest, abdomen, etc.)<br>
          - Type (sharp, dull, throbbing)<br>
          - Duration<br>
          - On a scale of 1-10, how severe?<br><br>
          <strong>For severe chest pain or difficulty breathing, seek emergency care immediately.</strong>`,
  
        // Appointment related
        'appointment': `You can book appointments through:<br>
          1. <a href="#appointment" style="color:#1a73e8;">Our online portal</a><br>
          2. Phone: (555) 123-4567<br>
          3. In-person at our reception<br><br>
          Which department do you need?`,
  
        // Doctor information
        'doctor': `We have specialists in:<br>
          • Cardiology ❤️<br>
          • Neurology 🧠<br>
          • Pediatrics 👶<br>
          • Orthopedics 🦴<br>
          • Dermatology 🧴<br><br>
          Who would you like to consult?`,
  
        // Emergency responses
        'emergency': `<strong style="color:#d32f2f;">For life-threatening emergencies, call 911 immediately.</strong><br><br>
          Our ER services:<br>
          • Location: 123 Medical Drive<br>
          • Phone: (555) 987-6543<br>
          • Open 24/7<br><br>
          <i>Are you currently experiencing a medical emergency?</i>`,
  
        // Medication queries
        'medication': `I can provide general medication information. Please specify:<br>
          - Medication name<br>
          - Your question (side effects, dosage, interactions)<br><br>
          <small>Note: Always consult your doctor before changing medications.</small>`,
  
        // COVID-19
        'covid': `COVID-19 information:<br>
          • Symptoms: Fever, cough, fatigue, loss of taste/smell<br>
          • Testing available at our clinic<br>
          • Vaccination appointments: Call (555) 123-4567<br><br>
          <a href="#" style="color:#1a73e8;">View our COVID-19 safety protocols</a>`,
  
        // Default response
        'default': `I'm your AI medical assistant. I can help with:<br>
          • Symptom assessment<br>
          • Appointment booking<br>
          • Doctor information<br>
          • Medication questions<br>
          • Emergency guidance<br><br>
          How may I assist you specifically?`
      };
  
      // Response selection logic
      if (query.includes('symptom') || query.includes('hurt') || query.includes('feel')) {
        return medicalResponses['symptom'];
      } else if (query.includes('pain') || query.includes('ache')) {
        return medicalResponses['pain'];
      } else if (query.includes('appointment') || query.includes('book') || query.includes('schedule')) {
        return medicalResponses['appointment'];
      } else if (query.includes('doctor') || query.includes('specialist') || query.includes('physician')) {
        return medicalResponses['doctor'];
      } else if (query.includes('emergency') || query.includes('urgent') || query.includes('911')) {
        return medicalResponses['emergency'];
      } else if (query.includes('medication') || query.includes('pill') || query.includes('drug') || query.includes('prescription')) {
        return medicalResponses['medication'];
      } else if (query.includes('covid') || query.includes('corona') || query.includes('pandemic')) {
        return medicalResponses['covid'];
      } else {
        return medicalResponses['default'];
      }
    }
  }
  
  // Initialize chatbot when DOM loads
  document.addEventListener('DOMContentLoaded', () => {
    const medicalChatbot = new MedicalChatbot();
    
    // Your other initialization code...
  });