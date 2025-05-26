<div class="hero-icon" align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>
<h1 align="center">
scenelaunch-3d-experience
</h1>
<h4 align="center">Visually engaging 3D SaaS landing page with interactive models and animations.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Framework-React-61DAFB?logo=react&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/3D_Library-Three.js-000000?logo=three.js&logoColor=white" alt="Three.js">
<img src="https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Styling-Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</div>
<div class="badges" align="center">
<img src="https://img.shields.io/github/last-commit/coslynx/scenelaunch-3d-experience?style=flat-square&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/coslynx/scenelaunch-3d-experience?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/coslynx/scenelaunch-3d-experience?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>
## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors
## 📍 Overview
The repository contains a Minimum Viable Product (MVP) called "scenelaunch-3d-experience" that provides an engaging 3D landing page for SaaS products, featuring interactive 3D models, animations, and parallax effects. It's built with React, Three.js, TypeScript, and Tailwind CSS, targeting potential customers who appreciate visually stunning web experiences.
## 📦 Features
|    | Feature                   | Description                                                                                                        |
|----|---------------------------|--------------------------------------------------------------------------------------------------------------------|
| 🧊 | **Interactive 3D Models**   | Allows users to manipulate and explore 3D representations of the SaaS product.                                       |
| ✨ | **Smooth Animations**     | Provides subtle animations to highlight key features and enhance user engagement.                                 |
| 📜 | **Parallax Scrolling**    | Creates a sense of depth and immersion as users scroll through the landing page.                                  |
| 🎨 | **Modern Minimalist Design**| Employs a clean, uncluttered interface that focuses attention on 3D elements.                                     |
| 📱 | **Responsive Layout**     | Ensures optimal viewing experience across various devices and screen sizes.                                       |
| 🚀 | **Performance Optimized** | Implements optimized 3D assets and rendering techniques for smooth performance.                                   |
| 🎭 | **Theme Support**         | Adapts the visual elements depending on the selected light/dark mode.   |
| ⌨️ | **Accessibility**         | Keyboard controls and meaningful alt text implementations to guarantee a inclusive experience |
## 📂 Structure
```
3d-saas-landing-page/
├── public/                  # Static assets (images, fonts, etc.)
├── src/
│   ├── components/
│   │   ├── 3d/             # 3D related React components
│   │   │   ├── AdvancedScene.tsx  # Complex 3D environment setup
│   │   │   ├── ModelLoader.tsx    # Loads and caches 3D models
│   │   │   ├── ThreeScene.tsx     # Basic 3D scene setup
│   │   ├── layout/         # Layout components (Header, Footer, etc.)
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MinimalLayout.tsx
│   │   ├── sections/       # Reusable sections of the landing page
│   │   │   ├── LandingHero.tsx    # Hero section with 3D showcase
│   ├── hooks/              # Custom React hooks
│   │   ├── use3DAnimation.ts    # Manages 3D animations
│   │   ├── use3DInteraction.ts  # Handles user interactions with 3D objects
│   │   ├── useScrollAnimation.ts# Manages scroll-triggered animations
│   │   ├── useToggle.ts         # Manages a boolean state value
│   ├── pages/              # React components for different routes
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── ExperiencePage.tsx # Renders the immersive 3D experience
│   │   ├── ModelShowcasePage.tsx# Page for showcase 3D models
│   ├── styles/             # CSS files and Tailwind configuration
│   │   ├── base.css            # Basic CSS styling
│   │   ├── index.css           # Main styling file, includes tailwind and base style
│   │   ├── components/         # Component specific styling
│   │   │   ├── landing-hero.css    # Styling for the landing hero
│   │   │   ├── scroll-scene.css    # Stlying for the scroll three components
│   │   ├── layout/             # Css specific to layout of the site
│   │   │   ├── footer.css          # Base style of the footer
│   │   │   ├── header.css          # Base styles of the hedaer
│   │   │   ├── minimal-layout.css  # Basic style for the base layout
│   │   ├── pages/              # Style related to page content
│   │   │   ├── home.css            # Style specific for the home page
│   │   │   ├── model-showcase.css        # Layout of each model presented
│   ├── utils/              # Utility functions
│   │   ├── format.ts           # Functions for formatting data
│   │   ├── modelManager.ts       # Manage Model caching, loads, etc to increase perfs
│   │   ├── sampleModelHelper.ts   # Mock data and load a three example
│   │   ├── three-helpers.ts     # Three util funcs for a fast result
│   ├── App.tsx               # Core of the website
│   ├── main.tsx              # Starts the render
│   ├── vite-env.d.ts        # Types for vite environment
│   ├── .env                  # ApiKeys
│   ├── tsconfig.json         # Typescript settings
│   ├── tailwind.config.ts    # Tailwind settings
│   ├── package.json          # Lists dependencies
│   └── README.md             # this guide
```
## 💻 Installation
> [!WARNING]
> ### 🔧 Prerequisites
> - Node.js v18+
> - npm 6+ or Yarn
> - A modern web browser with WebGL support
### 🚀 Setup Instructions
1. Clone the repository:
```bash
git clone https://github.com/coslynx/scenelaunch-3d-experience.git
cd scenelaunch-3d-experience
```
2. Install dependencies:
```bash
npm install
```
Or:
```bash
yarn install
```
3. Set up environment variables:
  - Create a `.env` file in the project root.
  - Add required environment variables. Example:
```
THREE_MODEL_BASE_URL=https://example.com/models/
```
## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
```bash
npm run dev
```
Or:
```bash
yarn dev
```
2. Access the application:
- Web interface: http://localhost:5173
> [!TIP]
> ### ⚙️ Configuration
>   - Learn how to tweak scene params like colors and model paths
### 📚 Examples
- 📝 **Display 3D Model**: Access the landing page to view the 3D model in action.
## 🌐 Hosting
### 🚀 Deployment Instructions
#### Deploying to Netlify
1.  Sign up for a Netlify account and install the Netlify CLI:
```bash
npm install -g netlify-cli
```
2. Build the project:
```bash
npm run build
```
3. Deploy to Netlify:
```bash
netlify deploy --prod
```
### 🔑 Environment Variables
-  `THREE_MODEL_BASE_URL`: Base URL for Three.js models.
   Example: `https://example.com/models/`
-  `DRACO_DECODER_PATH`: Path to Draco decoder files.
   Example: `https://www.gstatic.com/draco/v1/decoders/`
-  `KTX2_TRANSCODER_PATH`: Path to KTX2 transcoder files.
   Example: `https://threejs.org/examples/jsm/libs/basis/`
## 📄 License & Attribution
### 📄 License
This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.
### 🤖 AI-Generated MVP
This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
No human was directly involved in the coding process of the repository: scenelaunch-3d-experience
### 📞 Contact
For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)
<p align="center">
<h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
<em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>