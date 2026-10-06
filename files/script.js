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

// ====== FEATURED PROJECTS & DYNAMIC GALLERY SYSTEM ======
window.projectsData = {
  waslli: {
    titleEn: 'Wasl Li Delivery Platform',
    titleAr: 'تطبيق وصل لي لتوصيل الطعام والطلبات',
    folderPath: './img/projects/waslli/',
    images: ['waslli_logo.png']
  },
  jahez: {
    titleEn: 'Jahez Business Suite',
    titleAr: 'تطبيق جاهز لمحلات الخياطة والخدمات',
    folderPath: './img/projects/jahez/',
    images: ['jahez_logo.png']
  },
  mystatus: {
    titleEn: 'MyStatus - Media Manager',
    titleAr: 'تطبيق محمل الحالات الذكي',
    folderPath: './img/projects/mystatus/',
    images: ['mystatus_logo.png']
  }
};

let currentGalleryImages = [];
let currentImageIndex = 0;

window.openProjectGallery = function(projectId) {
  const project = window.projectsData[projectId];
  if (!project) return;

  const currentLang = document.documentElement.getAttribute('lang') || 'en';
  const title = currentLang === 'ar' ? project.titleAr : project.titleEn;
  
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalSubtitle = document.getElementById('modalProjectSubtitle');
  
  if (modalTitle) modalTitle.textContent = title;
  if (modalSubtitle) {
    modalSubtitle.textContent = currentLang === 'ar' 
      ? 'معرض صور ومشاهد التطبيق' 
      : 'App screenshots & media gallery';
  }

  // Base list of images from project config
  const imagesToLoad = [...project.images];
  currentGalleryImages = imagesToLoad.map(img => project.folderPath + img);
  currentImageIndex = 0;

  // Auto-probe candidate screenshot filenames
  const candidateNames = [];
  for (let i = 1; i <= 10; i++) {
    candidateNames.push(`screen${i}.png`, `screen${i}.jpg`, `screen${i}.jpeg`, `${i}.png`, `${i}.jpg`, `screenshot${i}.png`);
  }
  const probeList = candidateNames.filter(name => !imagesToLoad.includes(name));

  let probePromises = probeList.map(name => {
    return new Promise((resolve) => {
      const img = new Image();
      const path = project.folderPath + name;
      img.onload = () => resolve(path);
      img.onerror = () => resolve(null);
      img.src = path;
    });
  });

  // Render initial gallery immediately
  renderGallery();

  // If probed images are found, append them dynamically
  Promise.all(probePromises).then(results => {
    let added = false;
    results.forEach(validPath => {
      if (validPath && !currentGalleryImages.includes(validPath)) {
        currentGalleryImages.push(validPath);
        added = true;
      }
    });
    if (added) {
      renderGallery();
    }
  });

  const modal = document.getElementById('projectModal');
  if (modal) modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeProjectGallery = function() {
  const modal = document.getElementById('projectModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.navigateGallery = function(direction) {
  if (currentGalleryImages.length === 0) return;
  currentImageIndex = (currentImageIndex + direction + currentGalleryImages.length) % currentGalleryImages.length;
  updateGalleryDisplay();
};

window.selectGalleryImage = function(index) {
  if (index >= 0 && index < currentGalleryImages.length) {
    currentImageIndex = index;
    updateGalleryDisplay();
  }
};

function renderGallery() {
  const thumbnailsContainer = document.getElementById('galleryThumbnails');
  if (!thumbnailsContainer) return;
  
  thumbnailsContainer.innerHTML = '';

  currentGalleryImages.forEach((imgSrc, index) => {
    const thumb = document.createElement('div');
    thumb.className = `thumb-item ${index === currentImageIndex ? 'active' : ''}`;
    thumb.onclick = () => window.selectGalleryImage(index);

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `Thumbnail ${index + 1}`;

    thumb.appendChild(img);
    thumbnailsContainer.appendChild(thumb);
  });

  updateGalleryDisplay();
}

function updateGalleryDisplay() {
  const mainImg = document.getElementById('galleryMainImg');
  if (mainImg && currentGalleryImages.length > 0) {
    mainImg.src = currentGalleryImages[currentImageIndex];
  }

  const thumbs = document.querySelectorAll('.thumb-item');
  thumbs.forEach((thumb, idx) => {
    if (idx === currentImageIndex) {
      thumb.classList.add('active');
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      thumb.classList.remove('active');
    }
  });
}

// Global keyboard accessibility for modal gallery
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('projectModal');
  if (modal && modal.classList.contains('active')) {
    if (e.key === 'Escape') {
      window.closeProjectGallery();
    } else if (e.key === 'ArrowLeft') {
      window.navigateGallery(-1);
    } else if (e.key === 'ArrowRight') {
      window.navigateGallery(1);
    }
  }
});