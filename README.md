# HookedUp — All Channels Tour Bus

Public business website for vehicle hire, shuttles, city tours and courier enquiries. Built with React, TypeScript and Vite, with a small amount of Framer Motion for section reveals. Heroku production startup is included.

## Local setup

Use Node.js 22.x.

```sh
git clone https://github.com/Praisg/royal-mason-resources.git
cd royal-mason-resources
npm install
npm run dev
```

Open http://127.0.0.1:5174. For production checks:

```sh
npm run build
npm run lint
npm test
npm start
```

The production server defaults to http://localhost:3000 and honours the `PORT` environment variable.

## Photos and branding

The design uses the business assets supplied on 18 October 2026:

- `public/brand/hookedup-logo.png`: the coloured logo rendered directly from page 3 of `Hooked up car branding.pdf`.
- `public/brand/hookedup-brand.jpg`: the supplied square branding artwork, used on the contact page.
- `public/images/quantum-exterior.jpg`: the clearest three-quarter exterior photograph, used in the hero and gallery.
- `public/images/quantum-interior.jpg` and `quantum-open-door.jpg`: the two open-door photographs, used in the hero inset and selectable gallery.

The original photographs are preserved. Display crops use CSS `object-fit` and the positions in `src/config.ts`. The gallery opens the full photograph in an accessible dialog with previous/next controls. The front-only photo and social advertising layouts were not selected: the exterior and seating photographs show the vehicle more clearly and allow the website’s text to remain accessible HTML.

Cyan, orange, red and purple accents come from the supplied artwork. Navy and white provide readable backgrounds. Vehicle-wrap drawings in the PDF are branding concepts and are not presented as photographs of the vehicle’s current livery. No additional vehicle capacity or inventory is invented.

The earlier abstract WebGL scene has been removed. Depth now comes from layered photographs, restrained hover movement and section reveals. Reduced-motion preferences are respected. Google Fonts has system font fallbacks.

## Updating content and WhatsApp

Edit `src/config.ts` for contacts, service descriptions, photo captions and logo paths. Set `business.whatsappNumber` only after confirming the country code and destination: international digits, with no `+`, spaces or domestic leading zero.

Until configured, the enquiry form offers a copy action and displays the supplied domestic numbers. It never claims a message was sent or a booking was confirmed. Required fields, dates, times and passenger counts are validated. Customers review their details before sharing. Enquiries stay in React memory and are cleared when the dialog closes; there is no storage, analytics, authentication or payment collection.

Routes: `/`, `/car-hire`, `/shuttles-tours`, `/courier`, `/about`. Page titles and descriptions update on navigation. The production server supports direct loading of each route; an alternative static host needs equivalent routing rules. Server-rendered metadata and social previews remain future improvements.

## Remaining business details

- Confirm the country code and designated WhatsApp number for 0780332387 / 0713968275.
- Confirm operating country, service areas and service availability.
- Confirm vehicle passenger capacity, any additional fleet and hire arrangements.
- Confirm any registered company details and customer terms/privacy wording.
- Supply actual social profile URLs if those links should be included.
- Confirm quote, collection and booking arrangements. The site does not promise prices, ETAs or coverage.

## Heroku deployment

- `heroku-postbuild` runs `npm run build` during deployment.
- `Procfile` starts `npm start`, which runs the production `server.js` without development dependencies.
- The server listens on `0.0.0.0` and Heroku’s assigned `PORT`, serving `dist/` and the five application routes.
- Node is pinned to 22.x. Development dependencies must be available during the build; Heroku can prune them afterward.
- The GitHub repository is https://github.com/Praisg/royal-mason-resources, branch `main`. Deploy the latest branch in Heroku if automatic deployments are disabled.

## Verification

- TypeScript, production build, lint and production-server tests.
- Desktop at 1440 px and mobile at 390 px visually inspected; overflow and mobile navigation checked at 320, 390 and 768 px.
- All five pages, gallery thumbnails, full-photo viewer, previous/next buttons and Escape dismissal.
- Courier/transport validation, past dates, passenger counts, review/edit and copy action.
- Reduced-motion behaviour and no browser page errors.
- Production tests cover direct routes, assets, MIME types, caching, HEAD, unsupported methods and private paths.
