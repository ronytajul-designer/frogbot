# FrogBot brand capture

Everything here was taken from the live site, https://frogbot.ai/, on 2026-11-14. Nothing is invented. Use it as the source for the redesign.

## Files

| Path | What it is |
|---|---|
| `logo/frogbot-logo.svg` | Header logo: frog mark plus "FrogBot" wordmark, green `#3acf6a`. Made for dark backgrounds. |
| `logo/frogbot-icon.svg` | App icon: white frog on a green circle, recolored to the brand green `#3acf6a`. |
| `logo/favicon.ico`, `logo/apple-icon.png` | Favicon files as served by the site (still the old `#2f964f`, to be re-exported in `#3acf6a`). |
| `tokens.css` | Colors as CSS variables, plus the 8px spacing and radius scale. |
| `voice.md` | Tone of voice guide for the redesign. |
| `reference/original-home-*.png` | Screenshots of the current home page (desktop 1440, hero, mobile 390) for before/after comparison. |

## Colors

| Role | Hex | Where the site uses it |
|---|---|---|
| Brand green | `#3acf6a` | The only green in the redesign: logo, CTA fill, links, highlights |
| Green ink | `#04210d` | Text on green buttons |
| Page background | `#090e1b` | Body |
| Sunken surface | `#050912` | Deep panels |
| Mid surface | `#0e1422` | Section bands |
| Raised surface | `#141a2a` | Cards, mockup frames |
| Elevated surface | `#202738` | Top layer |
| Ink | `#f8fafc` | Headings, primary text |
| Muted ink | `#f8fafc` at 58% | Body copy |
| Border | `#ffffff` at 10% | Dividers, card outlines |
| Warning | `#fbbf24` | "Needs Review" badges in mockups |
| Danger | `#ff7b7b` | Struck-through competitor prices |

The site is dark only. There is no light theme.

## Type on the current site

- Body and most headings: Inter (Google Fonts, free).
- Hero headline only: Chakra Petch 700, italic, uppercase (Google Fonts, free).
- Code and prompts: system monospace.

Decision (designer, 2026-11-14): the redesign retires both. Headings use Funnel Display and text uses Funnel Sans, both free Google fonts, set upright with tight letter spacing.

## Facts worth knowing before redesign

- The live site uses three greens: `#22e05a` (CTAs), `#3acf6a` (logo), `#2f964f` (favicon). Decision (designer, 2026-11-14): the redesign uses `#3acf6a` everywhere as the single brand and primary green.
- Current sizes are off the 8px grid: text at 13.76px, 13.28px, 14.8px, radii at 7.2px and 13.6px. The redesign moves these onto the grid.
- The hero headline rotates its middle word: "The SaaS Killer.", "The Salesforce Killer.", "The Zendesk Killer.", "The Atlassian Killer."
