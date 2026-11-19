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
  const box = document.querySelector('[data-listen]'), prose = document.querySelector('[data-prose]');
  if (box && prose && 'speechSynthesis' in window) {
    box.hidden = false;
    const play = box.querySelector('[data-listen-play]'), label = box.querySelector('[data-listen-label]');
    const bar = box.querySelector('[data-listen-bar]'), rateBtn = box.querySelector('[data-listen-rate]');
    const rates = [1, 1.25, 1.5, 0.75];
    let rate = 0, state = 'idle', u = null;
    const title = document.querySelector('.article__title')?.textContent || '';
    const text = () => title + '. ' + [...prose.querySelectorAll('h2, p, li')].filter(el => !el.closest('.start__box, .codeblock')).map(el => el.textContent.trim()).join(' ');
    const set = s => { state = s; box.dataset.state = s; label.textContent = s === 'playing' ? 'Pause' : s === 'paused' ? 'Resume' : 'Listen to article'; play.setAttribute('aria-label', label.textContent); };
    const start = () => {
      speechSynthesis.cancel();
      const all = text();
      u = new SpeechSynthesisUtterance(all); u.rate = rates[rate];
      u.onboundary = e => { bar.style.width = Math.min(100, (e.charIndex / all.length) * 100) + '%'; };
      u.onend = () => { set('idle'); bar.style.width = '100%'; };
      u.onerror = () => set('idle');
      speechSynthesis.speak(u); set('playing');
    };
    play.addEventListener('click', () => {
      if (state === 'idle') start();
      else if (state === 'playing') { speechSynthesis.pause(); set('paused'); }
      else { speechSynthesis.resume(); set('playing'); }
    });
    rateBtn.addEventListener('click', () => {
      rate = (rate + 1) % rates.length; rateBtn.textContent = rates[rate] + 'x';
      if (state !== 'idle') start(); // a new rate needs a fresh utterance
    });
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
