/* =====================================================================
   cake.js — Page 4: Cake Cutting logic
   V4: staged cut sequence following an explicit 0.0-2.0s timeline —
   button reacts, cake scales, candles brighten, golden light expands,
   sparkles burst, confetti falls, fireworks appear, balloons rise,
   particles intensify, then everything settles before the wish text.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var cutBtn = document.getElementById('cut-btn');
  var cake = document.getElementById('cake');
  var flash = document.getElementById('cake-flash');
  var confettiLayer = document.getElementById('confetti-layer');
  var cakeStage = document.getElementById('cake-stage');
  var balloons = document.getElementById('bg-balloons');
  var bgParticles = document.getElementById('bg-particles');
  var nextBtn = document.getElementById('cake-next');

  var msgWish = document.getElementById('msg-wish');
  var msgWishLine = document.getElementById('msg-wish-line');
  var msgFinal = document.getElementById('msg-final');

  var hasCut = false;

  cutBtn.addEventListener('click', function () {
    if (hasCut) return;
    hasCut = true;

    // 0.0s — the button reacts immediately
    cutBtn.disabled = true;
    cutBtn.classList.add('is-glowing');

    // 0.2s — the cake gently scales
    setTimeout(function () {
      cake.classList.add('is-cut'); // also brightens the candle glow via CSS
    }, 200);

    // 0.6s — golden light begins expanding
    setTimeout(function () {
      flash.classList.add('is-active');
    }, 600);

    // 0.8s — sparkles burst outward from the cake
    setTimeout(function () {
      Bunny.fireSparkles(cakeStage, 24);
    }, 800);

    // 1.0s — confetti begins falling
    setTimeout(function () {
      Bunny.fireConfetti(confettiLayer, 60);
    }, 1000);

    // 1.2s — small fireworks appear
    setTimeout(function () {
      Bunny.fireFireworks(confettiLayer, 4);
    }, 1200);

    // 1.5s — balloons gently react/rise
    setTimeout(function () {
      if (balloons) {
        balloons.classList.add('is-reacting');
        setTimeout(function () { balloons.classList.remove('is-reacting'); }, 1600);
      }
    }, 1500);

    // 1.8s — golden particles intensify with a second confetti layer
    // and a few floating hearts
    setTimeout(function () {
      Bunny.fireConfetti(confettiLayer, 35);
      Bunny.initHearts(6);
      if (bgParticles) {
        bgParticles.classList.add('is-intensified');
        setTimeout(function () { bgParticles.classList.remove('is-intensified'); }, 2500);
      }
    }, 1800);

    // ~2.0s — everything settles, then the wish text begins
    setTimeout(function () {
      msgWish.classList.add('is-visible');
    }, 2200);

    setTimeout(function () {
      msgWishLine.classList.add('is-visible');
    }, 3100);

    setTimeout(function () {
      msgFinal.classList.add('is-visible');
      Bunny.fireFireworks(confettiLayer, 4);
    }, 4300);

    setTimeout(function () {
      nextBtn.classList.add('is-visible');
    }, 5300);
  });
});
