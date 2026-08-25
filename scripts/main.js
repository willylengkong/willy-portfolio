/**
 * Main Motion & Interaction Controller
 * Willy Lengkong — Modern Portfolio Experience
 */

// Reset scroll position to top (Home / Hero) on page load and refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);

  // Preloader Logic (Cinematic Pacing & Continuous Seamless Sync)
  const preloader = document.getElementById('preloader');
  const progressFill = document.getElementById('preloaderFill');
  const progressNum = document.getElementById('preloaderNum');
  const brandChars = document.querySelectorAll('.preloader-char');
  const titleGlow = document.querySelector('.preloader-title-glow');

  let currentProgress = 0;
  const loadDuration = 1850; // ms (cinematic fluid pace)
  const startTime = performance.now();

  function updatePreloader(time) {
    const elapsed = time - startTime;
    const rawProgress = Math.min(elapsed / loadDuration, 1);
    
    // Smooth deceleration ease for progress bar
    const easeProgress = Math.pow(rawProgress, 0.9);
    currentProgress = Math.min(Math.round(easeProgress * 100), 100);

    if (progressFill) progressFill.style.width = currentProgress + '%';
    if (progressNum) progressNum.textContent = currentProgress + '%';

    // Synchronously reveal, unblur, and float the signature text in harmony with the loading bar
    const textPhase = Math.min(Math.max((rawProgress - 0.08) / 0.55, 0), 1);
    
    brandChars.forEach(ch => {
      ch.style.opacity = textPhase.toFixed(3);
      const yOffset = (22 * (1 - textPhase)).toFixed(2);
      const scaleVal = (0.96 + 0.04 * textPhase).toFixed(3);
      const blurVal = (4 * (1 - textPhase)).toFixed(2);
      ch.style.transform = `translateY(${yOffset}px) scale(${scaleVal})`;
      ch.style.filter = `blur(${blurVal}px)`;
    });

    if (titleGlow) {
      titleGlow.style.opacity = textPhase.toFixed(3);
    }

    if (rawProgress < 1) {
      requestAnimationFrame(updatePreloader);
    } else {
      setTimeout(finishPreloader, 400);
    }
  }

  requestAnimationFrame(updatePreloader);

  function finishPreloader() {
    if (!preloader) return;
    
    preloader.style.transition = 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
    preloader.style.opacity = '0';
    preloader.style.transform = 'scale(1.02)';
    preloader.style.pointerEvents = 'none';

    setTimeout(() => {
      preloader.style.display = 'none';
      initLenisAndGSAP();
    }, 700);
  }

  // Lenis & GSAP Initializer (Seamless & Smooth 60+ FPS)
  function initLenisAndGSAP() {
    const header = document.querySelector('header');
    if (header) header.classList.add('is-visible');

    let lenis = null;
    
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.8,
      });

      // Ensure view begins at absolute top Hero if no specific hash was passed
      if (!window.location.hash || window.location.hash === '#home') {
        lenis.scrollTo(0, { immediate: true });
      }

      // Single dedicated RAF loop
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Smooth scroll for all anchor navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href');
          if (targetId && targetId !== '#') {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
              e.preventDefault();
              lenis.scrollTo(targetEl, { offset: -70, duration: 1.0 });
            }
          }
        });
      });
    }

    // GSAP Hero Entry Animation (Smooth .to() from CSS initial states)
    if (typeof gsap !== 'undefined') {
      if (typeof ScrollTrigger !== 'undefined' && lenis) {
        gsap.registerPlugin(ScrollTrigger);
        lenis.on('scroll', ScrollTrigger.update);
      }

      // Smoothly animate hero items in sequence with cinematic delay
      gsap.to('.hero-anim', {
        opacity: 1,
        y: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.15
      });

      // Section animations on scroll
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.utils.toArray('.reveal-on-scroll').forEach((el) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.75,
            ease: 'power3.out'
          });
        });
      }
    }

    // Initialize Animated Counters
    initCounters();
  }

  // Custom Cursor
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorGlow = document.querySelector('.cursor-glow');

  if (cursorDot && cursorGlow) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let glowX = mouseX, glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderCursor() {
      dotX += (mouseX - dotX) * 0.45;
      dotY += (mouseY - dotY) * 0.45;
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;

      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;

      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Magnetic interaction on hoverables
    const hoverables = document.querySelectorAll('a, button, .project-card, .skill-box-card, .hero-char');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '420px';
        cursorGlow.style.height = '420px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(22, 135, 255, 0.22) 0%, transparent 70%)';
      });
      el.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '320px';
        cursorGlow.style.height = '320px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(22, 135, 255, 0.12) 0%, transparent 70%)';
      });
    });

    // Interactive WILLY character ripple physics
    const heroChars = document.querySelectorAll('.hero-char');
    heroChars.forEach((char, idx) => {
      char.addEventListener('mouseenter', () => {
        char.style.transition = 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), filter 0.15s ease';
        char.style.transform = 'translateY(-12px) scale(1.1) rotate(' + ((idx % 2 === 0 ? 1 : -1) * 2) + 'deg)';
        if (heroChars[idx - 1]) {
          heroChars[idx - 1].style.transform = 'translateY(-5px) scale(1.03)';
        }
        if (heroChars[idx + 1]) {
          heroChars[idx + 1].style.transform = 'translateY(-5px) scale(1.03)';
        }
      });

      char.addEventListener('mouseleave', () => {
        char.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease';
        char.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        if (heroChars[idx - 1]) {
          heroChars[idx - 1].style.transform = 'translateY(0) scale(1)';
        }
        if (heroChars[idx + 1]) {
          heroChars[idx + 1].style.transform = 'translateY(0) scale(1)';
        }
      });
    });
  }

  // Navigation Active State on Scroll
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });

    // Scroll-reactive continuous spine glow
    const expSpineBeam = document.getElementById('expSpineBeam');
    const expFeedWrap = document.querySelector('.exp-feed-wrap');
    if (expSpineBeam && expFeedWrap) {
      const rect = expFeedWrap.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
        expSpineBeam.style.filter = `drop-shadow(0 0 ${10 + progress * 10}px rgba(53, 160, 255, 0.9))`;
      }
    }
  }, { passive: true });

  // Mobile Drawer Toggle
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (burgerBtn && mobileDrawer) {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('open');
      mobileDrawer.classList.toggle('open');
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burgerBtn.classList.remove('open');
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // Animated Numbers for Stats
  function initCounters() {
    const counterElements = document.querySelectorAll('[data-counter-target]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.counterTarget);
          const decimals = parseInt(el.dataset.counterDecimals || '0');
          const suffix = el.dataset.counterSuffix || '';
          const prefix = el.dataset.counterPrefix || '';
          const duration = 1400;
          const start = performance.now();

          function step(time) {
            const progress = Math.min((time - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const val = target * ease;
            el.textContent = `${prefix}${val.toFixed(decimals)}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
            }
          }

          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counterElements.forEach(el => observer.observe(el));
  }

  // Toast Notification Utility
  const toastBox = document.getElementById('toast-box');
  const toastMessage = document.getElementById('toastMessage');

  window.showToast = function(msg) {
    if (!toastBox || !toastMessage) return;
    toastMessage.textContent = msg;
    toastBox.classList.add('show');
    setTimeout(() => {
      toastBox.classList.remove('show');
    }, 2800);
  };

  // Copy Email to Clipboard
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'willylengkongg@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        window.showToast('Copied email to clipboard: ' + email);
      });
    });
  });

  // Contact Form Submission (Web3Forms Direct API Delivery + Fallback)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('cfSubmitBtn') || contactForm.querySelector('button[type="submit"]');
      const origBtnContent = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spinPulse 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10"/>
        </svg>
        <span>Sending Message...</span>
      `;

      const formData = new FormData(contactForm);
      const jsonObject = Object.fromEntries(formData.entries());
      const jsonString = JSON.stringify(jsonObject);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: jsonString
        });

        const result = await response.json();

        if (response.status === 200 && result.success) {
          submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
          submitBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Message Sent!</span>
          `;
          window.showToast('✅ Thank you! Your message has been sent directly to Willy\'s inbox.');
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (error) {
        console.error('Web3Forms Error:', error);
        window.showToast('Opening your email client to deliver message...');

        // Fallback to mailto if network error
        const name = document.getElementById('cfName').value.trim();
        const email = document.getElementById('cfEmail').value.trim();
        const subject = document.getElementById('cfSubject').value.trim() || 'Strategic Project Inquiry';
        const message = document.getElementById('cfMessage').value.trim();
        const formattedBody = `Halo Willy,\n\n${message}\n\n--------------------------\nFrom: ${name}\nEmail: ${email}`;
        const mailtoUrl = `mailto:willylengkongg@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;

        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 500);
      } finally {
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.innerHTML = origBtnContent;
        }, 3200);
      }
    });
  }

  // Dynamic Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Design System & Spec Modal Controller
  const openDsBtn = document.getElementById('openDesignSystemBtn');
  const closeDsBtn = document.getElementById('closeDesignSystemBtn');
  const dsModal = document.getElementById('designSystemModal');

  if (openDsBtn && dsModal) {
    function openModal() {
      dsModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      dsModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    openDsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });

    if (closeDsBtn) {
      closeDsBtn.addEventListener('click', closeModal);
    }

    dsModal.addEventListener('click', (e) => {
      if (e.target === dsModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dsModal.classList.contains('open')) {
        closeModal();
      }
    });

    // Swatch 1-Click Copy Hex Code
    const swatchChips = dsModal.querySelectorAll('[data-copy-hex]');
    swatchChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const hex = chip.dataset.copyHex;
        if (hex) {
          navigator.clipboard.writeText(hex).then(() => {
            window.showToast(`🎨 Copied color ${hex} to clipboard!`);
          });
        }
      });
    });
  }
});
