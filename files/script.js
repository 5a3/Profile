// Initialize Typed.js
document.addEventListener('DOMContentLoaded', function() {
    // Typing animation
    const typed = new Typed('.auto-type', {
      strings: ['IT Engineer', 'Software Developer', 'Flutter Developer', 'Web Developer', 'TS-EBS'],
      typeSpeed: 100,
      backSpeed: 60,
      backDelay: 2000,
      loop: true
    });
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
      // Navbar effect
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // Back to top button
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
      
      // Timeline animation
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.8) {
          item.classList.add('visible');
        }
      });
      
      // Skill bars animation
      const skillBars = document.querySelectorAll('.skill-progress');
      skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barTop < windowHeight * 0.8) {
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
        }
      });
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
          ? '<i class="fas fa-times"></i>' 
          : '<i class="fas fa-bars"></i>';
      });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Back to top functionality
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    
    function highlightNavLink() {
      let scrollPos = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Initialize skill bars with 0 width for animation
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      bar.style.width = '0%';
    });
    
    // Trigger animations on page load
    setTimeout(() => {
      highlightNavLink();
      
      // Trigger timeline animations
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        setTimeout(() => {
          const itemTop = item.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (itemTop < windowHeight * 0.8) {
            item.classList.add('visible');
          }
        }, index * 200);
      });
    }, 500);
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.info-card, .skill-category, .contact-card, .timeline-content');
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  });