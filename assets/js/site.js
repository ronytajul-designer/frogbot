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
    // Framer Motion (vanilla "motion") springs: the panel drops in with a soft spring and the rows follow in a stagger.
    const M = window.Motion, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let anim = null;
    const set = open => {
      toggle.setAttribute('aria-expanded', String(open));
      document.documentElement.classList.toggle('menu-open', open);
      if (open) document.querySelector('.header').classList.remove('is-hidden');
      if (!M || still) { menu.hidden = !open; return; }
      anim && anim.stop && anim.stop();
      const rows = [...menu.children];
      if (open) {
        menu.hidden = false;
        anim = M.animate(menu, { opacity: [0, 1], transform: ['translateY(-12px) scale(0.96)', 'translateY(0) scale(1)'], clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'] },
          { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 });
        M.animate(rows, { opacity: [0, 1], transform: ['translateY(10px)', 'translateY(0)'] },
          { delay: M.stagger(0.045, { start: 0.08 }), type: 'spring', stiffness: 420, damping: 30 });
      } else {
        anim = M.animate(menu, { opacity: 0, transform: 'translateY(-8px) scale(0.98)', clipPath: 'inset(0 0 100% 0)' }, { duration: 0.22, ease: [0.4, 0, 1, 1] });
        anim.then(() => { if (toggle.getAttribute('aria-expanded') === 'false') { menu.hidden = true; menu.style.cssText = ''; } });
      }
    };
    // accordion groups open and close with a spring on height, their items slide in
    menu.querySelectorAll('.menu__group').forEach(d => {
      const sum = d.querySelector('summary');
      sum.addEventListener('click', e => {
        if (!M || still) return;
        e.preventDefault();
        const from = d.offsetHeight;
        if (!d.open) {
          d.open = true;
          const to = d.offsetHeight;
          M.animate(d, { height: [from + 'px', to + 'px'] }, { type: 'spring', stiffness: 300, damping: 32 }).then(() => { d.style.height = ''; });
          M.animate([...d.querySelectorAll('.mm__head, .mm__item')], { opacity: [0, 1], transform: ['translateX(-8px)', 'translateX(0)'] }, { delay: M.stagger(0.03, { start: 0.05 }), duration: 0.35, ease: [0.22, 1, 0.36, 1] });
        } else {
          const to = sum.offsetHeight + 1;
          M.animate(d, { height: [from + 'px', to + 'px'] }, { duration: 0.25, ease: [0.4, 0, 0.2, 1] }).then(() => { d.open = false; d.style.height = ''; });
        }
      });
    });
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
  const rowsMarkup = () => state.rows.map(r => `<tr><td title="${esc(r[0])}">${esc(r[0])}</td><td><span class="tag tag--${r[2]}">${esc(r[3])}</span></td><td class="rows__note" title="${esc(r[4])}">${esc(r[4])}</td></tr>`).join('');
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
    const times = $('[data-times]'); if (times) times.textContent = `${Math.round(rent / OWN_PER_YEAR)}x less`;
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
      ($('[data-own-bar]')||{style:{}}).style.width = Math.max(0.8, (OWN_PER_YEAR / rent) * 100) + '%';
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
    const showPane = name => {
      $$('[data-pane]').forEach(p => { p.hidden = p.dataset.pane !== name; });
      $$('[data-view]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.view === name)));
      $$('[data-mode]').forEach(x => x.setAttribute('aria-pressed', String((x.dataset.mode === 'config') === (name === 'config'))));
    };
    let lastView = 'table';
    $$('[data-view]').forEach(b => b.addEventListener('click', () => { lastView = b.dataset.view; showPane(lastView); }));
    $$('[data-mode]').forEach(b => b.addEventListener('click', () => showPane(b.dataset.mode === 'config' ? 'config' : lastView)));
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
      ($('[data-own-bar]')||{style:{}}).style.width = Math.max(0.8, (OWN_PER_YEAR / rent) * 100) + '%';
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
    // Run the build once the window is actually on screen, not while the visitor is still reading the headline
    if (!reduce) {
      const win0 = $('[data-window]');
      const io0 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io0.disconnect(); showTool(state.tool && state.tool.name ? Object.keys(TOOLS).find(k => TOOLS[k] === state.tool) || 'airtable' : 'airtable'); } }, { threshold: 0.45 });
      io0.observe(win0);
    }
  }

  /* Copy the agent prompt */
  $$('[data-copy]').forEach(btn => {
    const label = $('[data-copy-label]', btn);
    const idle = label.textContent;
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(btn.dataset.copy); label.textContent = 'Copied'; }
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
  $$('[data-draw], [data-costbars]').forEach(el => io.observe(el));

  /* Mobile sticky action: shown after the hero, hidden near the closing call to action */
  const sticky = $('[data-sticky]');
  const hero = $('.hero');
  const closing = $('.close');
  if (sticky && hero && closing) {
    let pastHero = false, atClose = false;
    const sync = () => { sticky.hidden = !(pastHero && !atClose); };
    new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; sync(); }, { rootMargin: '-40% 0px 0px 0px' }).observe(hero);
    let atFoot = false;
    const sync2 = () => { sticky.hidden = !(pastHero && !atClose && !atFoot); };
    new IntersectionObserver(([e]) => { atClose = e.isIntersecting; sync2(); }, { threshold: 0.2 }).observe(closing);
    const foot = document.querySelector('.footer');
    if (foot) new IntersectionObserver(([e]) => { atFoot = e.isIntersecting; sync2(); }).observe(foot);
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
    const top = win.getBoundingClientRect().top + scrollY;
    const end = Math.max(1, top - innerHeight * 0.2);
    const p = Math.min(1, Math.max(0, (scrollY - start) / Math.max(1, end - start)));
    win.style.setProperty('--p', p.toFixed(3));
  };
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  update();
})();

/* Starter box: Prompt your agent / CLI tabs */
(() => {
  const box = document.querySelector('[data-starter]');
  if (!box) return;
  const tabs = [...box.querySelectorAll('[data-st]')];
  const pick = t => tabs.forEach(x => {
    const on = x === t;
    x.setAttribute('aria-selected', String(on));
    x.tabIndex = on ? 0 : -1;
    document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
  });
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => pick(t));
    t.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      pick(n); n.focus();
    });
  });
})();

/* Header action shows once the hero's own buttons have scrolled away, so only one "Book a build call" is on screen at a time. */
(() => {
  const header = document.querySelector('[data-header]');
  const cta = document.querySelector('.hero__cta');
  if (!header || !cta) return;
  new IntersectionObserver(([e]) => header.classList.toggle('is-past-hero', !e.isIntersecting && e.boundingClientRect.top < 0), { rootMargin: '-72px 0px 0px 0px' }).observe(cta);
})();

/* Header turns into a floating pill after the first bit of scroll. */
(() => {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const sync = () => header.classList.toggle('is-scrolled', scrollY > 24);
  addEventListener('scroll', sync, { passive: true });
  sync();
})();

/* Mega menu: opens on hover (pointer) or click, closes on Escape, outside click or leaving. */
(() => {
  const items = [...document.querySelectorAll('[data-mm]')];
  if (!items.length) return;
  const set = (item, open) => {
    const btn = item.querySelector('.nav__btn'), panel = item.querySelector('.mm');
    btn.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  };
  const closeAll = except => items.forEach(i => { if (i !== except) set(i, false); });
  const hover = matchMedia('(hover: hover)').matches;
  items.forEach(item => {
    const btn = item.querySelector('.nav__btn');
    let timer;
    btn.addEventListener('click', () => { const open = btn.getAttribute('aria-expanded') !== 'true'; closeAll(item); set(item, open); });
    if (hover) {
      item.addEventListener('mouseenter', () => { clearTimeout(timer); closeAll(item); set(item, true); });
      item.addEventListener('mouseleave', () => { timer = setTimeout(() => set(item, false), 160); });
    }
    item.addEventListener('focusout', e => { if (!item.contains(e.relatedTarget)) set(item, false); });
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const open = items.find(i => i.querySelector('.nav__btn').getAttribute('aria-expanded') === 'true');
    if (open) { set(open, false); open.querySelector('.nav__btn').focus(); }
  });
  document.addEventListener('click', e => { if (!e.target.closest('[data-mm]')) closeAll(); });
})();

/* Run the bento loops only while the section is on screen. */
(() => {
  const box = document.querySelector('.box');
  if (!box) return;
  new IntersectionObserver(([e]) => box.classList.toggle('in-view', e.isIntersecting), { threshold: 0.2 }).observe(box);
})();

/* Integrations: tiles drift gently; spokes follow them; one connection lights at a time. */
(() => {
  const hub = document.querySelector('[data-hub]');
  if (!hub) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tiles = [...hub.querySelectorAll('.hub__tile')], lines = [...hub.querySelectorAll('.hub__line')];
  const base = lines.map(l => [+l.getAttribute('x2'), +l.getAttribute('y2')]);
  let raf = null, lit = 0, tick = null, t0 = performance.now();
  const frame = now => {
    const t = (now - t0) / 1000;
    tiles.forEach((el, i) => {
      const dx = Math.sin(t * 0.6 + i * 1.7) * 6, dy = Math.cos(t * 0.5 + i * 1.3) * 5;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      const box = hub.getBoundingClientRect();
      lines[i].setAttribute('x2', (base[i][0] + dx * 440 / box.width).toFixed(1));
      lines[i].setAttribute('y2', (base[i][1] + dy * 256 / box.height).toFixed(1));
    });
    raf = requestAnimationFrame(frame);
  };
  const light = () => { tiles.forEach((el, i) => el.classList.toggle('is-on', i === lit)); lines.forEach((l, i) => l.classList.toggle('is-on', i === lit)); lit = (lit + 1) % tiles.length; };
  if (reduce) return;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!raf) raf = requestAnimationFrame(frame); if (!tick) { light(); tick = setInterval(light, 1200); } }
    else { cancelAnimationFrame(raf); raf = null; clearInterval(tick); tick = null; }
  }, { threshold: 0.2 }).observe(hub);
})();

/* Database card: Kanban, the agent card is approved and moves to Closed won, counts and table follow, then Table, then Calendar. */
(() => {
  const db = document.querySelector('[data-db]');
  if (!db || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const q = x => db.querySelector(x);
  const show = v => { db.querySelectorAll('[data-dbv]').forEach(x => x.hidden = x.dataset.dbv !== v); db.querySelectorAll('[data-dbt]').forEach(x => x.classList.toggle('is-on', x.dataset.dbt === v)); };
  const card = q('[data-approve-card]'), slot = q('[data-db-slot]'), won = q('[data-db-won]'), wait = q('[data-db-wait]'), btn = q('[data-db-approve]'), stage = q('[data-db-stage]');
  const empty = document.createElement('p'); empty.className = 'db__empty'; empty.textContent = 'Nothing waiting'; card.after(empty);
  const bump = el => { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); };
  const reset = () => {
    card.classList.remove('is-moving'); slot.innerHTML = ''; empty.classList.remove('is-shown');
    won.textContent = '12'; wait.textContent = '1'; wait.classList.remove('is-zero');
    stage.textContent = 'Needs approval'; stage.className = 'warn';
  };
  const steps = [
    [0, () => { reset(); show('board'); }],
    [1800, () => btn.classList.add('is-pressed')],
    [2050, () => { btn.classList.remove('is-pressed'); card.classList.add('is-moving'); }],
    [2450, () => { wait.textContent = '0'; wait.classList.add('is-zero'); bump(wait); empty.classList.add('is-shown'); }],
    [2650, () => {
      slot.innerHTML = '<div class="db__card"><b>Globex SLA</b><i class="ok">Synced to Stripe</i></div>';
      won.textContent = '13'; bump(won);
      stage.textContent = 'Closed won'; stage.className = 'ok';
    }],
    [5200, () => show('table')],
    [7600, () => show('cal')],
  ];
  let timers = [], loop = null;
  const run = () => { timers.forEach(clearTimeout); timers = steps.map(([ms, fn]) => setTimeout(fn, ms)); };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !loop) { run(); loop = setInterval(run, 10000); }
    else if (!e.isIntersecting && loop) { clearInterval(loop); loop = null; timers.forEach(clearTimeout); }
  }, { threshold: 0.3 }).observe(db);
})();

/* White label: highlight each config line, then apply it to the preview. Repeats with three brands. */
(() => {
  const wl = document.querySelector('[data-wl]');
  if (!wl) return;
  const q = x => wl.querySelector(x);
  const brands = [
    { name: 'Acme Portal', accent: '#6aa8ff', domain: 'portal.acme.com' },
    { name: 'Northwind Desk', accent: '#ffb454', domain: 'desk.northwind.co' },
    { name: 'Kestrel Ops', accent: '#c59bff', domain: 'ops.kestrel.io' },
  ];
  const flash = el => { el.classList.remove('wl-flash'); void el.offsetWidth; el.classList.add('wl-flash'); };
  const apply = {
    name: b => { q('[data-wl-name]').textContent = b.name; q('[data-wl-logo]').textContent = b.name[0]; flash(q('.wl__head')); },
    accent: b => { wl.style.setProperty('--accent', b.accent); },
    domain: b => { q('[data-wl-url]').textContent = b.domain; flash(q('.wl__url')); },
  };
  const setCode = b => { q('[data-wl-v="name"]').textContent = `"${b.name}"`; q('[data-wl-v="accent"]').textContent = `"${b.accent}"`; q('[data-wl-v="domain"]').textContent = `"${b.domain}"`; };
  const reset = () => { wl.style.setProperty('--accent', '#3acf6a'); q('[data-wl-name]').textContent = 'FrogBot app'; q('[data-wl-logo]').textContent = 'F'; q('[data-wl-url]').textContent = 'app.frogbot.app'; };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { const b = brands[0]; setCode(b); Object.values(apply).forEach(f => f(b)); return; }
  let n = 0, timers = [], loop = null;
  const run = () => {
    const b = brands[n++ % brands.length];
    timers.forEach(clearTimeout); timers = [];
    reset(); setCode(b);
    ['name', 'accent', 'domain'].forEach((k, i) => {
      timers.push(setTimeout(() => { wl.querySelectorAll('[data-wl-line]').forEach(l => l.classList.toggle('is-on', l.dataset.wlLine === k)); apply[k](b); }, 700 + i * 1100));
    });
    timers.push(setTimeout(() => wl.querySelectorAll('[data-wl-line]').forEach(l => l.classList.remove('is-on')), 4200));
  };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !loop) { run(); loop = setInterval(run, 5600); }
    else if (!e.isIntersecting && loop) { clearInterval(loop); loop = null; timers.forEach(clearTimeout); }
  }, { threshold: 0.3 }).observe(wl);
})();

/* Use cases: tabs swap the preview, Live app / Config toggle inside it. */
(() => {
  const data = document.getElementById('uc-data');
  if (!data) return;
  const UC = JSON.parse(data.textContent);
  const $ = s => document.querySelector(s);
  const tabs = [...document.querySelectorAll('[data-uc]')];
  const body = $('[data-uc-body]'), panel = $('#ucp');
  const esc = x => String(x).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let cur = UC[0], mode = 'live';
  const render = () => {
    if (mode === 'config') {
      body.innerHTML = `<div class="uc__cfg">// frogbot.config.ts\nexport default buildConfig({\n${cur.cfg.map(l => '  ' + esc(l) + ',').join('\n')}\n});</div>`;
      return;
    }
    body.innerHTML = `<div class="uc__head"><div><p class="uc__kicker">${esc(cur.kicker)}</p><p class="uc__metric">${esc(cur.metric)}</p></div><span class="uc__badge">${esc(cur.badge)}</span></div>
      <div class="uc__rows">${cur.rows.map((r, i) => `<div class="uc__row" style="--i:${i}"><span><b>${esc(r[0])}</b><i>${esc(r[1])}</i></span><span><span class="tag tag--${r[2]}">${esc(r[3])}</span><small>${esc(r[4])}</small></span></div>`).join('')}</div>`;
  };
  const pick = (u, focus) => {
    cur = u;
    tabs.forEach(t => { const on = t.dataset.uc === u.id; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; if (on && focus) t.focus(); });
    panel.setAttribute('aria-labelledby', 'uct-' + u.id);
    $('[data-uc-url]').textContent = u.url;
    $('[data-uc-lead]').textContent = u.lead;
    $('[data-uc-text]').textContent = u.text;
    $('[data-uc-more]').textContent = u.more;
    $('[data-uc-href]').href = u.href;
    render();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => pick(UC[i]));
    t.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      pick(UC[(i + (e.key === 'ArrowRight' ? 1 : UC.length - 1)) % UC.length], true);
    });
  });
  document.querySelectorAll('[data-ucm]').forEach(b => b.addEventListener('click', () => {
    mode = b.dataset.ucm;
    document.querySelectorAll('[data-ucm]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    render();
  }));
  pick(UC[0]);
})();


/* Use cases autoplay: advance every 5s while on screen; pause on hover or focus; a click restarts the timer. */
(() => {
  const wrap = document.querySelector('.uc');
  const tabs = [...document.querySelectorAll('[data-uc]')];
  if (!wrap || !tabs.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const DUR = 5000;
  let timer = null, visible = false, paused = false;
  const current = () => tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
  const restartBar = () => { tabs.forEach(t => t.classList.remove('is-timing')); const t = tabs[current()]; void t.offsetWidth; if (visible && !paused) t.classList.add('is-timing'); };
  const schedule = () => { clearTimeout(timer); restartBar(); if (visible && !paused) timer = setTimeout(() => { tabs[(current() + 1) % tabs.length].click(); }, DUR); };
  tabs.forEach(t => t.addEventListener('click', () => setTimeout(schedule, 0)));
  wrap.addEventListener('mouseenter', () => { paused = true; schedule(); });
  wrap.addEventListener('mouseleave', () => { paused = false; schedule(); });
  wrap.addEventListener('focusin', () => { paused = true; schedule(); });
  wrap.addEventListener('focusout', e => { if (!wrap.contains(e.relatedTarget)) { paused = false; schedule(); } });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; schedule(); }, { threshold: 0.4 }).observe(wrap);
})();

/* Build tracker: steps complete one after another, then the cycle restarts. */
(() => {
  const track = document.querySelector('[data-track]');
  if (!track) return;
  const steps = [...track.querySelectorAll('.track__step')], list = track.querySelector('.track__list');
  const set = n => {
    steps.forEach((s, i) => { s.classList.toggle('is-done', i < n); s.classList.toggle('is-active', i === n); });
    const dots = steps.map(s => s.querySelector('.track__dot')), top = dots[0].offsetTop + dots[0].offsetParent.offsetTop;
    const k = Math.min(n, steps.length - 1), y = d => d.offsetTop + d.offsetParent.offsetTop + 16;
    list.style.setProperty('--line-top', y(dots[0]) + 'px');
    list.style.setProperty('--line-h', (y(dots[steps.length - 1]) - y(dots[0])) + 'px');
    const to = y(dots[k]) - y(dots[0]);
    const M = window.Motion;
    if (!M || matchMedia('(prefers-reduced-motion: reduce)').matches) { list.style.setProperty('--fill', to + 'px'); return; }
    // spring physics: the progress line overshoots a touch and settles, the finished dot pops, the new step slides in
    const from = parseFloat(list.style.getPropertyValue('--fill')) || 0;
    fillAnim && fillAnim.stop && fillAnim.stop();
    fillAnim = M.animate(from, to, { type: 'spring', stiffness: 170, damping: 22, mass: 1, onUpdate: v => list.style.setProperty('--fill', v + 'px') });
    if (n > 0 && n <= steps.length) M.animate(dots[n - 1], { scale: [0.6, 1] }, { type: 'spring', stiffness: 520, damping: 16 });
    if (n < steps.length) M.animate(steps[n].querySelector('.track__body'), { opacity: [0.4, 1], transform: ['translateX(-8px)', 'translateX(0)'] }, { type: 'spring', stiffness: 260, damping: 24 });
    if (n === 0) steps.forEach(st => M.animate(st.querySelector('.track__dot'), { scale: [0.9, 1] }, { type: 'spring', stiffness: 400, damping: 20 }));
  };
  let fillAnim = null;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { set(steps.length); return; }
  let n = 0, id = null;
  const tick = () => { set(n); n = n >= steps.length ? 0 : n + 1; };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !id) { n = 0; tick(); id = setInterval(tick, 1800); }
    else if (!e.isIntersecting && id) { clearInterval(id); id = null; }
  }, { threshold: 0.4 }).observe(track);
})();

/* Comparison: size the rounded highlight to the FrogBot column. */
(() => {
  const wrap = document.querySelector('.compare__scroll'), hl = document.querySelector('.matrix__hl');
  if (!wrap || !hl) return;
  const place = () => {
    const cells = [...wrap.querySelectorAll('.is-own')];
    if (!cells.length) return;
    const w = wrap.getBoundingClientRect(), a = cells[0].getBoundingClientRect(), z = cells[cells.length - 1].getBoundingClientRect();
    Object.assign(hl.style, { left: (a.left - w.left) + 'px', top: (a.top - w.top) + 'px', width: a.width + 'px', height: (z.bottom - a.top) + 'px' });
  };
  place();
  addEventListener('resize', place);
  if (document.fonts) document.fonts.ready.then(place);
})();

/* FAQ: answers slide open and closed; one open at a time. */
(() => {
  const list = document.querySelector('[data-faq]');
  if (!list) return;
  const items = [...list.querySelectorAll('details')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const open = d => {
    d.open = true;
    const a = d.querySelector('p'); if (reduce || !a) return;
    const h = a.scrollHeight;
    a.animate([{ height: '0px', opacity: 0, transform: 'translateY(-6px)' }, { height: h + 'px', opacity: 1, transform: 'none' }], { duration: 450, easing: ease });
  };
  const close = d => {
    if (!d.open) return;
    const a = d.querySelector('p'); if (reduce || !a) { d.open = false; return; }
    const anim = a.animate([{ height: a.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0, paddingBottom: '0px' }], { duration: 350, easing: ease });
    anim.onfinish = () => { d.open = false; };
  };
  items.forEach(d => d.querySelector('summary').addEventListener('click', e => {
    e.preventDefault();
    if (d.open) { close(d); return; }
    items.forEach(o => o !== d && close(o));
    open(d);
  }));
})();


/* Back to top: shows after the first screen, ring shows how far down the page you are. */
(() => {
  const btn = document.querySelector('[data-totop]');
  if (!btn) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;
  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    btn.style.setProperty('--p', p.toFixed(3));
    btn.hidden = scrollY < innerHeight * 0.8;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
  btn.addEventListener('click', () => {
    btn.classList.remove('is-hop'); void btn.offsetWidth; btn.classList.add('is-hop');
    if (window.lenis && !reduce) window.lenis.scrollTo(0, { duration: 1.4 });
    else scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    setTimeout(() => document.querySelector('.skip')?.focus({ preventScroll: true }), reduce ? 0 : 1400);
  });
})();

/* Hero dots: a slow field of small particles that drift up and twinkle; a few are brand green. */
(() => {
  const c = document.querySelector('.hero__dots');
  if (!c) return;
  const ctx = c.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0, h = 0, dpr = 1, dots = [], raf = null, last = 0;
  const make = () => {
    const n = Math.round(Math.min(110, (w * h) / 14000));
    dots = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.08, vy: -(Math.random() * 0.18 + 0.04),
      a: Math.random() * 0.5 + 0.35, t: Math.random() * Math.PI * 2, s: Math.random() * 0.02 + 0.005,
      g: Math.random() < 0.28,
    }));
  };
  const size = () => {
    const r = c.getBoundingClientRect();
    dpr = Math.min(2, devicePixelRatio || 1);
    w = r.width; h = r.height;
    c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    make(); draw(0);
  };
  const draw = dt => {
    ctx.clearRect(0, 0, w, h);
    for (const d of dots) {
      if (dt) {
        d.x += d.vx * dt; d.y += d.vy * dt; d.t += d.s * dt;
        if (d.y < -4) { d.y = h + 4; d.x = Math.random() * w; }
        if (d.x < -4) d.x = w + 4; else if (d.x > w + 4) d.x = -4;
      }
      const alpha = d.a * (0.55 + 0.45 * Math.sin(d.t));
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = d.g ? `rgba(58,207,106,${alpha})` : `rgba(248,250,252,${alpha * 0.7})`;
      ctx.fill();
    }
  };
  const loop = now => { const dt = last ? Math.min(3, (now - last) / 16.7) : 1; last = now; draw(dt); raf = requestAnimationFrame(loop); };
  size();
  addEventListener('resize', () => { cancelAnimationFrame(raf); raf = null; last = 0; size(); if (!reduce && visible) raf = requestAnimationFrame(loop); });
  let visible = false;
  if (reduce) return;
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(loop); }
    else if (!visible && raf) { cancelAnimationFrame(raf); raf = null; }
  }).observe(c);
})();

/* Builder terminal: type the active line, then show the reply. Re-types when the tab changes. */
(() => {
  const box = document.querySelector('[data-starter]');
  if (!box) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const names = { agent: 'Claude Code', cli: 'Terminal' };
  let run = 0, seen = false;
  const play = panel => {
    const code = panel.querySelector('[data-type-line]'), out = panel.querySelector('.term__out');
    const full = code.dataset.full || (code.dataset.full = code.textContent);
    if (reduce) { code.textContent = full; out.classList.remove('is-wait'); return; }
    const me = ++run; let i = 0;
    code.textContent = ''; code.classList.add('is-typing'); out.classList.add('is-wait');
    const step = () => {
      if (me !== run) return;
      code.textContent = full.slice(0, ++i);
      if (i < full.length) setTimeout(step, 18 + Math.random() * 30);
      else { code.classList.remove('is-typing'); setTimeout(() => me === run && out.classList.remove('is-wait'), 350); }
    };
    step();
  };
  const active = () => [...box.querySelectorAll('.term__panel')].find(p => !p.hidden);
  box.querySelectorAll('[data-st]').forEach(t => t.addEventListener('click', () => {
    box.querySelector('[data-term-name]').textContent = names[t.dataset.st];
    setTimeout(() => play(active()), 0);
  }));
  new IntersectionObserver(([e]) => { if (e.isIntersecting && !seen) { seen = true; play(active()); } }, { threshold: 0.5 }).observe(box);
})();

/* Pixel field: a fine dithered texture in the spirit of print halftones.
   Organic value noise (not sine waves) shaped by soft anchors, quantised with an 8x8 Bayer matrix
   at 2px cells, drawn once per size. Motion is a slow CSS drift, so it costs nothing per frame. */
(() => {
  const fields = [...document.querySelectorAll('[data-px]')];
  if (!fields.length) return;
  const B8 = [0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,12,44,4,36,14,46,6,38,60,28,52,20,62,30,54,22,3,35,11,43,1,33,9,41,51,19,59,27,49,17,57,25,15,47,7,39,13,45,5,37,63,31,55,23,61,29,53,21].map(v => (v + 0.5) / 64);
  const SHAPES = {
    hero:  [{ ax: 0.04, ay: 0.78, rx: 0.3, ry: 0.55, g: 1 }, { ax: 0.96, ay: 0.72, rx: 0.3, ry: 0.55, g: 1 }, { ax: 0.5, ay: 1.04, rx: 0.55, ry: 0.2, g: 0.8 }],
    built: [{ ax: 0.98, ay: 0.06, rx: 0.4, ry: 0.6, g: 0.95 }],
    close: [{ ax: 0.0, ay: 0.6, rx: 0.18, ry: 0.45, g: 0.5 }, { ax: 1.0, ay: 0.6, rx: 0.18, ry: 0.45, g: 0.5 }],
  };
  // seeded value noise with fractal octaves: irregular, cloud-like, never geometric
  const seed = 1337;
  const hash = (x, y) => { let h = x * 374761393 + y * 668265263 + seed * 2246822519; h = (h ^ (h >>> 13)) * 1274126177; return ((h ^ (h >>> 16)) >>> 0) / 4294967295; };
  const smooth = t => t * t * (3 - 2 * t);
  const vnoise = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = smooth(x - xi), yf = smooth(y - yi);
    const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
  const fbm = (x, y) => vnoise(x, y) * 0.55 + vnoise(x * 2.1, y * 2.1) * 0.28 + vnoise(x * 4.3, y * 4.3) * 0.17;
  const CELL = 2;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const make = c => {
    // WebGL when available and motion is allowed: the noise is recomputed every frame on the GPU,
    // so the texture flows slowly forever. Otherwise the static 2D version below.
    const gl = reduce ? null : c.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false });
    const ctx = gl ? null : c.getContext('2d'), shape = SHAPES[c.dataset.px];
    let dirty = true;
    let cols = 0, rows = 0, base = null, noise = null, img = null;
    // closing section: a large frog head made of the same pixels, peeking up from the bottom
    const isFrog = c.dataset.px === 'close';
    let frogA = null, sil = null, fcv = null, fctx = null, fbox = null;
    const eye = { x: 0, y: 0, tx: 0, ty: 0, blink: 1 };
    const SKIN = [
      new Path2D('M 93.9,67.1 C 92.9,79.9 73.6,90 50,90 26.4,90 7.1,79.9 6.1,67.1 Z'),
      new Path2D('m 92.2,59.4 c 0.5,0.9 0.8,1.8 1.1,2.7 H 6.7 C 7,61.2 7.3,60.3 7.8,59.5 8.3,58.5 8.3,57.3 7.6,56.3 5.8,53.6 4.8,50.4 4.8,46.9 c 0,-9.4 7.6,-17 17,-17 7.2,0 13.4,4.5 15.9,10.9 0.5,1.3 1.8,2.1 3.1,1.9 3,-0.3 6.1,-0.5 9.2,-0.5 3.2,0 6.3,0.2 9.2,0.5 1.3,0.2 2.6,-0.6 3.1,-1.8 C 65,33.8 72.1,29 80.2,30 c 7.8,0.9 14.1,7.3 14.9,15.1 0.4,4.1 -0.7,8 -2.8,11.1 -0.6,1 -0.6,2.2 -0.1,3.2 z'),
      new Path2D('m 65.5,14.8 -7.8,3.9 c -0.3,0.1 -0.6,0.1 -0.8,-0.2 l -6.5,-8.3 c -0.3,-0.3 -0.7,-0.3 -1,0 l -6.2,8.5 C 43,18.9 42.7,19 42.4,18.9 l -8,-4.1 c -0.5,-0.2 -1,0.2 -0.9,0.7 L 36.7,29 c 0.1,0.5 0.6,0.9 1.1,0.9 h 24.5 c 0.5,0 1,-0.4 1.1,-0.9 l 3.1,-13.5 c 0,-0.5 -0.5,-0.9 -1,-0.7 z'),
    ];
    const drawFrog = () => {
      if (!fbox) return;
      const { s, ox, oy } = fbox;
      fctx.setTransform(1, 0, 0, 1, 0, 0); fctx.clearRect(0, 0, cols, rows);
      fctx.setTransform(s, 0, 0, s, ox, oy);
      fctx.globalCompositeOperation = 'source-over'; fctx.fillStyle = '#fff';
      SKIN.forEach(p => fctx.fill(p));
      // eye holes: a ring and a pupil, both cut out; the pupils look toward the pointer
      fctx.globalCompositeOperation = 'destination-out';
      for (const cx of [21.8, 78.2]) {
        fctx.save(); fctx.translate(cx, 46.9); fctx.scale(1, eye.blink);
        // like the logo: one cut-out disc with a single green dot for the pupil
        fctx.globalCompositeOperation = 'destination-out';
        fctx.beginPath(); fctx.arc(0, 0, 12, 0, Math.PI * 2); fctx.fill();
        fctx.globalCompositeOperation = 'source-over';
        fctx.beginPath(); fctx.arc(eye.x, eye.y / Math.max(eye.blink, 0.3), 5.1, 0, Math.PI * 2); fctx.fill();
        fctx.restore();
      }
      fctx.globalCompositeOperation = 'source-over';
      const a = fctx.getImageData(0, 0, cols, rows).data;
      dirty = true;
      const top = oy + 9.6 * s, h = 80 * s;
      for (let y = 0; y < rows; y++) {
        const g = 0.5 + 0.7 * Math.min(1, Math.max(0, (y - top) / h));
        for (let x = 0; x < cols; x++) { const i = y * cols + x; frogA[i] = (a[i * 4 + 3] / 255) * g; }
      }
    };
    const build = () => {
      const r = c.getBoundingClientRect();
      cols = Math.ceil(r.width / CELL); rows = Math.ceil(r.height / CELL);
      c.width = cols; c.height = rows;
      base = new Float32Array(cols * rows); noise = new Float32Array(cols * rows);
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        let m = 0;
        for (const sh of shape) {
          const dx = (x / cols - sh.ax) / sh.rx, dy = (y / rows - sh.ay) / sh.ry;
          const f = 1 - Math.sqrt(dx * dx + dy * dy);
          if (f > 0) m = Math.max(m, f * sh.g);
        }
        const i = y * cols + x;
        base[i] = m; noise[i] = fbm(x / 70, y / 70);
      }
      if (isFrog) {
        frogA = new Float32Array(cols * rows); sil = new Uint8Array(cols * rows);
        fcv = fcv || document.createElement('canvas'); fcv.width = cols; fcv.height = rows;
        fctx = fcv.getContext('2d', { willReadFrequently: true });
        const btn = c.parentElement.querySelector('.close__cta');
        const br = btn ? btn.getBoundingClientRect() : null;
        const fw = Math.min(660, r.width * 0.62) / CELL, s = fw / 92;
        const topPx = br ? br.bottom - r.top + 48 : r.height * 0.55;
        fbox = { s, ox: cols / 2 - 50 * s, oy: topPx / CELL - 9.6 * s };
        // silhouette (skin plus eyes) keeps the ambient texture out of the eye holes
        fctx.setTransform(s, 0, 0, s, fbox.ox, fbox.oy); fctx.fillStyle = '#fff';
        SKIN.forEach(p => fctx.fill(p));
        for (const cx of [21.8, 78.2]) { fctx.beginPath(); fctx.arc(cx, 46.9, 12.7, 0, Math.PI * 2); fctx.fill(); }
        const sa = fctx.getImageData(0, 0, cols, rows).data;
        for (let i = 0; i < sil.length; i++) sil[i] = sa[i * 4 + 3] > 128 ? 1 : 0;
        drawFrog();
      }
      img = ctx ? ctx.createImageData(cols, rows) : null; dirty = true;
      paint(performance.now());
    };
    // the cursor drops water ripples: rings spread out slowly and lift only the pixels already there
    const ripples = [], LIFE = 2000, SPEED = 0.2, WIDTH = 14; // ms, px per ms, px
    let last = { x: -1e4, y: -1e4, t: 0 };
    const paint2d = now => {
      const d = img.data; d.fill(0);
      const live = ripples.map(r => {
        const age = (now - r.t) / LIFE;
        return { x: r.x / CELL, y: r.y / CELL, rad: (now - r.t) * SPEED / CELL, amp: (r.amp || 0.28) * (1 - age) * (1 - age) };
      });
      const w = WIDTH / CELL;
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        let m = base[i];
        if (frogA) m = sil[i] ? frogA[i] : m;
        if (m <= 0) continue;
        for (const r of live) {
          const dx = x - r.x, dy = y - r.y;
          if (Math.abs(dx) > r.rad + w || Math.abs(dy) > r.rad + w) continue;
          const off = Math.abs(Math.sqrt(dx * dx + dy * dy) - r.rad);
          if (off < w) { const k = 1 - off / w; m += k * k * (3 - 2 * k) * r.amp * Math.min(1, m * 3); }
        }
        const v = Math.min(1, m * (0.25 + noise[i] * 1.05));
        if (v > B8[(y & 7) * 8 + (x & 7)]) {
          const o = i * 4;
          d[o] = 58; d[o + 1] = 207; d[o + 2] = 106; d[o + 3] = 40 + Math.round(v * 80);
        }
      }
      ctx.putImageData(img, 0, 0);
    };
    let paint = paint2d;
    let glOn = false, lastFrame = 0;
    const FRAME = matchMedia('(pointer: coarse)').matches ? 50 : 33; // ~20 fps on phones, ~30 on desktop
    if (gl) {
      const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
      const FS = `precision mediump float;
uniform sampler2D u_base; uniform vec2 u_size; uniform float u_t; uniform vec4 u_r[4];
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1., 0.)), f.x), mix(h(i + vec2(0., 1.)), h(i + vec2(1., 1.)), f.x), f.y); }
float fbm(vec2 p){ return vn(p) * .55 + vn(p * 2.1) * .28 + vn(p * 4.3) * .17; }
float b2(vec2 a){ a = floor(a); return fract(a.x / 2. + a.y * a.y * .75); }
float b8(vec2 a){ return (b2(.25 * a) * .25 + b2(.5 * a)) * .25 + b2(a); }
void main(){
  vec2 c = vec2(floor(gl_FragCoord.x), u_size.y - 1. - floor(gl_FragCoord.y));
  float m = texture2D(u_base, (c + .5) / u_size).r * 2.;
  if (m <= 0.002) { gl_FragColor = vec4(0.); return; }
  for (int k = 0; k < 4; k++) { vec4 r = u_r[k]; if (r.w > 0.) {
    float off = abs(length(c - r.xy) - r.z);
    if (off < 7.) { float q = 1. - off / 7.; m += q * q * (3. - 2. * q) * r.w * min(1., m * 3.); } } }
  // slow domain warped flow: the blotches drift and reshape, about one cycle every 25s
  vec2 p = c / 70.;
  float w = fbm(p * .6 + vec2(u_t * .02, -u_t * .015));
  float n = fbm(p + vec2(w * 1.4 + u_t * .03, w * .9 - u_t * .02));
  float v = min(1., m * (.25 + n * 1.05));
  if (v > b8(c) + .5 / 64.) gl_FragColor = vec4(58. / 255., 207. / 255., 106. / 255., (40. + v * 80.) / 255.);
  else gl_FragColor = vec4(0.);
}`;
      const sh = (t, src) => { const o = gl.createShader(t); gl.shaderSource(o, src); gl.compileShader(o); return o; };
      const prog = gl.createProgram();
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog);
      if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        gl.useProgram(prog);
        const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
        [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER].forEach(k => gl.texParameteri(gl.TEXTURE_2D, k, gl.NEAREST));
        [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach(k => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE));
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        const U = n => gl.getUniformLocation(prog, n);
        const uSize = U('u_size'), uT = U('u_t'), uR = U('u_r'), t0 = performance.now();
        let bytes = null;
        paint = now => {
          if (!cols) return;
          if (dirty) {
            if (!bytes || bytes.length !== cols * rows) bytes = new Uint8Array(cols * rows);
            for (let i = 0; i < bytes.length; i++) {
              const m = frogA ? (sil[i] ? frogA[i] : base[i]) : base[i];
              bytes[i] = Math.min(255, Math.round(m * 127.5));
            }
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, cols, rows, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, bytes);
            dirty = false;
          }
          const r = new Float32Array(16);
          ripples.slice(-4).forEach((q, k) => {
            const age = (now - q.t) / LIFE; if (age >= 1) return;
            r.set([q.x / CELL, q.y / CELL, (now - q.t) * SPEED / CELL, (q.amp || 0.28) * (1 - age) * (1 - age)], k * 4);
          });
          gl.viewport(0, 0, cols, rows);
          gl.uniform2f(uSize, cols, rows); gl.uniform1f(uT, (now - t0) / 1000); gl.uniform4fv(uR, r);
          gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        c.classList.add('is-gl');
        new IntersectionObserver(([e]) => { glOn = e.isIntersecting && !document.hidden; if (glOn) kick(); }).observe(c);
        document.addEventListener('visibilitychange', () => { glOn = !document.hidden && c.getBoundingClientRect().bottom > 0 && c.getBoundingClientRect().top < innerHeight; if (glOn) kick(); });
      }
    }
    let raf = null;
    const host = c.parentElement;
    const tick = now => {
      while (ripples.length && now - ripples[0].t > LIFE) ripples.shift();
      let eyesMoving = false;
      if (frogA) {
        const ex = eye.tx - eye.x, ey = eye.ty - eye.y;
        eyesMoving = Math.abs(ex) + Math.abs(ey) > 0.02;
        if (eyesMoving) { eye.x += ex * 0.18; eye.y += ey * 0.18; drawFrog(); }
      }
      if (paint === paint2d) paint(now);
      else if (now - lastFrame >= FRAME) { lastFrame = now; paint(now); }
      raf = (paint !== paint2d && glOn) || ripples.length || eyesMoving ? requestAnimationFrame(tick) : null;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    if (isFrog && !reduce) {
      let onScreen = false;
      new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }).observe(c);
      if (matchMedia('(hover: hover)').matches) addEventListener('pointermove', e => {
        if (!onScreen || !fbox) return;
        const r = c.getBoundingClientRect();
        const fx = r.left + (fbox.ox + 50 * fbox.s) * CELL, fy = r.top + (fbox.oy + 46.9 * fbox.s) * CELL;
        const dx = e.clientX - fx, dy = e.clientY - fy, d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 300) * 3.4;
        eye.tx = dx / d * k; eye.ty = dy / d * k; kick();
      }, { passive: true });
      const blink = () => {
        if (onScreen && !document.hidden && fbox) {
          const t0 = performance.now();
          const step = now => {
            const t = (now - t0) / 180; // close and open in 180ms
            eye.blink = t >= 1 ? 1 : Math.max(0.1, Math.abs(1 - 2 * t));
            drawFrog(); paint(now);
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
        setTimeout(blink, 2800 + Math.random() * 3600);
      };
      setTimeout(blink, 2000);
    }
    if (!reduce && matchMedia('(hover: hover)').matches) {
      host.addEventListener('pointermove', e => {
        const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, now = performance.now();
        // one drop per short pause or distance, so it stays calm instead of a trail
        if (Math.hypot(x - last.x, y - last.y) < 160 && now - last.t < 900) return;
        if (now - last.t < 400) return;
        last = { x, y, t: now };
        ripples.push({ x, y, t: now });
        if (ripples.length > 2) ripples.shift();
        if (!raf) raf = requestAnimationFrame(tick);
      });
    }
    // closing CTA: the button sends a slow ripple out every few seconds while the section is on screen
    if (!reduce && c.dataset.px === 'close') {
      const btn = host.querySelector('.btn--primary');
      let onScreen = false;
      new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }).observe(c);
      setInterval(() => {
        if (!onScreen || !btn || document.hidden) return;
        const r = c.getBoundingClientRect(), b = btn.getBoundingClientRect();
        ripples.push({ x: b.left + b.width / 2 - r.left, y: b.top + b.height / 2 - r.top, t: performance.now(), amp: 0.35 });
        if (ripples.length > 3) ripples.shift();
        if (!raf) raf = requestAnimationFrame(tick);
      }, 4800);
    }
    build();
    let t; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(build, 150); });
  };
  fields.forEach(make);
})();


/* Card texture: one static dithered noise image (same language as the hero field),
   gathered in the top right corner and fading out. Used as a CSS background on cards. */
(() => {
  const W = 360, H = 240, CELL = 2, cols = W / CELL, rows = H / CELL;
  const B = [0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,12,44,4,36,14,46,6,38,60,28,52,20,62,30,54,22,3,35,11,43,1,33,9,41,51,19,59,27,49,17,57,25,15,47,7,39,13,45,5,37,63,31,55,23,61,29,53,21].map(v => (v + 0.5) / 64);
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const G = 64, grid = Array.from({ length: G * G }, rnd);
  const vn = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const g = (a, b) => grid[((b & 63) * G) + (a & 63)];
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    return (g(xi, yi) * (1 - u) + g(xi + 1, yi) * u) * (1 - v) + (g(xi, yi + 1) * (1 - u) + g(xi + 1, yi + 1) * u) * v;
  };
  const fbm = (x, y) => vn(x, y) * 0.55 + vn(x * 2.1, y * 2.1) * 0.3 + vn(x * 4.3, y * 4.3) * 0.15;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const dx = (cols - x) / cols, dy = y / rows;
    const fall = Math.max(0, 1 - Math.sqrt(dx * dx * 0.9 + dy * dy * 1.4));
    const m = fall * fall * (0.2 + fbm(x / 22, y / 22) * 1.3);
    if (m > B[(y & 7) * 8 + (x & 7)]) {
      ctx.fillStyle = `rgba(58,207,106,${(14 + Math.min(1, m) * 40) / 255})`;
      ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
    }
  }
  document.documentElement.style.setProperty('--px-tex', `url(${c.toDataURL()})`);
})();

/* Build log: lines appear one after another the first time the log scrolls into view */
(() => {
  const log = document.querySelector('[data-blog]');
  if (!log) return;
  log.querySelectorAll('li').forEach((li, i) => li.style.setProperty('--i', i));
  new IntersectionObserver(([e], o) => { if (e.isIntersecting) { log.classList.add('is-in'); o.disconnect(); } }, { threshold: 0.4 }).observe(log);
})();


/* Frog eyes: pupils look toward the pointer and the frog blinks at random, like the original */
(() => {
  const frog = document.querySelector('[data-frog]');
  if (!frog || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const pupils = frog.querySelectorAll('.frog__pupil');
  if (matchMedia('(hover: hover)').matches) {
    let raf = 0, px = 0, py = 0;
    addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(look); }, { passive: true });
    const look = () => {
      raf = 0;
      const r = frog.getBoundingClientRect();
      const dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height * 0.42);
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 240) * 3.6;
      pupils.forEach(p => { p.style.transform = `translate(${dx / d * k}px, ${dy / d * k}px)`; });
      // the whole frog leans a little toward the pointer
      const lean = Math.min(1, d / 400) * 8;
      frog.style.setProperty('--fx', `${dx / d * lean}px`); frog.style.setProperty('--fy', `${dy / d * lean * 0.6}px`);
    };
  }
  const blink = () => {
    frog.classList.add('is-blink');
    setTimeout(() => frog.classList.remove('is-blink'), 140);
    // now and then a double blink
    if (Math.random() < 0.25) setTimeout(() => { frog.classList.add('is-blink'); setTimeout(() => frog.classList.remove('is-blink'), 120); }, 320);
    setTimeout(blink, 2600 + Math.random() * 3600);
  };
  setTimeout(blink, 1800);
})();

/* Mobile: comparison shows FrogBot against per-seat SaaS first; pricing opens on the Pro plan */
(() => {
  const more = document.querySelector('[data-compare-more]');
  if (more) more.addEventListener('click', () => {
    const open = more.closest('.compare').classList.toggle('is-all');
    more.setAttribute('aria-expanded', String(open));
    more.textContent = open ? 'Show less' : 'Compare with Retool, Airtable, Lovable and Bolt';
  });
  const plans = document.querySelector('.plans2'), pro = plans && plans.querySelector('.plan2--lit');
  if (plans && pro && matchMedia('(max-width: 560px)').matches) plans.scrollLeft = pro.offsetLeft - 16;
})();


/* Mobile top bar: hide on scroll down, show on scroll up (never while the menu is open) */
(() => {
  const header = document.querySelector('.header');
  if (!header) return;
  const mq = matchMedia('(max-width: 560px)');
  let lastY = scrollY, ticking = false;
  const update = () => {
    ticking = false;
    const y = scrollY, d = y - lastY;
    if (!mq.matches || document.documentElement.classList.contains('menu-open') || y < 80) header.classList.remove('is-hidden');
    else if (d > 6) header.classList.add('is-hidden');
    else if (d < -6) header.classList.remove('is-hidden');
    if (Math.abs(d) > 6) lastY = y;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
})();
