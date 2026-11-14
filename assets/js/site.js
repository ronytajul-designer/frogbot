(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = n => '$' + Math.round(n).toLocaleString('en-US');

  // Owned price: Pro plan, one app, $29 per month.
  const OWN_PER_YEAR = 29 * 12;
  const SIDE_COLORS = ['var(--fb-green)', '#fbbf24', '#6aa8ff', '#c59bff'];
  let SEATS = 25;

  // Rates are the ones FrogBot's live site uses for this calculator. Airtable, Salesforce and Zendesk are dated list prices (Sept 2026).
  const TOOLS = {
    airtable: {
      name: 'Airtable', perSeat: 45, unit: 'seat', ws: 'Ops workspace', noun: 'base', url: 'airtable.frogbot.app/admin',
      source: 'Airtable list price $45 per seat, Sept 2026.', done: 'Synced', config: ['Inventory', 'Suppliers', 'PurchaseOrders'], agentName: 'supplierMatcher',
      title: 'Ops and Inventory Base', meta: '54,200 rows. Unlimited editors at $0 per seat.',
      agent: 'Agent built 4 collections, 3 roles, 2 automations',
      steps: ['Reading your Airtable base', 'Creating 4 collections', 'Setting 3 roles', 'Wiring 2 automations'],
      note: 'Agent matched 212 of 215 supplier rows from your CSV import. 2 rows held for your review.',
      side: ['Inventory', 'Suppliers', 'Purchase orders', 'Automations'],
      rows: [
        ['INV-9042 Apex Industrial', '$14,820, net 30', 'ok', 'Synced', 'Matched to Warehouse Supplies (99%)'],
        ['INV-9043 Northstar Freight', '$3,410, due Friday', 'warn', 'Needs review', 'Split line item, confirm the account'],
        ['INV-9044 Kestrel Packaging', '$8,190, approved', 'ok', 'Synced', 'Matched to Packaging costs (97%)'],
        ['INV-9045 Pacific Customs', '$1,950, customs hold', 'warn', 'Needs review', 'New vendor, waiting for ops approval']
      ]
    },
    salesforce: {
      name: 'Salesforce', perSeat: 175, unit: 'seat', ws: 'Revenue workspace', noun: 'CRM', url: 'crm.frogbot.app/admin',
      source: 'Salesforce list price $175 per seat, Sept 2026.', done: 'Active deal', config: ['Deals', 'Accounts', 'Contacts'], agentName: 'followUpWriter',
      title: 'Revenue CRM', meta: 'The 5 fields reps use. Gmail and Slack connected.',
      agent: 'Agent built 5 collections, 4 roles, 3 automations',
      steps: ['Reading your Salesforce export', 'Creating 5 collections', 'Setting 4 roles', 'Wiring 3 automations'],
      note: 'Follow-up agent drafted 14 check-in emails from call notes. 1 deal held for rep review.',
      side: ['Deals', 'Accounts', 'Contacts', 'Follow-ups'],
      rows: [
        ['Meridian Logistics', '$84,000, security review', 'ok', 'Active deal', 'Sent the security packet, follow-up Tuesday'],
        ['Vanguard Health', '$140,000, redlines', 'warn', 'Needs review', 'Custom DPA drafted, ready to approve'],
        ['Redwood Manufacturing', '$42,000, verbal commit', 'ok', 'Active deal', 'Order form generated in Stripe'],
        ['Atlas Partners', '$65,000, discovery', 'ok', 'Active deal', 'Enriched from Gmail, next touch in 3 days']
      ]
    },
    hubspot: {
      name: 'HubSpot', perSeat: 90, base: 1500, unit: 'seat', ws: 'Growth workspace', noun: 'pipeline', url: 'pipeline.frogbot.app/admin',
      source: 'HubSpot rate as used on frogbot.ai: $90 per seat plus a $1,500 yearly base.', done: 'Routed', config: ['Leads', 'Companies', 'Sequences'], agentName: 'inboundRouter',
      title: 'Inbound and Pipeline Hub', meta: 'No contact-tier price jumps. Lifecycle workflows that finish.',
      agent: 'Agent built 4 collections, 3 roles, 3 automations',
      steps: ['Reading your HubSpot export', 'Creating 4 collections', 'Setting 3 roles', 'Wiring 3 automations'],
      note: 'Inbound agent enriched 38 new signups and routed 4 high-intent accounts. 1 intro email held for approval.',
      side: ['Leads', 'Companies', 'Sequences', 'Automations'],
      rows: [
        ['claire@ironclad-ops.io', '340 employees, from the calculator', 'warn', 'Needs review', 'High intent, approve a personal intro'],
        ['david@kinetix-agency.com', 'AI agency, from GitHub', 'ok', 'Routed', 'Tagged as agency, partner deck sent'],
        ['ops@summitfreight.com', '180 employees, from YouTube', 'ok', 'Routed', 'Enriched and assigned to West pipeline']
      ]
    },
    zendesk: {
      name: 'Zendesk', perSeat: 115, unit: 'agent', ws: 'Support workspace', noun: 'help desk', url: 'support.frogbot.app/admin',
      source: 'Zendesk list price $115 per agent, Sept 2026.', done: 'Auto-resolved', config: ['Tickets', 'Customers', 'HelpArticles'], agentName: 'ticketTriage',
      title: 'Support Inbox', meta: 'Unlimited support agents. Answers drawn from your docs.',
      agent: 'Agent built 3 collections, 3 roles, 4 automations',
      steps: ['Reading your Zendesk tickets', 'Creating 3 collections', 'Setting 3 roles', 'Wiring 4 automations'],
      note: 'Triage agent answered 64 routine tickets from your docs. 1 billing question held for a person.',
      side: ['Tickets', 'Customers', 'Help articles', 'Automations'],
      rows: [
        ['#4812 Permission mapping question', 'Beacon Financial', 'ok', 'Auto-resolved', 'Answered from docs/access.md (98%)'],
        ['#4813 Prorate annual invoice', 'Harbor Logistics', 'warn', 'Needs review', 'Refund policy triggered, approve $140 credit'],
        ['#4814 Webhook retry behaviour', 'Nova Studio', 'ok', 'Auto-resolved', 'Linked the retry schedule example']
      ]
    },
    jira: {
      name: 'Jira', perSeat: 18, unit: 'seat', ws: 'Product workspace', noun: 'tracker', url: 'issues.frogbot.app/admin',
      source: 'Jira rate as used on frogbot.ai: $18 per seat.', done: 'Done', config: ['Issues', 'Sprints', 'Releases'], agentName: 'bugTriage',
      title: 'Issue and Sprint Tracker', meta: 'Fast queries. GitHub pull requests synced. AI duplicate triage.',
      agent: 'Agent built 3 collections, 4 roles, 2 automations',
      steps: ['Reading your Jira project', 'Creating 3 collections', 'Setting 4 roles', 'Wiring 2 automations'],
      note: 'GitHub sync closed 9 issues from merged pull requests and flagged 1 regression for review.',
      side: ['Issues', 'Sprints', 'Releases', 'Automations'],
      rows: [
        ['FB-402 Isolate tenant connection pool', 'Sprint 14, PR #884 merged', 'ok', 'Done', 'Closed automatically on merge'],
        ['FB-409 Timeout on 50MB CSV upload', 'Reported by a customer, P1', 'warn', 'Needs review', 'Root cause found, approve the hotfix'],
        ['FB-411 Add team role mapping table', 'Sprint 14, in progress', 'ok', 'In progress', '2 of 3 acceptance tests passing']
      ]
    },
    asana: {
      name: 'Asana', perSeat: 25, unit: 'seat', ws: 'Delivery workspace', noun: 'project tracker', url: 'projects.frogbot.app/admin',
      source: 'Asana rate as used on frogbot.ai: $25 per seat.', done: 'On track', config: ['Projects', 'Milestones', 'Approvals'], agentName: 'weeklyRollup',
      title: 'Projects and Approvals', meta: 'No seat blocks. Row-level permissions. Approvals that wait for a person.',
      agent: 'Agent built 3 collections, 3 roles, 3 automations',
      steps: ['Reading your Asana projects', 'Creating 3 collections', 'Setting 3 roles', 'Wiring 3 automations'],
      note: 'Weekly rollup agent compiled status across 6 client projects. 1 milestone waits for sign-off.',
      side: ['Projects', 'Milestones', 'Approvals', 'Automations'],
      rows: [
        ['Q4 security audit evidence', 'Security, due Nov 15', 'ok', 'On track', '18 of 20 controls verified automatically'],
        ['Client portal handover, Acme', 'Agency delivery, milestone 3', 'warn', 'Needs review', 'Staging passed, approve the cutover'],
        ['Move Airtable bases to Dojo', 'Ops, 4 bases imported', 'ok', 'Completed', 'Airtable subscription cancelled']
      ]
    }
  };
  const rentFor = (t, n) => (t.base || 0) + t.perSeat * 12 * n;

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

  let currentRent = rentFor(TOOLS.airtable, SEATS);

  const state = { tool: null, rows: [] };
  const esc = x => String(x).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const rowsMarkup = () => state.rows.map(r => `<tr><td title="${esc(r[0])}">${esc(r[0])}</td><td title="${esc(r[1])}">${esc(r[1])}</td><td><span class="tag tag--${r[2]}">${esc(r[3])}</span></td><td class="rows__note" title="${esc(r[4])}">${esc(r[4])}</td></tr>`).join('');
  function renderSideViews() {
    const t = state.tool;
    const board = $('[data-pane="board"]');
    const cols = [['Needs review', 'warn'], [t.done, 'ok']];
    board.innerHTML = cols.map(([label, kind]) => `<div class="board__col"><p class="board__head"><span class="tag tag--${kind}">${esc(label)}</span><i>${state.rows.filter(r => r[2] === kind).length}</i></p>${state.rows.filter(r => r[2] === kind).map(r => `<div class="board__card"><b>${esc(r[0])}</b><span>${esc(r[1])}</span></div>`).join('') || '<p class="board__empty">Nothing waiting</p>'}</div>`).join('');
    $('[data-config]').textContent = `// frogbot.config.ts\nexport default buildConfig({\n  collections: [${t.config.join(', ')}],\n  roles: ['admin', 'member', 'end user'],\n  agents: [${t.agentName}],\n});`;
  }
  function resetApprove() {
    const b = $('[data-approve]');
    if (!b) return;
    b.disabled = false; b.textContent = 'Approve flagged';
  }
  function syncSaving() {
    const t = state.tool || TOOLS.airtable;
    const rent = rentFor(t, SEATS);
    $$('[data-side-price]').forEach(el => { el.textContent = money(rentFor(TOOLS[el.dataset.sidePrice], SEATS)) + '/yr'; });
    const keep = $('[data-keep]'); if (keep) keep.textContent = money(rent - OWN_PER_YEAR);
    const cp = $('[data-copy-tool]'); if (cp) cp.textContent = `Copy ${t.name} prompt`;
    const r = $('[data-win-seats]'); if (r) { r.value = SEATS; r.style.setProperty('--fill', ((SEATS - r.min) / (r.max - r.min)) * 100 + '%'); r.setAttribute('aria-valuetext', `${SEATS} ${t.unit}s`); }
    const out = $('[data-win-seats-out]'); if (out) out.textContent = `${SEATS} ${t.unit}s`;
  }
  function showTool(key, animate = true) {
    const t = TOOLS[key];
    const rent = rentFor(t, SEATS);
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
      $('[data-source]').textContent = t.source;
      syncSaving();
      $('[data-own-bar]').style.width = Math.max(0.8, (OWN_PER_YEAR / rent) * 100) + '%';
    };

    const side = $('[data-side]');
    const body = $('[data-rows]');
    const note = $('[data-note]');
    const agent = $('[data-agent]');
    const win = $('[data-window]');
    if (side) side.innerHTML = t.side.map((x, i) => `<li${i === 0 ? ' class="is-on"' : ''} style="--c:${SIDE_COLORS[i % 4]}"><i></i>${x}</li>`).join('');
    $('[data-ws]').textContent = t.ws;
    state.tool = t; state.rows = t.rows.map(r => r.slice()); resetApprove();
    const rowsHtml = rowsMarkup();
    renderSideViews();

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
    if (side) $$('li', side).forEach(li => li.classList.add('is-wait'));
    $$('tr', body).forEach(tr => tr.classList.add('is-loading'));
    t.steps.forEach((step, i) => later(i * 560, () => { agent.textContent = step + '…'; }));
    if (side) $$('li', side).forEach((li, i) => later(400 + i * 360, () => li.classList.remove('is-wait')));
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
    // Views: table, board, config
    $$('[data-view]').forEach(b => b.addEventListener('click', () => {
      $$('[data-view]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      $$('[data-pane]').forEach(p => { p.hidden = p.dataset.pane !== b.dataset.view; });
    }));
    // Approve flagged rows
    const approve = $('[data-approve]');
    if (approve) approve.addEventListener('click', () => {
      const n = state.rows.filter(r => r[2] === 'warn').length;
      state.rows.forEach(r => { if (r[2] === 'warn') { r[2] = 'ok'; r[3] = state.tool.done; } });
      $('[data-rows]').innerHTML = rowsMarkup();
      renderSideViews();
      $('[data-note]').textContent = `${n} flagged ${n === 1 ? 'row' : 'rows'} approved. The agent logged who approved ${n === 1 ? 'it' : 'them'} in the audit trail.`;
      approve.disabled = true; approve.textContent = 'Approved';
    });
    // Roles
    const roleNotes = { admin: 'Full access. Every role costs $0 per seat.', member: 'Members edit records but not settings. $0 per seat.', 'end user': 'End users see only their own records. $0 per seat.' };
    $$('[data-role]').forEach(b => b.addEventListener('click', () => {
      $$('[data-role]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      $('[data-role-note]').textContent = roleNotes[b.dataset.role];
      $('[data-window]').dataset.role = b.dataset.role;
    }));
    state.tool = TOOLS.airtable; state.rows = TOOLS.airtable.rows.map(r => r.slice()); renderSideViews();
    syncSaving();
    // Seat slider inside the window: rewrites the sentence, the bill and the sidebar prices at once
    const winSeats = $('[data-win-seats]');
    if (winSeats) winSeats.addEventListener('input', () => {
      SEATS = Number(winSeats.value);
      const t = state.tool;
      typingRun++;
      typed.innerHTML = sentence(t).map(([x, bold]) => bold ? `<b>${x}</b>` : x).join('');
      const rent = rentFor(t, SEATS);
      $('[data-rent]').textContent = money(rent); currentRent = rent;
      $('[data-seats]').textContent = `${SEATS} ${t.unit}s`;
      $('[data-own-bar]').style.width = Math.max(0.8, (OWN_PER_YEAR / rent) * 100) + '%';
      srText.textContent = `Example: ${t.name} for a team of ${SEATS}. Rented ${money(rent)} a year, owned ${money(OWN_PER_YEAR)} a year.`;
      syncSaving();
    });
    // Copy a prompt for the selected app
    const copyTool = $('[data-copy-tool]');
    if (copyTool) copyTool.addEventListener('click', async () => {
      const t = state.tool;
      const text = `Install the frogbot skill from github.com/frogbotai/frogbot and help me rebuild our ${t.name} ${t.noun} as an app we own.`;
      try { await navigator.clipboard.writeText(text); copyTool.textContent = 'Prompt copied'; } catch { copyTool.textContent = 'Copy failed'; }
      setTimeout(syncSaving, 2000);
    });
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

/* Scroll-linked unfold of the hero window. */
(() => {
  const win = document.querySelector('[data-window]');
  if (!win || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    if (innerWidth <= 820) { win.style.setProperty('--p', 1); return; }
    const start = 0;
    const end = win.offsetTop - 120;
    const p = Math.min(1, Math.max(0, (scrollY - start) / Math.max(1, end - start)));
    win.style.setProperty('--p', p.toFixed(3));
  };
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  update();
})();
