# West Hill Community Centre — WordPress Migration Plan & Roadmap

This document outlines the strategy and technical steps to migrate the West Hill Community Centre website from its current static structure to a fully manageable WordPress site, utilizing Elementor Pro for design layout and custom code for performance and structure.

---

## 1. Project Directory Mapping

The repository is structured to maintain both the static website and the future WordPress components. When deploying to WordPress, the files in this repository map to the WordPress installation as follows:

| Repository Source Path | Target WordPress Installation Path | Purpose |
| :--- | :--- | :--- |
| `westhill-theme/` | `/wp-content/themes/westhill-theme/` | Custom WordPress theme containing stylesheets and structural templates. |
| `westhill-core/westhill-core.php` | `/wp-content/mu-plugins/westhill-core.php` | Must-Use plugin that registers the Custom Post Types (CPTs) and taxonomies. |
| `future-roadmap/elementor-templates/` | *Imported via WordPress Admin Panel* | Elementor Pro page and section layouts. |

---

## 2. WordPress Setup & Configuration

To migrate the static website to WordPress, follow these execution phases:

### Phase 1: Environment Provisioning
1. Install a fresh WordPress instance (e.g., via Hostinger's Auto Installer or local development tool like LocalWP).
2. Install and activate the following required plugins:
   - **Elementor** (Core)
   - **Elementor Pro** (Required for custom header/footer mapping and template import)

### Phase 2: Deploying Theme & Core Plugin
1. **Upload Theme**: Copy the `westhill-theme` folder into your site's `/wp-content/themes/` directory. Activate the "West Hill Community Theme" under **Appearance > Themes**.
2. **Deploy Core Plugin**: Create a folder named `/wp-content/mu-plugins/` (Must-Use Plugins) if it does not exist, and upload `westhill-core.php` directly into it.
   * *Note:* Must-Use plugins do not need to be activated; they run automatically and cannot be disabled by administrators, protecting the Custom Post Types from accidental deactivation.

### Phase 3: Importing Elementor Templates
Import the pre-configured Elementor templates located in `future-roadmap/elementor-templates/` to match the design of the static site:
1. Navigate to **Templates > Saved Templates** in the WordPress admin sidebar.
2. Click **Import Templates** at the top.
3. Choose and upload the JSON files one by one:
   - `header-template.json` (Set display conditions to: Entire Site)
   - `footer-template.json` (Set display conditions to: Entire Site)
   - `homepage-template.json` (Create a static home page, edit it with Elementor, and import this layout)
   - `programs-archive-template.json` (Set display conditions to: Program Archive)
   - `single-program-template.json` (Set display conditions to: Single Program)
   - `single-event-template.json` (Set display conditions to: Single Event)
   - `contact-template.json` (Create a contact page, edit with Elementor, and import)

---

## 3. Data Schema & Custom Post Types (CPT)

The static website uses JSON data structures located in `westhill-static/assets/data/` for programs and events. When migrating, this data will be stored as WordPress Custom Post Types. The schema mapping is detailed below:

### Programs & Services CPT (`program`)
Registered in [westhill-core.php](file:///c:/Users/Admin%20Lenovo/OneDrive/Desktop/Westhill%20Community%20Center/westhill-core/westhill-core.php).
- **Static Field (`programs.json`)** -> **WordPress CPT Field**
  - `id` -> Post ID (auto-generated)
  - `title` -> Post Title
  - `description` -> Post Content (Gutenberg / Elementor block)
  - `category` -> Taxonomy Term in `program_category` (e.g., Youth Services, Support Services)
  - `image` -> Featured Image (WordPress Media Library)
  - `details` (e.g. Schedule, Contact) -> Custom Fields (via ACF or Elementor native custom fields)

### Events CPT (`event`)
Registered in [westhill-core.php](file:///c:/Users/Admin%20Lenovo/OneDrive/Desktop/Westhill%20Community%20Center/westhill-core/westhill-core.php).
- **Static Field (`events.json`)** -> **WordPress CPT Field**
  - `id` -> Post ID (auto-generated)
  - `title` -> Post Title
  - `description` -> Post Content / Excerpt
  - `date` -> Custom Field `event_date` (Format: YYYY-MM-DD)
  - `time` -> Custom Field `event_time` (e.g., "10:00 AM - 2:00 PM")
  - `category` -> Custom Field / Taxonomy (e.g., "Food Security", "Youth")
  - `image` -> Featured Image (WordPress Media Library)

---

## 4. Maintenance Guidelines

* **Independent Paths**: When making edits to the static production website, only modify files under the `westhill-static/` folder. Do not mix static assets with the WordPress directories.
* **WordPress Theme Customization**: To customize theme styles for WordPress, modify `westhill-theme/style.css`. Any theme functional updates should go into `westhill-theme/functions.php`.
