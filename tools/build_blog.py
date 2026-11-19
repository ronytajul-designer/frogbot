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

HEAD_TPL = '      <header class="article__head wrap article__lane">\n        <div class="article__col">\n          <nav class="crumbs" aria-label="Breadcrumb"><a href="./">Blog</a><span aria-hidden="true">/</span><span>{cat}</span></nav>\n          <h1 class="article__title">{title}</h1>\n          <dl class="article__meta">\n            <div><dt>Published</dt><dd><time datetime="{date}">{datefmt}</time></dd></div>\n            <div><dt>Read time</dt><dd>{read} min read</dd></div>\n          </dl>\n          <div class="listen" data-listen{audio_attr} hidden>\n            <button type="button" class="listen__play" data-listen-play aria-label="Listen to article"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="listen__icon-play" d="M8 5v14l11-7z"/><path class="listen__icon-pause" d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg></button>\n            <div class="listen__info">\n              <span class="listen__label" data-listen-label>Listen to article</span>\n              <span class="listen__time"><span data-listen-now>0:00</span> of <span data-listen-total>0:00</span></span>\n            </div>\n            <div class="listen__track" data-listen-track role="slider" tabindex="0" aria-label="Position in the article" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i data-listen-bar></i></div>\n            <div class="listen__tools">\n              <button type="button" class="listen__skip" data-listen-skip="-10" aria-label="Back 10 seconds"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.6 9A7.5 7.5 0 1 1 4.5 13"/><path d="M5 4.5v4.5h4.5"/></svg><span>10</span></button>\n              <button type="button" class="listen__skip" data-listen-skip="10" aria-label="Forward 10 seconds"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.4 9A7.5 7.5 0 1 0 19.5 13"/><path d="M19 4.5v4.5h-4.5"/></svg><span>10</span></button>\n              <button type="button" class="listen__rate" data-listen-rate aria-label="Playback speed">1x</button>\n            </div>\n          </div>\n        </div>\n      </header>\n      <div class="article__cover wrap article__lane"><div class="article__col"><canvas data-cover data-seed="{slug}" data-kind="{cat}" data-cell="4" aria-hidden="true"></canvas></div></div>\n'

# ---------- articles: one page per post, body from blog/content/<slug>.html ----------
def slugify(t):
    return re.sub(r'[^a-z0-9]+', '-', t.lower()).strip('-')


def shape_body(raw, excerpt):
    """Takeaways box first, the excerpt as the opening paragraph, code blocks with a copy button, ids on every h2."""
    body = raw
    m = re.match(r'\s*<h2[^>]*>Key takeaways</h2>(<ul>.*?</ul>)', body, re.S)
    lead = ''
    if m:
        lead = f'<section class="takeaways" id="key-takeaways" aria-labelledby="tk"><h2 id="tk">Key takeaways</h2>{m.group(1)}</section>\n<p class="prose__intro">{esc(excerpt)}</p>'
        body = body[m.end():]
    def add_id(mm):
        attrs, text = mm.group(1), mm.group(2)
        if 'id=' in attrs: return mm.group(0)
        return f'<h2 id="{slugify(re.sub("<[^>]+>", "", text))}">{text}</h2>'
    body = re.sub(r'<h2([^>]*)>(.*?)</h2>', add_id, body)
    body = re.sub(r'<pre><code>(.*?)</code></pre>', lambda mm: f'<figure class="codeblock"><figcaption><span>Code</span><button type="button" class="codeblock__copy" data-copy-code>Copy</button></figcaption><pre><code>{mm.group(1)}</code></pre></figure>', body, flags=re.S)
    return lead + '\n' + body


def toc_of(body):
    items = re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', body)
    rows = [f'            <li><a href="#{"key-takeaways" if i == "tk" else i}">{re.sub("<[^>]+>", "", t)}</a></li>' for i, t in items]
    rows.append('            <li><a href="#start-now">Start your first app</a></li>')
    return '\n'.join(rows)


for p in posts:
    raw = (ROOT / f"blog/content/{p['slug']}.html").read_text()
    body = shape_body(raw, p['excerpt'])
    audio_attr = f' data-audio="{esc(p["audio"])}"' if p.get('audio') else ''
    related = [x for x in posts if x is not p][:3]
    head = HEAD_TPL.format(cat=esc(p['cat']), title=esc(p['title']), date=p['date'], datefmt=fmt(p['date']), read=p['read'], slug=esc(p['slug']), audio_attr=audio_attr)
    article = f'''    <article class="article">
{head}      <div class="article__layout wrap">
        <nav class="toc" aria-label="On this page">
          <p class="toc__title">On this page</p>
          <ol>
{toc_of(body)}
          </ol>
        </nav>
        <div class="prose" data-prose>
{body}
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
    </article-end>
'''.replace('</article-end>', '</section>')
    (ROOT / f"blog/{p['slug']}.html").write_text(page(p['title'] + ' | FrogBot', p['excerpt'], article))

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
