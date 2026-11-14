# Home page brief

Status: revised draft (v2) for confirmation. No production code written yet. Hero sketch: `docs/shape/home-hero-sketch.png` (static, structure and style only).

Changes from v1 (designer feedback, 2026-11-14): the italic techno hero font is dropped, the hero carries a visible AI element, the page keeps the current site's section order and is polished rather than restructured, and section visuals become animated. Style reference: https://ovo-waiting.framer.website/

## 1. Job and audience

- Visitor: a founder or operator who pays for per-seat SaaS, is not technical, and arrives sceptical. Mode: Persuade.
- They judge three things: cost, safety, and how much work it is for them.
- Secondary visitor: a developer or internal builder, served by the "how it works" and framework sections.

## 2. Outcome and proof

- Primary action: "Book a build call" (header, hero, Enterprise section, pricing, close, mobile menu, mobile sticky bar).
- Secondary action: "Deploy first app". Builder shortcut: "Copy prompt".
- No customer proof exists. Belief comes from checkable facts: published price, MIT licence and public repository, export and self-hosting, "cancel and keep your code and data", DPA and security addendum, dated competitor list prices.
- Delivery statement, used everywhere: "Working prototype in 48 hours. Production app in 2 weeks."

## 3. Selected direction

- Goal: polish the existing site to the level of the leading AI product sites. Keep what works (content, section order, the savings demo), raise the craft.
- Identity kept: dark surfaces, the single green `#3acf6a`, the frog logo.
- Type: Funnel Display for headings, Funnel Sans for text (both free Google fonts). Upright, large, tight letter spacing. Chakra Petch and Inter are retired.
- Style, taken from the reference and translated into FrogBot green: a glow that falls from the top of the hero, a glass navigation bar, a product window with a lit border, soft dot grid, bento cards with animated abstract illustrations, text that fades and sharpens into place on scroll.
- AI presence in the hero: a command bar that types itself ("Replace our Airtable base for a team of 25"), tool chips that change the sentence and the price, and a product window below where an agent is seen assembling the app.
- Honesty rule: the command bar is a demonstration and a tool selector, not a text input. FrogBot has no in-browser builder, so the page must not invite the visitor to type a prompt. The window is labelled as an example.

## 4. Sequence (current site order, each section redesigned)

1. Header: glass bar. Logo, Product, Solutions, Pricing, Docs, Sign in, Book a build call.
2. Hero: brand tag "The SaaS Killer", headline "Replace the SaaS you rent with an app you own.", one-line offer with the price, AI command bar, tool chips, product window with the agent build and the saving.
3. The 80 / 20 statement: "Anyone can build the first 80%. FrogBot covers the last 20%." Short, with a single animated bar that fills the last fifth.
4. How it works: three steps (describe it, the stack is already built, deploy or have it built). Code moves into a small expandable panel so the section reads for a founder first.
5. What is in the box: four bento cards, each with an animated illustration (below).
6. Use cases: six tools you can replace, worded "Replace Airtable", each linking to its solution page.
7. We build it for you (Enterprise): three steps on a timeline, 48 hours and 2 weeks, ending in "Book a build call". This section currently has no button.
8. Built to own, not rent: comparison table with dated sources, FrogBot column lit.
9. Pricing: four plans, the seat calculator with proportional bars, "We never auto-scale your bill".
10. Questions: six FAQs with the corrected delivery times.
11. Close: "Build it yourself, or have us do it." with both buttons, then the footer.

## 5. Animated section visuals

All built in code (SVG and CSS, small script where needed). No video files, no heavy libraries.

| Section | Visual |
|---|---|
| Hero | Command bar types and retypes; rows in the product window resolve from shimmer to data; the saving counts to its value |
| 80 / 20 | A bar fills to 80% in grey, then the last 20% fills in green |
| Integrations | App icons orbit the FrogBot mark; one lights up at a time |
| AI agents and workflows | A node network with a pulse of light travelling step to step |
| Database views | A table reflows into a Kanban board and back |
| White-label | A logo tile and accent colour swap in three beats |
| We build it | A timeline draws itself from call to 48 hours to 2 weeks |
| Pricing | Dragging the seat slider grows the rented bar; the owned bar stays fixed |

Motion rules: animations start when the section enters the viewport and run once or loop slowly; none shifts layout; with reduced-motion enabled every visual is a finished still frame.

## 6. Scope and boundaries

- In scope: the home page only, production-ready responsive HTML and CSS, with the working command bar, seat calculator and section animations. Reusable components and tokens that later pages inherit.
- Copy: fully rewritten to `brand/voice.md`. Facts (prices, features, limits, delivery) stay exactly as published. All new copy is a draft for the client's approval.
- Out of scope: other pages, the build-call form, the app and login.
- Anti-goals: no invented customers, logos, testimonials or numbers. No GitHub star count. No rotating headline word. No "Kill X". No fake prompt input. No unsupported "Most Popular" badge. No copy of the reference's purple palette or its layout one to one.

## 7. States and ranges

- Command bar: types its sentence, then holds. Tool chips (Airtable, Salesforce, HubSpot, Jira, and "More tools" for Zendesk and Asana): default, hover, selected, keyboard focus. Selecting a tool retypes the sentence and updates the window and the saving.
- Seat calculator: 5 to 200 seats, default 25. Owned price is the Pro plan for one app; "Add-ons extra" is always visible. Example data is labelled.
- "Book a build call": destination pending until the form exists. Never the login page.
- Copy prompt: idle, copied. FAQ items: closed, open. Menus: closed, open, focus. Mobile menu: closed, open.
- No JavaScript: the hero shows the finished Airtable example as a still, and every section stays readable.

## 8. Interaction and layout

- Desktop: centred hero, product window rising from the bottom edge of the first screen. Sections alternate between full-width statements and bento grids.
- Mobile (390px): headline scales down, command bar stacks above its button, product window becomes a single simplified card (one app, the saving, one button), comparison table becomes one card per competitor, sticky "Book a build call" bar at the bottom.
- Tap targets at least 44px. Text never below 14px. Contrast at least 4.5:1, including text over the glow.
- Keyboard: skip link, visible custom focus ring, menus open with Enter and close with Escape, one h1, no skipped heading levels.
- Performance budget: no layout shift from the hero animation, fonts preloaded, animations on transform and opacity only.

## 9. Constraints and open decisions

- Binding: site colours and logo, free Google fonts, reusable components, 8px grid (4px half step), single brand green `#3acf6a`.
- Reusable components: Button, Glass header, Brand tag, Command bar, Tool chip, Product window, Section heading, Step list, Bento card, Animated visual frame, Timeline, Comparison table, Plan card, Seat calculator, FAQ item, Sticky action bar, Footer.
- To verify before build: the per-seat list prices and default seat counts behind the live site's calculator.
- Open with the client: sign-off on the rewritten copy; whether the 48-hour prototype is free or paid (not stated, so the page claims neither); the build-call form.
