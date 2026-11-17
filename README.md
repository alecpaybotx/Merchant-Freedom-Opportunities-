# Merchant Freedom Opportunities

Static marketing site for **Merchant Freedom Opportunities LLC** (Alec / alecpaybotx).

Freedom starts at the point of sale.

## Local preview

No build step. Open `index.html` in a browser, or serve the folder:

```bash
# Python
python3 -m http.server 8080 -d .

# Node
npx serve .
```

Then visit `http://localhost:8080`.

## Deploy to GitHub Pages

Repo: [alecpaybotx/Merchant-Freedom-Opportunities-](https://github.com/alecpaybotx/Merchant-Freedom-Opportunities-)

### Option A — push this folder to `main` / `docs`

1. Copy the contents of this folder (`index.html`, `css/`, `js/`, `images/`, `README.md`) into the GitHub repo root **or** a `/docs` folder.
2. On GitHub: **Settings → Pages**.
3. Source: **Deploy from a branch**.
4. Branch: `main` (or `master`), folder: `/ (root)` or `/docs`.
5. Save. Site will publish at:
   `https://alecpaybotx.github.io/Merchant-Freedom-Opportunities-/`

### Option B — GitHub CLI from this folder

```bash
git init
git add .
git commit -m "Rebuild MFO marketing site for GitHub Pages"
git branch -M main
git remote add origin https://github.com/alecpaybotx/Merchant-Freedom-Opportunities-.git
git push -u origin main
```

Then enable Pages as in Option A.

## Contact form

The contact form posts to Formspree: `https://formspree.io/f/xnpqjkll`.  
Ensure that endpoint remains active and accepts the field names: `fname`, `lname`, `phone`, `bizname`, `pos`, `volume`, `notes`.

## Stack

- Vanilla HTML / CSS / JS
- Google Fonts: Cormorant Garamond + DM Sans
- No bundler required

## Notes

- Calculator: monthly fees = card volume × effective rate. Cash-discount comparison assumes a properly configured program can offset processing toward ~$0 net on card volume (labeled assumption; results vary).
- Images live in `images/` (webp preferred; logo also as png for OG/favicon).
