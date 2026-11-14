# Critique: frogbot.ai home page (current site)

Score 17/32 (53%). Heuristics 7 and 9 not applicable. 0 P0, 3 P1, 2 P2.

Method: dual-agent (A: design review sub-agent, B: detector + browser evidence sub-agent). Target https://frogbot.ai/ home page, mode Persuade, assessed 2026-11-14 at 1440x900 and 390x844.

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | After "Approve Flagged" the row badge still reads "Needs Review" |
| 2 | Match System / Real World | 2 | "vibe code", "RBAC", "MCP", "npx" are unexplained for a founder |
| 3 | User Control and Freedom | 3 | Nav dropdowns do not close on Escape or blur |
| 4 | Consistency and Standards | 2 | "48 hours" vs "2 to 5 business days"; 40 distinct font sizes |
| 5 | Error Prevention | 2 | "Book a build call" opens a login page |
| 6 | Recognition Rather Than Recall | 3 | Enterprise section has no link |
| 7 | Flexibility and Efficiency | n/a | Persuade surface, no repeat-use task |
| 8 | Aesthetic and Minimalist Design | 2 | 17 controls in the hero; 66% of text nodes below 14px |
| 9 | Error Recovery | n/a | No forms or error states on the page |
| 10 | Help and Documentation | 2 | No route to ask a question before buying |
| Total | | 17/32 (53%) | Acceptable, low end |

## Design Specificity Verdict

Design review: half authored, half template. The hero demo (struck-through annual prices, seat slider, role toggles) belongs only to this product. Everything below it is the standard dark dev-tool skeleton: eyebrow, centred H2, three cards, bento, comparison table, pricing cards, FAQ. The authored part addresses a developer, while PRODUCT.md names a non-technical founder as the primary user.

Deterministic scan: 46 findings at 1440, 55 at 390. kicker-above-heading 3, numbered-section-labels 3, nested-cards 6, overused-font 1 (Inter 89%), undersized-ui-text 22, low-contrast 5, straggler 3 (10 on mobile), unbalanced-heading 1 (3), tiny-text 1, skipped-heading 1. Most undersized-ui-text findings sit inside product mockup illustrations and are partial false positives; four of five low-contrast findings were confirmed by independent measurement. No human-visible overlay: headless session.

## Overall Impression

Clean and fast (load 0.6 s, 306 KB, 16 requests). The problem is aim, not polish: the page talks to a developer and the buyer is a founder. Biggest opportunity: make the seat-savings arithmetic the hero.

## What's Working

1. The seat slider proves price with arithmetic ("Airtable $13,500/yr, FrogBot $348/yr").
2. FAQ questions are real objections in the buyer's words.
3. The comparison table cites dated price sources.

## Priority Issues

1. [P1] "Book a build call" does not book a call. Five links with four labels all go to https://app.frogbot.ai/login. The Enterprise section has zero links. First "Book a build call" is 71% down on desktop, 80% down on mobile, absent from header and mobile menu. Fix: a real booking page or short form, placed in hero, header, mobile menu, and the end of the Enterprise section. Command: /impeccable shape.
2. [P1] The hero addresses a developer. Subhead "The fastest way to vibe code production-grade apps", primary action is a prompt box, no price and no done-for-you path in the first viewport. Fix: plain outcome plus price first, two buttons ("Deploy first app", "Book a build call"), prompt box below. Command: /impeccable clarify, /impeccable shape.
3. [P1] Claims contradict and proof is missing. "48 hours" and "2 weeks" vs FAQ "2 to 5 business days" and "2 to 4 weeks". Only social proof is a GitHub count of 4, fetched client-side from the unauthenticated GitHub API. "Most Popular" is unsupported. Demo figures look like results. Fix: one delivery statement, remove the star count, label demo data as example data, put checkable facts (MIT licence, export, DPA) beside the price. Command: /impeccable clarify.
4. [P2] Section order serves builders first. Comparison and pricing start about 4,900px down, after code blocks and feature mockups. Fix: hero, two-path chooser, comparison and pricing, use cases, framework detail, FAQ, close. Command: /impeccable layout, /impeccable distill.
5. [P2] Mobile clips the hero demo and has undersized targets. At 390px the demo is 531px of content in a 348px frame with overflow hidden. 62 of 72 controls are under 44px, 30 under 24px. Page is 13,477px tall. Fix: a mobile-specific demo (one app, the saving line, one button), all targets at least 44px. Command: /impeccable adapt.

## Persona Red Flags

- Jordan (first-timer): cannot tell what FrogBot is from the first screen; copies a prompt with nowhere to paste; sees code in section two and concludes it is for programmers.
- Riley (stress tester): "Book a build call" lands on a login; delivery times disagree; FrogBot stays "$348/yr" on the slider while add-ons exist.
- Casey (mobile): primary action is a 34px pill in the top bar; demo cropped; a copied prompt is useless on a phone.
- Dana (Founder / Operator, from PRODUCT.md): no proof of safety beyond a "4"; Enterprise is "Custom" against a "Fixed price" claim; "Kill bloated SaaS" reads as hostile to tools Dana chose.

## Minor Observations

- Contrast: five text styles below 4.5:1, worst 3.77:1 (struck-through price). Body copy passes at 6.58:1.
- CLS 0.11 (single unthrottled load), caused by the rotating headline word. Removing the rotation fixes it.
- No prefers-reduced-motion rule. No skip link. Heading outline jumps h1 to h3.
- Focus ring is the browser default. Dropdowns stay open on Escape and blur.
- 36 buttons render in Arial instead of inheriting Inter.
- Site green is #22e05a, not the binding #3acf6a.
- About 600px of decorative frog between the last CTA and the footer.
- Unverified: app.frogbot.ai/login showed an application error in the headless browser; check in a normal browser.

## Questions to Consider

1. If the founder is the primary user, why is the first ask something only a developer can do?
2. What if the seat slider were the hero and the framework a link?
3. With no customers to show, which checkable proof goes beside the price: repository, export, DPA, or a named engineer?

## Decisions taken after the critique (designer, 2026-11-14)

- Priority: hero and the two paths first ("Deploy first app" and "Book a build call").
- Scope: all five priority issues plus the minor observations, in one home page redesign.
- Hero demo: simplified. Only the seat slider and the saving line stay in the hero; the other controls move to a lower section.
- "Book a build call": a form, built later. Never the login page.
- Delivery statement: "Working prototype in 48 hours. Production app in 2 weeks."
- Proof: none exists. Use checkable facts only (MIT licence, repository, export, self-hosting, pricing, DPA).
