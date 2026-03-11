# blunt.

Et streetwear webshop-projekt bygget med React 19, Vite og React Router v7.

## Hvad projektet indeholder

- React 19 + Vite + SWC
- React Router v7 med `BrowserRouter` og `basename` via `import.meta.env.BASE_URL`
- Produktside med filter (kategori, farve, størrelse, brand, pris, sortering)
- Produktdetaljeside med størrelsesvælger og "Add to bag"
- Indkøbskurv med antal-styring og ordreopsummering
- Favoritliste — gem/fjern produkter med hjerteklik
- Newsletter-popup på forsiden
- GitHub Actions workflow til automatisk deploy på push til `main`
- SPA-fallback på GitHub Pages via `404.html`

## Kom hurtigt i gang

```bash
npm install
npm run dev
```

Appen starter lokalt via Vite (typisk `http://localhost:5173`).

## Scripts

```bash
npm run dev      # start udviklingsserver
npm run build    # production build
npm run preview  # preview af build lokalt
npm run lint     # eslint
```

## Projektstruktur

```text
src/
  App.jsx               # Routes + global state (kurv + favoritter)
  main.jsx              # BrowserRouter + basename
  styles.css            # Global styling
  components/
    Navbar.jsx
    Footer.jsx
  pages/
    HomePage.jsx
    AboutPage.jsx
    ServicesPage.jsx
    ContactPage.jsx
    ProductPage.jsx
    ProductDetailPage.jsx
    BasketPage.jsx
    FavoritesPage.jsx
    NotFoundPage.jsx
public/
  products.json         # Produktdata
  logo.webp
  *.png                 # Billeder til forsiden
.github/
  workflows/
    deploy.yml          # Build + deploy til GitHub Pages
```

## Routing

Routes er defineret i `src/App.jsx`.

- `/` → `HomePage`
- `/about` → `AboutPage`
- `/services` → `ServicesPage`
- `/contact` → `ContactPage`
- `/products` → `ProductPage`
- `/products/:id` → `ProductDetailPage`
- `/basket` → `BasketPage`
- `/favorites` → `FavoritesPage`
- `*` → `NotFoundPage`

## Deployment til GitHub Pages

`package.json` indeholder en `base` værdi, som bruges ved build:

```json
{
  "base": "/exam-2sem-customer-experience/"
}
```

Hvis repository-navnet ændres, opdatér `base` tilsvarende og push igen.

Workflowet i `.github/workflows/deploy.yml`:

- bygger projektet
- deployer til GitHub Pages
- kopierer `index.html` til `404.html` (så client-side routing virker på refresh/deep links)
