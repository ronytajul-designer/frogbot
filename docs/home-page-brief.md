# Home page brief

Status: draft for confirmation. No code written yet. Sketch of the chosen hero: `docs/shape/home-hero-sketch.png` (structure only, not final design).

## 1. Job and audience

- Visitor: a founder or operator who pays for per-seat SaaS, is not technical, and arrives sceptical. Mode: Persuade.
- They need three answers before they act: what it costs, whether it is safe, how much work it is for them.
- Secondary visitor: a developer or internal builder. Served lower on the page, never in the first screen.

## 2. Outcome and proof

- Primary action: "Book a build call" (green, in the header, the hero, the end of the "work" section, the close, and the mobile menu).
- Secondary action: "Deploy first app".
- There is no customer proof. Belief is earned with checkable facts only: published price, MIT licence and public repository, export and self-hosting, "cancel and keep your code and data", DPA and security addendum links, dated competitor list prices.
- Delivery statement, used everywhere: "Working prototype in 48 hours. Production app in 2 weeks."

## 3. Selected direction

- Visual authority: the existing FrogBot identity. Dark surfaces, the single green `#3acf6a`, the frog logo, Chakra Petch italic for display, Inter for text. Tokens in `brand/tokens.css`.
- Structure: "Three questions". The page is a founder's interview of FrogBot. The hero states the offer, then lists the three questions as large display lines with a one-line answer beside each. Each question then gets its own section further down, in the same order.
- Focal moment: the seat slider sits inside the "What does it cost?" row of the hero. Dragging it rewrites the rented price and the owned price in place.
- Discipline borrowed from data-graphic tradition: in the cost section the saving is drawn as two proportional bars (rented vs owned), so the difference is seen before it is read.

## 4. Sequence

1. Header: logo, Product, Solutions, Pricing, Docs, Sign in, Book a build call.
2. Hero: headline "Replace the SaaS you rent with an app you own.", the three questions with answers, both buttons, the line "$29 per app per month. Never per seat."
3. What does it cost? Full seat calculator (tool selector plus slider), proportional bars, the comparison table with dated sources, the four plans, "We never auto-scale your bill".
4. Is it safe? Ownership facts as a checkable list, each with a link: MIT licence and repository, export, self-host or move to Dojo and back, what happens when you cancel, DPA and security addendum.
5. How much work is it? Two paths side by side. "We build it": three steps (show us the bill and the workflow, prototype in 48 hours on your data, production in 2 weeks), then Book a build call. "You build it": the agent prompt and CLI command, a short list of what the framework includes, Read the docs, Deploy first app.
6. What you can replace: the six use cases, each linking to its solution page, worded "Replace Airtable", not "Kill Airtable".
7. Questions: FAQ with the corrected delivery times. The "browser prompt box" question is removed.
8. Close: "Build it yourself, or have us do it." with both buttons, then the footer.

## 5. Scope and boundaries

- In scope: the home page only, production-ready responsive HTML and CSS, with a working seat calculator. Reusable components and tokens that later pages inherit.
- Copy: fully rewritten to `brand/voice.md`. Facts (prices, features, limits, delivery) stay exactly as published. All new copy is a draft for the client's approval.
- Out of scope: other pages, the build-call form, the app and login.
- Anti-goals: no invented customers, logos, testimonials or numbers. No GitHub star count. No rotating headline. No "Kill X". No code in the first three sections. No "Most Popular" badge without data.

## 6. States and ranges

- Seat calculator: 5 to 200 seats, default 25. Tool selector covers the six tools on the live site (Airtable, Salesforce, HubSpot, Zendesk, Jira, Asana). Owned price is the Pro plan for one app; the note "Add-ons extra" is always visible. Example data is labelled as example data.
- "Book a build call": destination pending until the form exists. It must never link to the login page.
- Copy button on the prompt: idle, copied.
- FAQ items: closed, open. Navigation menus: closed, open, keyboard focus. Mobile menu: closed, open.
- No JavaScript: the calculator shows the 25-seat example as static text and the page stays fully readable.

## 7. Interaction and layout

- Desktop: the three hero questions are full-width rows, question in display type on the left, answer on the right, separated by hairlines.
- Mobile (390px): each question stacks above its answer, the slider spans the full width, the comparison table becomes one card per competitor, and a bar with "Book a build call" stays at the bottom of the screen.
- Every tap target is at least 44px. Text is never smaller than 14px. Contrast is at least 4.5:1.
- Motion: the calculator numbers update without layout shift. Nothing rotates or loops. Reduced-motion preference is respected.
- Keyboard: skip link, visible custom focus ring, menus open with Enter and close with Escape, one h1 and no skipped heading levels.

## 8. Constraints and open decisions

- Binding: site colours and logo, a free Google font, reusable components, 8px grid (4px half step), single brand green `#3acf6a`.
- Reusable components: Button, Header, Question row, Seat calculator, Proportional bars, Comparison table, Plan card, Fact list, Step list, Prompt box, FAQ item, Sticky action bar, Footer.
- To verify before build: the exact per-seat list prices and default seat counts behind the live site's calculator, so the new one shows the same published figures.
- Open with the client: sign-off on the rewritten copy and on keeping "The SaaS Killer" as the brand line; whether the 48-hour prototype is free or paid (it is not stated, so the page will not claim either); the build-call form.
