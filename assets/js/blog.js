/* Blog: category tabs, listen to article (speech synthesis), copy for code blocks, and the cover maker. */
(() => {
  // ---- category tabs on the list ----
  const tabs = [...document.querySelectorAll('[data-filter]')];
  if (tabs.length) {
    const posts = [...document.querySelectorAll('.blog-list .post')];
    const empty = document.querySelector('[data-blog-empty]');
    const pick = (t, focus) => {
      const f = t.dataset.filter;
      tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; });
      let shown = 0;
      posts.forEach(p => { const on = f === 'All' || p.dataset.cat === f; p.hidden = !on; if (on) shown++; });
      if (empty) empty.hidden = shown > 0;
      if (focus) t.focus();
      document.querySelectorAll('canvas[data-cover]').forEach(c => { if (!c.closest('[hidden]') && window.FrogCover) window.FrogCover.render(c); });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => pick(t));
      t.addEventListener('keydown', e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault(); pick(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length], true);
      });
    });
  }

  // ---- listen to article ----
  // Speech synthesis has no seeking, so the article is read sentence by sentence. Time is estimated from the words
  // (about 165 words a minute at 1x), which lets the player show elapsed and total time, skip 10 seconds either way
  // and jump when the track is clicked.
  const box = document.querySelector('[data-listen]'), prose = document.querySelector('[data-prose]');
  if (box && prose && 'speechSynthesis' in window) {
    box.hidden = false;
    const $ = s => box.querySelector(s);
    const play = $('[data-listen-play]'), label = $('[data-listen-label]'), bar = $('[data-listen-bar]'), track = $('[data-listen-track]');
    const nowEl = $('[data-listen-now]'), totalEl = $('[data-listen-total]'), rateBtn = $('[data-listen-rate]');
    const rates = [1, 1.25, 1.5, 2, 0.75];
    const title = document.querySelector('.article__title')?.textContent.trim() || '';
    const body = [...prose.querySelectorAll('h2, p, li')].filter(el => !el.closest('.start__box, .codeblock')).map(el => el.textContent.trim());
    const sentences = [title, ...body].join(' ').match(/[^.!?]+[.!?]*\s*/g).map(s => s.trim()).filter(Boolean);
    const secs = sentences.map(s => s.split(/\s+/).length / 165 * 60); // at 1x
    const starts = secs.reduce((a, s, i) => (a.push(i ? a[i - 1] + secs[i - 1] : 0), a), []);
    const total = starts[starts.length - 1] + secs[secs.length - 1];
    let rate = 0, idx = 0, state = 'idle', sentStart = 0, tick = 0, run = 0;
    const fmt = t => { t = Math.max(0, Math.round(t)); return Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0'); };
    const r = () => rates[rate];
    totalEl.textContent = fmt(total / r());
    const position = () => {
      if (state !== 'playing') return starts[idx] || (state === 'idle' && idx >= sentences.length ? total : 0);
      return starts[idx] + Math.min(secs[idx], ((performance.now() - sentStart) / 1000) * r());
    };
    const paint = () => {
      const p = Math.min(total, position());
      nowEl.textContent = fmt(p / r()); bar.style.width = (p / total * 100) + '%';
      track.setAttribute('aria-valuenow', String(Math.round(p / total * 100)));
    };
    const set = s => {
      state = s; box.dataset.state = s;
      label.textContent = s === 'playing' ? 'Playing' : s === 'paused' ? 'Paused' : 'Listen to article';
      play.setAttribute('aria-label', s === 'playing' ? 'Pause' : 'Play the article');
      cancelAnimationFrame(tick);
      if (s === 'playing') { const loop = () => { paint(); tick = requestAnimationFrame(loop); }; loop(); } else paint();
    };
    const speakFrom = i => {
      const me = ++run;
      speechSynthesis.cancel();
      idx = Math.max(0, Math.min(sentences.length, i));
      if (idx >= sentences.length) { set('idle'); idx = 0; paint(); return; }
      const say = () => {
        if (me !== run) return;
        if (idx >= sentences.length) { set('idle'); idx = 0; bar.style.width = '100%'; return; }
        const u = new SpeechSynthesisUtterance(sentences[idx]); u.rate = r();
        u.onstart = () => { sentStart = performance.now(); };
        u.onend = () => { if (me !== run || state !== 'playing') return; idx++; say(); };
        u.onerror = () => { if (me === run && state === 'playing') set('idle'); };
        sentStart = performance.now();
        speechSynthesis.speak(u);
      };
      set('playing'); say();
    };
    // the sentence that holds a given time (seconds of the article at 1x)
    const at = t => { t = Math.max(0, Math.min(total - 0.01, t)); let i = 0; while (i + 1 < starts.length && starts[i + 1] <= t) i++; return i; };
    const seek = t => { const i = at(t); if (state === 'playing') speakFrom(i); else { idx = i; paint(); } };
    play.addEventListener('click', () => {
      if (state === 'idle') speakFrom(idx);
      else if (state === 'playing') { speechSynthesis.pause(); idx = at(position()); set('paused'); }
      else { speechSynthesis.cancel(); speakFrom(idx); }
    });
    box.querySelectorAll('[data-listen-skip]').forEach(b => b.addEventListener('click', () => seek(position() + (+b.dataset.listenSkip) * r())));
    track.addEventListener('click', e => { const b = track.getBoundingClientRect(); seek((e.clientX - b.left) / b.width * total); });
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); seek(position() + (e.key === 'ArrowRight' ? 10 : -10)); }
    });
    rateBtn.addEventListener('click', () => {
      rate = (rate + 1) % rates.length; rateBtn.textContent = r() + 'x';
      totalEl.textContent = fmt(total / r());
      if (state === 'playing') speakFrom(at(position())); else paint();
    });
    paint();
    addEventListener('pagehide', () => speechSynthesis.cancel());
  }

  // ---- copy for code blocks ----
  document.querySelectorAll('[data-copy-code]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.closest('.codeblock').querySelector('code').textContent;
      try { await navigator.clipboard.writeText(code); btn.textContent = 'Copied'; } catch { btn.textContent = 'Select and copy'; }
      setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
    });
  });

  // ---- cover maker ----
  const mk = document.getElementById('mk-canvas');
  if (mk) {
    const $ = id => document.getElementById(id);
    const draw = () => {
      const ctx = mk.getContext('2d');
      window.FrogCover.draw(ctx, mk.width, mk.height, { seed: $('mk-seed').value, kind: $('mk-kind').value, cell: 6 });
      if ($('mk-text').checked && $('mk-title').value.trim()) {
        // title bottom-left on a soft shade, wrapped to the left 60%
        const g = ctx.createLinearGradient(0, mk.height, 0, mk.height * 0.35);
        g.addColorStop(0, 'rgba(9,14,27,0.92)'); g.addColorStop(1, 'rgba(9,14,27,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, mk.width, mk.height);
        ctx.fillStyle = '#f8fafc'; ctx.font = '600 76px "Funnel Display", system-ui, sans-serif'; ctx.textBaseline = 'alphabetic';
        const words = $('mk-title').value.trim().split(/\s+/), lines = []; let line = '';
        for (const w of words) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > mk.width * 0.62 && line) { lines.push(line); line = w; } else line = t; }
        lines.push(line);
        const lh = 84, y0 = mk.height - 96 - (lines.length - 1) * lh;
        lines.forEach((l, i) => ctx.fillText(l, 96, y0 + i * lh));
        ctx.fillStyle = '#3acf6a'; ctx.font = '600 30px "Funnel Sans", system-ui, sans-serif';
        ctx.fillText($('mk-kind').value.toUpperCase(), 96, y0 - lh - 8);
      }
    };
    ['mk-title', 'mk-seed', 'mk-kind', 'mk-text'].forEach(id => $(id).addEventListener('input', draw));
    $('mk-shuffle').addEventListener('click', () => { $('mk-seed').value = $('mk-seed').value.replace(/-\d+$/, '') + '-' + Math.floor(Math.random() * 999); draw(); });
    $('mk-download').addEventListener('click', () => {
      mk.toBlob(b => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = ($('mk-seed').value || 'cover') + '.png'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); });
    });
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(draw);
  }
})();
