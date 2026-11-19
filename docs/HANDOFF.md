# FrogBot site: handoff

The redesigned home page and blog, as a static prototype. Plain HTML, CSS and JavaScript, no framework and no build step
for the site itself. Live preview: https://ronytajul-designer.github.io/frogbot/

Treat it as a high-fidelity reference to port into your own stack (Next.js or otherwise). The markup, tokens and scripts
can be lifted section by section.

## Run it

Any static server from the repo root:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` straight from the file system also works.

## What is in the repo

| Path | What it is |
| --- | --- |
| `index.html` | Home page |
| `blog/index.html` | Blog list: category tabs, featured post, grid |
| `blog/<slug>.html` | One page per post (generated, do not edit by hand) |
| `blog/cover.html` | Cover maker: preview a post cover, download a 1600 x 900 PNG |
| `blog/posts.json` | Post data: title, category, date, excerpt, narration audio URL |
| `blog/content/<slug>.html` | Post bodies (clean HTML: h2, p, lists, code) |
| `tools/build_blog.py` | Builds every blog page from the two above |
| `tools/extract_post.py` | Pulls a post body and its audio URL out of a frogbot.ai page |
| `assets/css/site.css` | All page styles (consolidated; see the map at the top of the file) |
| `brand/tokens.css` | Design tokens: colours, type, spacing, radius |
| `assets/js/site.js` | Site behaviour: menus, dashboard demo, tabs, FAQ, pixel fields, copy prompt |
| `assets/js/ascii-frog.js` | The living ASCII frog in the closing section |
| `assets/js/cover.js` | Code-drawn blog covers |
| `assets/js/blog.js` | Blog tabs, the listen player, code copy, cover maker |
| `brand/logo/` | Logo, icon and favicon files |
| `DESIGN.md` | The design system: colour rules, type, spacing, components |
| `PRODUCT.md`, `docs/` | Brief and design critiques |

External scripts (CDN): Lenis 1.3.4 (smooth scroll) and Motion 11.11.13 (springs in the mobile menu and tracker).
Fonts: Funnel Display and Funnel Sans from Google Fonts.

## Design rules that matter

- **Green is for action and brand.** `#3acf6a` (`--fb-green`) appears on primary buttons, the logo and frogs, the 80/20
  ring, card dither, the Most popular plan and the pixel fields. Headings, ticks, tags and links stay neutral.
- **Text levels:** headings `#e6e9ef`, body `#8a8f99`, labels `#80858f`. All pass WCAG AA on the page.
- **Surfaces:** page `#090e1b`, card `#0e1422`, inset `#050912`, item `#141a2a`.
- **Section rhythm:** 120 px desktop, 96 px tablet, 56 px phone, above and below every section.
- **Favicon:** frog head only. Light browser theme `#166d30` (your UI's `--color-bg-brand-hover`), dark theme `#3acf6a`.

Full detail is in `DESIGN.md` and `brand/tokens.css`.

## Interactive pieces

| Piece | Where | Notes |
| --- | --- | --- |
| Pixel fields | Hero, closing sides, We build it | WebGL dither that flows; cursor drops water ripples. Static 2D version without WebGL or under reduced motion |
| Hero dashboard | Hero | Tool picker, live build, Table and Board views |
| Start free | Under the hero, in every post | Copy the agent prompt or the CLI command; tabs; keyboard support |
| 80/20 frog | 80/20 | Pupils follow the pointer, blinks, floats |
| Tracker | We build it | Bar slides, each step ticks on touch, loops |
| ASCII frog | Closing CTA | Characters keep changing; eyes follow the pointer and blink |
| Listen player | Blog posts | Plays the recorded narration from frogbot.ai: time, back and forward 10 s, speed, seek. Falls back to the browser voice if the audio fails |
| Blog covers | Blog list and posts | Drawn from the post slug and category; no image files |

Everything pauses off screen and when the tab is hidden, and settles to a still frame under reduced motion.

## Add a blog post

1. Add an entry to `blog/posts.json` (slug, cat, date, read, title, excerpt, audio).
2. Put the body in `blog/content/<slug>.html`. Start with a `Key takeaways` h2 and list if you want the takeaways box.
3. Run `python3 tools/build_blog.py`.

The page, its table of contents, cover and Keep reading cards are generated. Categories: Announcements, Engineering,
Kill SaaS, Guides.

## Versions kept on branches

| Branch | What |
| --- | --- |
| `main` | Current site |
| `version/v1-pixel-hero` | Home page before the Asciify experiment |
| `version/v2-asciify` | Asciify Drift hero and Asciify frog (needs `npm install` to rebuild) |

## Before going live

**Must fix**
- "Book a build call" has no form yet. Buttons point to `#build-call` and are marked `data-pending="build-call-form"`.
- 26 links point to pages that do not exist in this prototype (Pricing, Docs, Solutions and others). They resolve once
  those pages exist on frogbot.ai.
- `brand/logo/favicon.ico` and `apple-icon.png` are the old design and are not linked. Export new ones from Figma and add
  `<link rel="icon" href="favicon.ico" sizes="any">` and `<link rel="apple-touch-icon" href="apple-icon.png">`.

**Confirm**
- The agent prompt and CLI command in Start free.
- Example figures: HubSpot, Jira and Asana rates; use case data; Kanban and build log names (Acme, Northwind, Umbrella,
  Stark, Hooli, Wayne).
- Use of third-party logos (Slack, Gmail, Stripe, Notion and others).
- Blog read times say 2 min on every post; the narration runs longer on some.
- Narration audio is loaded from frogbot.ai. If those files move, update the `audio` URLs in `blog/posts.json`.

**Open design questions**
- A new way to accent words in headings (the two-tone version was dropped).
- Whether to use the "SaaS Killer" line with a sharper display face.

## Checks done

Desktop 1440, tablet 834 and phone 390 px: no horizontal scroll, no console errors, tap targets at least 44 px on phones.
Not checked: real-device performance and audio playback by ear. The test browser has no GPU and no sound.
