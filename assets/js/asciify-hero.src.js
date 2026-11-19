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
      color: '#3acf6a', // brand green (the asciify.org selection used #8f8d86)
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

/* Closing CTA: the frog drawn in characters on Asciify's GPU glyph field, in brand green.
   The frog is painted into a small source canvas (white on black, the same drawing as the logo, eyes as a cut-out disc with
   a single dot) placed under the buttons. The field reads it live, so the pupils follow the pointer and the frog blinks.
   A soft flow lights the sides. One field for the section; paused off screen and while the tab is hidden; a still frame
   under reduced motion; the site's own pixel field stays when the field cannot run. */
import { mountGlyphField, isGlyphFieldSupported } from 'asciify-engine/field';

const close = document.querySelector('.close');
if (close && isGlyphFieldSupported()) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SKIN = [
    'M 93.9,67.1 C 92.9,79.9 73.6,90 50,90 26.4,90 7.1,79.9 6.1,67.1 Z',
    'm 92.2,59.4 c 0.5,0.9 0.8,1.8 1.1,2.7 H 6.7 C 7,61.2 7.3,60.3 7.8,59.5 8.3,58.5 8.3,57.3 7.6,56.3 5.8,53.6 4.8,50.4 4.8,46.9 c 0,-9.4 7.6,-17 17,-17 7.2,0 13.4,4.5 15.9,10.9 0.5,1.3 1.8,2.1 3.1,1.9 3,-0.3 6.1,-0.5 9.2,-0.5 3.2,0 6.3,0.2 9.2,0.5 1.3,0.2 2.6,-0.6 3.1,-1.8 C 65,33.8 72.1,29 80.2,30 c 7.8,0.9 14.1,7.3 14.9,15.1 0.4,4.1 -0.7,8 -2.8,11.1 -0.6,1 -0.6,2.2 -0.1,3.2 z',
    'm 65.5,14.8 -7.8,3.9 c -0.3,0.1 -0.6,0.1 -0.8,-0.2 l -6.5,-8.3 c -0.3,-0.3 -0.7,-0.3 -1,0 l -6.2,8.5 C 43,18.9 42.7,19 42.4,18.9 l -8,-4.1 c -0.5,-0.2 -1,0.2 -0.9,0.7 L 36.7,29 c 0.1,0.5 0.6,0.9 1.1,0.9 h 24.5 c 0.5,0 1,-0.4 1.1,-0.9 l 3.1,-13.5 c 0,-0.5 -0.5,-0.9 -1,-0.7 z',
  ].map(d => new Path2D(d));
  const SRC_SCALE = 0.25; // the source is a quarter of the section's size: plenty for 11px cells
  const src = document.createElement('canvas');
  const sx = src.getContext('2d');
  const eye = { x: 0, y: 0, tx: 0, ty: 0, blink: 1 };
  let box = null;

  const layout = () => {
    const r = close.getBoundingClientRect(), cta = close.querySelector('.close__cta')?.getBoundingClientRect();
    src.width = Math.max(1, Math.round(r.width * SRC_SCALE));
    src.height = Math.max(1, Math.round(r.height * SRC_SCALE));
    const fw = Math.min(660, r.width * 0.62) * SRC_SCALE, s = fw / 92;
    const top = cta ? (cta.bottom - r.top + 48) * SRC_SCALE : src.height * 0.55;
    box = { s, ox: src.width / 2 - 50 * s, oy: top - 9.6 * s, r };
  };
  const paint = () => {
    if (!box) return;
    const { s, ox, oy } = box, w = src.width, h = src.height;
    sx.setTransform(1, 0, 0, 1, 0, 0);
    sx.fillStyle = '#000'; sx.fillRect(0, 0, w, h);
    // soft light down both sides, so the flow has something to move through
    for (const x of [0, w]) {
      const g = sx.createRadialGradient(x, h * 0.62, 0, x, h * 0.62, w * 0.24);
      g.addColorStop(0, 'rgba(255,255,255,0.32)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      sx.fillStyle = g; sx.fillRect(0, 0, w, h);
    }
    // the frog, brighter toward its chin
    sx.setTransform(s, 0, 0, s, ox, oy);
    const body = sx.createLinearGradient(0, 10, 0, 90);
    body.addColorStop(0, '#fff'); body.addColorStop(1, '#fff');
    sx.fillStyle = body;
    SKIN.forEach(p => sx.fill(p));
    for (const cx of [21.8, 78.2]) {
      sx.save(); sx.translate(cx, 46.9); sx.scale(1, eye.blink);
      sx.fillStyle = '#000'; sx.beginPath(); sx.arc(0, 0, 12, 0, Math.PI * 2); sx.fill();
      sx.fillStyle = '#fff'; sx.beginPath(); sx.arc(eye.x, eye.y / Math.max(eye.blink, 0.3), 5.1, 0, Math.PI * 2); sx.fill();
      sx.restore();
    }
  };

  const canvas = document.createElement('canvas');
  canvas.className = 'close__ascii';
  canvas.setAttribute('aria-hidden', 'true');
  close.prepend(canvas);
  layout(); paint();

  const copy = ['.display', '.lede', '.close__cta'].map(q => close.querySelector(q)).filter(Boolean);
  let rects = null;
  const invalidate = () => { rects = null; };
  addEventListener('scroll', invalidate, { passive: true });

  let field = null;
  try {
    field = mountGlyphField(canvas, {
      source: src, live: true, fit: 'cover',
      cellSize: matchMedia('(max-width: 560px)').matches ? 6 : 9, color: 'ink', ink: '#3acf6a', shade: 0.25, levels: 'none', vignette: 0, backdrop: 0,
      hover: reduce ? 'none' : 'trail', drift: reduce ? 0 : 0.25, speed: 1,
      // no clear zone: the frog sits below the copy, and a clear map here dimmed the frog's crown
      label: 'The FrogBot frog, drawn in characters',
    });
  } catch (err) {
    console.warn('Asciify closing field could not start; keeping the pixel field.', err);
    canvas.remove();
  }

  if (field) {
    close.querySelector('.px--close')?.remove();
    close.classList.add('has-asciify');
    let raf = 0, onScreen = false;
    const frame = () => {
      raf = 0;
      const ex = eye.tx - eye.x, ey = eye.ty - eye.y;
      if (Math.abs(ex) + Math.abs(ey) > 0.02) { eye.x += ex * 0.18; eye.y += ey * 0.18; raf = requestAnimationFrame(frame); }
      paint(); field.redraw();
    };
    const kick = () => { if (!raf && onScreen) raf = requestAnimationFrame(frame); };
    const onMove = e => {
      if (!onScreen || !box) return;
      const r = close.getBoundingClientRect(), k = 1 / SRC_SCALE;
      const fx = r.left + (box.ox + 50 * box.s) * k, fy = r.top + (box.oy + 46.9 * box.s) * k;
      const dx = e.clientX - fx, dy = e.clientY - fy, d = Math.hypot(dx, dy) || 1, m = Math.min(1, d / 300) * 3.4;
      eye.tx = dx / d * m; eye.ty = dy / d * m; kick();
    };
    if (!reduce && matchMedia('(hover: hover)').matches) addEventListener('pointermove', onMove, { passive: true });
    let blinkTimer = 0;
    const blink = () => {
      if (onScreen && !document.hidden) {
        const t0 = performance.now();
        const step = now => {
          const t = (now - t0) / 180;
          eye.blink = t >= 1 ? 1 : Math.max(0.1, Math.abs(1 - 2 * t));
          paint(); field.redraw();
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
      blinkTimer = setTimeout(blink, 2800 + Math.random() * 3600);
    };
    if (!reduce) blinkTimer = setTimeout(blink, 2000);
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen && !document.hidden) field.play(); else field.pause();
    });
    io.observe(close);
    const onVis = () => { if (document.hidden) field.pause(); else if (onScreen) field.play(); };
    document.addEventListener('visibilitychange', onVis);
    let rt = 0;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { invalidate(); layout(); paint(); field.redraw(); }, 150); };
    addEventListener('resize', onResize);
    if (document.fonts) document.fonts.ready.then(() => { invalidate(); layout(); paint(); field.redraw(); });

    addEventListener('pagehide', e => {
      if (e.persisted) return;
      clearTimeout(blinkTimer); cancelAnimationFrame(raf); io.disconnect();
      removeEventListener('pointermove', onMove); removeEventListener('resize', onResize); removeEventListener('scroll', invalidate);
      document.removeEventListener('visibilitychange', onVis);
      field.destroy(); canvas.remove();
    });
    window.__asciifyClose = field;
  }
}
