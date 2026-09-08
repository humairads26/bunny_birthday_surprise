/* =====================================================================
   final-gift.js — The Luxury Birthday Certificate
   Voice recording has been completely removed. The interaction is now:
     Open Certificate -> envelope opens & fades -> certificate unfolds
       -> gold seal stamps on -> "Keep This Memory" button appears
       -> clicking it glows the certificate and shows a short message
       -> grand finale (confetti, fireworks, balloons, hearts)
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var openBtn = document.getElementById('open-cert-btn');
  var envelope = document.getElementById('cert-envelope');
  var certStage = document.getElementById('cert-stage');
  var certificate = document.getElementById('certificate');
  var goldSeal = document.getElementById('cert-gold-seal');
  var keepBtn = document.getElementById('keep-memory-btn');
  var keepMessage = document.getElementById('keep-message');
  var finalScreen = document.getElementById('final-screen');
  var confettiLayer = document.getElementById('confetti-layer');

  var hasOpened = false;
  var hasKept = false;

  /* ---------------- Opening the certificate ---------------- */
  openBtn.addEventListener('click', function () {
    if (hasOpened) return;
    hasOpened = true;

    openBtn.style.transition = 'opacity 0.5s ease';
    openBtn.style.opacity = '0';
    openBtn.style.pointerEvents = 'none';

    envelope.classList.add('is-opening');

    setTimeout(function () {
      envelope.classList.add('is-hidden');
    }, 500);

    setTimeout(function () {
      certificate.classList.add('is-visible');
      Bunny.fireSparkles(certStage, 20);
    }, 900);

    setTimeout(function () {
      goldSeal.classList.add('is-stamped');
      Bunny.fireSparkles(goldSeal, 10);
    }, 2400);

    setTimeout(function () {
      keepBtn.classList.add('is-visible');
    }, 3400);
  });

  /* ---------------- Keep This Memory ---------------- */
  keepBtn.addEventListener('click', function () {
    if (hasKept) return;
    hasKept = true;

    keepBtn.style.transition = 'opacity 0.5s ease';
    keepBtn.style.opacity = '0';
    keepBtn.style.pointerEvents = 'none';

    Bunny.fireSparkles(certificate, 18);
    certificate.classList.add('is-glowing');

    setTimeout(function () {
      keepMessage.classList.add('is-visible');
    }, 400);

    setTimeout(function () {
      triggerGrandFinale();
    }, 2400);
  });

  /* ---------------- Grand finale ---------------- */
  function triggerGrandFinale() {
    Bunny.fireConfetti(confettiLayer, 90);
    Bunny.fireFireworks(confettiLayer, 7);
    Bunny.initHearts(20);

    var balloonLayer = document.getElementById('bg-balloons');
    if (balloonLayer) balloonLayer.classList.add('is-rising');

    setTimeout(function () {
      Bunny.fireConfetti(confettiLayer, 60);
    }, 1200);

    setTimeout(function () {
      if (finalScreen) finalScreen.classList.add('is-visible');
    }, 800);
  }
});
