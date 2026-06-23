# Sideshow

**A DIY touring manager for routing shows, wrangling contacts, and keeping the whole road circus from catching fire.**

Sideshow is a heart-driven tour management app for DIY artists, bands, bookers, and freaks in motion. The goal is simple: make touring less chaotic without sanding off the weird edges. It's built by [Neek](mailto:neek@freakscene.diy) alongside the [Freakscene DIY network](https://freakscene.diy).

```
root@sideshow:~$ boot_tour_manager
> operator: Neek
> status:   building
> homebase: freakscene.diy
```

> **Status:** Early build. Right now this repo is a single-page front-end shell — the landing page and design language for the app. Features below are the roadmap, not yet shipped. No public demo yet; follow the larger ecosystem at [freakscene.diy](https://freakscene.diy).

## What it's for

DIY touring usually lives in a pile of spreadsheets, group chats, and half-remembered promises. Sideshow is being built to pull that into one place that's actually pleasant to use on the road.

Planned capabilities ("signals" on the landing page):

- **Tour routing** without spreadsheet rot
- **Contact tracking** for venues, promoters, and artists
- **Show management** — notes, holds, confirmations, and chaos logs
- Built **alongside the Freakscene DIY network**

## Getting started

This is a static, dependency-free site at the moment. There's no build step, no framework, and nothing to install.

```bash
# clone it
git clone <your-repo-url> sideshow-spa
cd sideshow-spa

# open it directly...
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows

# ...or serve it locally
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
sideshow-spa/
├── index.html    # the entire app/landing page — markup + inline styles
└── README.md     # you are here
```

`index.html` is fully self-contained: a single `<style>` block (CRT-green terminal theme, responsive grid, scanline overlay) and the page markup. Spots intended for editing are tagged with `<!-- CHANGE -->` comments — page title, pitch copy, feature bullets, and image placeholders.

## Customizing

The look is driven by CSS custom properties near the top of `index.html`:

```css
:root {
  --bg: #020702;      /* background */
  --panel: #061406;   /* panels */
  --green: #00ff66;   /* primary accent */
  --line: #164d27;    /* borders */
  --danger: #ff4d4d;
  --max: 980px;       /* content width */
}
```

Tweak those to reskin the whole thing. Swap the three `.tile` placeholders for real screenshots or artwork as the product gets clearer.

## Roadmap

- [ ] Real tour routing UI
- [ ] Contact database (venues / promoters / artists)
- [ ] Show records: holds, confirmations, notes
- [ ] Screenshots / demo
- [ ] Backend + data persistence

## Contributing

This is an open project for the DIY community — issues, ideas, and pull requests are welcome. If you tour, book, or run shows and have opinions about what would actually help, those opinions are worth more than gold here.

The fastest way in: open an issue, or reach out directly.

## Contact

- **Neek** — [neek@freakscene.diy](mailto:neek@freakscene.diy)
- **Web** — [freakscene.diy](https://freakscene.diy)

## License

No license is currently declared. Until one is added, all rights are reserved by default — open an issue if you'd like to use or build on this and we'll sort it out.

---

© 2026 Neek · Sideshow · Built for the DIY road goblins.
