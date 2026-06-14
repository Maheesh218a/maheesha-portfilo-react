# Maheesha Udalagama — Portfolio

🌐 **Live Demo:** [https://maheeshaudalagama.vercel.app/](https://maheeshaudalagama.vercel.app/)
🔒 **Admin Panel:** [https://maheeshaudalagama.vercel.app/admin/login](https://maheeshaudalagama.vercel.app/admin/login)

A modern, dark-themed personal portfolio website built with React.js, Tailwind CSS, and Firebase. 100% Serverless Architecture.

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
- ✅ Built-in Secure Admin Panel
- ✅ 100% Serverless Database via Firebase Firestore
- ✅ Firebase Authentication for Admin Access

## Customization

You no longer need to edit source code to update your portfolio! All content can be updated directly from the live site:
1. Log into the **Admin Panel**.
2. Edit your **Projects, Experience, About, and Contact** info.
3. Click "Save" and it will instantly update on the live website via Firebase Firestore.

*(Note: The Skills section is currently hardcoded for fast loading and can be edited in the local `src/data/skills.json` file).*

- **CV**: Replace `frontend/public/Maheesha_Udalagama_CV.pdf` with your updated CV
- **Colors**: Edit `tailwind.config.js` → `extend.colors`
