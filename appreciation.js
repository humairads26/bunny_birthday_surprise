/* =====================================================================
   appreciation.js — Page 6: Things I Appreciate About You logic
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  Bunny.initHearts(7); // kept sparse and subtle, not filling the screen
  Bunny.initScrollReveal('.reveal-on-scroll');

  var cards = document.querySelectorAll('.appreciation-card');
  cards.forEach(function (card, index) {
    card.style.transitionDelay = (index * 0.05) + 's';
  });

  initClosingSequence();
});

/* Reveal the closing moment (dim + two lines + button) with a brief
   pause between lines, once the footer scrolls into view. Only plays
   once. */
function initClosingSequence() {
  var footer = document.getElementById('appreciation-footer');
  var dim = document.getElementById('appreciation-dim');
  var line1 = document.getElementById('footer-line-1');
  var line2 = document.getElementById('footer-line-2');
  var line3 = document.getElementById('footer-line-3');
  var nextBtn = document.getElementById('appreciation-next');
  if (!footer) return;

  var hasPlayed = false;

  function playSequence() {
    if (hasPlayed) return;
    hasPlayed = true;

    if (dim) dim.classList.add('is-active');

    setTimeout(function () {
      if (line1) line1.classList.add('is-visible');
    }, 300);

    setTimeout(function () {
      if (line2) line2.classList.add('is-visible');
    }, 1800);

    setTimeout(function () {
      if (line3) line3.classList.add('is-visible');
    }, 4200);

    setTimeout(function () {
      if (nextBtn) nextBtn.classList.add('is-visible');
    }, 5000);
  }

  if (Bunny.prefersReducedMotion || !('IntersectionObserver' in window)) {
    playSequence();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        playSequence();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  observer.observe(footer);
}
