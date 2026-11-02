# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Hiring managers, recruiters, and potential clients or collaborators looking at a software engineer's work. A secondary audience comes for the photography from Bali. Development leads; photography supports it.

## Product Purpose
A single-page portfolio for I Wayan Gunaya, a software engineer in Bali who also takes photographs. Success means a visitor understands who he is and gets in touch about work.

## Positioning
A developer portfolio that also carries a real photography body of work from Bali, presented as one person's considered work rather than a template.

## Operating Context
Visitors arrive from social links and search. The contact form does not send anything itself; it opens the visitor's email app with a drafted message to the owner's address.

## Capabilities and Constraints
- Static single-page site built with Vue 3, Vite and Tailwind CSS. No backend.
- Deployed to GitHub Pages through GitHub Actions on pushes to `master`.
- Profile, links, skills and photo runs live in `src/data/portfolio.js`; photo descriptions live in `src/data/photo-descriptions.js`.
- Photos are the owner's own, from `src/assets/img`, converted to WebP by `npm run optimize`.
- The page copy is in English. The README is in Indonesian.

## Brand Commitments
- Name: I Wayan Gunaya.
- Role line: Software engineer and part-time photographer in Bali.
- Only the owner's own photos are used. No stock imagery.

## Evidence on Hand
- 16 photographs from Bali across four runs, with descriptions in `src/data/photo-descriptions.js`.
- Stated figures from the owner: 8+ years of experience, 25+ projects.
- No testimonials, client names, press, or case studies. Do not invent any.
- No video footage exists. Do not add placeholder video.

## Product Principles
- Let the work speak: the developer work and the photographs are shown plainly, with no filler.
- Make contact the clear next step.
- Use only real content from the owner.
- Keep the site light: static, fast, and usable without a backend.
