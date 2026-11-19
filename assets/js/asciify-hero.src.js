/* Hero background: Asciify's Drift preset, drawn behind the hero copy.
   Source file. `npm run build:asciify` bundles it to assets/js/asciify-hero.js, which the page loads.

   Selected on asciify.org/backgrounds: scene flow (Drift), original characters, glyph mark, ink #8f8d86,
   speed 1, size 11, opacity 1, dither 0, hover trail.

   Lifecycle: one background handle for the page. The kit pauses it off screen and while the tab is hidden,
   holds a still frame under reduced motion, and returns an inert handle without WebGL2. When it draws, the
   site's own pixel field in the hero steps aside so only one renderer runs there; when it can't, that field stays. */
import { background, drift } from 'asciify-engine/kit';

const hero = document.querySelector('.hero');

if (hero) {
  // Keep the field quiet right behind the headline, the offer and the buttons, flowing round and between them.
  const copy = ['.hero__title', '.hero__offer', '.hero__cta']
    .map(s => hero.querySelector(s))
    .filter(Boolean);
  let rects = null;
  const invalidate = () => { rects = null; };
  const clear = () => (rects ??= copy.map(el => el.getBoundingClientRect()));
  addEventListener('scroll', invalidate, { passive: true });
  addEventListener('resize', invalidate);

  let bg = null;
  try {
    bg = background(hero, {
      preset: drift,
      clear,
      color: '#8f8d86',
      speed: 1,
      cellSize: 11,
      opacity: 1,
      dither: 0,
      mark: 'glyph',
      cursor: 'trail',
    });
  } catch (err) {
    bg = null;
    console.warn('Asciify background could not start; keeping the pixel field.', err);
  }

  if (bg && bg.supported !== false) {
    // One renderer in the hero: retire the pixel field canvas (its loop stops once it is detached).
    hero.querySelector('.px--hero')?.remove();
    hero.classList.add('has-asciify');
  }

  // Clean up when the page is torn down (bfcache-safe: only on a real unload).
  addEventListener('pagehide', e => {
    if (e.persisted) return;
    bg?.destroy();
    removeEventListener('scroll', invalidate);
    removeEventListener('resize', invalidate);
  });

  window.__asciifyHero = bg;
}
