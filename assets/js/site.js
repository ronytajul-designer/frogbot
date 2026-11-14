(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = n => '$' + Math.round(n).toLocaleString('en-US');

  // Owned price: Pro plan, one app, $29 per month.
  const OWN_PER_YEAR = 29 * 12;
  const SIDE_COLORS = ['var(--fb-green)', '#fbbf24', '#6aa8ff', '#c59bff'];
  const SEATS = 25;

  // Per-seat list prices are the ones FrogBot publishes with a date (Sept 2026).
  const TOOLS = {
    airtable: {
      name: 'Airtable', ws: 'Ops workspace', noun: 'base', perSeat: 45, unit: 'seat', url: 'airtable.frogbot.app/admin',
      title: 'Ops and Inventory Base', meta: '54,200 rows. Unlimited editors at $0 per seat.',
      agent: 'Agent built 4 collections, 3 roles, 2 automations',
      steps: ['Reading your Airtable base', 'Creating 4 collections', 'Setting 3 roles', 'Wiring 2 automations'],
      note: 'Agent matched 212 of 215 supplier rows from your CSV import. 3 rows held for your review.',
      side: ['Inventory', 'Suppliers', 'Purchase orders', 'Automations'],
      rows: [
        ['INV-9042 Apex Industrial', '$14,820, net 30', 'ok', 'Synced'],
        ['INV-9043 Northstar Freight', '$3,410, due Friday', 'warn', 'Needs review'],
        ['INV-9044 Kestrel Packaging', '$8,190, approved', 'ok', 'Synced'],
        ['INV-9045 Pacific Customs', '$1,950, customs hold', 'warn', 'Needs review']
      ]
    },
    salesforce: {
      name: 'Salesforce', ws: 'Revenue workspace', noun: 'CRM', perSeat: 175, unit: 'seat', url: 'crm.frogbot.app/admin',
      title: 'Revenue CRM', meta: 'The 5 fields reps use. Gmail and Slack connected.',
      agent: 'Agent built 5 collections, 4 roles, 3 automations',
      steps: ['Reading your Salesforce export', 'Creating 5 collections', 'Setting 4 roles', 'Wiring 3 automations'],
      note: 'Follow-up agent drafted 14 check-in emails from call notes. 2 deals held for rep review.',
      side: ['Deals', 'Accounts', 'Contacts', 'Follow-ups'],
      rows: [
        ['Meridian Logistics', '$84,000, security review', 'ok', 'Active deal'],
        ['Vanguard Health', '$140,000, redlines', 'warn', 'Needs review'],
        ['Redwood Manufacturing', '$42,000, verbal commit', 'ok', 'Active deal'],
        ['Atlas Partners', '$65,000, discovery', 'ok', 'Active deal']
      ]
    },
    zendesk: {
      name: 'Zendesk', ws: 'Support workspace', noun: 'help desk', perSeat: 115, unit: 'agent', url: 'support.frogbot.app/admin',
      title: 'Support Inbox', meta: 'Unlimited support agents. Answers drawn from your docs.',
      agent: 'Agent built 3 collections, 3 roles, 4 automations',
      steps: ['Reading your Zendesk tickets', 'Creating 3 collections', 'Setting 3 roles', 'Wiring 4 automations'],
      note: 'Triage agent answered 64 routine tickets from your docs. 2 billing questions held for a person.',
      side: ['Tickets', 'Customers', 'Help articles', 'Automations'],
      rows: [
        ['#4812 Permission mapping question', 'Beacon Financial', 'ok', 'Auto-resolved'],
        ['#4813 Prorate annual invoice', 'Harbor Logistics', 'warn', 'Needs review'],
        ['#4814 Webhook retry behaviour', 'Nova Studio', 'ok', 'Auto-resolved'],
        ['#4815 Export all tickets to CSV', 'Kestrel Packaging', 'ok', 'Auto-resolved']
      ]
    }
  };

  /* Header menu */
  const toggle = $('[data-menu-toggle]');
  const menu = $('#mobile-menu');
  if (toggle && menu) {
    const set = open => { toggle.setAttribute('aria-expanded', String(open)); menu.hidden = !open; };
    toggle.addEventListener('click', () => set(menu.hidden));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { set(false); toggle.focus(); } });
    menu.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  }

  /* Hero command bar and product window */
  const typed = $('[data-typed]');
  const srText = $('[data-command-sr]');
  let typingRun = 0;

  const sentence = t => [['Replace our ', false], [t.name, true], [' ' + t.noun + ' for a team of ', false], [String(SEATS), true]];

  function type(parts) {
    const run = ++typingRun;
    if (reduce) { typed.innerHTML = parts.map(([s, b]) => b ? `<b>${s}</b>` : s).join(''); return; }
    typed.textContent = '';
    let p = 0, c = 0, node = null;
    const step = () => {
      if (run !== typingRun) return;
      if (p >= parts.length) return;
      const [text, bold] = parts[p];
      if (c === 0) { node = bold ? document.createElement('b') : document.createTextNode(''); typed.appendChild(node); }
      node.textContent += text[c++];
      if (c >= text.length) { p++; c = 0; }
      setTimeout(step, 22 + Math.random() * 28);
    };
    step();
  }

  function count(el, to, from) {
    if (reduce || from === to) { el.textContent = money(to); return; }
    const start = performance.now(), dur = 700;
    const tick = now => {
      const k = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = money(from + (to - from) * e);
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  let currentRent = TOOLS.airtable.perSeat * SEATS * 12;

  function showTool(key, animate = true) {
    const t = TOOLS[key];
    const rent = t.perSeat * SEATS * 12;
    const run = typingRun + 1;
    $$('[data-tool]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tool === key)));
    type(sentence(t));
    srText.textContent = `Example request: replace our ${t.name} ${t.noun} for a team of ${SEATS}. Rented ${money(rent)} a year, owned ${money(OWN_PER_YEAR)} a year.`;
    $('[data-url]').textContent = t.url;
    $('[data-title]').textContent = t.title;
    $('[data-meta]').textContent = t.meta;
    const setSaving = () => {
      $('[data-tool-name]').textContent = t.name;
      $('[data-seats]').textContent = `${SEATS} ${t.unit}s`;
      $('[data-source]').textContent = `${t.name} list price $${t.perSeat} per ${t.unit}, Sept 2026.`;
      $('[data-own-bar]').style.width = Math.max(0.8, (OWN_PER_YEAR / rent) * 100) + '%';
    };

    const side = $('[data-side]');
    const body = $('[data-rows]');
    const note = $('[data-note]');
    const agent = $('[data-agent]');
    const win = $('[data-window]');
    side.innerHTML = t.side.map((x, i) => `<li${i === 0 ? ' class="is-on"' : ''} style="--c:${SIDE_COLORS[i % 4]}"><i></i>${x}</li>`).join('');
    $('[data-ws]').textContent = t.ws;
    const rowsHtml = t.rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td><span class="tag tag--${r[2]}">${r[3]}</span></td></tr>`).join('');

    if (!animate || reduce) {
      body.innerHTML = rowsHtml;
      note.textContent = t.note;
      agent.textContent = t.agent;
      setSaving();
      count($('[data-rent]'), rent, rent);
      currentRent = rent;
      return;
    }

    // Staged build, about 2.8 seconds: steps narrate, collections arrive, rows resolve, then the bill recounts.
    const later = (ms, fn) => setTimeout(() => { if (run === typingRun) fn(); }, ms);
    win.classList.add('is-building');
    win.classList.remove('is-busy'); void win.offsetWidth; win.classList.add('is-busy');
    $$('li', side).forEach(li => li.classList.add('is-wait'));
    $$('tr', body).forEach(tr => tr.classList.add('is-loading'));
    t.steps.forEach((step, i) => later(i * 560, () => { agent.textContent = step + '…'; }));
    $$('li', side).forEach((li, i) => later(400 + i * 360, () => li.classList.remove('is-wait')));
    later(900, () => {
      body.innerHTML = rowsHtml;
      $$('tr', body).forEach((tr, i) => { tr.classList.add('is-loading'); later(300 + i * 380, () => tr.classList.remove('is-loading')); });
    });
    later(2500, () => {
      agent.textContent = t.agent;
      note.textContent = t.note;
      setSaving();
      win.classList.remove('is-building');
      count($('[data-rent]'), rent, currentRent);
      currentRent = rent;
    });
  }

  if (typed) {
    $$('[data-tool]').forEach(b => b.addEventListener('click', () => showTool(b.dataset.tool)));
    // First view: type the sentence and resolve the rows once the hero has risen.
    if (!reduce) setTimeout(() => showTool('airtable'), 500);
  }

  /* Copy the agent prompt */
  $$('[data-copy]').forEach(btn => {
    const label = $('[data-copy-label]', btn);
    const idle = label.textContent;
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(btn.dataset.copy); label.textContent = 'prompt copied'; }
      catch { label.textContent = 'copy failed, select it in the docs'; }
      setTimeout(() => { label.textContent = idle; }, 2400);
    });
  });

  /* Reveal on scroll */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));

  /* Visuals run only while on screen */
  const loop = (el, fn, ms) => {
    let id = null;
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !id && !reduce) id = setInterval(fn, ms);
      else if (!e.isIntersecting && id) { clearInterval(id); id = null; }
    }, { threshold: 0.4 }).observe(el);
  };

  const views = $('[data-views]');
  if (views) {
    const flip = () => {
      const board = views.classList.toggle('is-board');
      $$('[data-view-tab]', views).forEach(t => t.classList.toggle('is-on', (t.dataset.viewTab === 'board') === board));
    };
    loop(views, flip, 3600);
  }

  const brand = $('[data-brand]');
  if (brand) {
    const brands = [
      { name: 'Acme Client Portal', url: 'portal.acme.com', accent: '#6aa8ff' },
      { name: 'Northwind Desk', url: 'desk.northwind.co', accent: '#ffb454' },
      { name: 'Kestrel Ops', url: 'ops.kestrel.io', accent: '#c59bff' }
    ];
    let i = 0;
    loop(brand, () => {
      const b = brands[++i % brands.length];
      brand.style.setProperty('--accent', b.accent);
      $('[data-brand-mark]', brand).textContent = b.name[0];
      $('[data-brand-name]', brand).textContent = b.name;
      $('[data-brand-url]', brand).textContent = b.url;
      $('[data-brand-code-name]', brand).textContent = `"${b.name}"`;
      $('[data-brand-code-accent]', brand).textContent = `"${b.accent}"`;
      $('[data-brand-code-url]', brand).textContent = `"${b.url}"`;
    }, 3200);
  }

  /* Seat calculator */
  const calc = $('[data-calc]');
  if (calc) {
    const range = $('#calc-seats', calc);
    const update = () => {
      const t = TOOLS[$('input[name="calc-tool"]:checked', calc).value];
      const seats = Number(range.value);
      const rent = t.perSeat * seats * 12;
      $('[data-calc-seats]', calc).textContent = `${seats} ${t.unit}s`;
      $('[data-calc-name]', calc).textContent = t.name;
      $('[data-calc-rent]', calc).textContent = money(rent);
      $('[data-calc-keep]', calc).textContent = money(rent - OWN_PER_YEAR);
      $('[data-calc-own-bar]', calc).style.width = Math.max(0.6, (OWN_PER_YEAR / rent) * 100) + '%';
      $('[data-calc-source]', calc).textContent = `${t.name} list price $${t.perSeat} per ${t.unit}, September 2026. FrogBot Pro, one app, unlimited users. Add-ons extra.`;
      range.style.setProperty('--fill', ((seats - range.min) / (range.max - range.min)) * 100 + '%');
      range.setAttribute('aria-valuetext', `${seats} ${t.unit}s`);
    };
    calc.addEventListener('input', update);
    update();
  }

  /* Draw-on-entry pieces */
  $$('[data-draw]').forEach(el => io.observe(el));

  /* Mobile sticky action: shown after the hero, hidden near the closing call to action */
  const sticky = $('[data-sticky]');
  const hero = $('.hero');
  const closing = $('.close');
  if (sticky && hero && closing) {
    let pastHero = false, atClose = false;
    const sync = () => { sticky.hidden = !(pastHero && !atClose); };
    new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; sync(); }, { rootMargin: '-40% 0px 0px 0px' }).observe(hero);
    new IntersectionObserver(([e]) => { atClose = e.isIntersecting; sync(); }, { threshold: 0.2 }).observe(closing);
  }
})();

/* Smooth scrolling with Lenis. Skipped when the visitor prefers reduced motion or the library failed to load. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || typeof window.Lenis !== 'function') return;
  const lenis = new window.Lenis({ duration: 1.15, easing: t => 1 - Math.pow(1 - t, 4), smoothWheel: true, anchors: { offset: -96 } });
  const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  // Keep keyboard users in sync: move focus to the target of in-page links.
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    setTimeout(() => target.focus({ preventScroll: true }), 1200);
  });
  // Pause while the mobile menu is open so the page underneath does not move.
  const toggle = document.querySelector('[data-menu-toggle]');
  if (toggle) new MutationObserver(() => toggle.getAttribute('aria-expanded') === 'true' ? lenis.stop() : lenis.start()).observe(toggle, { attributes: true, attributeFilter: ['aria-expanded'] });
  window.lenis = lenis;
})();
