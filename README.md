# Happy Birthday, Bunny — Setup Instructions (V2)

A personal, cinematic birthday website for Bunny, built with plain HTML,
CSS, and vanilla JavaScript (no frameworks).

## 1. Add your 7 photos
Put your own photos into the `images/` folder using these exact names:
```
images/photo1.jpg
images/photo2.jpg
images/photo3.jpg
images/photo4.jpg
images/photo5.jpg
images/photo6.jpg
images/photo7.jpg
```
Until a photo is added, the gallery shows an elegant gold-framed
placeholder instead of a plain "missing file" box, so it's safe to
preview the site before adding pictures. Edit the caption text for
each photo directly inside `gallery.html` (`<figcaption class="slide-caption">`).

## 2. Add your voice recording
Put your recorded voice message into the `audio/` folder using this exact name:
```
audio/bunny-message.mp3
```
This plays on the final gift page after the gift box opens. A small
speaker icon lets Bunny mute it mid-playback if he wants. If the file
is missing, the site skips it gracefully — nothing breaks.

## 3. Add background music (optional)
Put a music track into the `music/` folder using this exact name:
```
music/background-music.mp3
```
A music toggle button (bottom-right corner on every page) lets Bunny
turn it on or off. It automatically lowers in volume while the voice
recording plays, and resumes after.

## 4. Test it locally
Serve the folder locally rather than double-clicking `index.html`,
since some browsers restrict audio/fetch on `file://` URLs.

**Option A — Python (already installed on most computers):**
```bash
cd bunny-birthday
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Option B — VS Code:**
Install the "Live Server" extension, right-click `index.html`, and choose
"Open with Live Server."

## 5. Deploy to Vercel
1. Create a free account at [vercel.com](https://vercel.com) if you don't have one.
2. Install the Vercel CLI: `npm install -g vercel`
3. From inside the `bunny-birthday` folder, run:
   ```bash
   vercel
   ```
4. Follow the prompts (accept the defaults — this is a static site, no
   build step needed). Vercel will give you a live link you can send
   straight to Bunny.

## Site flow (V2 — the Bond page has been removed)
```
index.html → wish.html → facts.html → cake.html → gallery.html
  → appreciation.html → hidden-message.html → final-gift.html
```

Every page has a subtle "← back" link in the top-left corner. Clicking
any link plays a short cinematic fade/zoom transition before moving to
the next page.

## What's new in V3.1 — cake refinement + emotional pacing
- The cake now uses two-tone gold decorations (bright pearls + darker
  bronze glitter spheres), an arched gold "Happy Birthday" title (SVG
  textPath, matching the reference's curved script), a larger gold
  pearl base ring, more organic ganache drip shapes, a fine glitter
  texture on the body, a grounding shadow, and a gentle idle float
  before it's cut.
- The envelope on the hidden-message page now floats gently while
  closed.
- Added extra pacing/pause lines per the latest brief: a second
  teaser on the wish page ("There's more waiting for you"), a second
  closing line on facts ("Want to see how much?"), an extra memories
  line on the gallery, and a "There's one last message..." beat on
  appreciation before its button — each staged with its own pause.
- Fact cards now fire a small sparkle burst as they scroll into view.

## What's new in V3 — the "make it magical" atmosphere upgrade
- Two new reusable background systems: **golden light orbs** (soft
  ambient glow) and **elegant black/gold/charcoal/cream CSS balloons**
  — both respect reduced-motion and appear only on the pages listed
  below.
- **Welcome page**: cinematic entrance sequence (the "Little Angel"
  line fades in first, then the heading types, then subtitle →
  countdown → button), balloons at the edges, a sparkle burst when
  "Enter Your Surprise" is clicked, and a shimmer sweep on every gold
  button's hover state.
- **Cake page — completely rebuilt**: a round chocolate cake with a
  ganache drip edge, scattered gold pearls and stars, a gold script
  "Happy Birthday / Bunny" inscription, a gold pearl base ring, five
  flickering gold candles, and a breathing ambient glow — built to
  match the reference photo, entirely in CSS (no image files needed).
  The cut sequence now layers gold/white/black confetti, sparkles,
  small fireworks, a brief balloon "reaction," and floating hearts.
- **Gallery**: wrapped in an elegant gold ambient frame, plus a golden
  light sweep across each newly revealed photo.
- **Appreciation**: the closing moment now dims the background, then
  reveals its two closing lines with a pause between them, before the
  final button appears — an emotionally quiet beat before the next
  surprise.
- **Hidden message**: subtle hearts now rise when the envelope opens.
- **Final gift**: balloons drift upward and off-screen during the
  grand finale celebration.
- Confetti now includes a touch of black alongside gold and white.

## What's new in V2
- The "More Than Just a Brother" page (`bond.html`) has been removed
  for a cleaner flow, along with `bond.css` and `bond.js`.
- All visible content now uses only the nickname **Bunny** — no formal
  name appears anywhere on the site.
- Every page now fades/zooms between transitions instead of jumping
  instantly.
- The welcome page has a pulsing glow button and an ambient light layer
  behind the hero card.
- The memories gallery shows elegant gold-framed placeholders (instead
  of plain "missing file" text) and a synced progress bar.
- The appreciation page uses a staggered masonry layout with alternating
  tilt and a gold shimmer sweep on hover, instead of a uniform grid.
- The hidden-message page has an ambient breathing glow behind the
  envelope scene for more cinematic depth.
- The final gift page has a subtle mute control for the voice recording.
- A soft ambient gold glow now gently follows the cursor on desktop.

## Notes
- All animations respect the visitor's OS-level "reduce motion" setting.
- The site is fully responsive — tested down to small mobile widths with
  no horizontal scrolling.
- No external UI frameworks are used — just HTML, CSS, and vanilla JS,
  plus Google Fonts for typography (Playfair Display, Cormorant Garamond,
  and Poppins), loaded via a single `@import` in `style.css`.
