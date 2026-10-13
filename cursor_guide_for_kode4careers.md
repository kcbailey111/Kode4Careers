# `CURSOR_GUIDE.md`

## 1. Project Overview & Scope
- **Company Name:** Kode4Careers
- **Business Type:** Technical Consulting & Implementation Firm
- **Key Offerings:** Municipal/Enterprise Intranets, Data Analytics & Visualization, AI Agent Development, and Workflow/System Automation.
- **Hosting Target:** GitHub Pages (Static Site Deployment)
- **Tech Stack:** Plain HTML5, CSS3, Modern JavaScript (ES6+). No heavy frameworks or build steps required.

---

## 2. Directory Structure
Ensure the repository follows this standard structure:

```text
kode4careers/
│
├── index.html                # Home Page
├── about.html                # About Us Page
├── schedule.html             # Schedule a Consultation Page
│
├── css/
│   ├── style.css             # Core design system, variables, layouts, components
│   └── responsive.css        # Media queries & mobile responsiveness
│
├── js/
│   ├── main.js               # Global UI scripts (mobile nav, header scroll, etc.)
│   └── form-handler.js       # Contact/Inquiry form handling & validation
│
└── assets/
    ├── images/
    │   ├── profile.jpg       # Profile photo of founder/owner
    │   ├── logo.svg          # Company logo / branding icon
    │   └── hero-bg.svg       # Optional tech accent graphics
    └── logos/                # Client / partner logos for social proof
        ├── city-spartanburg.svg
        └── ...
```

---

## 3. Design System & Style Guidelines

### Color Palette (Modern Dark Tech with Subtle Accents)
- **Background (Primary):** `#0B0F17` (Deep Obsidian / Tech Dark)
- **Background (Surface/Cards):** `#161C28` (Dark Slate Card Fill)
- **Background (Hover/Border):** `#232B3E` (Subtle Card Outline)
- **Primary Text:** `#F1F5F9` (Off-white / Slate 100)
- **Muted Text:** `#94A3B8` (Slate 400)
- **Accent Primary:** `#38BDF8` (Electric Cyan)
- **Accent Secondary:** `#6366F1` (Indigo Blue - for gradients/highlights)
- **Success Tone:** `#10B981` (Emerald Green)

### Typography
- **Heading Font:** Inter, system-ui, or sans-serif (Bold, clean tech aesthetic).
- **Body Font:** Inter or system-ui, line-height `1.6`, high legibility against dark backgrounds.

### UI / Component Patterns
- Modern glassmorphism or sleek bordered cards (`border: 1px solid #232B3E; background: #161C28; border-radius: 12px;`).
- Highlighting action items using subtle cyan/indigo gradients on buttons and hover states.
- Responsive navigation bar with sticky header, sleek logo mark, and "Schedule Consultation" CTA button.
- Footer with quick links, copyright notice, and social/contact links on all pages.

---

## 4. Page Specifications & Content Architecture

### Page 1: Home (`index.html`)
1. **Navigation Bar:**
   - Logo: **Kode4Careers**
   - Links: `Home`, `About Us`, `Schedule Consultation`
   - Primary Action Button: `Book a Call` -> links to `schedule.html`

2. **Hero Section:**
   - **Headline:** *End-to-End Technical Consulting & Systems Implementation*
   - **Subheadline:** *Empowering organizations with custom intranets, automated workflows, actionable data analytics, and intelligent AI agents.*
   - **CTAs:** Primary: `Schedule a Consultation` | Secondary: `Explore Our Services` (scrolls down to services section).

3. **Core Services Grid (4 Key Pillars):**
   - **Internal Systems & Intranets:** Building secure, custom enterprise and municipal intranet solutions that streamline internal communication and operational workflows.
   - **Data Analytics & Business Intelligence:** Turning complex organizational data into clear, actionable dashboards (Power BI / SQL analytics) for smarter decision-making.
   - **AI Agent Development:** Designing and deploying tailored AI agents that automate routine tasks, extract insights, and enhance organizational productivity.
   - **System Integration & Automation:** Connecting third-party platforms, databases, and APIs to remove manual data entry and streamline operational processes.

4. **Why Work With Kode4Careers Section:**
   - Brief highlight on technical expertise, rapid implementation, and tailored solutions built for modern workflow demands.

5. **Bottom CTA Section:**
   - Callout banner driving users to schedule an introductory consultation.

---

### Page 2: About Us (`about.html`)
1. **Header / Hero Intro:**
   - Title: *About Kode4Careers*
   - Overview of the firm's mission: bridging technical complexity with practical implementation for businesses and public sector organizations.

2. **Founder & Leadership Section:**
   - **Image:** `<img src="assets/images/profile.jpg" alt="Founder Profile" class="profile-img">`
   - **Bio Paragraphs:** Highlighting experience across software engineering, data analysis, custom platform development, and IT leadership.
   - **Core Philosophy:** Focus on clean architecture, reliable execution, and scalable systems.

3. **Impact & Client Engagements ("Companies & Organizations We've Worked With"):**
   - Section heading highlighting past project impact and partners.
   - Logo grid or featured cards showcasing key engagements (e.g., municipal IT implementations, data transformation initiatives, intranet architecture projects).
   - Brief summary cards detailing specific impact points:
     - *Municipal Intranet Development & Workflow Modernization*
     - *Custom Data Analytics & BI Dashboards*
     - *Automated Cloud & API Integrations*

---

### Page 3: Schedule a Consultation (`schedule.html`)
1. **Page Header:**
   - Title: *Schedule a Consultation*
   - Subtitle: *Let's discuss your project, evaluate your technical needs, and map out an implementation strategy.*

2. **Contact & Inquiry Form Section:**
   - **Form Action:** Configured to work with Formspree, Web3Forms, or standard serverless endpoint.
   - **Fields Required:**
     - `Full Name` (text input, required)
     - `Email Address` (email input, required)
     - `Company / Organization` (text input, optional)
     - `Service of Interest` (dropdown menu with options: *Intranet Development*, *Data Analytics*, *AI Agent Development*, *System Automation*, *General Consulting*)
     - `Project Details / Message` (textarea, required)
     - `Preferred Timeframe` (dropdown: *Immediate*, *1–3 Months*, *3+ Months*)
   - **Submit Button:** Styled primary CTA (`Submit Inquiry`).
   - **Validation & Feedback:** JavaScript handler in `js/form-handler.js` to handle front-end validation, show loading state on submission, and display a clean "Thank You" confirmation message.

3. **Direct Contact Info (Sidebar or Below Form):**
   - Direct email address, general response time expectations (e.g., *Within 24–48 business hours*), and location info.

---

## 5. Technical Requirements & Cursor Execution Instructions

When implementing features or editing files, the agent must adhere to the following rules:

1. **Pure Static Stack:** Stick strictly to raw HTML5, standard CSS3, and modern ES6 JavaScript. Do not install Node dependencies, React components, or external build scripts that require compilation.
2. **CSS Best Practices:**
   - Use CSS custom properties (variables) defined at the `:root` level in `style.css` for colors, fonts, spacing, and transitions.
   - Keep layout fluid using CSS Flexbox and Grid.
   - Ensure `css/responsive.css` covers breakpoints at `1024px`, `768px`, and `480px`.
3. **Semantic HTML:** Use proper tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<label>`, `<input>`).
4. **GitHub Pages Compatibility:** Ensure all relative link paths (e.g., `href="about.html"`, `src="assets/images/..."`) use standard relative paths so they resolve properly on GitHub Pages repository subdomains.
5. **Accessibility (a11y):** Include `alt` attributes on all images, `aria-labels` on interactive non-text elements, and proper form label associations (`for=""` / `id=""`).

---

### Instructions for Cursor Agent Execution
> *"Cursor, please use the `CURSOR_GUIDE.md` specifications above to build out the full HTML, CSS, and JS files for Kode4Careers. Start by setting up the CSS design system with the dark tech palette and mobile-first responsive base, then generate `index.html`, `about.html`, and `schedule.html` with clean, semantic markup and polished interactive behaviors."*