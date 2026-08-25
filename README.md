# ⚡ Willy Lengkong - Portfolio
<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Status-Live%20Production-32D58A?style=for-the-badge&logo=statuspage&logoColor=white)
![Build Engine](https://img.shields.io/badge/Build-Vite%206%20Rollup-1687FF?style=for-the-badge&logo=vite&logoColor=white)
![Performance](https://img.shields.io/badge/Lighthouse-100%20Score-35A0FF?style=for-the-badge&logo=googlechrome&logoColor=white)
![Design System](https://img.shields.io/badge/UI-Vanilla%20CSS3%20Design%20Tokens-E9A827?style=for-the-badge&logo=css3&logoColor=white)

<br/>

**Retail Data Analyst & Automation**

[🌐 View Live Portfolio](https://willylengkong.me) · [💼 LinkedIn](https://linkedin.com/in/willylengkong) · [🐙 GitHub](https://github.com/willylengkong) · [✉️ Get in Touch](mailto:willylengkongg@gmail.com)

</div>

---

## 📌 Overview

Welcome to the official source repository for **Willy Lengkong's** professional portfolio. This web application showcases enterprise data analytics projects, automated data pipelines, FMCG competitive analytics, and academic accomplishments at **PT Indomarco Prismatama (Indomaret Group)** and **Universitas Pelita Harapan (UPH)**.

Built with an obsession for speed, precision, and modern interactive aesthetics — utilizing a pure **Zero-Framework Vanilla Stack** paired with **Three.js WebGL** 3D particle physics and **GSAP + Lenis** smooth momentum scrolling.

---

## 🛠️ Technology Stack & Architecture

### **Frontend & Motion Engineering**
```
├── Core Architecture     : Semantic HTML5, Vanilla JavaScript (ES6+), Vanilla CSS3
├── 3D Canvas Atmosphere  : Three.js WebGL (GPU-accelerated particle constellation with cursor repulsion)
├── Physics & Motion      : Lenis Inertial Smooth Scroll + GSAP ScrollTrigger
├── Typography System     : Geist Sans, Inter Tight, JetBrains Mono, Halimun Signature Script
├── Form Handling         : Asynchronous Web3Forms REST API with honeypot security
└── Build Pipeline        : Vite 6 Bundler (~260ms optimized Rollup build)
```

### **Data Analytics & Pipeline Stack**
```
├── Languages & Libs      : Python, pandas, openpyxl, NumPy
├── Business Intelligence : Tableau, Looker Studio, Power BI
├── Enterprise Systems    : Oracle Database, SQL, Outlook Automation, Advanced Excel
└── Methodologies         : ETL Engineering, SPD / APC / STD Retail Metrics, Automated Data Partitioning
```

---

## 🚀 Featured Enterprise Projects

### 1. 📊 [Reporting Automation Sales Perishable](#)
* **Problem**: Manual VLOOKUP processing across 11+ daily reports required **165–220 minutes/day** (15–20 min per sheet).
* **Solution**: Engineered a modular Python pipeline featuring automated validation, data formatting, period detection, and Outlook distribution.
* **Impact**: Slashed execution runtime to **~30 seconds** for 11 reports — **150× faster / 99.3% time saved**.

### 2. 🏬 [O!Save vs. Indomaret Competitive Analysis](#)
* **Problem**: Needed to quantify and measure competitor impact (O!Save) on Indomaret store sales performance.
* **Solution**: Analyzed **75 nearby Indomaret stores across 40 product departments** using SPD, APC, and STD evaluation models.
* **Impact**: Uncovered store- and department-level revenue shifts, enabling precision retail merchandising adjustments.

### 3. 🧩 [CSV Splitter & Merger Tool](#)
* **Problem**: Large datasets (3M+ rows) crashed spreadsheet applications and exceeded standard row limits, while distributed files hindered consolidation.
* **Solution**: Developed high-performance Python scripts for chunked CSV partitioning into Excel-compliant workbooks and seamless multi-file merging.
* **Impact**: Streamlined cross-departmental data workflows, eliminating manual file partitioning and consolidation friction.

---

## ✨ Key Design & Technical Features

- 🌌 **GPU-Accelerated 3D Background**: Custom Three.js particle constellation with real-time cursor gravity and repulsion physics.
- 📜 **Cinematic Synchronous Preloader**: Signature script brand identity unveiling seamlessly in sync with loading progress.
- 🎨 **Interactive Living Design System Modal**: Built-in architecture viewer displaying tokens, color matrices (click-to-copy HEX), typography, and motion physics.
- 📱 **Full Multi-Device Responsiveness**: Tailored layout scaling across 4K/QHD Monitors, Laptops, Tablets, and Smartphones.
- 🔒 **Serverless Secure Contact Form**: Direct-to-inbox messaging powered by Web3Forms REST integration.
- ⚡ **Zero-Framework Performance**: Ultra-lean payload with zero heavy runtime libraries for instant first contentful paint (FCP).

---

## 📂 Project Directory Structure

```plaintext
willy-portfolio/
├── assets/                       # Static media, logos, profile photos, and certificates
│   ├── brand-icon.png
│   ├── certificate-dicoding.png
│   ├── favicon.png
│   ├── logo-dicoding.png
│   ├── logo-indomaret.png
│   ├── logo-uph.png
│   └── profile-photo.jpg
├── scripts/                      # Client-side motion & application controllers
│   ├── main.js                   # Preloader, Lenis + GSAP, modals, counters, contact form
│   └── three-background.js       # Three.js 3D WebGL particle constellation engine
├── styles/                       # CSS architecture & design tokens
│   └── main.css                  # Variables, typography, components, animations, media queries
├── index.html                    # Single-page application markup & JSON-LD schema
├── package.json                  # Vite configuration & project dependencies
├── README.md                     # Project documentation (You are here)
└── vite.config.js                # Vite build options
```

---

## 💻 Local Development & Setup

### **Prerequisites**
- [Node.js](https://nodejs.org/) (Version 18.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/willylengkong/willy-portfolio.git
   cd willy-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   *The application will launch at `http://localhost:5173` (or next available port) with instant Hot Module Replacement (HMR).*

4. **Build for production:**
   ```bash
   npm run build
   ```
   *Generates an optimized, minified production bundle in the `/dist` directory.*

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🚢 Deployment Guidelines

This portfolio is ready for 1-click deployment on modern hosting providers:

### **Deploy on Vercel**
```bash
npx vercel
```
* Or link your GitHub repository to [Vercel](https://vercel.com) with the build command `npm run build` and output directory `dist`.

### **Deploy on Netlify**
* Build command: `npm run build`
* Publish directory: `dist`

---

## 📬 Contact & Connect

- **Willy Lengkong** — Retail Data Analyst & Automation Specialist
- **LinkedIn**: [linkedin.com/in/willylengkong](https://linkedin.com/in/willylengkong)
- **GitHub**: [github.com/willylengkong](https://github.com/willylengkong)
- **Email**: [willylengkongg@gmail.com](mailto:willylengkongg@gmail.com)
- **Location**: Jakarta, Indonesia

---

<div align="center">
  <sub>© 2026 Willy Lengkong. Designed &amp; Engineered with Precision.</sub>
</div>
