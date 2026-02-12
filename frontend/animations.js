// Premium Scroll Animations & Interactions
(function() {
  'use strict';

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.addEventListener('DOMContentLoaded', () => {
    // Section fade-ins
    document.querySelectorAll('.section-fade-in').forEach(el => {
      observer.observe(el);
    });

    // Steps
    document.querySelectorAll('.step').forEach(el => {
      observer.observe(el);
    });

    // Feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(card);
    });
  });

  // Navbar scroll effect
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  // Parallax effect for hero
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }

  // Smooth scroll for anchor links
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

  // Theme Switcher
  const themeSwitcher = document.querySelector('.theme-switcher');
  if (themeSwitcher) {
    const themeButtons = themeSwitcher.querySelectorAll('.theme-btn');
    const currentTheme = localStorage.getItem('theme') || 'cyber-neon';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeButtons.forEach(btn => {
      if (btn.dataset.theme === currentTheme) {
        btn.classList.add('active');
      }
    });

    // Theme switching
    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // Micro-interactions for buttons
  document.querySelectorAll('.btn-primary, .btn-primary-large, .btn-primary-small').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Card tilt effect (optional - can be disabled for performance)
  if (window.innerWidth > 768) {
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // Performance: Use requestAnimationFrame for smooth animations
  let ticking = false;
  
  function updateScrollEffects() {
    // Add any scroll-based animations here
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  });

})();
