# West Hill Community Centre

West Hill Community Centre is a community-focused organization serving Scarborough-West Hill through programs, advocacy, volunteer engagement, community partnerships, events, and support services.

This repository contains:

- Static production website
- WordPress theme architecture
- Community service content structure
- Deployment documentation
- Future member portal roadmap

## Project Tracks

### Track A
Static website for immediate deployment.

### Track B
WordPress + Elementor Pro implementation.

### Track C
Future digital platform expansion including volunteer, program registration, community engagement, and member services.

## Technology Stack

- HTML5
- CSS3
- JavaScript
- WordPress
- Elementor Pro
- GitHub
- Hostinger

## Status

Active Development

---

## 1. Project Architecture & Repository Structure

To maintain high development velocity and ensure seamless content scalability, the project is organized into three tracks (Track A for immediate static deployment, Track B for WordPress migration components, and Track C for future platform roadmapping).

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

## 4. Repository Branching Model & GitHub Setup

This repository uses a structured branching strategy to isolate stable production-ready code from active features and future migration efforts:

* **`main`**: Production-ready code. Matches the live environment.
* **`develop`**: Active website design, coding, and content development.
* **`future-wordpress`**: Ongoing WordPress migration work (theme adjustments, core CPT updates).
* **`future-portal`**: Long-term digital roadmap plans.

---

### Step 1: Initialize Git and Branch Structure
*(These steps have already been completed on your local machine)*
```bash
# Initialize repository
git init

# Rename default branch and create structure
git branch -M main
git checkout -b develop
git branch future-wordpress
git branch future-portal

# Add files and commit (active development workspace remains on develop branch)
git add .
git commit -m "Initial commit: Reorganize project structure, add README, gitignore, and migration roadmap"
```

---

### Step 2: Push to GitHub
To push your local repository branches to a new remote repository on GitHub:

1. Create a new repository on GitHub named: **`westhill-community-centre`** (Leave it empty: do not initialize with a README, license, or `.gitignore`).
2. Run the following commands in your local terminal (replace `YOUR_GITHUB_USERNAME` with your actual username):

```bash
# Link local repository to GitHub remote
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/westhill-community-centre.git

# Push the develop branch to GitHub first (where active work is)
git push -u origin develop

# Push other branches to preserve the repository structure
git push -u origin main
git push -u origin future-wordpress
git push -u origin future-portal
```

3. In your **GitHub Repository Settings > Branches**, set the **Default Branch** to `develop`. This ensures that anyone contributing or opening the repository lands on the active development branch. All Pull Requests should be targeted to `develop` before being merged into `main` for release.

---

## 5. Maintenance & Future Development

* **Making Changes to the Static Site**: Keep modifications strictly inside the `westhill-static/` directory. Do not modify files in other directories unless you are updating the WordPress theme or core documentation.
* **WordPress Syncing**: If new design requirements are made to the static layout, the custom CSS styles in `westhill-static/assets/css/style.css` should be ported to `westhill-theme/style.css` and the corresponding Elementor templates should be updated to match.
