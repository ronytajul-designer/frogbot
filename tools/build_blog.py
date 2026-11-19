#!/usr/bin/env python3
"""Builds the blog pages from blog/posts.json, reusing the home page's header and footer.

Run from the repo root:  python3 tools/build_blog.py
Writes blog/index.html (the list), blog/cover.html (the cover maker) and one page per post that has a body below.
"""
import html, json, re, time
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
home = (ROOT / 'index.html').read_text()
posts = json.loads((ROOT / 'blog/posts.json').read_text())
V = str(int(time.time()))
CATS = ['All', 'Announcements', 'Engineering', 'Kill SaaS', 'Guides']


def lift(a, b):
    i = home.index(a)
    return home[i:home.index(b, i) + len(b)]


def rebase(chunk):
    """Home-page paths, made to work one folder down."""
    chunk = re.sub(r'(href|src)="(brand/|assets/)', r'\1="../\2', chunk)
    chunk = chunk.replace('href="./"', 'href="../"').replace('href="#', 'href="../#').replace('href="blog/"', 'href="./"')
    return chunk


sprite = lift('<svg class="sprite"', '</svg>')
header = rebase(lift('<header', '</header>'))
footer = rebase(lift('<footer', '</footer>'))
totop = rebase(lift('<button type="button" class="totop"', '</button>'))
fmt = lambda d: date.fromisoformat(d).strftime('%b %-d, %Y')
esc = html.escape
PROMPT = 'Install the frogbot skill from github.com/frogbotai/frogbot and help me rebuild a SaaS app I pay for.'


def page(title, desc, body, extra_js=''):
    return f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}">
  <meta name="theme-color" content="#050912">
  <link rel="icon" href="../brand/logo/favicon.svg?v=4" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400..800&family=Funnel+Sans:wght@400..700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../brand/tokens.css?v={V}">
  <link rel="stylesheet" href="../assets/css/site.css?v={V}">
  <script>document.documentElement.classList.add('js');</script>
</head>
<body class="page-blog">
  <a class="skip" href="#main">Skip to content</a>
  {sprite}
  {header}
  <main id="main">
{body}
  </main>
  {footer}
  {totop}
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/motion@11.11.13/dist/motion.js" defer></script>
  <script src="../assets/js/site.js?v={V}" defer></script>
  <script src="../assets/js/cover.js?v={V}" defer></script>
  <script src="../assets/js/blog.js?v={V}" defer></script>{extra_js}
</body>
</html>
'''


def card(p, big=False):
    ext = '' if p.get('local') else ' rel="noopener"'
    cls = 'post post--big' if big else 'post'
    return f'''        <article class="{cls}" data-cat="{esc(p['cat'])}">
          <a class="post__link" href="{esc(p['href'])}"{ext}>
            <canvas class="post__cover" data-cover data-seed="{esc(p['slug'])}" data-kind="{esc(p['cat'])}" aria-hidden="true"></canvas>
            <span class="post__body">
              <span class="post__meta"><span class="post__cat">{esc(p['cat'])}</span><time datetime="{p['date']}">{fmt(p['date'])}</time><span>{p['read']} min read</span></span>
              <span class="post__title">{esc(p['title'])}</span>
              {'<span class="post__excerpt">' + esc(p['excerpt']) + '</span>' if big else ''}
            </span>
          </a>
        </article>'''


def start_card(heading='Start with one prompt.'):
    return f'''        <aside class="start__box start__box--inline" data-start aria-labelledby="art-start">
          <p class="start__eyebrow" id="art-start">{esc(heading)}</p>
          <div class="start__tabs" role="tablist" aria-label="How to start">
            <button type="button" role="tab" id="a-stt-prompt" aria-controls="a-stp-prompt" aria-selected="true">Prompt your agent</button>
            <button type="button" role="tab" id="a-stt-cli" aria-controls="a-stp-cli" aria-selected="false" tabindex="-1">Use the CLI</button>
          </div>
          <div class="start__panel" role="tabpanel" id="a-stp-prompt" aria-labelledby="a-stt-prompt">
            <p class="start__code"><span aria-hidden="true">&gt;</span><code>{esc(PROMPT)}</code></p>
            <button type="button" class="btn btn--primary start__copy-btn" data-copy="{esc(PROMPT)}"><span data-copy-label>Copy prompt</span></button>
          </div>
          <div class="start__panel" role="tabpanel" id="a-stp-cli" aria-labelledby="a-stt-cli" hidden>
            <p class="start__code"><span aria-hidden="true">$</span><code>npx create-frogbot-app</code></p>
            <button type="button" class="btn btn--primary start__copy-btn" data-copy="npx create-frogbot-app"><span data-copy-label>Copy command</span></button>
          </div>
          <p class="start__works">Works with Claude Code, Cursor, Codex and OpenCode.</p>
          <p class="sr" aria-live="polite" data-copy-status></p>
        </aside>'''


# ---------- list ----------
feat = next(p for p in posts if p.get('featured'))
rest = [p for p in posts if p is not feat]
tabs = '\n'.join(
    f'            <button type="button" role="tab" aria-selected="{"true" if c == "All" else "false"}" tabindex="{0 if c == "All" else -1}" data-filter="{esc(c)}">{esc(c)}</button>'
    for c in CATS)
listing = f'''    <section class="blog-head">
      <div class="wrap">
        <h1 class="display">Blog</h1>
        <p class="lede">Engineering deep dives, releases, guides and the math behind replacing per-seat SaaS.</p>
        <div class="blog-tabs" role="tablist" aria-label="Filter posts">
{tabs}
        </div>
      </div>
    </section>
    <section class="blog-list" aria-label="Posts">
      <div class="wrap">
{card(feat, big=True)}
        <div class="post-grid" data-post-grid>
{chr(10).join(card(p) for p in rest)}
        </div>
        <p class="blog-empty" data-blog-empty hidden>No posts in this category yet.</p>
      </div>
    </section>
'''
(ROOT / 'blog/index.html').write_text(page('Blog | FrogBot', 'Engineering deep dives, releases, guides and the math behind replacing per-seat SaaS with apps you own.', listing))

# ---------- article: why-raw-vibe-coding-breaks ----------
p = next(x for x in posts if x['slug'] == 'why-raw-vibe-coding-breaks')
code = '''import { buildConfig, type CollectionConfig, type AgentConfig } from 'frogbot';

const Deals: CollectionConfig = {
  slug: 'deals',
  admin: { useAsTitle: 'company' },
  access: {
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'company', type: 'text', required: true },
    { name: 'amount', type: 'number', required: true },
    { name: 'stage', type: 'select', options: ['Lead', 'Proposal', 'Won'] },
  ],
};

const dealDesk: AgentConfig = {
  slug: 'deal-desk',
  model: 'anthropic/claude-sonnet-4-5',
  instructions: 'Help reps triage deals and pause for approval on discounts over 15%.',
};

export default buildConfig({
  collections: [Deals],
  agents: [dealDesk],
});'''
related = [x for x in posts if x is not p][:3]
article = f'''    <article class="article">
      <header class="article__head wrap article__lane">
        <div class="article__col">
          <nav class="crumbs" aria-label="Breadcrumb"><a href="./">Blog</a><span aria-hidden="true">/</span><span>{esc(p['cat'])}</span></nav>
          <h1 class="article__title">{esc(p['title'])}</h1>
          <dl class="article__meta">
            <div><dt>Published</dt><dd><time datetime="{p['date']}">{fmt(p['date'])}</time></dd></div>
            <div><dt>Read time</dt><dd>{p['read']} min read</dd></div>
          </dl>
          <div class="listen" data-listen hidden>
            <button type="button" class="listen__play" data-listen-play aria-label="Listen to article"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="listen__icon-play" d="M8 5v14l11-7z"/><path class="listen__icon-pause" d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg></button>
            <span class="listen__label" data-listen-label>Listen to article</span>
            <span class="listen__track" aria-hidden="true"><i data-listen-bar></i></span>
            <button type="button" class="listen__rate" data-listen-rate aria-label="Playback speed">1x</button>
          </div>
        </div>
      </header>
      <div class="article__cover wrap article__lane"><div class="article__col"><canvas data-cover data-seed="{esc(p['slug'])}" data-kind="{esc(p['cat'])}" data-cell="4" aria-hidden="true"></canvas></div></div>
      <div class="article__layout wrap">
        <nav class="toc" aria-label="On this page">
          <p class="toc__title">On this page</p>
          <ol>
            <li><a href="#takeaways">Key takeaways</a></li>
            <li><a href="#fails">Where raw vibe-coded apps fail</a></li>
            <li><a href="#pattern">The 68-line config pattern</a></li>
            <li><a href="#agents">Built for coding agents first</a></li>
            <li><a href="#start-now">Start your first app</a></li>
          </ol>
        </nav>
        <div class="prose" data-prose>
          <section class="takeaways" id="takeaways" aria-labelledby="tk">
            <h2 id="tk">Key takeaways</h2>
            <ul>
              <li><strong>LLMs are good at schemas and business rules, not plumbing.</strong> Asking an agent to hand-roll auth, table filters and job queues wastes its context window and invites security bugs.</li>
              <li><strong>Default-secure APIs prevent data leaks.</strong> FrogBot enforces collection and field access control unless you explicitly override it.</li>
              <li><strong>68 lines of config replace 15,000 lines of glue.</strong> When the schema changes, the Admin UI, Kanban board, REST API and TypeScript types update with it.</li>
            </ul>
          </section>
          <p class="prose__intro">{esc(p['excerpt'])}</p>
          <h2 id="fails">Where raw vibe-coded apps fail in production</h2>
          <p>When teams replace an internal CRM or operations tool with a browser prompt builder or a raw Next.js starter, the failure rarely shows up in the first ten minutes. It shows up in week two:</p>
          <ul>
            <li><strong>Inconsistent authorization.</strong> One API route checks the session; another server action forgets to filter by <code>organizationId</code>.</li>
            <li><strong>UI drift on every schema change.</strong> Adding one <code>status</code> or <code>dueDate</code> field means editing six React components, three forms and two API routes.</li>
            <li><strong>No durable background work.</strong> Long PDF imports, Stripe syncs and Slack approvals time out inside serverless HTTP handlers.</li>
          </ul>
          <h2 id="pattern">The 68-line config pattern</h2>
          <p>FrogBot separates what changes per app (your data model, access rules, agent instructions and custom views) from what must never break (authentication, migrations, the Admin UI, job retries and OAuth token refresh).</p>
          <figure class="codeblock">
            <figcaption><span>frogbot.config.ts</span><button type="button" class="codeblock__copy" data-copy-code>Copy</button></figcaption>
            <pre><code>{esc(code)}</code></pre>
          </figure>
          <h2 id="agents">Built for coding agents first</h2>
          <p>Every FrogBot project ships a local agent skill (<code>skills/frogbot/SKILL.md</code>) for Claude Code, Cursor, Codex and OpenCode. The surface area is small and strongly typed, so your agent writes valid collections, hooks and jobs on the first pass, without inventing brittle infrastructure.</p>
          <h2 id="start-now">Start your first app</h2>
          <p>Paste this into your coding agent to scaffold a production app in minutes, then deploy it to Dojo for $29 a month with $0 per seat.</p>
{start_card('Copy the prompt into your agent')}
        </div>
      </div>
    </article>
    <section class="keep-reading" aria-labelledby="kr">
      <div class="wrap">
        <div class="keep-reading__head"><h2 class="display display--md" id="kr">Keep reading</h2><a class="link" href="./">All posts</a></div>
        <div class="post-grid">
{chr(10).join(card(x) for x in related)}
        </div>
      </div>
    </section>
'''
(ROOT / 'blog/why-raw-vibe-coding-breaks.html').write_text(page(p['title'] + ' | FrogBot', p['excerpt'], article))

# ---------- cover maker ----------
opts = '\n'.join(f'<option{" selected" if c == "Engineering" else ""}>{c}</option>' for c in CATS[1:])
maker = f'''    <section class="maker">
      <div class="wrap maker__grid">
        <div class="maker__controls">
          <h1 class="display display--md">Cover maker</h1>
          <p class="lede">Every post gets a cover from its slug and category automatically. Use this to preview one, try another seed, or download a PNG for social posts.</p>
          <label class="field" for="mk-title">Title (for the social image)<input id="mk-title" type="text" value="Why Raw Vibe Coding Breaks at 15,000 Lines"></label>
          <label class="field" for="mk-seed">Slug or seed<input id="mk-seed" type="text" value="why-raw-vibe-coding-breaks"></label>
          <label class="field" for="mk-kind">Category<select id="mk-kind">{opts}</select></label>
          <label class="field field--check" for="mk-text"><input id="mk-text" type="checkbox" checked> Put the title on the image</label>
          <div class="maker__actions">
            <button type="button" class="btn btn--ghost" id="mk-shuffle">Try another seed</button>
            <button type="button" class="btn btn--primary" id="mk-download">Download PNG (1600 x 900)</button>
          </div>
        </div>
        <div class="maker__preview"><canvas id="mk-canvas" width="1600" height="900" aria-label="Cover preview"></canvas></div>
      </div>
    </section>
'''
(ROOT / 'blog/cover.html').write_text(page('Cover maker | FrogBot', 'Make a FrogBot blog cover from a slug and category.', maker))
print('built', len(posts), 'posts')
