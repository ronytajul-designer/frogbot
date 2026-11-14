# Product

<!-- impeccable:product-schema 1 -->

Source: frogbot.ai homepage and /pricing, read 2026-11-14. Relationship confirmed by the designer: FrogBot is a client, the work is a redesign. The client contact is Colby, who is the founder of FrogBot. Facts below come from the live site unless marked "confirmed by designer" or "open".

## Platform

web

## Stack

delegated: static HTML/CSS for redesign pages and mockups. Reason: the surfaces are marketing pages with no app logic, no existing codebase was supplied, and plain HTML ports cleanly to whatever the client ships on. The live site is served by Next.js (seen in its asset URLs). Open: whether the redesign ships into that codebase. Revisit this choice once it is known.

## Users

Primary (confirmed by designer): Founder / Operator. The client, Colby, is a founder too, so the client shares this point of view. A non-specialist decision maker who pays for several per-seat SaaS tools (Airtable, HubSpot, Salesforce, Zendesk, Jira, Asana, Retool) and wants one owned app instead. Their job on the site: judge whether replacing a paid tool is safe, how much it costs, and how much of the work they must do themselves.

Secondary (listed on the site, not prioritised): Internal Builders, Agencies / Consultants, Enterprise IT, developers who work through coding agents.

## Product Purpose

FrogBot lets a team replace rented SaaS with an app it owns. Three ways to get there:

- FrogBot framework: MIT-licensed TypeScript app framework, free, self-hosted.
- Dojo: managed cloud hosting for FrogBot apps, priced per app.
- Enterprise: FrogBot's forward-deployed engineers build, migrate, and run the app.

Success for the site: a visitor starts a first app ("Deploy first app") or books a build call ("Book a build call").

## Positioning

Pay per app, never per seat. The customer owns the code and the data, and can move between self-hosting and Dojo in either direction. Stated site claim: AI gets anyone the first 80% of an app, FrogBot covers the last 20% (auth, roles, jobs, integrations, audit).

## Operating Context

- Entry path for builders: paste a prompt into a coding agent ("Install the frogbot skill from github.com/frogbotai/frogbot and help me rebuild a SaaS app") or run `npx create-frogbot-app`.
- Entry path for buyers who will not build: book a build call, prototype in 48 hours.
- Comparison shopping is part of evaluation: the site compares FrogBot with Legacy SaaS, Retool/Airtable, and Lovable/Bolt.
- Site structure: Product (FrogBot, Dojo), Solutions (5 team pages, 5 "Kill" pages), Resources (Docs, Guides, Blog), Pricing, Legal.

## Capabilities and Constraints

Framework: collections, built-in Admin UI, REST and local API, row-level RBAC, API keys, audit log, built-in MCP server, background jobs, AI agents, database with Kanban and Calendar views, 40+ integrations and chat channels (Slack, Gmail, Stripe, Google Sheets, Linear, Notion, Xero, Discord), white-labelling, SQLite / Postgres / MongoDB.

Pricing (as published):

- Free: $0, self-hosted, unlimited apps and users.
- Pro: $29 per app per month. Managed hosting, custom domains, 10 GB database, 50 GB files, unlimited users, 2,000 AI credits per month.
- Business: $79 per app per month. Projects with access lists, activity log, autoscaling, templates, zero-fee client handoff, priority support.
- Enterprise: custom. Prototype in 48 hours, dedicated engineer, data migration, Dojo in the customer's cloud, security review, DPA, SLA.
- Add-ons: processes $10 / $20 / $40 per month, Redis $10, storage +50 GB $5.
- Terms: monthly billing in advance, cards only (Enterprise can be invoiced), no refunds.

Use cases named on the site: Custom CRM, Client Portal, AI Support Desk, Project and Sprint Tracker, Invoice and Ops Automation, Compliance Pipeline.

Confirmed by designer (2026-11-14):

- Enterprise delivery statement, the only one to use: "Working prototype in 48 hours. Production app in 2 weeks." The FAQ lines "2 to 5 business days" and "2 to 4 weeks" on the live site are wrong and must not be repeated.
- "Book a build call" will lead to a form. The form is built later. Until then the button is designed and placed, with its destination marked as pending. It must not point to the login page.

Open, needs the client's answer:

- Headline target. The H1 rotates its middle word ("The SaaS Killer.", "The Salesforce Killer.", "The Zendesk Killer.", "The Atlassian Killer."), so each visitor sees a different promise first.
- What the client allows to change in copy and claims.

Scope (confirmed by designer): the home page is redesigned first. Other pages follow later, one at a time.

## Brand Commitments

- Name: FrogBot. Sub-brand: Dojo (cloud).
- Logo and colors (binding, confirmed by designer): taken from the live site and stored in `brand/`. See `brand/README.md` and `brand/tokens.css`.
- Redesign rules (binding, confirmed by designer): use the site's colors and logo, a free Google font, reusable components, and an 8px grid.
- Voice (confirmed by designer): follow the tone of the leading companies in this industry, adapted to this business. The working guide is `brand/voice.md`.
- Voice on the live site today: combative, short absolute statements, developer vocabulary. Examples: "Pay for the app. Never for the seat." "Built to own, not rent." "Own your code and data forever."
- Brand green (binding, confirmed by designer): `#3acf6a` is the single brand and primary color everywhere.
- "Killer" language (decided by designer, pending client sign-off): keep "The SaaS Killer" as the brand line, say "Replace X" instead of "Kill X" elsewhere.

## Evidence on Hand

- Public GitHub repository github.com/frogbotai/frogbot, showing 4 stars on the site at read time.
- Published pricing and a competitor comparison table (competitor prices labelled "Sept 2026 list prices").
- Legal pages: Terms, Privacy, Acceptable Use, DPA, Security addendum, Cookie Policy.
- Docs at docs.frogbot.ai, plus Guides and Blog.

Confirmed by designer (2026-11-14): there is no customer proof of any kind. Trust has to come from checkable facts only: MIT licence, public repository, export and self-hosting, published pricing, DPA and security addendum.

Absent, must not be fabricated: customer logos, named testimonials, case studies, usage numbers, security certifications. Figures such as "54,200 rows" and "$13,152/yr saved" are illustrative demo data on the site, not customer results.

## Product Principles

1. Ownership is the product. Every page should make "you keep the code and data" concrete and checkable.
2. Price is per app. Never present or imply per-seat cost.
3. Two honest paths: build it yourself, or have FrogBot build it. The visitor should know which one fits them early.
4. Claims need proof on hand. No testimonial, logo, or number that the client cannot back.
5. The buyer is not always the builder. Developer detail must not block a non-technical decision maker.
