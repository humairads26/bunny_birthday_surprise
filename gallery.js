/* =====================================================================
   gallery.js — Page 5: A Few Moments slideshow logic
   V3: cinematic "Memory Card" caption reveal. Each active slide's
   memory number, label, divider, and caption fade in on their own
   staggered beats (driven here, styled in gallery.css). The final
   photo (07/07) gets a slower, more lingering reveal and a longer
   dwell time before the slideshow moves on.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dotsContainer = document.getElementById('slide-dots');
  var prevBtn = document.getElementById('prev-slide');
  var nextBtn = document.getElementById('next-slide');
  var playPauseBtn = document.getElementById('play-pause');
  var progressBar = document.getElementById('slideshow-progress-bar');

  if (!slides.length) return;

  var current = 0;
  var isPlaying = true;
  var advanceTimeoutId = null;
  var revealTimeoutIds = [];

  var DEFAULT_DELAY = 3500;
  var FINAL_DELAY = 9500; // extended further to allow the two closing lines to be read

  function delayForSlide(index) {
    return slides[index] && slides[index].classList.contains('slide-final') ? FINAL_DELAY : DEFAULT_DELAY;
  }

  // Build the dot indicators
  slides.forEach(function (_, i) {
    var dot = document.createElement('span');
    dot.className = 'slide-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('data-index', i);
    dotsContainer.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsContainer.children);

  function clearRevealTimeouts() {
    revealTimeoutIds.forEach(function (id) { clearTimeout(id); });
    revealTimeoutIds = [];
  }

  function resetMemoryCard(slide) {
    var card = slide.querySelector('.memory-card');
    if (!card) return;
    var revealed = card.querySelectorAll('.is-in');
    revealed.forEach(function (el) { el.classList.remove('is-in'); });
  }

  // Stages the memory-card reveal: number -> label -> divider -> caption
  // (with its glow). The final photo gets a slower, more spaced-out
  // version of the same sequence.
  function playMemoryReveal(slide) {
    var card = slide.querySelector('.memory-card');
    if (!card) return;

    var isFinal = slide.classList.contains('slide-final');
    var number = card.querySelector('.memory-number');
    var label = card.querySelector('.memory-label');
    var divider = card.querySelector('.memory-divider');
    var caption = card.querySelector('.memory-caption');
    var extraLine1 = card.querySelector('#memory-final-line-1');
    var extraLine2 = card.querySelector('#memory-final-line-2');

    if (Bunny.prefersReducedMotion) {
      if (number) number.classList.add('is-in');
      if (label) label.classList.add('is-in');
      if (divider) divider.classList.add('is-in');
      if (caption) caption.classList.add('is-in');
      if (extraLine1) extraLine1.classList.add('is-in');
      if (extraLine2) extraLine2.classList.add('is-in');
      return;
    }

    var tNumber = isFinal ? 1100 : 850;
    var tLabel = isFinal ? 1700 : 1250;
    var tDivider = isFinal ? 2300 : 1600;
    var tCaption = isFinal ? 2700 : 1850;

    revealTimeoutIds.push(setTimeout(function () {
      if (number) number.classList.add('is-in');
    }, tNumber));

    revealTimeoutIds.push(setTimeout(function () {
      if (label) label.classList.add('is-in');
    }, tLabel));

    revealTimeoutIds.push(setTimeout(function () {
      if (divider) divider.classList.add('is-in');
    }, tDivider));

    revealTimeoutIds.push(setTimeout(function () {
      if (caption) caption.classList.add('is-in');
    }, tCaption));

    // The final photo gets two extra closing lines, each appearing
    // about 2 seconds after the previous one — using the exact same
    // caption styling as the rest of the reveal.
    if (isFinal) {
      revealTimeoutIds.push(setTimeout(function () {
        if (extraLine1) extraLine1.classList.add('is-in');
      }, tCaption + 2000));

      revealTimeoutIds.push(setTimeout(function () {
        if (extraLine2) extraLine2.classList.add('is-in');
      }, tCaption + 4000));
    }
  }

  function showSlide(index) {
    clearRevealTimeouts();
    resetMemoryCard(slides[current]);
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    playMemoryReveal(slides[current]);
  }

  function nextSlide() { showSlide(current + 1); }
  function prevSlide() { showSlide(current - 1); }

  function runProgressBar() {
    if (!progressBar) return;
    var delay = delayForSlide(current);
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    // Force reflow so the transition restarts cleanly each cycle
    void progressBar.offsetWidth;
    progressBar.style.transition = 'width ' + delay + 'ms linear';
    progressBar.style.width = '100%';
  }

  function resetProgressBar() {
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
  }

  // Uses a self-rescheduling timeout (rather than setInterval) so each
  // slide — notably the final one — can have its own dwell duration.
  function scheduleNext() {
    if (advanceTimeoutId) clearTimeout(advanceTimeoutId);
    if (Bunny.prefersReducedMotion) { resetProgressBar(); return; }
    runProgressBar();
    var delay = delayForSlide(current);
    advanceTimeoutId = setTimeout(function () {
      nextSlide();
      scheduleNext();
    }, delay);
  }
  function startAuto() { scheduleNext(); }
  function stopAuto() {
    if (advanceTimeoutId) clearTimeout(advanceTimeoutId);
    advanceTimeoutId = null;
    resetProgressBar();
  }

  nextBtn.addEventListener('click', function () { nextSlide(); if (isPlaying) startAuto(); else resetProgressBar(); });
  prevBtn.addEventListener('click', function () { prevSlide(); if (isPlaying) startAuto(); else resetProgressBar(); });

  dotsContainer.addEventListener('click', function (e) {
    var target = e.target.closest('.slide-dot');
    if (!target) return;
    showSlide(parseInt(target.getAttribute('data-index'), 10));
    if (isPlaying) startAuto(); else resetProgressBar();
  });

  playPauseBtn.addEventListener('click', function () {
    isPlaying = !isPlaying;
    playPauseBtn.innerHTML = isPlaying ? '&#10073;&#10073;' : '&#9654;';
    playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause slideshow' : 'Play slideshow');
    if (isPlaying) { startAuto(); } else { stopAuto(); }
  });

  // Trigger the reveal sequence for the first slide too, not just
  // slides reached later via auto-advance or navigation.
  playMemoryReveal(slides[current]);
  startAuto();
});
