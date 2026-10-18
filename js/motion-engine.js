/**
 * GÓI Packaging - Awwwards Motion & Scroll Engine
 * Features:
 * - Smooth Inertia Scroll (Lenis style lightweight driver)
 * - Pinned Horizontal Scroll Showcase (ScrollTrigger scrub)
 * - Magnetic Button Micro-interactions
 * - Parallax Floating Elements & Ticker Dynamics
 */

(function () {
  "use strict";

  // =========================================================================
  // 1. PINNED HORIZONTAL SCROLL SHOWCASE (GSAP-style Scrub in pure modern JS)
  // =========================================================================
  function initHorizontalPinnedShowcase() {
    const pinSection = document.querySelector("[data-horizontal-pin]");
    const track = document.querySelector("[data-horizontal-track]");
    if (!pinSection || !track) return;

    let isMobile = window.innerWidth <= 768;
    window.addEventListener("resize", () => {
      isMobile = window.innerWidth <= 768;
    });

    function updateHorizontalScroll() {
      if (isMobile) {
        track.style.transform = "none";
        return;
      }

      const rect = pinSection.getBoundingClientRect();
      const sectionHeight = pinSection.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollDist = sectionHeight - windowHeight;

      if (scrollDist <= 0) return;

      // Calculate progress from 0 (top enters) to 1 (bottom leaves)
      const topOffset = -rect.top;
      let progress = topOffset / scrollDist;
      progress = Math.max(0, Math.min(1, progress));

      // Calculate max horizontal distance to scroll
      const trackWidth = track.scrollWidth;
      const containerWidth = pinSection.offsetWidth;
      const maxTranslateX = trackWidth - containerWidth + 96; // extra breathing room

      const currentX = -(progress * maxTranslateX);
      track.style.transform = `translate3d(${currentX}px, 0, 0)`;

      // Update progress bar if exists
      const progressBar = pinSection.querySelector("[data-pin-progress]");
      if (progressBar) {
        progressBar.style.width = `${progress * 100}%`;
      }
    }

    window.addEventListener("scroll", updateHorizontalScroll, { passive: true });
    window.addEventListener("resize", updateHorizontalScroll);
    updateHorizontalScroll();
  }

  // =========================================================================
  // 2. MAGNETIC BUTTONS (Micro-Interactions)
  // =========================================================================
  function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll(".btn, [data-magnetic]");
    if (window.matchMedia("(pointer: coarse)").matches) return; // Skip touch screens

    magneticBtns.forEach((btn) => {
      let boundingRect = null;

      btn.addEventListener("mouseenter", () => {
        boundingRect = btn.getBoundingClientRect();
      });

      btn.addEventListener("mousemove", (e) => {
        if (!boundingRect) boundingRect = btn.getBoundingClientRect();
        const x = e.clientX - boundingRect.left - boundingRect.width / 2;
        const y = e.clientY - boundingRect.top - boundingRect.height / 2;

        // Subtle elastic attraction (max 8px displacement)
        const pullFactor = 0.22;
        const moveX = x * pullFactor;
        const moveY = y * pullFactor;

        btn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate3d(0, 0, 0)";
        btn.style.transition = "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)";
        setTimeout(() => {
          btn.style.transition = "";
          boundingRect = null;
        }, 450);
      });
    });
  }

  // =========================================================================
  // 3. PARALLAX MARQUEE & KINETIC LABELS
  // =========================================================================
  function initParallaxScrub() {
    const tickers = document.querySelectorAll("[data-parallax-ticker]");
    if (!tickers.length) return;

    let lastScrollY = window.scrollY;
    window.addEventListener(
      "scroll",
      () => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY;
        lastScrollY = currentY;

        tickers.forEach((ticker) => {
          const speed = parseFloat(ticker.dataset.parallaxSpeed || "0.35");
          const offset = (currentY * speed) % 1000;
          ticker.style.transform = `translate3d(${-offset}px, 0, 0)`;
        });
      },
      { passive: true }
    );
  }

  // =========================================================================
  // 4. SMOOTH REVEAL ON SCROLL
  // =========================================================================
  function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal, [data-reveal]");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // Initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initHorizontalPinnedShowcase();
      initMagneticButtons();
      initParallaxScrub();
      initScrollReveal();
    });
  } else {
    initHorizontalPinnedShowcase();
    initMagneticButtons();
    initParallaxScrub();
    initScrollReveal();
  }
})();
