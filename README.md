# West Hill Community Centre — Web Platform

This repository serves as the unified codebase for the West Hill Community Centre website platform. It is designed to accommodate the current production-ready static website and prepare the organization for its future migration to a WordPress-based content management system.

---

## 1. Project Overview & Architecture

To maintain high development velocity and ensure seamless content scalability, the project follows a two-track architectural strategy:
* **Track A (Static Website - Active Production)**: A fast, lightweight, and responsive static website served directly to visitors.
* **Track B (WordPress Platform - Future Migration)**: Ready-to-deploy WordPress custom components (theme, custom post types, and Elementor templates) maintained in the same project without interfering with the static production code.

### Repository Structure

```
WestHillCommunityCentre/
├── westhill-static/       # Track A: Active production static website
│   ├── assets/            # CSS, JavaScript, and dynamic JSON data
│   │   ├── css/           # style.css (responsive grid, layouts)
│   │   ├── js/            # main.js (UI behavior, calendar & programs loading)
│   │   └── data/          # events.json, programs.json (dynamic data sources)
│   ├── images/            # Brand image assets (e.g., Westhillcenterlogo.jpeg)
│   └── index.html         # Main website structure & SEO-optimized HTML5 template
│
├── westhill-theme/        # Track B: Custom WordPress theme (style.css, functions.php)
├── westhill-core/         # Track B: Must-Use core WordPress CPT registration plugin
│
├── documentation/         # Shared assets and guidelines
│   └── design-system.md   # Branding guidelines, color codes, spacing, and typography
│
└── future-roadmap/        # WordPress migration files & instructions
    ├── elementor-templates/ # Elementor Pro JSON templates for layouts
    └── wordpress-migration.md # Detailed migration & configuration roadmap
```

---

## 2. Technology Stack & Framework Analysis

This project is built using a **Standard HTML5 / CSS3 / Vanilla JavaScript** stack. It does **not** use React, Next.js, Vue, or any other modern JavaScript compile-step frameworks. 

### Rationale:
* **Ultra-Fast Performance**: Zero bundle sizes, leading to instant page loads and excellent Core Web Vitals scores.
* **High Maintainability**: Can be hosted on any standard web hosting environment without needing Node.js build processes.
* **SEO Excellence**: Fully static server-rendered HTML markup with structured metadata and JSON-LD layout allows crawlers to index the site immediately.
* **Dynamic Data Rendering**: Vanilla JavaScript retrieves local JSON files (`programs.json` and `events.json`) to render current events and programs on the page dynamically without a heavy database backend.

---

## 3. Hostinger Deployment Instructions

Depending on the active track, Hostinger offers two recommended deployment paths:

### Method A: Static Website Deployment (Recommended for `westhill-static`)
Since the active production site is standard HTML/CSS/JavaScript, it should be deployed using **Hostinger File Manager** or **Git Integration**:

1. **Via Hostinger Git Deployment (Continuous Integration)**:
   * Go to your **Hostinger hPanel > Website > Git**.
   * Link your GitHub repository (`westhill-community-centre`).
   * Set the **Branch** to `main`.
   * Set the **Install Directory** to `public_html`.
   * Since the static site resides in the `westhill-static/` subdirectory, configure your deployment script or deployment path in Hostinger to point to `westhill-static/` so that its contents map directly to `public_html/`. (Alternatively, if using Hostinger's standard Git panel, pull the repo and configure your domain's document root to point to `/public_html/westhill-static`).
2. **Via FTP / File Manager (Manual)**:
   * Compress the contents inside the `westhill-static/` directory (not the folder itself, but its files: `index.html`, `assets/`, `images/`).
   * Upload and extract the zip file directly into the `public_html/` folder using the **Hostinger File Manager**.

### Method B: WordPress Deployment (For Future Track B)
When the organization is ready to switch to WordPress:
1. Install WordPress via the **Hostinger Auto Installer** in the hPanel.
2. Deploy files:
   * Upload the files in `westhill-theme/` to `/public_html/wp-content/themes/westhill-theme/`.
   * Upload `westhill-core/westhill-core.php` to `/public_html/wp-content/mu-plugins/westhill-core.php`.
3. Import the templates in `future-roadmap/elementor-templates/` directly through the WordPress admin panel using Elementor Pro.

---

## 4. Git Version Control & GitHub Setup

Follow these commands to connect your local repository to a new GitHub repository and deploy it.

### Step 1: Initialize Git and Commit Locally
*(These steps have already been completed on your local machine)*
```bash
# Initialize repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Reorganize project structure, add README, gitignore, and migration roadmap"
```

### Step 2: Push to GitHub
To push your local repository to a new remote repository on GitHub:

1. Create a new repository on GitHub named: **`westhill-community-centre`** (Leave it empty: do not initialize with a README, license, or `.gitignore` since we already have them).
2. Run the following commands in your local command line (replace `YOUR_GITHUB_USERNAME` with your actual username):

```bash
# Rename the default branch to main
git branch -M main

# Link local repository to GitHub remote
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/westhill-community-centre.git

# Push the codebase to the main branch
git push -u origin main
```

---

## 5. Maintenance & Future Development

* **Making Changes to the Static Site**: Keep modifications strictly inside the `westhill-static/` directory. Do not modify files in other directories unless you are updating the WordPress theme or core documentation.
* **WordPress Syncing**: If new design requirements are made to the static layout, the custom CSS styles in `westhill-static/assets/css/style.css` should be ported to `westhill-theme/style.css` and the corresponding Elementor templates should be updated to match.
