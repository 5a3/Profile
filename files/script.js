document.addEventListener('DOMContentLoaded', function() {
  
  // ====== MULTI-LANGUAGE SYSTEM ======
  const langToggle = document.getElementById('langToggle');
  const htmlElem = document.documentElement;
  
  const stringsEn = ['IT Engineer', 'Flutter Developer', 'Network Administrator', 'TS Specialist'];
  const stringsAr = ['مهندس تقنية معلومات', 'مطور تطبيقات فلاتر', 'مسؤول إدارة شبكات', 'أخصائي دعم فني'];
  let typedInstance = null;

  function initTyped(lang) {
    if (typedInstance) { typedInstance.destroy(); }
    typedInstance = new Typed('.auto-type', {
      strings: lang === 'ar' ? stringsAr : stringsEn,
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    });
  }

  function setLanguage(lang) {
    if (lang === 'ar') {
      htmlElem.setAttribute('dir', 'rtl');
      htmlElem.setAttribute('lang', 'ar');
      langToggle.querySelector('span').textContent = 'EN';
      
      document.querySelectorAll('[data-lang-ar]').forEach(elem => {
        elem.textContent = elem.getAttribute('data-lang-ar');
      });
    } else {
      htmlElem.setAttribute('dir', 'ltr');
      htmlElem.setAttribute('lang', 'en');
      langToggle.querySelector('span').textContent = 'AR';
      
      document.querySelectorAll('[data-lang-en]').forEach(elem => {
        elem.textContent = elem.getAttribute('data-lang-en');
      });
    }
    localStorage.setItem('portfolio-lang', lang);
    initTyped(lang);
  }

  langToggle.addEventListener('click', () => {
    const currentLang = htmlElem.getAttribute('lang') || 'en';
    setLanguage(currentLang === 'en' ? 'ar' : 'en');
  });

  const savedLang = localStorage.getItem('portfolio-lang') || 'en';
  setLanguage(savedLang);

  // ====== DARK / LIGHT THEME TOGGLE ======
  const themeToggle = document.getElementById('themeToggle');
  
  function setTheme(theme) {
    htmlElem.setAttribute('data-theme', theme);
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('portfolio-theme', theme);
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElem.getAttribute('data-theme') || 'dark';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(savedTheme);

  // ====== INTERACTION UTILITIES ======
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) { backToTop.classList.add('visible'); }
    else { backToTop.classList.remove('visible'); }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.querySelector('i').classList.toggle('fa-bars');
      menuToggle.querySelector('i').classList.toggle('fa-times');
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      if (menuToggle) menuToggle.querySelector('i').className = 'fas fa-bars';
    });
  });
});