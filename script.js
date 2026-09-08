/* =====================================================================
   script.js — GLOBAL SHARED SCRIPT
   Loaded on every page (before the page-specific .js file).
   Provides reusable helpers on window.Bunny:
     - initParticles()   golden particles + twinkling stars
     - initHearts(n)     floating hearts layer
     - initScrollReveal(selector)  fade/slide items in on scroll
     - typeText(el, text, speed, onDone)  typewriter effect
     - initMusicPlayer() background music toggle (persists via localStorage)
     - duckBackgroundMusic(bool)  lower music volume during voice message
     - fireConfetti(container, count)
     - fireFireworks(container, bursts)
     - fireSparkles(container, count)
   ===================================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Particles + Stars ---------------- */
  // Reads an optional data-particle-density="rich" attribute on <body>
  // to significantly increase counts on specific pages (index, cake)
  // without changing the default density used everywhere else.
  function initParticles() {
    var container = document.getElementById('bg-particles');
    if (!container) return;

    var isSmall = window.innerWidth < 600;
    var isRich = document.body.getAttribute('data-particle-density') === 'rich';

    var starCount = isRich ? (isSmall ? 40 : 65) : (isSmall ? 25 : 45);
    var particleCount = isRich ? (isSmall ? 42 : 75) : (isSmall ? 12 : 22);

    for (var i = 0; i < starCount; i++) {
      var star = document.createElement('span');
      var isBright = Math.random() < 0.22;
      star.className = 'bg-star' + (isBright ? ' bg-star-bright' : '');
      star.style.left = (Math.random() * 100) + '%';
      star.style.top = (Math.random() * 100) + '%';
      star.style.animationDelay = (Math.random() * 5) + 's';
      star.style.animationDuration = (2 + Math.random() * 3.5) + 's';
      if (isBright) {
        var starSize = 2.5 + Math.random() * 1.5;
        star.style.width = starSize + 'px';
        star.style.height = starSize + 'px';
      }
      container.appendChild(star);
    }

    for (var j = 0; j < particleCount; j++) {
      var p = document.createElement('span');
      var isGlow = Math.random() < 0.28;
      p.className = 'bg-gold-particle' + (isGlow ? ' bg-gold-particle-glow' : '');
      p.style.left = (Math.random() * 100) + '%';
      p.style.animationDelay = (Math.random() * 8) + 's';
      p.style.animationDuration = (7 + Math.random() * 11) + 's';
      var size = isGlow ? (3 + Math.random() * 3.5) : (1.5 + Math.random() * 3);
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      // Vary sideways drift per-particle for a less uniform, more organic rise
      p.style.setProperty('--drift-x', (Math.random() * 70 - 15) + 'px');
      p.style.opacity = (0.4 + Math.random() * 0.5).toFixed(2);
      container.appendChild(p);
    }
  }

  /* ---------------- Floating Hearts ---------------- */
  function initHearts(count) {
    var container = document.getElementById('bg-hearts');
    if (!container) return;
    var total = count || (window.innerWidth < 600 ? 8 : 14);
    for (var i = 0; i < total; i++) {
      var heart = document.createElement('span');
      heart.className = 'bg-heart';
      heart.textContent = '\u2764';
      heart.style.left = (Math.random() * 100) + '%';
      heart.style.animationDelay = (Math.random() * 10) + 's';
      heart.style.animationDuration = (9 + Math.random() * 8) + 's';
      heart.style.fontSize = (0.7 + Math.random() * 0.9) + 'rem';
      container.appendChild(heart);
    }
  }

  /* ---------------- Scroll Reveal ---------------- */
  function initScrollReveal(selector) {
    var items = document.querySelectorAll(selector || '.reveal-on-scroll');
    if (!items.length) return;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------- Typewriter ---------------- */
  function typeText(targetEl, text, speed, onDone) {
    if (!targetEl) return;
    if (prefersReducedMotion) {
      targetEl.textContent = text;
      if (onDone) onDone();
      return;
    }
    var i = 0;
    targetEl.textContent = '';
    function step() {
      if (i < text.length) {
        targetEl.textContent = text.slice(0, i + 1);
        i++;
        setTimeout(step, speed || 35);
      } else if (onDone) {
        onDone();
      }
    }
    step();
  }

  /* ---------------- Background Music ---------------- */
  function initMusicPlayer() {
    if (document.getElementById('bunny-music-toggle')) return;

    var audio = document.createElement('audio');
    audio.id = 'bunny-bg-music';
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'none';

    var source = document.createElement('source');
    source.src = 'music/background-music.mp3';
    source.type = 'audio/mpeg';
    audio.appendChild(source);
    document.body.appendChild(audio);

    var btn = document.createElement('button');
    btn.id = 'bunny-music-toggle';
    btn.className = 'music-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle background music');

    var musicOn = localStorage.getItem('bunnyMusicOn') === 'true';

    function updateIcon() {
      btn.textContent = musicOn ? '\u266A' : '\u266A\u0338';
      btn.classList.toggle('is-on', musicOn);
    }
    updateIcon();

    btn.addEventListener('click', function () {
      musicOn = !musicOn;
      localStorage.setItem('bunnyMusicOn', musicOn);
      if (musicOn) {
        audio.play().catch(function () { /* Autoplay blocked; user gesture will retry */ });
      } else {
        audio.pause();
      }
      updateIcon();
    });

    document.body.appendChild(btn);

    if (musicOn) {
      // Only auto-resume if the visitor had previously turned it on.
      audio.play().catch(function () { /* Browser blocked autoplay - ignore gracefully */ });
    }

    window.BUNNY_BG_MUSIC = audio;
  }

  function duckBackgroundMusic(shouldDuck) {
    var audio = window.BUNNY_BG_MUSIC || document.getElementById('bunny-bg-music');
    if (!audio) return;
    audio.volume = shouldDuck ? 0.05 : 0.35;
  }

  /* ---------------- Confetti ---------------- */
  function fireConfetti(container, count) {
    if (!container) return;
    var total = count || 60;
    var colors = ['#FFD700', '#F5D76E', '#FFFFFF', '#FFD700', '#F5D76E', '#2a2a2a'];
    for (var i = 0; i < total; i++) {
      (function () {
        var piece = document.createElement('span');
        piece.className = 'confetti-piece';
        piece.style.left = (Math.random() * 100) + '%';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = (Math.random() * 0.6) + 's';
        piece.style.animationDuration = (2.2 + Math.random() * 1.6) + 's';
        piece.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        container.appendChild(piece);
        setTimeout(function () { piece.remove(); }, 4500);
      })();
    }
  }

  /* ---------------- Fireworks ---------------- */
  function fireFireworks(container, bursts) {
    if (!container) return;
    var total = bursts || 5;
    for (var b = 0; b < total; b++) {
      (function (index) {
        setTimeout(function () {
          var burst = document.createElement('div');
          burst.className = 'firework-burst';
          burst.style.left = (15 + Math.random() * 70) + '%';
          burst.style.top = (15 + Math.random() * 40) + '%';
          burst.style.setProperty('--fw-color', Math.random() > 0.5 ? '#FFD700' : '#F5D76E');
          container.appendChild(burst);
          setTimeout(function () { burst.remove(); }, 1400);
        }, index * 350);
      })(b);
    }
  }

  /* ---------------- Sparkles ---------------- */
  function fireSparkles(container, count) {
    if (!container) return;
    var total = count || 16;
    for (var i = 0; i < total; i++) {
      (function () {
        var s = document.createElement('span');
        s.className = 'sparkle';
        s.style.left = (Math.random() * 100) + '%';
        s.style.top = (Math.random() * 100) + '%';
        s.style.animationDelay = (Math.random() * 0.4) + 's';
        container.appendChild(s);
        setTimeout(function () { s.remove(); }, 1400);
      })();
    }
  }

  /* ---------------- Cinematic Page Transitions ---------------- */
  // Intercepts clicks on internal .html links (back-nav + forward
  // buttons) and plays a brief fade/zoom-out before navigating, so
  // moving between pages feels like one continuous experience.
  function initPageTransitions() {
    var links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (link.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
        var href = link.getAttribute('href');
        if (!href) return;
        e.preventDefault();
        if (prefersReducedMotion) {
          window.location.href = href;
          return;
        }
        document.body.classList.add('is-transitioning');
        setTimeout(function () {
          window.location.href = href;
        }, 420);
      });
    });
  }

  /* ---------------- Ambient Cursor Glow ---------------- */
  // A soft, low-opacity gold glow that gently follows the pointer on
  // desktop (fine-pointer) devices, adding cinematic depth. Skipped on
  // touch devices and when reduced motion is requested.
  function initCursorGlow() {
    if (prefersReducedMotion) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    var raf = null;
    document.addEventListener('mousemove', function (e) {
      glow.classList.add('is-active');
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        glow.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px) translate(-50%, -50%)';
      });
    });
    document.addEventListener('mouseleave', function () {
      glow.classList.remove('is-active');
    });
  }

  /* ---------------- Golden Light Orbs ---------------- */
  function initLightOrbs(count) {
    var container = document.getElementById('bg-light-orbs');
    if (!container) return;
    var isSmall = window.innerWidth < 600;
    var isRich = document.body.getAttribute('data-particle-density') === 'rich';
    var total = count || (isRich ? (isSmall ? 6 : 10) : (isSmall ? 3 : 5));
    for (var i = 0; i < total; i++) {
      var orb = document.createElement('span');
      orb.className = 'light-orb';
      var size = (isRich ? 140 : 120) + Math.random() * 170;
      orb.style.width = size + 'px';
      orb.style.height = size + 'px';
      orb.style.left = (Math.random() * 90) + '%';
      orb.style.top = (Math.random() * 85) + '%';
      orb.style.setProperty('--orb-x', (Math.random() * 60 - 30) + 'px');
      orb.style.setProperty('--orb-y', (Math.random() * 60 - 40) + 'px');
      orb.style.animationDuration = (10 + Math.random() * 8) + 's';
      orb.style.animationDelay = (Math.random() * 6) + 's';
      container.appendChild(orb);
    }
  }

  /* ---------------- Balloons ---------------- */
  // Elegant black & gold CSS balloons, drifting gently near the edges.
  function initBalloons(count) {
    var container = document.getElementById('bg-balloons');
    if (!container) return;
    var isSmall = window.innerWidth < 600;
    var isRich = document.body.getAttribute('data-particle-density') === 'rich';
    var total = count || (isRich ? (isSmall ? 6 : 9) : (isSmall ? 4 : 7));
    var palette = ['gold', 'black', 'charcoal', 'gold', 'black', 'cream', 'charcoal'];

    for (var i = 0; i < total; i++) {
      var balloon = document.createElement('span');
      balloon.className = 'balloon ' + palette[i % palette.length];

      // Keep balloons weighted toward the edges so they never sit over
      // the central content column.
      var edgeZone = Math.random() < 0.5 ? Math.random() * 14 : 86 + Math.random() * 14;
      balloon.style.left = edgeZone + '%';

      var size = (isRich ? 52 : 46) + Math.random() * 32;
      balloon.style.width = size + 'px';
      balloon.style.height = (size * 1.22) + 'px';

      balloon.style.animationDuration = (6 + Math.random() * 4) + 's';
      balloon.style.animationDelay = (Math.random() * 4) + 's';

      // Spread balloons vertically WITHIN the visible viewport (5%-75%
      // from the top), so they're actually on-screen rather than
      // parked below the fold waiting for a wobble that never reaches
      // that far.
      balloon.style.top = (5 + Math.random() * 70) + '%';

      container.appendChild(balloon);
    }
  }

  /* ---------------- Golden Light Rays ---------------- */
  function initLightRays() {
    var container = document.getElementById('bg-light-rays');
    if (!container) return;
    container.style.display = 'block';
  }

  window.Bunny = {
    initParticles: initParticles,
    initHearts: initHearts,
    initScrollReveal: initScrollReveal,
    typeText: typeText,
    initMusicPlayer: initMusicPlayer,
    duckBackgroundMusic: duckBackgroundMusic,
    fireConfetti: fireConfetti,
    fireFireworks: fireFireworks,
    fireSparkles: fireSparkles,
    initLightOrbs: initLightOrbs,
    initBalloons: initBalloons,
    initLightRays: initLightRays,
    prefersReducedMotion: prefersReducedMotion
  };

  document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    initLightOrbs();
    initBalloons();
    initLightRays();
    initMusicPlayer();
    initPageTransitions();
    initCursorGlow();
    initWelcomePage(); // no-ops on any page other than index.html
  });

  /* =====================================================================
     WELCOME PAGE (index.html) LOGIC
     Runs only if the welcome page's elements are present in the DOM,
     so this file stays safe to include on every page.
     ===================================================================== */
  function initWelcomePage() {
    var headingEl = document.getElementById('typed-heading');
    if (!headingEl) return; // not on the welcome page

    var atmosphere = document.getElementById('welcome-atmosphere');
    var eyebrowLine = document.getElementById('eyebrow-line');
    var subtitleEl = document.getElementById('typed-subtitle');
    var subtitleTwo = document.getElementById('subtitle-two');
    var countdownWrap = document.getElementById('countdown-wrap');
    var enterBtn = document.getElementById('enter-btn');
    var headingCursor = document.getElementById('heading-cursor');
    var heroGlow = document.querySelector('.hero-glow');

    if (prefersReducedMotion) {
      // Skip the slow cinematic build-up entirely; show everything at once.
      if (atmosphere) atmosphere.classList.add('is-visible');
      if (heroGlow) heroGlow.classList.add('is-visible');
      if (eyebrowLine) eyebrowLine.classList.add('is-visible');
      headingEl.textContent = 'Happy Birthday, Bunny \u2764';
      if (headingCursor) headingCursor.style.display = 'none';
      subtitleEl.textContent = 'I made something special just for you...';
      if (subtitleTwo) subtitleTwo.classList.add('is-visible');
      if (countdownWrap) countdownWrap.classList.add('is-visible');
      if (enterBtn) {
        enterBtn.style.opacity = '1';
        enterBtn.style.pointerEvents = 'auto';
      }
      initCountdown();
      return;
    }

    // The full "website is slowly awakening" sequence:
    // 0.0s  black screen (nothing yet)
    // ~0.3s the atmosphere (stars/particles/orbs/balloons) begins fading in
    // ~1.8s a soft golden light appears behind the center
    // ~2.4s "A Gift From Your Little Angel" fades in
    // ~3.4s the main heading begins typing
    // ~5.0s the subtitle begins typing
    // ~7.0s the countdown fades in
    // ~8.3s the surprise button fades in with its glow
    setTimeout(function () {
      if (atmosphere) atmosphere.classList.add('is-visible');
    }, 300);

    setTimeout(function () {
      if (heroGlow) heroGlow.classList.add('is-visible');
    }, 1800);

    setTimeout(function () {
      if (eyebrowLine) eyebrowLine.classList.add('is-visible');
    }, 2400);

    setTimeout(function () {
      typeText(headingEl, 'Happy Birthday, Bunny \u2764', 55, function () {
        if (headingCursor) headingCursor.style.display = 'none';
      });
    }, 3400);

    setTimeout(function () {
      typeText(subtitleEl, 'I made something special just for you...', 40, function () {
        setTimeout(function () {
          if (subtitleTwo) subtitleTwo.classList.add('is-visible');
        }, 300);
      });
    }, 5000);

    setTimeout(function () {
      if (countdownWrap) countdownWrap.classList.add('is-visible');
    }, 7000);

    setTimeout(function () {
      if (enterBtn) {
        enterBtn.style.opacity = '1';
        enterBtn.style.pointerEvents = 'auto';
      }
    }, 8300);

    // A small golden particle burst when the surprise button is clicked,
    // just before the shared page-transition handler navigates away.
    if (enterBtn) {
      enterBtn.addEventListener('click', function () {
        fireSparkles(document.querySelector('.content'), 22);
      });
    }

    initCountdown();
  }

  function initCountdown() {
    var target = new Date('2026-09-09T00:00:00');
    var daysEl = document.getElementById('cd-days');
    var hoursEl = document.getElementById('cd-hours');
    var minsEl = document.getElementById('cd-minutes');
    var secsEl = document.getElementById('cd-seconds');
    var wrap = document.getElementById('countdown-wrap');
    if (!wrap) return;

    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
      var now = new Date();
      var diff = target - now;

      if (diff <= 0) {
        wrap.innerHTML = '<p class="countdown-today">\uD83C\uDF89 Today Is Your Day, Bunny! \uD83C\uDF89</p>';
        clearInterval(timer);
        return;
      }

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      var mins = Math.floor((diff / (1000 * 60)) % 60);
      var secs = Math.floor((diff / 1000) % 60);

      if (daysEl) daysEl.textContent = pad(days);
      if (hoursEl) hoursEl.textContent = pad(hours);
      if (minsEl) minsEl.textContent = pad(mins);
      if (secsEl) secsEl.textContent = pad(secs);
    }

    tick();
    var timer = setInterval(tick, 1000);
  }
})();
