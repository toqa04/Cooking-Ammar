# Cooking Ammar

Bilingual Arabic-English healthy food menu built with React, Vite, and Tailwind CSS.

React + Vite + Tailwind CSS (v4). Front-end only. All content is read from `src/data/menu.json`.

## Run
    npm install
    npm run dev

## Deploy to GitHub Pages
1. Push this project to a GitHub repository using the `main` or `master` branch.
2. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. The included workflow deploys the site automatically after each push. You can also start it manually from the **Actions** tab.

Vite uses the GitHub repository name as the Pages base path automatically. For a user or organization site (`<name>.github.io`), it uses the root path.

## Images (Cloudinary)
Every image is just a URL inside `src/data/menu.json` (for example, in `"image"` fields or the `"gallery"` array).
The current links are TEMPORARY placeholders from a free image API (loremflickr.com).
Upload your photos to Cloudinary and paste each link into the matching `image` field.
Cloudinary links are optimized automatically (f_auto, q_auto, resized).
Images exist in: `hero.images`, `gallery`, `products[].image`, `subscriptions[].image`.

## Edit content
- `src/data/menu.json` -> brand name, categories, meals, subscriptions (texts have `en` and `ar`).
- `src/config.js` -> phone, WhatsApp, Instagram, location.
- New category: add it to `categories`, then use its `id` in a product's `category`.
- Prices are in JOD. Currency text is in `src/i18n.jsx`.
