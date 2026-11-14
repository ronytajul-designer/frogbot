Method: dual-agent (A: design review sub-agent, B: detector + browser evidence sub-agent). Target https://ronytajul-designer.github.io/frogbot/, redesigned home page, mode Persuade, 1440x900 and 390x844.

## Design Health Score
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Demo shows live agent state; approve updates rows |
| 2 | Match system / real world | 3 | Founder language up top; developer terminal returns right after the hero |
| 3 | User control and freedom | 3 | Menus close on Escape, FAQ collapses, back-to-top |
| 4 | Consistency and standards | 3 | 48h / 2 weeks consistent; Enterprise "Custom" beside "fixed price" |
| 5 | Error prevention | 2 | Six "Book a build call" links land on an in-page section that repeats the button |
| 6 | Recognition rather than recall | 3 | Persistent header pill, sticky mobile CTA |
| 7 | Flexibility and efficiency | n/a | Persuade surface |
| 8 | Aesthetic and minimalist design | 2 | Mobile hero demo overlaps the next section; three identical CTAs on one mobile screen |
| 9 | Error recovery | n/a | No forms |
| 10 | Help and documentation | 3 | Buyer-worded FAQ; no real contact route |
| Total | | 22/32 (69%) | Acceptable, top of band. Original: 17/32 |

## Design specificity
Hero and engineer timeline are product-specific. Below the hero the section skeleton is the category default, and nine H2s share one "white clause, green clause" pattern. Detector (live URL, 1440): 18 findings, 6 dark-glow and 3 radial-spotlight-glow (approved glow direction), 1 transient low-contrast caught mid-fade, 6 stragglers, 2 nested-cards on mock UI. Measured: no visible text under 4.5:1, no overflow, CLS 0.022 / 0.039, LCP 0.53s / 0.63s, 68 KB transferred, no console errors, reduced motion stops all animation and the canvas.

## Priority issues
1. [P0] Mobile hero window is fixed at 612px; its content runs to 1489 while the next section starts at 1288, so the table, Approve and Copy prompt paint over "Rather build it yourself?". Fix: height auto on mobile, or a single compact card.
2. [P1] "Book a build call" never books: 6 links to #build-call, which repeats the button. Fix: real booking URL or a short form with a reply promise; until then an honest label.
3. [P1] Developer path is section 2; founder path (engineers, pricing) sits at 55 to 70% of the page. Fix: hero, engineers, comparison and pricing, use cases, builders, FAQ.
4. [P2] Pricing gaps: "Custom" beside "fixed price", add-ons absent from the $348 line, "Most popular" without data.
5. [P2] Nine identical H2 patterns read as a template; keep the green clause for 2 to 3 key claims.

## Persona red flags
Jordan: lands on a terminal right after the hero; "Dojo" undefined. Riley: CTA loop, Custom vs fixed, add-ons, Most popular. Casey: P0 overlap, three green CTAs, 16,539px page. Dana: no named person, no "what happens next", security and DPA only in the Enterprise card.

## Minor
Root-relative /pricing and footer links 404 on the Pages project path. Six login links. Back-to-top 43px. Hero demo text 12px. Footer wordmark is dead space.
