# CookMe — UI

Vue 3 frontend for the CookMe recipe & grocery ordering platform.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 + TypeScript |
| UI Library | PrimeVue 3 + PrimeFlex |
| State Management | Pinia |
| Routing | Vue Router 4 |
| HTTP Client | Axios |
| Maps | vue3-google-map / Google Maps JS API |
| Build Tool | Vue CLI 5 |

## Project Structure

```
COOKME_UI/src/
├── App.vue
├── main.ts
├── router.ts
├── components/
│   ├── HomePage.vue        # Recipe browse & search
│   ├── CheckoutPage.vue    # Ingredient pricing & order placement
│   ├── LoginPage.vue       # Login & registration
│   ├── ProfilePage.vue     # User profile, favourites & reviews
│   ├── AdminPage.vue       # Admin dashboard
│   └── HeaderComp.vue      # Shared navigation header
├── services/               # Axios API calls
├── models/                 # TypeScript interfaces
└── stores/auth.ts          # Pinia auth store (persisted to localStorage)
```

## Prerequisites

- Node.js 18+
- Vue CLI (`npm install -g @vue/cli`)
- The [CookMe REST API](../COOKME_rest-api/README.md) running on `http://localhost:3000`
- A Google Maps API key with **Maps JavaScript API** and **Geocoding API** enabled

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
VUE_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

> The Vue CLI must be installed globally for environment variables to be picked up correctly.

### 3. Start the development server

```bash
npm run serve
```

The app will be available at `http://localhost:8080`.

## Available Scripts

| Command | Description |
|---|---|
| `npm run serve` | Start dev server with hot-reload |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | Lint and auto-fix files |

## Features

- **Browse recipes** — filter by cuisine, keyword, or category shortcuts (Pizza, Fish, Pork, etc.)
- **Full-text search** — powered by Elasticsearch via the API
- **Recipe checkout** — view priced ingredients from the nearest or cheapest supermarket (AB, Lidl, Sklavenitis, MyMarket)
- **Supermarket comparison** — order by price or distance
- **User accounts** — register, login, manage favourites and reviews
- **Order placement** — choose delivery time or pickup, enter card details
- **Admin panel** — manage users and orders

## Notes

- The Google Maps key must have **Maps JavaScript API** and **Geocoding API** enabled (not just Maps Static API).
- Users registered without a real address will have `lat=0, lon=0`; supermarket distance features require valid coordinates.
- Auth state is persisted in `localStorage` under the `auth` key.


- fix forgot password