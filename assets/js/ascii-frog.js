/* Closing CTA: the FrogBot frog in living ASCII, in brand green.
   Each cell picks a character from a ramp by its tone, and the characters keep changing: cells re-roll among the
   characters of their own tone band, so the frog shimmers like a terminal rather than sitting still. Soft clouds drift
   The pupils follow the pointer and the frog blinks; the cursor does nothing else here. The sides and the water ripples
   come from the site's pixel field drawn underneath.
   One 2D canvas, a glyph atlas drawn once, ~24 fps, paused off screen and while the tab is hidden; a still frame under
   reduced motion. */
(() => {
  const canvas = document.querySelector('[data-ascii-frog]');
  if (!canvas) return;
  const host = canvas.closest('section') || canvas.parentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const RAMP = ' .:-=+*#%@';
  const INK = '#3acf6a';
  const SKIN = [
    'M 93.9,67.1 C 92.9,79.9 73.6,90 50,90 26.4,90 7.1,79.9 6.1,67.1 Z',
    'm 92.2,59.4 c 0.5,0.9 0.8,1.8 1.1,2.7 H 6.7 C 7,61.2 7.3,60.3 7.8,59.5 8.3,58.5 8.3,57.3 7.6,56.3 5.8,53.6 4.8,50.4 4.8,46.9 c 0,-9.4 7.6,-17 17,-17 7.2,0 13.4,4.5 15.9,10.9 0.5,1.3 1.8,2.1 3.1,1.9 3,-0.3 6.1,-0.5 9.2,-0.5 3.2,0 6.3,0.2 9.2,0.5 1.3,0.2 2.6,-0.6 3.1,-1.8 C 65,33.8 72.1,29 80.2,30 c 7.8,0.9 14.1,7.3 14.9,15.1 0.4,4.1 -0.7,8 -2.8,11.1 -0.6,1 -0.6,2.2 -0.1,3.2 z',
    'm 65.5,14.8 -7.8,3.9 c -0.3,0.1 -0.6,0.1 -0.8,-0.2 l -6.5,-8.3 c -0.3,-0.3 -0.7,-0.3 -1,0 l -6.2,8.5 C 43,18.9 42.7,19 42.4,18.9 l -8,-4.1 c -0.5,-0.2 -1,0.2 -0.9,0.7 L 36.7,29 c 0.1,0.5 0.6,0.9 1.1,0.9 h 24.5 c 0.5,0 1,-0.4 1.1,-0.9 l 3.1,-13.5 c 0,-0.5 -0.5,-0.9 -1,-0.7 z',
  ].map(d => new Path2D(d));

  // value noise for the drifting side clouds
  const G = 64, grid = Float32Array.from({ length: G * G }, (_, i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); });
  const at = (x, y) => grid[((y & 63) * G) + (x & 63)];
  const vn = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    return (at(xi, yi) * (1 - u) + at(xi + 1, yi) * u) * (1 - v) + (at(xi, yi + 1) * (1 - u) + at(xi + 1, yi + 1) * u) * v; };
  const fbm = (x, y) => vn(x, y) * 0.6 + vn(x * 2.1, y * 2.1) * 0.4;

  const ctx = canvas.getContext('2d');
  let dpr = 1, cw = 7, ch = 12, cols = 0, rows = 0, atlas = null, mask = null, mfx = null, box = null;
  let glyph = null, seed = null, scramble = null;
  const eye = { x: 0, y: 0, tx: 0, ty: 0, blink: 1 };

  const buildAtlas = () => {
    // one row of ramp characters, drawn once in the brand green; cells blit from it with an alpha per tone
    atlas = document.createElement('canvas');
    atlas.width = Math.ceil(cw * dpr) * RAMP.length; atlas.height = Math.ceil(ch * dpr);
    const a = atlas.getContext('2d');
    a.fillStyle = INK; a.textAlign = 'center'; a.textBaseline = 'middle';
    a.font = `600 ${Math.round(ch * 0.92 * dpr)}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
    [...RAMP].forEach((c, i) => a.fillText(c, (i + 0.5) * Math.ceil(cw * dpr), atlas.height / 2 + dpr));
  };

  const layout = () => {
    const r = host.getBoundingClientRect();
    const phone = r.width <= 560;
    cw = phone ? 4 : 7; ch = phone ? 7 : 12;
    dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
    cols = Math.ceil(r.width / cw); rows = Math.ceil(r.height / ch);
    buildAtlas();
    glyph = new Uint8Array(cols * rows); seed = Float32Array.from({ length: cols * rows }, Math.random); scramble = new Float32Array(cols * rows);
    // frog placement: under the buttons, as wide as the old pixel frog
    const cta = host.querySelector('.close__cta')?.getBoundingClientRect();
    const fw = Math.min(660, r.width * 0.62), s = fw / 92;
    const top = cta ? cta.bottom - r.top + 48 : r.height * 0.55;
    box = { s, ox: r.width / 2 - 50 * s, oy: top - 9.6 * s };
    mfx = document.createElement('canvas'); mfx.width = cols; mfx.height = rows;
    paintMask();
  };

  // frog tone per cell (0..1), redrawn when the eyes move or blink
  const paintMask = () => {
    const m = mfx.getContext('2d', { willReadFrequently: true }), { s, ox, oy } = box;
    m.setTransform(1, 0, 0, 1, 0, 0); m.clearRect(0, 0, cols, rows);
    m.setTransform(s / cw, 0, 0, s / ch, ox / cw, oy / ch);
    const g = m.createLinearGradient(0, 10, 0, 90); g.addColorStop(0, 'rgba(255,255,255,0.7)'); g.addColorStop(1, '#fff');
    m.fillStyle = g; SKIN.forEach(p => m.fill(p));
    for (const cx of [21.8, 78.2]) {
      m.save(); m.translate(cx, 46.9); m.scale(1, eye.blink);
      // cut the eye hole with a solid fill, so it is fully empty (the body gradient would only half-cut it)
      m.globalCompositeOperation = 'destination-out'; m.fillStyle = '#fff'; m.beginPath(); m.arc(0, 0, 12, 0, Math.PI * 2); m.fill();
      m.globalCompositeOperation = 'source-over'; m.fillStyle = '#fff'; m.beginPath(); m.arc(eye.x, eye.y / Math.max(eye.blink, 0.3), 5.1, 0, Math.PI * 2); m.fill();
      m.restore();
    }
    const d = m.getImageData(0, 0, cols, rows).data;
    mask = new Float32Array(cols * rows);
    for (let i = 0; i < mask.length; i++) mask[i] = d[i * 4 + 3] / 255;
  };

  let last = 0, t0 = performance.now(), raf = 0, onScreen = false;
  const draw = now => {
    const t = (now - t0) / 1000, k = Math.ceil(cw * dpr), kh = Math.ceil(ch * dpr);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
      const v = y / rows;
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x, u = x / cols;
        // only the frog is drawn here; the sides and the water ripples are the pixel field underneath.
        // Eye holes stay empty: the mask is 0 there, so nothing is drawn.
        const mk = mask[i];
        if (mk < 0.08) continue;
        const tone = mk * (0.55 + 0.45 * fbm(x / 7 - t * 0.2, y / 5 + t * 0.15));
        let gi = Math.min(RAMP.length - 1, Math.max(1, Math.round(tone * (RAMP.length - 1))));
        // living characters: each cell re-rolls within its tone band every so often
        if (!reduce && seed[i] < 0.08) { glyph[i] = Math.min(RAMP.length - 1, Math.max(1, gi + Math.round((Math.random() - 0.5) * 2.4))); seed[i] = Math.random() + 0.4; }
        else seed[i] -= 0.02;
        if (!glyph[i]) glyph[i] = gi;
        const show = Math.abs(glyph[i] - gi) <= 1 ? glyph[i] : gi;
        ctx.globalAlpha = Math.min(1, 0.3 + tone * 0.75);
        ctx.drawImage(atlas, show * k, 0, k, kh, Math.round(x * cw * dpr), Math.round(y * ch * dpr), k, kh);
      }
    }
    ctx.globalAlpha = 1;
  };
  const loop = now => {
    raf = 0;
    if (!onScreen || document.hidden) return;
    const ex = eye.tx - eye.x, ey = eye.ty - eye.y;
    if (Math.abs(ex) + Math.abs(ey) > 0.02) { eye.x += ex * 0.18; eye.y += ey * 0.18; paintMask(); }
    if (now - last > 40) { last = now; draw(now); }
    raf = requestAnimationFrame(loop);
  };
  const kick = () => { if (!raf && !reduce) raf = requestAnimationFrame(loop); };

  const start = () => { layout(); draw(performance.now()); };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(start);
  let rt = 0; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(start, 150); });
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen) kick(); }).observe(host);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });
  if (reduce) return;
  if (matchMedia('(hover: hover)').matches) {
    addEventListener('pointermove', e => {
      if (!onScreen || !box) return;
      const r = host.getBoundingClientRect();
      const fx = r.left + box.ox + 50 * box.s, fy = r.top + box.oy + 46.9 * box.s;
      const dx = e.clientX - fx, dy = e.clientY - fy, d = Math.hypot(dx, dy) || 1, m = Math.min(1, d / 300) * 3.4;
      eye.tx = dx / d * m; eye.ty = dy / d * m;
    }, { passive: true });
  }
  const blink = () => {
    if (onScreen && !document.hidden && box) {
      const b0 = performance.now();
      const step = now => { const p = (now - b0) / 180; eye.blink = p >= 1 ? 1 : Math.max(0.1, Math.abs(1 - 2 * p)); paintMask(); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }
    setTimeout(blink, 2800 + Math.random() * 3600);
  };
  setTimeout(blink, 2000);
})();
