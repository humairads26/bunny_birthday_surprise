/* =====================================================================
   facts.js — Page 3: How Well Do I Know You? logic
   Fact cards fade/slide in one by one as the user scrolls, with a
   tiny sparkle burst the moment each appears. The horse/parrot
   discovery cards play their own paced sequence separately.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initCardReveal();
  initExtraSequence();
  initClosingLines();
});

/* Reveal each fact card one at a time as it scrolls into view, with a
   tiny sparkle burst the moment it appears. Scoped to the original
   grid only — the horse/parrot discovery cards have their own paced
   sequence below. */
function initCardReveal() {
  var cards = document.querySelectorAll('.facts-grid .fact-card');
  if (!cards.length) return;

  cards.forEach(function (card, index) {
    card.style.transitionDelay = (index * 0.06) + 's';
  });

  if (Bunny.prefersReducedMotion || !('IntersectionObserver' in window)) {
    cards.forEach(function (card) { card.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        Bunny.fireSparkles(entry.target, 5);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  cards.forEach(function (card) { observer.observe(card); });
}

/* The horse + parrot "little discoveries" sequence: a teaser line,
   then the horse card, then another teaser, then the parrot card,
   then a closing line — each paced with its own pause, triggered once
   the section scrolls into view. */
function initExtraSequence() {
  var section = document.getElementById('facts-extra');
  var line1 = document.getElementById('extra-line-1');
  var horseCard = document.getElementById('horse-card');
  var line2 = document.getElementById('extra-line-2');
  var parrotCard = document.getElementById('parrot-card');
  var line3 = document.getElementById('extra-line-3');
  if (!section) return;

  var hasPlayed = false;

  function revealCard(card) {
    if (!card) return;
    card.classList.add('is-visible');
    Bunny.fireSparkles(card, 8);
  }

  function playSequence() {
    if (hasPlayed) return;
    hasPlayed = true;

    if (line1) line1.classList.add('is-visible');

    setTimeout(function () { revealCard(horseCard); }, 900);

    setTimeout(function () {
      if (line2) line2.classList.add('is-visible');
    }, 2000);

    setTimeout(function () { revealCard(parrotCard); }, 2900);

    setTimeout(function () {
      if (line3) line3.classList.add('is-visible');
    }, 4000);
  }

  if (Bunny.prefersReducedMotion || !('IntersectionObserver' in window)) {
    if (line1) line1.classList.add('is-visible');
    if (line2) line2.classList.add('is-visible');
    if (line3) line3.classList.add('is-visible');
    if (horseCard) horseCard.classList.add('is-visible');
    if (parrotCard) parrotCard.classList.add('is-visible');
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        playSequence();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(section);
}

/* Stage the two closing lines with a brief pause, then the button. */
function initClosingLines() {
  var footer = document.getElementById('facts-footer');
  var line1 = document.getElementById('facts-line-1');
  var line2 = document.getElementById('facts-line-2');
  var nextBtn = document.getElementById('facts-next');
  if (!footer) return;

  var hasPlayed = false;

  function playSequence() {
    if (hasPlayed) return;
    hasPlayed = true;
    if (line1) line1.classList.add('is-visible');
    setTimeout(function () {
      if (line2) line2.classList.add('is-visible');
    }, 1500);
    setTimeout(function () {
      if (nextBtn) nextBtn.classList.add('is-visible');
    }, 2400);
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
