# HookedUp public website

First-phase public business website for HookedUp. React, TypeScript and Vite; a lazy-loaded React Three Fiber / Drei scene with original geometry and a CSS fallback. No database, accounts, payment or tracking simulation.

## Run

```sh
git clone https://github.com/Praisg/royal-mason-resources.git
cd royal-mason-resources
npm install
npm run dev
```

Open http://127.0.0.1:5174. Validate with `npm run build` and `npm run lint`.

## Content and WhatsApp

Edit `src/config.ts` for contacts, service descriptions and verified future fleet entries. Set `business.whatsappNumber` to the confirmed international number (digits only, no `+`, spaces or leading domestic zero). Until configured, enquiries offer a copy action and the supplied domestic contact numbers. The site never claims a message was sent or a booking was confirmed.

Forms keep details only in React memory. Required fields, passenger counts, dates and pickup times are validated. Customers review their enquiry before copying or opening WhatsApp. Closing the form clears its state. The site does not send enquiries to a backend or analytics.

Routes: `/`, `/car-hire`, `/shuttles-tours`, `/courier`, `/about`. A future static host must rewrite page requests to `index.html`. Each route updates the title and description; server-rendered SEO and social previews are future deployment considerations.

## Before public launch

- Confirm the country code and designated WhatsApp number for 0780332387 / 0713968275.
- Confirm operating country, service areas and availability of each service.
- Supply the referenced branding PDF and approved logo. Current colours are provisional; the site uses a text wordmark.
- Supply approved vehicle photos, verified fleet inventory, passenger capacities and features. No fleet is claimed in this version.
- Confirm company information, any registered name and customer-facing terms/privacy requirements.
- Approve public copy and any delivery preferences. No prices, ETAs or guaranteed coverage are promised.
- Provide licensed photography if desired. All current route and parcel visuals are original illustrative geometry/CSS, not actual fleet or tracking.
- Google Fonts is the only remote visual dependency; system sans-serif fonts are the fallback. Self-host approved fonts for launch if preferred.
- Test the confirmed WhatsApp destination on desktop and mobile, and complete visual browser/device QA.
- Decide hosting/domain and public deployment separately. Pushing source to GitHub does not by itself configure website hosting.

## Accessibility and rendering

Native dialog supports Escape and focus containment. Semantic labels, error descriptions, keyboard focus styles and a skip link are included. Reduced-motion users see the static route; unsupported WebGL and lazy-load failure retain the static fallback. Rendering stops offscreen and in hidden tabs; pixel ratio is capped. The city scene is illustrative, with no tracking or location data. All actions are usable independently of 3D loading.

## Verification completed

- TypeScript and production build passed; lint passed.
- Chrome desktop (1440 px) and mobile (390 px) layouts inspected.
- All five routes, mobile menu, required fields, past dates, passenger counts, review/edit, copy action, Escape dismissal and general enquiries passed browser checks with no page errors.
- Reduced-motion static fallback and mobile overflow checks passed.
- WhatsApp message encoding round-tripped special characters correctly using a test-only destination. No message was sent.
- The separately loaded 3D bundle is approximately 245 KB gzipped; Vite reports a size advisory for its uncompressed chunk.

Use Node.js 22.12 or newer for installation, matching the lint tool's supported runtime. Local verification on the provided Node 20 environment required installing its missing platform-specific lint binding.
