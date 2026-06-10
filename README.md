# DevFolio AI 🚀

An elegant, full-stack **Developer Portfolio Builder & SaaS Platform** that empowers engineers to visually design, customize, and publish beautiful portfolios with instant live previews, real-time metrics, printable PDF formatting, and an interactive **Gemini AI Co-Pilot**.

---

## 🎨 Visual Themes & Layout Presets

Customized with direct styling overlays. Switch between design vibes instantly in the customizer tab:
- **Cyberpunk**: Monospaced typography, dark canvas with neon cyan/magenta gradients, glowing retro grid borders, and futuristic accent outlines.
- **Minimal**: High-contrast layout centering large serif details, ample white space, card-free grids, and streamlined elegance.
- **Glassmorphism**: Semi-transparent backing panels utilizing CSS backdrop-blur filters, thin neon borders, and smooth UI floating elements.
- **Retro Terminal**: Throwback phosphor amber or green text schemes with classic display grid lines simulating high-contrast vintage code consoles.
- **Baseline Raw**: Minimal raw aesthetic utilizing clean structural padding and borders without secondary cards or borders.

---

## 💾 Core Dynamics: Drafts & Storage

### 1. Where are Drafts Stored?
Portfolios start in **Draft Mode** to let you edit design aesthetics and change descriptions in private:
* **Firebase Sync & Local Drafts**: When you are editing, drafts are temporarily compiled locally or securely synced with **Firebase Firestore / Local Storage** when logged in. 
* **User Accounts**: By clicking **Google Sign-In**, your session links with a persistent user profile utilizing **Firebase Authentication**. Your drafted changes are persisted dynamically, letting you close the browser, return later, and resume editing seamlessly.

### 2. How to Publish Your Portfolio
To make your developer showcase viewable to the public:
1. Locate the **Publish Status Header Bar** at the top right of the Editor screen.
2. Toggle the state from **Draft Mode** to **Published Live**.
3. Once active, your portfolio automatically goes online!

### 3. Sharing Your Portfolio with the World
Others can view your live portfolios instantly via custom routing URLs:
* **Live Sharing Link**: `/p/your-username` (e.g., `https://<your-domain>/p/developer` or `http://localhost:3000/p/developer`)
* Adding your portfolio link to your LinkedIn bio, GitHub readme files, or resume allows recruiters to check your active code, check details, and read live metrics!

---

## 📊 Recruitment Analytics Dashboard

Every published portfolio includes built-in visitor metrics to track hiring traction:
* **Total Traffic Views**: Logs real-time unique page hits on your live portfolio.
* **Resume Downloads**: Tracks each trigger of the printable resume actions.
* **Device Breakdown Chart**: Interactive pie visualization separating desktop, tablet, and mobile configurations.
* **Geographic Traffic Leads**: Highlights world maps and lists detailing country origins of hiring leads.
* **Monthly Traction Graphs**: Spline projections illustrating user check-ins.

---

## 📄 Printable PDF Resumes

Hiring managers often require clean documents. We built beautiful print-optimized configurations:
* Navigate to the **Portfolio View** tab and trigger the **Print/Download SVG** action.
* The system utilizes custom print stylesheets (`@media print`) that automatically hide interactive dashboard sliders, buttons, inputs, and settings controls.
* Your layout cleanly adapts itself into elegant page margins with standard serif or sans fonts ideal for standard PDF saving and quick printer distribution.

---

## 🤖 Inside Gemini AI Co-Pilot

Your smart creative assistant handles the heavy lifting when writing technical profiles:
- **Quick Upgrades**: Interactive action buttons optimize your main developer titles or summaries with a single click.
- **Smart Copywriting Suggestions**: Generates customized headlines and experience details matching modern IT recruiter metrics.
- **Interactive Quick-Apply**: Suggested snippets can be applied to your form details dynamically right from the chat workspace!

---

## 🛠️ Technological Architecture

* **Frontend**: React 19, Vite, Tailwind CSS, Motion (animations), and Lucide React.
* **Backend API**: Node.js & Express server handling assets, portfolio draft retrievals, analytics, and proxying.
* **Database & Auth**: Optional Firestore JSON and Firebase Auth configuration for secure, cloud-saved profile data.

### Development Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development environment (Port 3000)
npm run dev
```

### Production Bundling

```bash
# 1. Build the frontend and bundle server with esbuild
npm run build

# 2. Boot production script
npm run start
```

