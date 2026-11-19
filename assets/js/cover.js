/* Blog covers, drawn in code: every post gets a header image from its slug and category, no image files needed.
   The look is the site's own: brand green, ordered (Bayer 8x8) dither over value noise, on the page ground.
   Each category has its own motif, and the slug seeds the noise so no two covers match.

   Use: <canvas data-cover data-seed="post-slug" data-kind="Engineering"></canvas>
   Kinds: Announcements (the frog), Engineering (contour lines), Kill SaaS (a slash), Guides (rings from a corner).
   window.FrogCover.render(canvas, { seed, kind, cell }) draws one canvas; window.FrogCover.draw(ctx, w, h, opts) draws
   into any 2D context (the cover maker uses it to export PNGs). */
(() => {
  const BG = [9, 14, 27], INK = [58, 207, 106];
  const B8 = [0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,12,44,4,36,14,46,6,38,60,28,52,20,62,30,54,22,3,35,11,43,1,33,9,41,51,19,59,27,49,17,57,25,15,47,7,39,13,45,5,37,63,31,55,23,61,29,53,21].map(v => (v + 0.5) / 64);
  const FROG = [
    'M 93.9,67.1 C 92.9,79.9 73.6,90 50,90 26.4,90 7.1,79.9 6.1,67.1 Z',
    'm 92.2,59.4 c 0.5,0.9 0.8,1.8 1.1,2.7 H 6.7 C 7,61.2 7.3,60.3 7.8,59.5 8.3,58.5 8.3,57.3 7.6,56.3 5.8,53.6 4.8,50.4 4.8,46.9 c 0,-9.4 7.6,-17 17,-17 7.2,0 13.4,4.5 15.9,10.9 0.5,1.3 1.8,2.1 3.1,1.9 3,-0.3 6.1,-0.5 9.2,-0.5 3.2,0 6.3,0.2 9.2,0.5 1.3,0.2 2.6,-0.6 3.1,-1.8 C 65,33.8 72.1,29 80.2,30 c 7.8,0.9 14.1,7.3 14.9,15.1 0.4,4.1 -0.7,8 -2.8,11.1 -0.6,1 -0.6,2.2 -0.1,3.2 z',
    'm 65.5,14.8 -7.8,3.9 c -0.3,0.1 -0.6,0.1 -0.8,-0.2 l -6.5,-8.3 c -0.3,-0.3 -0.7,-0.3 -1,0 l -6.2,8.5 C 43,18.9 42.7,19 42.4,18.9 l -8,-4.1 c -0.5,-0.2 -1,0.2 -0.9,0.7 L 36.7,29 c 0.1,0.5 0.6,0.9 1.1,0.9 h 24.5 c 0.5,0 1,-0.4 1.1,-0.9 l 3.1,-13.5 c 0,-0.5 -0.5,-0.9 -1,-0.7 z',
  ];
  const hashStr = s => { let h = 2166136261; for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = seed => () => ((seed = Math.imul(seed ^ (seed >>> 15), 2246822519) + 0x6d2b79f5 >>> 0) / 4294967296);
  const makeNoise = seed => {
    const r = rng(seed), G = 64, grid = Float32Array.from({ length: G * G }, r);
    const at = (x, y) => grid[((y & 63) * G) + (x & 63)];
    const vn = (x, y) => {
      const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
      return (at(xi, yi) * (1 - u) + at(xi + 1, yi) * u) * (1 - v) + (at(xi, yi + 1) * (1 - u) + at(xi + 1, yi + 1) * u) * v;
    };
    return (x, y) => vn(x, y) * 0.55 + vn(x * 2.1 + 17, y * 2.1) * 0.28 + vn(x * 4.3, y * 4.3 + 31) * 0.17;
  };
  const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

  // field value 0..1 for a cell, by motif
  const motif = (kind, cols, rows, n, r, mask) => {
    const ax = 0.55 + r() * 0.35, ay = 0.35 + r() * 0.4, ang = (r() * 0.5 + 0.35) * Math.PI;
    const ca = Math.cos(ang), sa = Math.sin(ang), freq = 9 + r() * 6;
    return (x, y) => {
      const u = x / cols, v = y / rows, asp = cols / rows, base = n(x / 34, y / 34);
      switch (kind) {
        case 'Engineering': { // contour lines through a soft hill
          const h = base * 0.9 + Math.hypot((u - ax) * asp, v - ay) * -1.4;
          const band = Math.abs(Math.sin(h * freq * 0.8));
          return smooth(0.9, 1, band) * 0.95 + smooth(0.2, 1.1, 1 - Math.hypot((u - ax) * asp, v - ay)) * 0.25;
        }
        case 'Kill SaaS': { // a bright slash across a cloudy field
          const d = Math.abs((u - ax) * asp * ca + (v - ay) * sa);
          return smooth(0.22, 0, d) * 1.1 + base * 0.45 * smooth(0.9, 0.2, d);
        }
        case 'Guides': { // rings opening from a corner, like steps outward
          const d = Math.hypot((u - 1.02) * asp, v - 1.05) * freq * 0.7 + base * 1.4;
          return smooth(0.55, 1, Math.abs(Math.sin(d))) * smooth(2.2, 0.4, Math.hypot((u - 1) * asp, v - 1)) * 1.05;
        }
        default: { // Announcements: the frog, with a cloud around it
          const m = mask ? mask[y * cols + x] : 0;
          const glow = smooth(1.1, 0.1, Math.hypot((u - ax) * asp * 0.8, v - 0.62));
          return Math.max(m * (0.55 + base * 0.6), base * glow * 0.75);
        }
      }
    };
  };

  const frogMask = (cols, rows, r) => {
    const c = document.createElement('canvas'); c.width = cols; c.height = rows;
    const x = c.getContext('2d'), s = (rows * 0.95) / 80;
    const ox = cols * (0.58 + r() * 0.12) - 50 * s, oy = rows * 1.02 - 90 * s;
    x.setTransform(s, 0, 0, s, ox, oy); x.fillStyle = '#fff';
    FROG.forEach(d => x.fill(new Path2D(d)));
    x.globalCompositeOperation = 'destination-out';
    for (const cx of [21.8, 78.2]) { x.beginPath(); x.arc(cx, 46.9, 12, 0, 7); x.fill(); }
    x.globalCompositeOperation = 'source-over';
    for (const cx of [21.8, 78.2]) { x.beginPath(); x.arc(cx, 46.9, 5.1, 0, 7); x.fill(); }
    const d = x.getImageData(0, 0, cols, rows).data, out = new Float32Array(cols * rows);
    for (let i = 0; i < out.length; i++) out[i] = d[i * 4 + 3] / 255;
    return out;
  };

  // draws a cover into ctx at w x h device pixels; cell = device pixels per dither cell
  const draw = (ctx, w, h, { seed = 'frogbot', kind = 'Announcements', cell = 4 } = {}) => {
    const s = hashStr(seed + '|' + kind), r = rng(s), n = makeNoise(s);
    const cols = Math.ceil(w / cell), rows = Math.ceil(h / cell);
    const f = motif(kind, cols, rows, n, r, kind === 'Announcements' || !['Engineering', 'Kill SaaS', 'Guides'].includes(kind) ? frogMask(cols, rows, r) : null);
    const img = ctx.createImageData(cols, rows), d = img.data;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const v = Math.min(1, f(x, y)), o = (y * cols + x) * 4, on = v > B8[(y & 7) * 8 + (x & 7)];
      const a = on ? 0.2 + v * 0.5 : 0;
      d[o] = BG[0] + (INK[0] - BG[0]) * a; d[o + 1] = BG[1] + (INK[1] - BG[1]) * a; d[o + 2] = BG[2] + (INK[2] - BG[2]) * a; d[o + 3] = 255;
    }
    const tmp = document.createElement('canvas'); tmp.width = cols; tmp.height = rows;
    tmp.getContext('2d').putImageData(img, 0, 0);
    ctx.save(); ctx.imageSmoothingEnabled = false; ctx.drawImage(tmp, 0, 0, cols * cell, rows * cell); ctx.restore();
  };

  const render = (canvas, opts = {}) => {
    const rect = canvas.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
    const w = Math.max(1, Math.round(rect.width * dpr)), h = Math.max(1, Math.round(rect.height * dpr));
    canvas.width = w; canvas.height = h;
    draw(canvas.getContext('2d'), w, h, {
      seed: opts.seed ?? canvas.dataset.seed, kind: opts.kind ?? canvas.dataset.kind,
      cell: Math.round((opts.cell ?? +(canvas.dataset.cell || 3)) * dpr),
    });
  };

  window.FrogCover = { draw, render };
  const all = () => document.querySelectorAll('canvas[data-cover]').forEach(c => render(c));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', all); else all();
  let t = 0; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(all, 200); });
})();
