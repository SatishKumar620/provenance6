# Provenance 6.0 — Official Website

> RVSCET's Annual Techno-Cultural Fest | May 14 & 15, 2026

**Anime-themed** (Demon Slayer / Zenitsu Infinity Castle aesthetic) website built with React + Vite, Framer Motion, and GSAP.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
npm run preview
```

---

## 🎬 Adding the Hero Video

The hero section expects a video at:
```
/public/hero-video.mp4
```

Recommended: Zenitsu Infinity Castle scene from Demon Slayer (or any anime clip you have rights to use).
- Trim to 30–60 seconds
- Compress to ~10–20 MB for web
- The video plays muted and looped behind the hero content

---

## 🖼️ Adding Past Glimpses Photos

Place your photos in:
```
/public/glimpses/
  g1.jpg
  g2.jpg
  ... up to g9.jpg (or more)
```

Then update `/src/components/Glimpses.jsx` — the `glimpses` array at the top — with the correct captions and years.

---

## 🏛️ Adding the Provenance Logo

Place the logo at:
```
/public/logo.png
```

Then import and use it in `/src/components/Navbar.jsx` inside the brand div.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx          ← Anime hero with GSAP lightning + Framer Motion parallax
│   ├── Navbar.jsx        ← Sticky nav with mobile menu
│   ├── Countdown.jsx     ← Live countdown to May 14
│   ├── About.jsx         ← 5 Guilds + animated stats
│   ├── Events.jsx        ← All 35+ events with club tabs
│   ├── Glimpses.jsx      ← Horizontal scroll photo gallery + lightbox
│   ├── Footer.jsx        ← Contact + social links
│   └── Cursor.jsx        ← Custom gold cursor
├── data/
│   └── events.js         ← All event data (edit here)
├── styles/
│   └── globals.css       ← CSS variables, animations, grain
├── App.jsx
└── main.jsx
public/
├── hero-video.mp4        ← ADD YOUR VIDEO HERE
├── logo.png              ← ADD YOUR LOGO HERE
├── favicon.svg
└── glimpses/             ← ADD PAST EVENT PHOTOS HERE
    ├── g1.jpg ... g9.jpg
```

---

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy**

---

## ✏️ Customizing

- **Event data** → Edit `/src/data/events.js`
- **Colors** → Edit CSS variables in `/src/styles/globals.css`
- **Social links** → Edit `/src/components/Footer.jsx`
- **Registration link** → Update the "Register Now" button href in Footer.jsx

---

*Built for Provenance 6.0 · RVSCET · Coimbatore*
