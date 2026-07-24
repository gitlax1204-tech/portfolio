/* ==========================================================================
   Sri Laxman S - Portfolio Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- DOM Elements ---
  const navbar = document.querySelector('.navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const formFeedback = document.getElementById('form-feedback');
  const backToTopBtn = document.getElementById('back-to-top');

  /* ==========================================================================
     Navbar & Scroll Progress
     ========================================================================== */
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Toggle scrolled header state
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll progress bar width
    if (docHeight > 0) {
      const progressPercent = (scrollY / docHeight) * 100;
      scrollProgress.style.width = `${progressPercent}%`;
    }

    // Back to top button visibility
    if (scrollY > 500) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initial execution

  // Back to top click handler
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* ==========================================================================
     Mobile Navigation Toggle
     ========================================================================== */
  const toggleMobileMenu = () => {
    mobileNavToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
    document.body.classList.toggle('mobile-nav-active');
  };

  mobileNavToggle.addEventListener('click', toggleMobileMenu);

  // Close mobile navigation drawer when selecting any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksContainer.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  /* ==========================================================================
     Typed Text Effect
     ========================================================================== */
  const words = ['Frontend Developer', 'React Enthusiast', 'B.Sc. CS Student (AI & ML)'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextEl = document.getElementById('typed-text');
  let typeSpeed = 100;

  const type = () => {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Removing characters
      typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40; // Deleting is faster
    } else {
      // Adding characters
      typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    // Checking word completion states
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Wait time at complete word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  };

  // Start typing rotation
  if (typedTextEl) {
    setTimeout(type, 800);
  }

  /* ==========================================================================
     Intersection Observer - Scroll Reveal Animations
     ========================================================================== */
  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve once revealed to optimize performance
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* ==========================================================================
     Active Link Highlighting on Scroll
     ========================================================================== */
  const activeLinkObserverCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  const activeLinkObserver = new IntersectionObserver(activeLinkObserverCallback, {
    threshold: 0.35,
    rootMargin: '-80px 0px -40% 0px'
  });

  sections.forEach(section => {
    activeLinkObserver.observe(section);
  });

  /* ==========================================================================
     Contact Form Integration (Email Only)
     ========================================================================== */
  // Web3Forms Access Key: Go to https://web3forms.com to get your free key and paste it below
  const WEB3FORMS_ACCESS_KEY = "97ce6914-d1ca-4794-8d38-f62854ae9e29"; 

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Retrieve form inputs
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic front-end verification check
      if (!name || !email || !subject || !message) {
        showFeedback('Please fill out all fields.', 'error');
        return;
      }

      // Open WhatsApp chat in a new tab with pre-filled message
      const whatsappText = `Hello Laxman,

I am contacting you from your portfolio website.

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

      const whatsappUrl = `https://wa.me/919003889704?text=${encodeURIComponent(whatsappText)}`;
      window.open(whatsappUrl, '_blank');

      // Visual sending states
      formSubmitBtn.disabled = true;
      const btnSpan = formSubmitBtn.querySelector('span');
      const originalText = btnSpan.textContent;
      btnSpan.textContent = 'Sending Message...';

      // Attempt to send Email via Web3Forms
      if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== "YOUR_ACCESS_KEY_HERE") {
        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              access_key: WEB3FORMS_ACCESS_KEY,
              name: name,
              email: email,
              subject: subject,
              message: message,
              from_name: "Portfolio Contact Form"
            })
          });

          const result = await response.json();
          if (result.success) {
            showFeedback(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
            contactForm.reset();
          } else {
            console.error("Web3Forms error details:", result);
            showFeedback("Failed to send message. Please try again later.", "error");
          }
        } catch (error) {
          console.error("Web3Forms network error:", error);
          showFeedback("Network error. Please check your internet connection.", "error");
        }
      } else {
        console.warn("Web3Forms Access Key is not configured.");
        showFeedback("Contact form is not configured yet. Please set your Web3Forms Access Key.", "error");
      }

      // Reset button states
      formSubmitBtn.disabled = false;
      btnSpan.textContent = originalText;
      
      // Clear success notification after 8 seconds
      setTimeout(() => {
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback';
      }, 8000);
    });
  }

  const showFeedback = (text, type) => {
    formFeedback.textContent = text;
    formFeedback.className = `form-feedback ${type}`;
  };

  /* ==========================================================================
     Certificate Lightbox Modal Interaction
     ========================================================================== */
  const certModal = document.getElementById('cert-modal');
  const viewCertBtns = document.querySelectorAll('.view-cert-btn');
  
  if (certModal && viewCertBtns.length > 0) {
    const modalImg = document.getElementById('modal-cert-img');
    const modalIssuer = document.getElementById('modal-cert-issuer');
    const modalTitle = document.getElementById('modal-cert-title');
    const modalDesc = document.getElementById('modal-cert-desc');
    const modalDownload = document.getElementById('modal-cert-download');
    const modalOpen = document.getElementById('modal-cert-open');
    const modalCloseBtn = certModal.querySelector('.cert-modal-close');
    const modalOverlay = certModal.querySelector('.cert-modal-overlay');

    // Helper to calculate scrollbar width to prevent page shift when scrollbar disappears
    const getScrollbarWidth = () => {
      return window.innerWidth - document.documentElement.clientWidth;
    };

    const openModal = (btn) => {
      const certItem = btn.closest('.cert-item');
      if (!certItem) return;

      const imgPath = certItem.getAttribute('data-cert-img');
      const title = certItem.getAttribute('data-cert-title');
      const desc = certItem.getAttribute('data-cert-desc');
      const issuer = certItem.getAttribute('data-cert-issuer');

      if (modalImg) modalImg.src = imgPath;
      if (modalIssuer) modalIssuer.textContent = issuer;
      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;
      
      if (modalDownload) modalDownload.href = imgPath;
      if (modalOpen) modalOpen.href = imgPath;

      const sbWidth = getScrollbarWidth();
      document.documentElement.style.setProperty('--scrollbar-width', `${sbWidth}px`);
      document.body.classList.add('modal-open');
      certModal.classList.add('active');
    };

    const closeModal = () => {
      certModal.classList.remove('active');
      document.body.classList.remove('modal-open');
      
      setTimeout(() => {
        if (modalImg) modalImg.src = '';
      }, 300);
    };

    viewCertBtns.forEach(btn => {
      btn.addEventListener('click', () => openModal(btn));
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', closeModal);
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

});
