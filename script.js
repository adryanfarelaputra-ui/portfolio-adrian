/* ==========================================================================
   PORTFOLIO INTERACTIVE LOGIC (ADRIAN.DEV)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Elements
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  const navItems = document.querySelectorAll('.nav-link');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const contactForm = document.getElementById('contactForm');
  const modal = document.getElementById('projectModal');
  const modalClose = document.querySelector('.modal-close');
  const toastContainer = document.getElementById('toastContainer');

  // 2. Theme Switcher (Dark / Light Mode)
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
      icon.className = 'fas fa-moon';
    } else {
      icon.className = 'fas fa-sun';
    }
  }

  // 3. Sticky Navbar & Active Section Highlighting
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy for nav links
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSection}`) {
        item.classList.add('active');
      }
    });
  });

  // 4. Mobile Menu Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });
  }

  // Close mobile menu when link clicked
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileToggle.querySelector('i').className = 'fas fa-bars';
      }
    });
  });

  // 5. Portfolio Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 6. Project Quick View Modal
  const projectData = {
    1: {
      title: "LuxMarket - Platform E-Commerce Modern",
      category: "Web App & E-Commerce",
      image: "images/project1.png",
      desc: "LuxMarket adalah platform toko online berkinerja tinggi dengan UI modern, dukungan pembayaran Stripe/Midtrans, keranjang belanja real-time, dan panel admin analitik yang responsif.",
      tech: ["HTML5", "CSS3", "JavaScript ES6+", "Node.js", "Stripe API"],
      demoUrl: "#",
      codeUrl: "#"
    },
    2: {
      title: "SaaS Analytics & Performance Dashboard",
      category: "Web Application & SaaS",
      image: "images/project2.png",
      desc: "Dashboard analitik bisnis SaaS yang menyajikan visualisasi data real-time, statistik transaksi, manajemen pengguna, serta ekspor laporan otomatis dengan tampilan glassmorphic.",
      tech: ["React.js", "Chart.js", "Vanilla CSS", "REST API", "PostgreSQL"],
      demoUrl: "#",
      codeUrl: "#"
    },
    3: {
      title: "FinTech Mobile Banking Design & App",
      category: "Mobile App & UI/UX",
      image: "images/project3.png",
      desc: "Desain dan konseptualisasi aplikasi dompet digital modern dengan fitur transfer instan, pemindaian QR code, manajemen anggaran bulanan, dan sistem keamanan biometric UI.",
      tech: ["UI/UX Design", "Figma", "HTML/CSS", "JavaScript Mobile UI"],
      demoUrl: "#",
      codeUrl: "#"
    }
  };

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-id');
      const data = projectData[projectId];

      if (data) {
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalCategory').textContent = data.category;
        document.getElementById('modalImg').src = data.image;
        document.getElementById('modalDesc').textContent = data.desc;
        
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = data.tech.map(t => `<span class="project-tag">${t}</span>`).join('');

        modal.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // 7. Contact Form Handling with Toast
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const message = document.getElementById('contactMessage').value;

      if (!name || !email || !message) {
        showToast('Mohon lengkapi semua kolom form.', 'warning');
        return;
      }

      // Simulate sending logic
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast(`Terima kasih ${name}! Pesan Anda berhasil terkirim.`, 'success');
      }, 1500);
    });
  }

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  // 8. Scroll Reveal & Animated Skill Progress
  const observerOptions = {
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger skill progress bars if inside skill section
        if (entry.target.classList.contains('skill-category')) {
          const bars = entry.target.querySelectorAll('.skill-bar-fill');
          bars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
          });
        }

        // Trigger Counter Animation
        if (entry.target.classList.contains('hero-stats')) {
          animateCounters();
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .skill-category, .hero-stats').forEach(el => {
    revealObserver.observe(el);
  });

  // Animated Counter Function
  let counterAnimated = false;
  function animateCounters() {
    if (counterAnimated) return;
    counterAnimated = true;

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1500;
      const step = Math.ceil(target / (duration / 16));

      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, 16);
    });
  }
});
