# Puricha Ronkaew — Portfolio

Static, deployable portfolio recreated from the 1440 px Figma master. Smaller screens scale the complete composition proportionally; the layout does not reflow.

## Run locally

Requires Node.js 18 or newer.

```bash
npm run dev
```

Open <http://127.0.0.1:4173>.

## Deploy

The site has no build step and no third-party runtime dependencies. Deploy this folder directly to Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any static web host.

- Vercel: import the folder/repository, choose **Other**, leave the build command empty, and use `.` as the output directory.
- Netlify / Cloudflare Pages: leave the build command empty and publish this folder.
- Traditional hosting: upload `index.html`, `styles.css`, `script.js`, and the `assets` folder.

## Interaction map

- Sticky navigation: About, Works, Contact
- About Me heading, description and statistics are native HTML text using the bundled Inter font
- Skills heading and skill labels are native HTML text; decorative gradient squares remain in the artwork
- Remaining visible Figma text layers are native HTML text, while text embedded inside artwork, logos and mockups stays in the original images
- Work category buttons: CI Branding, Packaging, Logo, Character, Key Visual, Social; each follows the Figma hover variant (black background with white text)
- iPhone mockup: click/tap to cycle through six screens
- Logo carousel: seamless loop, pause on hover, non-hovered cards dim to 50%
- Key Visual: selecting Doi Kham, Birdy, TrueMove H, Eversense, or Mansome scrolls one continuous vertical image sequence to the matching Figma position and dims the inactive projects
- Social media grid: hovering or focusing one artwork keeps it at 100% opacity while all other artworks dim to 60%, matching the Figma variable interactions

All visual assets are stored locally under `assets/`; the deployed site does not depend on expiring Figma asset URLs.
