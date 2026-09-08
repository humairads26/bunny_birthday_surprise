/* =====================================================================
   hidden-message.js — Page 8: Hidden Message logic
   The letter now types in three parts across two special pauses:
     part1 -> [Pain Killer / Human Medicine reveal] -> part2a
           -> ["I'm here. Batao kya hua." highlighted quote] -> part2b
   The envelope animation itself is unchanged. Two phrases within
   part1 ("my pain killer", "my human medicine") also get a subtle
   inline gold highlight once that segment finishes typing.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var openBtn = document.getElementById('open-envelope-btn');
  var envelope = document.getElementById('envelope');
  var envelopeStage = document.getElementById('envelope-stage') || document.querySelector('.envelope-stage');
  var letterCard = document.getElementById('letter-card');

  var letterText1 = document.getElementById('letter-text-1');
  var letterCursor1 = document.getElementById('letter-cursor-1');
  var letterText2 = document.getElementById('letter-text-2');
  var letterCursor2 = document.getElementById('letter-cursor-2');
  var letterText3 = document.getElementById('letter-text-3');
  var letterCursor3 = document.getElementById('letter-cursor-3');

  var painKillerReveal = document.getElementById('pain-killer-reveal');
  var painKillerLine1 = document.getElementById('pain-killer-line-1');
  var painKillerLine2 = document.getElementById('pain-killer-line-2');

  var imHereQuote = document.getElementById('im-here-quote');

  var andNowLine = document.getElementById('and-now-line');
  var oneLastLine = document.getElementById('one-last-line');
  var nextBtn = document.getElementById('hidden-next');

  var letterPart1 = "Dear Bunny,\n\nKuch baatein aisi hoti hain jo face to face kehna mushkil hota hai, is liye shayad unhein likhna easier hai.\n\nAap mujhe apni Little Angel kehte hain, aur mera Little Angel hona shayad mere liye duniya ke cutest names mein se ek hai.\n\nLekin mere liye aap sirf wo person nahi hain jise main apna brother kehti hon.\n\nAap mere liye ek aise brother hain jo friend bhi ban gaye.\n\nAisa person jisse main baat kar sakti hon.\n\nJiske experiences se main seekh sakti hon.\n\nAur jisse main wo baatein bhi discuss kar leti hon jo shayad main har kisi ke saath discuss nahi karti.\n\nMujhe abhi bhi wo moment yaad hai jab ek larkay ne mere saath professional conversation start ki thi aur phir gradually personal hona start ho gaya tha.\n\nMaine ye baat kisi ko nahi batayi thi.\n\nSirf aapko batayi.\n\nAur jis tarah aapne us situation ko handle kiya, mujhe calm kiya, mujhe samjhaya aur mujhe normal feel karwaya...\n\nmain wo moment kabhi nahi bhoolungi.\n\nUs waqt aapne sirf mujhe advice nahi di thi.\n\nAapne mujhe safe feel karwaya tha.\n\nAur ye un reasons mein se ek hai jiski wajah se main aap par itna trust karti hon.\n\nAap apne experiences mere saath share karte hain, even wo baatein jo aap kehte hain ke aap kisi se share nahi karte.\n\nAur shayad isi wajah se main bhi aapse apni baatein easily discuss kar leti hon.\n\nHamare relation ko kisi aur ko explain karna honestly mushkil hai.\n\nKuch cheezen sirf hum dono samajhte hain.\n\nKabhi kabhi humein bohot zyada explain karne ki zaroorat hi nahi hoti.\n\nKuch words enough hote hain.\n\nKabhi kabhi aap meri baat complete hone se pehle hi samajh jate hain ke main kya kehna chahti hon.\n\nAur kabhi aap mujhe cheezen samjhate hain — kabhi pyaar se, kabhi gusse se — lekin somehow har baar main aapse kuch seekh leti hon.\n\nBunny, mujhe pata hai aapne life mein bohot kuch face kiya hai.\n\nAap apni weaknesses easily kisi ko show nahi karte.\n\nAap aksar sabko ye show karte hain ke sab set hai, even jab andar bohot kuch chal raha hota hai.\n\nLekin main aapko ek baat kehna chahti hon:\n\nAapko hamesha strong ban kar rehne ki zaroorat nahi hai.\n\nAapki life mein difficult days bhi aa sakte hain.\n\nAap tired ho sakte hain.\n\nAapko bhi kabhi kisi ki zaroorat ho sakti hai.\n\nAap hamesha mujhe kehte hain ke agar mujhe koi problem ho to aapko batana.\n\nTo Bunny, ye baat aap par bhi apply hoti hai.\n\nAgar kabhi aapko kisi se baat karni ho, main hoon.\n\nAgar aap kehna chahein, 'Mujhe baat karni hai,' main sunungi.\n\nAgar aapko support chahiye, main apni best koshish karungi.\n\nAur agar aapko sirf kisi ka sunna chahiye, main sunungi.\n\nAapne ek baar mujhe 'my pain killer' aur 'my human medicine' kaha tha.";

  var letterPart2a = "Honestly, shayad aapko idea bhi nahi ke ye words mere liye kitne special hain.\n\nAap kehte hain ke mujhse baat karke aapko happiness feel hoti hai, aapki tension kam ho jati hai aur aapka mood fresh ho jata hai.\n\nAur jab aap kisi problem mein hote hain, aap kabhi kabhi mujhse discuss bhi karte hain.\n\nMaybe main har problem ka solution nahi de sakti.\n\nMaybe kabhi main sirf aapki baat sunti hon.\n\nKabhi aapko hansany ki koshish karti hon.\n\nAur kabhi sirf aapse baat karti hon.\n\nLekin ye jaan kar ke meri presence aapka difficult day thoda sa better kar sakti hai...\n\nmere liye ye bohot special hai.\n\nAap hamesha mere liye wo person rahe hain jiske paas main ja sakti hon.\n\nAur ye feeling ke kabhi kabhi main bhi aapke liye wo person ban sakti hon...\n\nis something I will always treasure.\n\nSo Bunny, whenever you need to talk...\n\ncome talk to your Little Angel. ❤️\n\nAur Bunny...\n\nmain aapse sirf ek cheez request karna chahti hon.\n\nPlease mera trust kabhi lightly mat lena.\n\nMain aap par bohot trust karti hon.\n\nNot because I think you're perfect.\n\nBut because aapne apne actions se mujhe ye trust diya hai ke main aap par bharosa kar sakti hon.\n\nMain chahti hon ke hamara ye trust hamesha safe rahe.\n\nChahe life humein kahin bhi le jaye, main chahti hon ke hamara relation hamesha aisa rahe jahan hum ek doosre se keh saken:";

  var letterPart2b = "Aap mujhe apna Little Angel kehte hain.\n\nLekin honestly Bunny...\n\naap bhi un logon mein se hain jinhon ne mujhe protected, understood aur heard feel karwaya hai.\n\nAur main is cheez ke liye hamesha grateful rahungi.\n\nMain chahti hon ke aap jahan bhi rahein, dil se happy rahein.\n\nAapki family hamesha aapki strength bani rahe.\n\nAap life ko enjoy karte rahein.\n\nAap apne experiences se seekhte rahein.\n\nLekin difficult experiences ko apni life ki beautiful cheezen enjoy karne ki ability kabhi mat cheenne dena.\n\nAur sabse important...\n\nkabhi ye mat bhoolna ke aapke andar kitni goodness hai.\n\nHappy Birthday, Bunny. ❤️\n\nThank you for being my brother.\n\nThank you for being my friend.\n\nThank you for teaching me so many little things about life.\n\nAur thank you for being wo person jisse main baat kar sakti hon.\n\nYour Little Angel ❤️";

  var hasOpened = false;

  openBtn.addEventListener('click', function () {
    if (hasOpened) return;
    hasOpened = true;
    openBtn.disabled = true;

    envelope.classList.add('is-open');
    if (envelopeStage) Bunny.fireSparkles(envelopeStage, 14);
    Bunny.initHearts(8);

    setTimeout(function () {
      letterCard.classList.add('is-visible');
      Bunny.typeText(letterText1, letterPart1, 18, function () {
        highlightPainKillerPhrases();
        playPainKillerMoment();
      });
    }, 900);
  });

  // Subtly wraps "my pain killer" and "my human medicine" in a gold
  // highlight once part 1 has finished typing. Safe to do here since
  // letterText1 contains only plain text at this point.
  function highlightPainKillerPhrases() {
    if (!letterText1) return;
    var html = letterText1.innerHTML;
    html = html.replace('my pain killer', '<span class="phrase-highlight">my pain killer</span>');
    html = html.replace('my human medicine', '<span class="phrase-highlight">my human medicine</span>');
    letterText1.innerHTML = html;
  }

  function playPainKillerMoment() {
    if (letterCursor1) letterCursor1.style.display = 'none';

    // Soften the surrounding glow for a quieter, more intimate beat
    if (letterCard) letterCard.classList.add('is-hushed');

    setTimeout(function () {
      if (painKillerReveal) painKillerReveal.classList.add('is-active');
      setTimeout(function () {
        if (painKillerLine1) painKillerLine1.classList.add('is-visible');
      }, 200);
    }, 500);

    setTimeout(function () {
      if (painKillerLine2) painKillerLine2.classList.add('is-visible');
    }, 2200);

    setTimeout(function () {
      if (painKillerReveal) painKillerReveal.classList.remove('is-active');
      if (letterCard) letterCard.classList.remove('is-hushed');
    }, 4200);

    // Resume the letter with part 2a
    setTimeout(function () {
      Bunny.typeText(letterText2, letterPart2a, 18, function () {
        playImHereMoment();
      });
    }, 4600);
  }

  function playImHereMoment() {
    if (letterCursor2) letterCursor2.style.display = 'none';

    // "I'm here. Batao kya hua." gets its own quiet, elegant pause —
    // hearing his own words again.
    setTimeout(function () {
      if (imHereQuote) imHereQuote.classList.add('is-visible');
    }, 500);

    setTimeout(function () {
      Bunny.typeText(letterText3, letterPart2b, 18, function () {
        if (letterCursor3) letterCursor3.style.display = 'none';
        setTimeout(function () {
          andNowLine.classList.add('is-visible');
        }, 500);
        setTimeout(function () {
          oneLastLine.classList.add('is-visible');
        }, 2200);
        setTimeout(function () {
          nextBtn.classList.add('is-visible');
        }, 2900);
      });
    }, 2600);
  }
});
