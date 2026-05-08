# Maheesha Udalagama — Portfolio

A modern, dark-themed personal portfolio website built with React.js and Tailwind CSS.

## Project Structure

```
maheesha-portfolio/
├── frontend/          ← React.js frontend (this is what you run)
│   ├── public/
│   │   ├── Maheesha_Udalagama_CV.pdf   ← CV for download button
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Loader.jsx
│   │   │   ├── Cursor.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── hooks/
│   │   │   └── useScrollAnimation.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── backend/           ← Backend code goes here (future)
    └── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Dev Server

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

### Production Build

```bash
cd frontend
npm run build
```

The output will be in `frontend/dist/` — deploy this folder to Vercel, Netlify, or any static host.

## Deploy to Vercel (Recommended)

1. Push the project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo
4. Set **Root Directory** to `frontend`
5. Click Deploy ✓

## Features

- ✅ Terminal-style loading animation
- ✅ Custom animated cursor
- ✅ Typing effect hero section
- ✅ Particle network canvas background
- ✅ Glassmorphism UI cards
- ✅ Scroll-triggered animations
- ✅ Project filtering (All / Web / Mobile / Desktop)
- ✅ Animated skill progress bars
- ✅ CV download button
- ✅ Contact form with validation
- ✅ Fully responsive (mobile + desktop)
- ✅ Dark glow effects throughout

## Customization

- **CV**: Replace `frontend/public/Maheesha_Udalagama_CV.pdf` with your updated CV
- **Projects**: Edit `src/components/Projects.jsx` → `PROJECTS` array
- **Skills**: Edit `src/components/Skills.jsx` → `skillCategories` array
- **Colors**: Edit `tailwind.config.js` → `extend.colors`
