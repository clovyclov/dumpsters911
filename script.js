/**
 * Dumpsters 911 - Client-Side JavaScript
 * Handles navigation, interactive accordions, testimonial slider, and quote form submission.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  initTestimonialsSlider();
  initQuoteForm();
});

/* ----------------------------------------------------
   1. Mobile Menu & Navigation
   ---------------------------------------------------- */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
    });

    // Mobile dropdown toggle
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      const dropdown = item.querySelector('.dropdown-menu');

      if (dropdown && link) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            item.classList.toggle('active');
          }
        });
      }
    });

    // Close menu on link click
    document.querySelectorAll('.dropdown-item').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
      });
    });
  }
}

/* ----------------------------------------------------
   2. FAQ Accordion Component
   ---------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');

    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other items (optional: accordion behavior)
        // faqItems.forEach(other => other.classList.remove('active'));

        if (!isOpen) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });
}

/* ----------------------------------------------------
   3. Testimonials Carousel / Slider
   ---------------------------------------------------- */
function initTestimonialsSlider() {
  const slider = document.getElementById('testimonialsSlider');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dotsContainer = document.getElementById('sliderDots');

  if (!slider) return;

  const cards = slider.querySelectorAll('.testimonial-card');
  const totalCards = cards.length;
  let currentIndex = 0;

  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, totalCards - getCardsPerView());
  }

  // Create pagination dots
  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const numDots = maxIndex() + 1;

    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const cardsPerView = getCardsPerView();
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 30; // 30px gap in CSS
    const moveAmount = (cardWidth + gap) * currentIndex;

    slider.style.transform = `translateX(-${moveAmount}px)`;

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  function goToSlide(index) {
    currentIndex = Math.min(Math.max(0, index), maxIndex());
    updateSlider();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < maxIndex()) {
        currentIndex++;
      } else {
        currentIndex = 0; // loop back
      }
      updateSlider();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = maxIndex();
      }
      updateSlider();
    });
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    createDots();
    if (currentIndex > maxIndex()) currentIndex = maxIndex();
    updateSlider();
  });

  // Auto-play feature
  let autoSlideTimer = setInterval(() => {
    if (currentIndex < maxIndex()) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlider();
  }, 6000);

  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
  slider.addEventListener('mouseleave', () => {
    autoSlideTimer = setInterval(() => {
      if (currentIndex < maxIndex()) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateSlider();
    }, 6000);
  });

  createDots();
  updateSlider();
}

/* ----------------------------------------------------
   4. Quote & Contact Form Submission Handler
   ---------------------------------------------------- */
function initQuoteForm() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('.btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Redirecting to Booking Page...';
      }

      const currentUrl = window.location.href.toLowerCase();
      
      // 1. Google Ads Booking Page -> Redirect to Google Ads Thank You Page
      if (currentUrl.includes('book-online-mi')) {
        if (submitBtn) submitBtn.innerHTML = 'Processing Confirmation...';
        setTimeout(() => {
          window.location.href = '../thank-you-mi/';
        }, 400);
        return;
      }

      // 2. Main Booking Page -> Redirect to Main Thank You Page
      if (currentUrl.includes('book-now')) {
        if (submitBtn) submitBtn.innerHTML = 'Processing Confirmation...';
        setTimeout(() => {
          window.location.href = '../thank-you/';
        }, 400);
        return;
      }

      // 3. Google Ads Landing Page -> Redirect to Google Ads Booking Page
      if (currentUrl.includes('dumpster-rental-mi')) {
        setTimeout(() => {
          window.location.href = '../book-online-mi/';
        }, 400);
        return;
      }

      // 4. All Other Lead Forms Across the Site -> Redirect to /book-now/
      let targetUrl = 'book-now/';
      const currentPath = window.location.pathname.toLowerCase();

      if (currentPath.includes('/residential-dumpster-rentals/') ||
          currentPath.includes('/commercial-dumpster-rentals/') ||
          currentPath.includes('/construction-debris-removal/') ||
          currentPath.includes('/yard-debris-dumpster-rental/') ||
          currentPath.includes('/junk-removal-dumpsters/') ||
          currentPath.includes('/pricing-and-sizes/')) {
        targetUrl = '../book-now/';
      }

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 400);
    });
  });
}
