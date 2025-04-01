// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
        backToTop.classList.add('active');
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('active');
    }
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
let mobileMenu = null;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    
    if (!mobileMenu) {
        // Create mobile menu on first click
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        const mobileNavList = document.createElement('ul');
        mobileNavList.className = 'mobile-nav-list';
        
        // Clone nav items from desktop menu
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const clone = item.cloneNode(true);
            
            // Replace nav-link with mobile-nav-link
            const link = clone.querySelector('.nav-link');
            if (link) {
                link.className = 'mobile-nav-link';
                
                // Add click event to close menu when link is clicked
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                });
            }
            
            // Replace btn with mobile-btn
            const btn = clone.querySelector('.btn');
            if (btn) {
                btn.className = 'btn btn-primary mobile-btn';
                
                // Add click event to close menu when button is clicked
                btn.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                });
            }
            
            mobileNavList.appendChild(clone);
        });
        
        mobileMenu.appendChild(mobileNavList);
        document.body.appendChild(mobileMenu);
    }
    
    mobileMenu.classList.toggle('active');
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

// ===== ACCORDION FUNCTIONALITY =====
const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const accordionItem = button.parentElement;
        const accordionContent = button.nextElementSibling;
        
        // Toggle active class on button
        button.classList.toggle('active');
        
        // Toggle accordion content
        if (button.classList.contains('active')) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        } else {
            accordionContent.style.maxHeight = 0;
        }
    });
});

// ===== TESTIMONIAL SLIDER =====
const testimonialTrack = document.getElementById('testimonial-track');
const testimonialPrev = document.getElementById('testimonial-prev');
const testimonialNext = document.getElementById('testimonial-next');
const testimonialCards = document.querySelectorAll('.testimonial-card');

let currentIndex = 0;
let cardWidth = 0;
let visibleCards = 1;

// Set initial card width and visible cards based on screen size
function updateTestimonialSlider() {
    if (window.innerWidth >= 768) {
        visibleCards = 3;
    } else if (window.innerWidth >= 576) {
        visibleCards = 2;
    } else {
        visibleCards = 1;
    }
    
    cardWidth = testimonialTrack.clientWidth / visibleCards;
    
    // Set width for each card
    testimonialCards.forEach(card => {
        card.style.width = `${cardWidth}px`;
    });
    
    // Reset position
    currentIndex = 0;
    updateSliderPosition();
}

// Update slider position
function updateSliderPosition() {
    testimonialTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

// Initialize slider
updateTestimonialSlider();

// Add event listeners for slider controls
testimonialPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
    }
});

testimonialNext.addEventListener('click', () => {
    if (currentIndex < testimonialCards.length - visibleCards) {
        currentIndex++;
        updateSliderPosition();
    }
});

// Update slider on window resize
window.addEventListener('resize', updateTestimonialSlider);

// ===== FORM VALIDATION AND SUBMISSION =====
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        // Get form values
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const tipoEvento = document.getElementById('tipo-evento').value;
        const fecha = document.getElementById('fecha').value;
        const cantidadSillas = document.getElementById('cantidad-sillas').value.trim();
        const ubicacion = document.getElementById('ubicacion').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        // Validate form
        let isValid = true;
        
        if (nombre.length < 2) {
            document.getElementById('nombre-error').textContent = 'El nombre debe tener al menos 2 caracteres.';
            isValid = false;
        }
        
        if (!validateEmail(email)) {
            document.getElementById('email-error').textContent = 'Por favor ingrese un email válido.';
            isValid = false;
        }
        
        if (telefono.length < 8) {
            document.getElementById('telefono-error').textContent = 'Por favor ingrese un número de teléfono válido.';
            isValid = false;
        }
        
        if (!tipoEvento) {
            document.getElementById('tipo-evento-error').textContent = 'Por favor seleccione un tipo de evento.';
            isValid = false;
        }
        
        if (!fecha) {
            document.getElementById('fecha-error').textContent = 'Por favor seleccione una fecha para su evento.';
            isValid = false;
        }
        
        if (!cantidadSillas || parseInt(cantidadSillas) < 1) {
            document.getElementById('cantidad-sillas-error').textContent = 'Por favor indique la cantidad de sillas necesarias.';
            isValid = false;
        }
        
        if (ubicacion.length < 5) {
            document.getElementById('ubicacion-error').textContent = 'Por favor indique la ubicación del evento.';
            isValid = false;
        }
        
        if (isValid) {
            // Format date for display
            const formattedDate = formatDate(fecha);
            
            // Create WhatsApp message
            const message = `*Consulta desde dissureventos.com.ar*%0A%0A*Nombre:* ${nombre}%0A*Email:* ${email}%0A*Teléfono:* ${telefono}%0A*Tipo de Evento:* ${tipoEvento}%0A*Fecha:* ${formattedDate}%0A*Cantidad de Sillas:* ${cantidadSillas}%0A*Ubicación:* ${ubicacion}%0A*Mensaje:* ${mensaje || 'No se incluyó mensaje adicional'}`;
            
            // WhatsApp number (replace with actual number)
            const phoneNumber = "5491136410460";
            
            // Create WhatsApp link
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
            
            // Change button text
            submitBtn.textContent = '¡Enviado! Abriendo WhatsApp...';
            submitBtn.disabled = true;
            
            // Open WhatsApp in a new tab
            window.open(whatsappLink, '_blank');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = 'Enviar Consulta por WhatsApp';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

// Date formatting helper
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// ===== SET CURRENT YEAR IN FOOTER =====
document.getElementById('current-year').textContent = new Date().getFullYear();

// ===== INITIALIZE PAGE =====
document.addEventListener('DOMContentLoaded', function() {
    // Open first accordion item by default
    if (accordionButtons.length > 0) {
        accordionButtons[0].click();
    }
    
    // Set minimum date for event date input to today
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        fechaInput.min = `${yyyy}-${mm}-${dd}`;
    }
});