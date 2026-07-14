# 🎂 Gurleen's Birthday — Cinematic Interactive Experience

A world-class, award-worthy interactive birthday website built with Next.js 15, featuring cinematic animations, Three.js experiences, and magical micro-interactions — dedicated to **Gurleen**.

## ✨ Features

- **Cinematic Loading & Intro** — Premium loader, starry intro, browser-style domain reveal
- **Choose Your Journey** — Three magical paths: Memories, Birthday Wishes, Surprise
- **Magical Background** — Animated stars, particles, hearts, moon, clouds
- **Hero Section** — Animated cake, balloons, butterflies with magnetic CTA
- **Music System** — User-initiated music with 5 mood options, crossfade, volume control
- **Smooth Scrolling** — Lenis-powered buttery smooth scroll
- **Accessibility** — Reduced motion support, ARIA labels, keyboard navigation
- **SEO Optimized** — Open Graph, Twitter cards, structured data
- **Mobile First** — Responsive design with safe area support

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the experience.

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.js           # Root layout with fonts & metadata
│   └── page.js             # Main entry page
├── components/             # React components
│   ├── background/         # Magical background effects
│   ├── ending/             # Final cinematic ending
│   ├── hero/               # Hero section
│   ├── intro/              # Intro & browser experiences
│   ├── journey/            # Journey selection menu
│   ├── loading/            # Loading screen
│   └── music/              # Music player system
├── constants/              # App constants & content
│   ├── index.js            # Site config, colors, music tracks
│   └── content.js          # Wishes, reasons, letter content
├── hooks/                  # Custom React hooks
│   ├── useLenis.js         # Smooth scroll
│   ├── useMagnetic.js      # Magnetic button effect
│   ├── useHaptic.js        # Haptic feedback
│   └── useReducedMotion.js # Accessibility
├── lib/                    # Core libraries
│   ├── audio.js            # Howler.js sound system
│   ├── confetti.js         # Canvas confetti effects
│   └── context.js          # App-wide state
├── utils/                  # Utility functions
├── styles/                 # Global CSS & Tailwind
└── public/
    └── assets/
        ├── music/          # Background music files
        ├── sounds/         # Sound effect files
        ├── photos/         # Gallery photos
        └── lottie/         # Lottie animations
```

## 🎨 Customization

### Replacing Photos

Add your photos to `public/assets/photos/` and update the gallery configuration in `constants/content.js`:

```js
export const GALLERY_PHOTOS = [
  { id: 1, src: '/assets/photos/photo1.jpg', caption: 'Golden Moments' },
  // ...
];
```

### Replacing Music

Add MP3 files to `public/assets/music/` matching the filenames in `constants/index.js`:

- `soft-piano.mp3`
- `romantic-instrumental.mp3`
- `lofi.mp3`
- `acoustic-guitar.mp3`
- `calm-ambient.mp3`

### Replacing Sound Effects

Add sound files to `public/assets/sounds/` matching the paths in `constants/index.js`.

### Colors & Typography

Colors are defined in `tailwind.config.js` and `constants/index.js`. Fonts are loaded via `next/font` in `app/layout.js`.

## 🌐 Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repository to [Vercel](https://vercel.com) for automatic deployments.

### Custom Domain

Set your custom domain (e.g., `gurleen.vercel.app`) in the Vercel dashboard under Project Settings → Domains.

## ⚡ Performance Notes

- All heavy components use `dynamic()` imports with `ssr: false`
- Three.js components are code-split and lazy-loaded
- Images should use Next.js `<Image>` component with WebP/AVIF formats
- Animations respect `prefers-reduced-motion`
- Lenis smooth scroll is disabled for reduced motion users
- Target Lighthouse score: 95+

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | App Router, SSR, optimization |
| Tailwind CSS | Utility-first styling |
| Framer Motion | UI animations |
| GSAP | Complex timeline animations |
| Lenis | Smooth scrolling |
| React Three Fiber | 3D experiences |
| Three.js | WebGL rendering |
| Howler.js | Audio management |
| Canvas Confetti | Celebration effects |
| Lucide React | Icons |
| Lottie React | Vector animations |
| React Spring | Physics-based animations |

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

## 📄 License

Private project — made with ❤️ for Gurleen.
