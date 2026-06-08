# Shared Design System & Branding Guidelines

**Project:** West Hill Community Centre Website  
**Version:** 1.1.0  
**Source of Truth:** Shared between Track A (Static), Track B (WordPress), and Track C (Future Digital Platform).

---

## 1. Brand Color System

These colors are derived directly from the West Hill Community Centre logo and must be used consistently across all platforms.

| Color Name | Role | HEX Code | CSS Variable |
| :--- | :--- | :--- | :--- |
| **Deep Community Blue** | Primary Brand Color / Main Headers | `#0F3B6A` | `--wh-blue-primary` |
| **Light Sky Blue** | Supporting Color / Links & Accents | `#5B92E5` | `--wh-blue-light` |
| **Dark Navy Blue** | Dark Backgrounds / Footers / Dark Text | `#0A2645` | `--wh-blue-dark` |
| **Community Green** | Success Indicators / Primary Buttons | `#2B8E56` | `--wh-green-primary` |
| **Light Green** | Accent Buttons / Light Gradients | `#3CB06D` | `--wh-green-light` |
| **Warm Orange** | Accent Highlights / CTAs / Badges | `#F4A222` | `--wh-orange-accent` |
| **Pure White** | Clean Page Backgrounds / Card BG | `#FFFFFF` | `--wh-bg-white` |
| **Soft Gray** | Section Backgrounds / Light Borders | `#F8F9FA` | `--wh-bg-soft` |
| **Light Blue-Gray** | Alternate Row Backgrounds | `#F0F4F8` | `--wh-bg-alt` |

---

## 2. Typography System

The typography is optimized to feel professional, modern, welcoming, family-friendly, and highly readable.

* **Primary Font (Headings, Buttons, Accents):** `'Poppins', sans-serif`
* **Secondary Font (Body Text, Inputs, Captions):** `'Inter', sans-serif`

### Scale
* **H1 (Hero Main Title):** `clamp(2.5rem, 5vw, 3.5rem)` (Line Height: `1.2`, Weight: `700`)
* **H2 (Section Heading):** `clamp(2.0rem, 4vw, 2.5rem)` (Line Height: `1.2`, Weight: `600`)
* **H3 (Component Card Heading):** `1.25rem` (Line Height: `1.3`, Weight: `600`)
* **Body Text (Main Copy):** `1rem` / `16px` (Line Height: `1.6`, Weight: `400`)
* **Muted / Small Text:** `0.875rem` / `14px` (Line Height: `1.5`, Weight: `400`)

---

## 3. Spacing & Grid System

All layouts must use a modular spacing system to ensure responsive flexibility.

* **Section Padding (Desktop):** `80px` top and bottom.
* **Section Padding (Mobile):** `45px` top and bottom.
* **Card Padding:** `30px` (Desktop) / `20px` (Mobile) on all sides.
* **Grid Gap:** `30px` for large cards / `20px` for minor blocks.
* **Border Radii:**
  * Small (Buttons, badges): `8px` (`--wh-radius-sm`)
  * Medium (Cards, standard containers): `16px` (`--wh-radius-md`)
  * Pill (Pill buttons): `9999px` (`--wh-radius-full`)

---

## 4. Icons & Animations

### Icons
* Use **FontAwesome v6** (free CDN) for all interface icons.
* Icons inside accent badges/circles must use primary colors and have a 1:1 square aspect ratio.

### Animations & Micro-interactions
* **Standard Transition:** `all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)`
* **Hover State for Buttons:** Expand/scale button slightly (`scale(1.03)`), transition background to lighter hue, add soft drop shadow.
* **Hover State for Cards:** Lift card vertically (`transform: translateY(-8px)`), switch box shadow from `--wh-shadow-soft` to `--wh-shadow-hover`.
* **Scroll Animation:** Add lazy-fade in classes (`.wh-reveal`) triggered via Intersection Observer in JavaScript.

---

## 5. Imagery Style & AI Image Generation Prompts

All imagery must reflect diverse Canadian communities, intergenerational participation, and a warm, bright, natural lighting style. Avoid clinical or stock-photo looks.

### AI Image Prompts (Midjourney/DALL-E 3 Style)

1. **Hero / Volunteer Image:**
   > `A warm, photo-journalistic style photograph of diverse volunteers (Canadian community, mixed ages and ethnicities) packing fresh food hampers at a community centre, bright natural indoor lighting, friendly smiles, soft depth of field, candid capture, 8k resolution, photorealistic, cinematic coloring --ar 16:9`

2. **Youth Program Card Image:**
   > `Candid photography of elementary-school children of diverse backgrounds working together on a colorful science project inside a bright, modern classroom, laughing, high-quality, warm lighting, natural expressions --ar 4:3`

3. **Seniors Program Card Image:**
   > `An active senior citizen couple laughing while participating in a pottery class, warm natural lighting, high detail, community center environment, focus on connection and happiness, professional photography --ar 4:3`

4. **Employment Support Card Image:**
   > `A friendly female mentor guiding a young adult male on a laptop screen, career coaching session in a modern community center lobby, professional setting, bright natural light, warm and encouraging vibe --ar 4:3`

5. **Family Services Card Image:**
   > `A young Canadian family (mother, father, toddler) playing with educational building blocks on a soft play mat, bright natural light, happy expressions, candid family photo, cozy and welcoming room --ar 4:3`

---

## 6. Reusable Component Design Specifications

These structural specifications must be identical between Track A (Static HTML/CSS) and Track B (Elementor Pro Custom CSS classes).

### Component A: Hero Section
* **Layout:** Centered Flexbox container or dual-column row.
* **Overlay:** Classic gradient overlay starting at `rgba(15, 59, 106, 0.9)` and fading to `rgba(15, 59, 106, 0.7)`.
* **Buttons:** Left button Primary Warm Orange (`#F4A222`), right button Outline White (`transparent` with `2px` white border).

### Component B: Program Card
* **Structure:** Vertical container. Image on top (aspect ratio 4:3), content below (title, text, action button).
* **Styles:** White background, `--wh-radius-md`, hidden overflow (ensuring rounded image corners), and `--wh-shadow-soft`.
* **Hover:** Elevates `8px` up, border highlights in `#0F3B6A` or `#2B8E56`.

### Component C: Event Card
* **Structure:** Horizontal layout (Desktop) / Vertical layout (Mobile).
* **Date Badge:** Solid Deep Blue background (`#0F3B6A`), bold white day number, warm orange month text (`#F4A222`).
* **Details:** Right-side layout containing Event Title, dynamic timing, and secondary green button.

### Component D: Testimonial Card
* **Structure:** Centered card with curved quote icon on top, italicized body text, author name at bottom.
* **Styles:** Pure White background, inner padding `40px`, soft borders, and large quote icon in `#F4A222`.

### Component E: Impact Statistic Card
* **Structure:** Numeric counter block. Large bold digit (48px Poppins, primary green or orange), label below (14px Inter, uppercase, muted).
* **Styles:** Centered text, no borders, subtle white transparent bubble background.

### Component F: Resource Card
* **Structure:** Row layout with document icon (PDF/Word), Resource Title, file size label, and a clean "Download" action button.
* **Styles:** Light Gray background (`#F8F9FA`), rounded corners (`8px`), and a right-aligned download icon.
