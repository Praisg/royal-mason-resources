# Royal Mason Resources — Vite + React

Marketing site for **Royal Mason Resources (RMR)**, Harare, Zimbabwe.

## Local development

```bash
npm install
npm run dev
```

Open http://127.0.0.1:5173

## Environment variables

Copy `.env.example` to `.env` for local overrides. Vite only exposes vars prefixed with `VITE_`.

| Variable | Required | Purpose |
|----------|----------|---------|
| `VITE_WHATSAPP_NUMBER` | No | WhatsApp digits (e.g. `263789569999`) |
| `VITE_CONTACT_EMAIL` | No | Public contact email |
| `VITE_FORMSPREE_ID` | No | Formspree form ID for lead forms |

On **Heroku**, set config vars **before** (or then trigger) a rebuild — Vite inlines them at `npm run build` time:

```bash
heroku config:set VITE_WHATSAPP_NUMBER=263789569999
heroku config:set VITE_CONTACT_EMAIL=royalmasonresources@outlook.com
# optional
heroku config:set VITE_FORMSPREE_ID=your_form_id
git commit --allow-empty -m "chore: rebuild with env" && git push heroku main
```

## Production build

```bash
npm run build
npm start
```

## Deploy to Heroku

```bash
heroku create royal-mason-resources
heroku buildpacks:set heroku/nodejs
git push heroku main
heroku open
```

The `Procfile` runs `node server.js`, which serves the Vite `dist/` build and supports React Router deep links.
