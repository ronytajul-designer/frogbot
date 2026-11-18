# FrogBot design system

Recorded from the built home page (`index.html`, `assets/css/site.css`) on 2026-11-14. Tokens live in `brand/tokens.css`. Later pages reuse these rules and components rather than inventing new ones.

## Foundations

**Colour**
- One brand green, `#3acf6a` (`--fb-green`). Green means owned, done, or the primary action. Text on green is `#04210d`.
- Muted red `#ff8a8a` (`--rent`) only for prices people pay today. Amber only for "needs review".
- Dark surfaces from darkest to lightest: `--fb-surface-sunken`, `--fb-surface`, `--fb-surface-mid`, `--fb-surface-raised`, `--fb-surface-elevated`.
- Text: headings `#f8fafc` (18.4:1), body `#848ca0` (5.7:1), labels and small print `#7c8498` (5.2:1, the AA floor on cards). Solid greys, never transparent white, so headings and body read as two levels. Hairlines at 10% white, stronger at 20%.
- Green rule: brand green `#3acf6a` appears only on primary buttons, the logo and frogs, the "Most popular" plan and the hero and closing pixel fields. The 80/20 ring arc and the card corner dither stay green too. Every other accent (headline emphasis, ticks, tags, active tabs, links) is neutral light `#e4e7ee`.
- Accent headings: the emphasised words (`.own`) are bright white `--ink-strong #ffffff`; the rest of that heading is white at 40% opacity (about 3.8:1, passes AA for large text only). Headings without an accent stay `#f8fafc`.
- Brand logos (integrations, social) are white or grey at rest and take their own colour only when active or hovered.

**Type**
- Funnel Display for headings and big numbers, Funnel Sans for everything else, system mono for code only.
- Scale: 12, 14, 16, 18, 20, 24, 32, 40, 48, 64, 80 px. Body text is never under 14 px.
- Section headings 48 px (64 px for the closing call to action, 80 px for the hero). The green half of a heading uses `.own`.

**Spacing**
- 8 px grid with a 4 px half step. Every padding, margin and gap is a multiple of 4.
- Sections: 128 px top and bottom on desktop, 96 px on tablet, 72 px on phone. The 80/20 card band uses 96 px.
- Content width 1248 px with 24 px gutters (16 px on phone).

**Radius**: four steps only. 8 px small parts, 12 px panels inside cards, 20 px cards, pill for buttons, badges and tabs. Circles for dots and avatars.

**Depth**: hairline border plus a 1 px inner top highlight. Green glow only on the primary button, the active plan and the hero window.

**Motion**
- Ease `cubic-bezier(0.16, 1, 0.3, 1)`. Content is visible by default and only hidden when JavaScript runs.
- Loops (dashboard, hub, tracker, use cases) run only while on screen.
- Every animation has a still state under `prefers-reduced-motion`.

## Components

| Component | Class | Notes |
|---|---|---|
| Button | `.btn` + `--primary`, `--ghost`, sizes `--sm` (44), default (48), `--lg` (56) | One filled primary per view region. |
| Header | `.header` | Full-width bar at the top, floating pill on scroll; action appears in the pill. |
| Mega menu | `.mm` (`--product`, `--solutions`, `--resources`) | Hover, click, Enter and Escape. |
| Section heading | `.display`, `.display--md`, `.lede` | No eyebrow labels above headings. |
| Card | `.card`, `.plan2`, `.path`, `.uc` | 20 px radius, hairline, sunken surface. |
| App window | `.window`, `.db`, `.uc__win`, `.track` | Dots or title bar, 12 px inner panels, "Example" label when data is illustrative. |
| Tabs and toggles | `.uc__tabs`, `.top__tabs`, `.chrome__mode`, `.starter__tabs` | `aria-pressed` or `role="tab"`, arrow keys where a tab list. |
| Chip and tag | `.chip`, `.tag--ok`, `.tag--warn`, `.track__chip` | Pill radius. |
| Comparison | `.costbars`, `.matrix` + `.matrix__hl` | Highlight is one rounded layer, not cell borders. |
| FAQ | `.qa` | One open at a time, slide open and closed. |
| Back to top | `.totop` | Progress ring, appears after the first screen. |
| Footer | `.footer`, `.foot` | Icon-only social, legal in the base row. |

## Rules
- One primary (filled green) action per region. Secondary actions are ghost buttons.
- No invented customers, logos, testimonials or numbers. Illustrative data carries an "Example" label.
- No gradient text, no side-stripe borders, no eyebrow labels.
- Tap targets at least 44 px on phone, at least 24 px everywhere.

## Known debt
- `assets/css/site.css` grew section by section with later blocks overriding earlier ones. It works and is consistent, but should be consolidated into one block per component before more pages are added.
- `favicon.ico` and `apple-icon.png` still use the old white-face icon.
