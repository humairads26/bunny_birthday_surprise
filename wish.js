/* =====================================================================
   wish.js — Page 2: Birthday Wish logic
   Types out the birthday message in two parts, with an elegant
   highlighted quote card pausing in between for the "Koi bhi
   problem ho..." promise. Then reveals hearts + continue button.
   Depends on script.js being loaded first (window.Bunny).
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  Bunny.initHearts();
  Bunny.initScrollReveal();

  var textEl1 = document.getElementById('wish-text-part1');
  var cursor1 = document.getElementById('wish-cursor-1');
  var textEl2 = document.getElementById('wish-text-part2');
  var cursor2 = document.getElementById('wish-cursor-2');
  var quoteEl = document.getElementById('wish-quote');
  var continueBtn = document.getElementById('continue-btn');
  var teaser = document.getElementById('wish-teaser');
  var teaser2 = document.getElementById('wish-teaser-2');

  var messagePart1 =
    "Happy Birthday, Bunny. \u2764\ufe0f\n\n" +
    "Kuch log hamari life mein sirf ek hissa ban kar aate hain, aur kuch log quietly hamari life ko change kar dete hain.\n\n" +
    "Mere liye aap un logon mein se hain.\n\n" +
    "Aapne mujhe bohot si aisi cheezen sikhayi hain jo shayad main kisi book se kabhi nahi seekh sakti thi.\n\n" +
    "Aapne mujhe sikhaya ke logon ko deeply observe kaise karte hain, unki care kaise karte hain, logon ke saath kis tarah behave karna chahiye, aur unko samajhna kaise hai.\n\n" +
    "Aapne mujhe ye bhi sikhaya ke life mein chahe kitni bhi problems chal rahi hon, phir bhi khush rehna aur life ko enjoy karna kaise hai.\n\n" +
    "Aur shayad sabse important cheez ye hai ke aapne mujhe hamesha ye feel karwaya ke mujhe apni problems akelay face nahi karni.\n\n" +
    "Aap hamesha kehte hain:";

  var messagePart2 =
    "Shayad ye words simple hain, lekin mere liye inki bohot value hai.\n\n" +
    "Kyunki ye janna ke koi hai jo meri baat sunega aur mujhe akela feel nahi hone dega, bohot special feeling hai.\n\n" +
    "Thank you Bunny, mere liye wo person hone ke liye.\n\n" +
    "Happy Birthday once again. \u2764\ufe0f\n\n" +
    "Meri dua hai ke ye saal aapko wo happiness, peace, success aur moments de jinka aap wait kar rahe hain.\n\n" +
    "Aur jahan bhi life aapko le kar jaye, aap apne andar ki wo goodness kabhi lose na karna jo aapko doosron ki care karna, difficult situations se fight karna aur life ko enjoy karna sikhati hai.\n\n" +
    "Aapne life ke difficult chapters survive kiye hain.\n\n" +
    "Ab meri dua hai ke aapki life ke aane wale chapters bohot zyada beautiful aur peaceful hon. \u2764\ufe0f";

  Bunny.typeText(textEl1, messagePart1, 16, function () {
    if (cursor1) cursor1.style.display = 'none';

    // A brief pause, then the promise quote fades in on its own,
    // elegantly highlighted, before the letter continues.
    setTimeout(function () {
      if (quoteEl) quoteEl.classList.add('is-visible');
    }, 500);

    setTimeout(function () {
      Bunny.typeText(textEl2, messagePart2, 16, function () {
        if (cursor2) cursor2.style.display = 'none';
        setTimeout(function () {
          if (teaser) teaser.classList.add('is-visible');
        }, 500);
        setTimeout(function () {
          if (teaser2) teaser2.classList.add('is-visible');
        }, 1900);
        setTimeout(function () {
          if (continueBtn) continueBtn.classList.add('is-visible');
        }, 2700);
      });
    }, 2600);
  });
});
