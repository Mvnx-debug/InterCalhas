// scripts.js
document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // JavaScript para o Carrossel Moderno
  // Inicializa o carrossel
  const heroCarousel = new bootstrap.Carousel('#heroCarousel', {
    interval: 6000,
    ride: 'carousel',
    pause: false,
    wrap: true
  });

  // Efeito de splitting para os títulos
  function initSplitting() {
    const titles = document.querySelectorAll('[data-splitting]');
    
    titles.forEach(title => {
      // Simula o efeito do plugin Splitting.js
      const text = title.innerText;
      title.innerHTML = '';
      
      const words = text.split(' ');
      words.forEach(word => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        
        const chars = word.split('');
        chars.forEach(char => {
          const charSpan = document.createElement('span');
          charSpan.className = 'char';
          charSpan.textContent = char === ' ' ? '&nbsp;' : char;
          wordSpan.appendChild(charSpan);
        });
        
        title.appendChild(wordSpan);
        title.appendChild(document.createTextNode(' '));
      });
      
      // Anima os caracteres quando o slide ativo
      if (title.closest('.carousel-item').classList.contains('active')) {
        animateChars(title);
      }
    });
  }

  // Anima os caracteres
  function animateChars(element) {
    const chars = element.querySelectorAll('.char');
    chars.forEach((char, index) => {
      setTimeout(() => {
        char.style.transitionDelay = `${index * 0.05}s`;
        char.classList.add('animate-char');
      }, 100);
    });
  }

  // Observa quando um slide se torna ativo
  document.querySelector('#heroCarousel').addEventListener('slid.bs.carousel', function(e) {
    const activeSlide = e.relatedTarget;
    const captionContent = activeSlide.querySelector('.caption-content');
    
    // Reinicia a animação do conteúdo
    captionContent.style.opacity = '0';
    captionContent.style.transform = 'translateY(20px)';
    setTimeout(() => {
      captionContent.style.opacity = '1';
      captionContent.style.transform = 'translateY(0)';
    }, 50);
    
    // Reinicia a barra de progresso
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.transition = 'none';
    progressBar.style.width = '0';
    setTimeout(() => {
      progressBar.style.transition = 'width 6s linear';
      progressBar.style.width = '100%';
    }, 50);
    
    // Anima os caracteres do título
    const title = activeSlide.querySelector('[data-splitting]');
    if (title) animateChars(title);
  });

  // Inicia a barra de progresso
  document.querySelector('.progress-bar').style.width = '100%';

  // Scroll down indicator
  document.querySelector('.scroll-down').addEventListener('click', function() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });

  // Inicializa o efeito de splitting
  initSplitting();

  // Efeito parallax nas imagens
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    carouselItems.forEach(item => {
      if (item.classList.contains('active')) {
        const img = item.querySelector('img');
        const scrollDiff = currentScroll - lastScroll;
        const currentTransform = parseFloat(img.style.transform.replace('scale(', '').replace(')', '')) || 1.05;
        
        let newScale = currentTransform + (scrollDiff * 0.0005);
        newScale = Math.max(1, Math.min(1.1, newScale));
        img.style.transform = `scale(${newScale})`;
      }
    });
    
    lastScroll = currentScroll;
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });

  // Initialize animations when elements come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate__animated');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        const animationClass = element.getAttribute('data-animation');
        element.classList.add(animationClass || 'animate__fadeIn');
      }
    });
  };

  // Run once on load and then on scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  // Form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Formata a mensagem para o WhatsApp
      const whatsappMessage = `Olá, sou ${name}!\n\nMeu email: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // Redireciona para o WhatsApp 
      window.open(`https://wa.me/5511999999999?text=${encodedMessage}`, '_blank');
    });
  }

  // Product card hover effect
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.card-img-top').style.transform = 'scale(1.1)';
      this.querySelector('.card-overlay').style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('.card-img-top').style.transform = 'scale(1)';
      this.querySelector('.card-overlay').style.opacity = '0';
    });
  });

  // Initialize carousel with interval
  const mainHeroCarousel = document.getElementById('heroCarousel');
  if (mainHeroCarousel) {
    const carousel = new bootstrap.Carousel(mainHeroCarousel, {
      interval: 5000,
      pause: 'hover',
      wrap: true
    });
  }

  // Back to top button
  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
  backToTopButton.className = 'btn btn-primary btn-back-to-top';
  backToTopButton.style.position = 'fixed';
  backToTopButton.style.bottom = '30px';
  backToTopButton.style.right = '30px';
  backToTopButton.style.zIndex = '99';
  backToTopButton.style.width = '50px';
  backToTopButton.style.height = '50px';
  backToTopButton.style.borderRadius = '50%';
  backToTopButton.style.display = 'none';
  backToTopButton.style.alignItems = 'center';
  backToTopButton.style.justifyContent = 'center';
  document.body.appendChild(backToTopButton);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});