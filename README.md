# SecureFront Repair

Next.js site for commercial door repair, storefront glass replacement, and graffiti & vandalism cleanup across Canada. Emergency property response — doors, glass & vandalism cleanup.

The site is generated from a 127-page SEO page plan (`pSEO - securefrontrepair.com.xlsx`) covering emergency pages, service pillars, "near me" pages, and city × service pages across 10 provinces.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run start
```

## Docker

Build and run with Compose:

```bash
docker compose up --build
```

The container serves the app on `http://localhost:3000`.

Build the image directly:

```bash
docker build -t securefrontrepair:latest .
docker run --rm -p 3000:3000 securefrontrepair:latest
```

## Regenerating the page plan

The page data lives in `lib/securefront-pages.json`, generated from the Excel plan:

```bash
python generate_pages.py
```
