# Portfolio Copy & UI Color Cheat Sheet

This document maps every text segment on the site to its exact source file, line number, and associated Tailwind color logic. 

**Core Content Rule:** The vast majority of the website's dynamic text is sourced from a single data file: `src/data/portfolioData.ts`. If you are looking to change paragraph copy, array items, or section titles, check this file first.

---

## 1. Global Data Source: `src/data/portfolioData.ts`

This file acts as the "CMS" for the portfolio. Modifying arrays or objects here directly alters the text displayed on the front end.

- **Personal Info (`portfolioData.personal`)**: Contains the `name`, `superHeader`, `title.line1`, `title.line2`, `bio`, `about`, `location`, `email`, `phone`, `linkedin`, `footerCTA`, and `copyright`.
- **Navigation (`portfolioData.navigation`)**: Array of `{ label, href }` pairs.
- **Hero Actions (`portfolioData.heroActions`)**: Array defining the CTA buttons in the hero section.
- **Projects (`portfolioData.projects`)**: Array containing `title`, `category`, `outcome`, `tags`, and `gallery` images for Project cards.
- **Services (`portfolioData.services`) & `coreServices`**: Defines all technical capabilities, rates, deliverables, and copy for the Services section.
- **Testimonials (`portfolioData.testimonials`)**: Objects mapped to "References" cards.
- **Word Cycler (`wordCycleData`)**: The flipping text options displayed in the Hero section.
- **Skills Ticker (`skillsTickerData`)**: The string array feeding the scrolling marquees.
- **Footer Credits (`portfolioData.footerCredits`)**: Array of lines for the copyright text.

---

## 2. Component Text & Color Mapping

Below is the breakdown of each section, detailing both data-driven text and hardcoded structural text, alongside their color utility classes.

### **Navigation Bar** (`src/components/layout/Navbar.tsx`)
- **Brand Name** (Line 28): Sourced from `portfolioData.personal.name`.
  - *Color*: `text-primary`
- **Nav Links** (Line 38): Sourced from `portfolioData.navigation`.
  - *Color*: `text-secondary` with `hover:text-accent-primary`

### **Hero Section** (`src/components/sections/Hero.tsx`)
- **Super Header** (Line 41): `portfolioData.personal.superHeader`
  - *Color*: `text-secondary`
- **Primary Titles** (Lines 47, 51): `portfolioData.personal.title` lines
  - *Color*: `text-primary`
- **Cycler Lead-in Text** (Line 62): Hardcoded - *"Bridging the gap between SolidWorks design and high-efficiency production through "*
  - *Color*: `text-primary`
- **Cycler Text** (Line 73): `wordCycleData` array
  - *Color*: `text-accent-primary`
- **Action Buttons** (Lines 91-102): `portfolioData.heroActions`
  - *Color*: Primary is `bg-accent-primary text-white`, Secondary is `text-primary border-secondary/20 hover:text-accent-primary`
- **Spec Terminal Hardcoded Keys** (Lines 112-116): 
  - *Keys*: `> SPEC:`, `> ROLE:`, `> TOL:`, `> STATUS:`, `> STACK:`
  - *Key Color*: `text-accent-primary`
- **Spec Terminal Hardcoded Values** (Lines 112-116):
  - *Values*: Include the hardcoded `"Mechanical Designer + Automation Engineer"`, `"±0.0005" | 15 YRS | JAX, FL"`, `"AVAILABLE FOR WORK"`, and `"SolidWorks · PDM · Python · AI Tooling"`
  - *Value Colors*: Generally `text-primary`, except `STATUS` explicitly uses `text-emerald-500`.

### **About / Spec Section** (`src/components/sections/About.tsx`)
- **Section Title** (Line 22): Hardcoded *"About"* (Passed to `SectionTitle` component).
- **Bio Text** (Line 34): `portfolioData.personal.about`
  - *Color*: `text-secondary`
- **Quote / Testimonial Clip** (Line 42): Sourced directly from `portfolioData.testimonials[2]`.
- **Spec Card Keys** (Lines 70-86): Hardcoded *"Experience"*, *"Machines"*, *"CAD"*, *"Automation"*, *"Location"*, *"Status"*.
  - *Color*: `text-secondary`
- **Spec Card Values** (Lines 71-91): Hardcoded *"15+ Years"*, *"7-Axis Mill-Turn"*, etc.
  - *Color*: `text-primary`, except `Status` which is `text-emerald-500`.
- **Decoration Tolerances** (Lines 63-64): Hardcoded *"⌀ 0.001" TIR"*, *"⊕ ±0.0005 [REF]"*.
  - *Color*: `text-accent-secondary`

### **Projects Section** (`src/components/sections/Projects.tsx`)
- **Card Data** (Line 42): Titles, categories, and tags pull from `portfolioData.projects`.
  - *Colors*: Title is `text-primary group-hover:text-accent-primary`, Category is `text-secondary`, Tags are `text-primary bg-secondary/10`.
- **Project Outcomes** (Line 94): Displayed inside a green banner.
  - *Colors*: Icon is `text-emerald-500`, Text is `text-primary`, Background is `bg-emerald-50`.
- **Media Strip Instructions** (Lines 102-116): Hardcoded review prompt texts (`"Project Media"`, `"Review drawings, CAD captures..."`) and the `"Review Media Strip"` button.
  - *Colors*: Prompts are `text-secondary` & `text-primary/80`. Button is `text-accent-primary bg-accent-primary/5`.
- **Media Frame Titles** (Lines 138, 179): Hardcoded `"Primary review frame"`, `"Supporting detail"`.
  - *Color*: `text-white/65` and `text-secondary`

### **Services Section** (`src/components/sections/Services.tsx`)
- **Core Services Array** (Lines 36-55): Passed from `coreServices`.
  - *Colors*: Titles are `text-primary`, descriptions are `text-secondary`, tags are `text-accent-primary`.
- **Capabilities Array** (Lines 70-108): Passed from `portfolioData.services`.
  - *Colors*: Title is `text-primary group-hover:text-accent-primary`, Subtitle is `text-accent-secondary`, Deliverables are `text-primary`.
- **Conversion Banner** (Lines 122-128): Entirely hardcoded.
  - *Title*: `"Hard problem? Rough drawing?"` (`text-white`)
  - *Desc*: `"Skip the back-and-forth..."` (`text-slate-300`)
  - *CTA*: `"Start the Conversation"` (`text-slate-950 bg-white`)

### **Engineering Reel Section** (`src/components/sections/EngineeringReel.tsx`)
- **Headers** (Lines 35-42): Hardcoded *"// ENGINEERING REVIEW REEL"*, *"See the work in motion."*
  - *Colors*: `text-secondary` and `text-primary` respectively.
- **Top/Bottom Data Strips** (Lines 53, 78): Hardcoded specs like `"ENG-REEL-001"`, `"REV A"`, `"PLAYING"`. 
  - *Colors*: Neutral text is `text-secondary`, accents are `text-accent-primary`.
- **Placeholder Text** (Lines 108-116): Hardcoded filler copy if video SRC disappears.

### **References Section** (`src/components/sections/Testimonials.tsx`)
- **Quotes Array** (Line 35): Passed from `portfolioData.testimonials`.
  - *Text Colors*: Quote is `text-primary`, Author is `text-primary`, Role is `text-secondary`.
  - *Score Badge Style*: Background `bg-emerald-50`, Text `text-emerald-700`, Pulse Indicator `bg-emerald-500`.

### **Footer / Contact Section** (`src/components/sections/Contact.tsx`)
- **Massive CTA Title** (Line 33): Sourced from `portfolioData.personal.footerCTA`.
- **Paragraph Lead-in** (Line 35): Hardcoded - *"Whether you need a SolidWorks macro to eliminate repetitive tasks..."*
  - *Color*: `text-white/70`
- **Main CTA Button** (Line 47): Hardcoded - *"Start a Project"*
  - *Color*: `bg-accent-primary text-white`
- **Contact Details Headers** (Lines 66, 74, 91): Hardcoded keys `"Location"`, `"Direct Contact"`, `"Social"`.
  - *Color*: `text-accent-secondary`
- **Contact Details Values** (Lines 69, 78, 84, 95): `portfolioData` fields.
  - *Color*: `text-white` defaults, `hover:text-accent-primary`
- **Copyright & Credits** (Lines 107-112): `portfolioData.personal.copyright` and `portfolioData.footerCredits`.
  - *Color*: `text-white/50`

---

## 3. General Color Architecture Reminder

If modifying the actual hex values driving these utilities, you must edit `src/index.css`. The application leverages core CSS variables hooked into a Tailwind `theme` extension.

- `text-primary`: Primary reading text (very dark in light mode, very light in dark mode).
- `text-secondary`: Muted/supporting reading text.
- `text-accent-primary`: The primary blue brand color.
- `text-accent-secondary`: A softer supporting blue/cyan.
- `text-surface`: Often used for background blocks and container boundaries.
