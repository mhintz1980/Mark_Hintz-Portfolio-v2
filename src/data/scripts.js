

// ============================================
// EDIT THIS FILE TO UPDATE YOUR PORTFOLIO
// ============================================

const portfolioData = {
  // PERSONAL INFO
  personal: {
    name: "Mark Hintz",
    superHeader: "// MECHANICAL SYSTEMS & AUTOMATION",
    title: {
      line1: "Engineering Precision.",
      line2: "Automated Logic."
    },
    bio: "I automate the work that shouldn't be manual.",
    about:
      "Mechanical designer and modern toolmaker with experience in diesel-powered industrial pump systems, sound-attenuated enclosures, firearms and related accessories, and the design/development of planetary reduction gearboxes that power industrial tooling. I work at the intersection of hardware and software: designing real-world equipment in SolidWorks, supporting machine shops, fabrication, and assembly—while building AI-powered tools that reduce friction in engineering, documentation, and troubleshooting. I'm especially interested in roles that value practical, field-ready design plus smarter internal tools and workflows.",
    location: "Jacksonville, FL",
    email: "markworks.dev@gmail.com",
    phone: "(904) 862-1945",
    linkedin: "https://linkedin.com/in/mark-hintz-builds",
    footerCTA: "Come on. Let's build something cool together.",
    copyright: `© ${new Date().getFullYear()} Mark Hintz. All rights reserved.`
  },

  // NAVIGATION
  navigation: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Contact", href: "#contact" }
  ],

  // HERO ACTIONS
  heroActions: [
    { label: "Let's Talk Work", href: "#contact", primary: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/mark-hintz-builds", target: "_blank" }
  ],

  // PROJECTS
  projects: [
    {
      title: "PumpTracker (Production Scheduling + Capacity Planning)",
      category: "Internal tool • React/TypeScript • Firebase/Supabase",
      image: "assets/images/pumptracker-hero.webp",
      featured: true,
      outcome: "Eliminated manual scheduling — 30+ hrs/week recovered",
      tags: ["React", "TypeScript", "Supabase", "Firebase", "AI Workflows"],
      gallery: [
        "assets/images/pumptracker-01.webp",
        "assets/images/pumptracker-02.webp",
        "assets/images/pumptracker-03.webp",
        "assets/images/pumptracker-04.webp"
      ]
    },
    {
      title: "Pump Package Design System (Skids, Enclosures, Mounts, Lifting)",
      category: "Mechanical design • SolidWorks • DFM/DFA",
      image: "assets/images/pump-package-hero.webp",
      outcome: "Zero tolerance failures across 47-component assembly",
      tags: ["SolidWorks", "DFM/DFA", "GD&T", "Sheet Metal", "Weldments"],
      gallery: [
        "assets/images/pump-package-01.webp",
        "assets/images/pump-package-02.webp",
        "assets/images/pump-package-03.webp",
        "assets/images/pump-package-04.webp"
      ]
    },
    {
      title: "Industrial Torque Wrench",
      category: "Mechanical design • Planetary gearboxes • Precision assemblies",
      image: "assets/images/torque-wrench-hero.webp",
      outcome: "DFM review cut manufacturing cost by 22%",
      tags: ["SolidWorks", "Planetary Gearboxes", "Precision Machining", "DFM"],
      gallery: [
        "assets/images/torque-wrench-01.webp",
        "assets/images/torque-wrench-02.webp",
        "assets/images/torque-wrench-03.webp",
        "assets/images/torque-wrench-04.webp",
        "assets/images/torque-wrench-05.webp",
        "assets/images/torque-wrench-06.webp"
      ]
    },
    {
      title: "Renderings & Visualizations",
      category: "PhotoView 360 • SolidWorks Visualize • Product renders",
      image: "assets/images/renderings-hero.webp",
      outcome: "Photorealistic renders — eliminated physical mockup cost",
      tags: ["PhotoView 360", "SolidWorks Visualize", "Keyshot", "HDRI"],
      gallery: [
        "assets/images/rendering-01.webp",
        "assets/images/rendering-02.webp",
        "assets/images/rendering-03.webp",
        "assets/images/rendering-04.webp",
        "assets/images/rendering-05.webp",
        "assets/images/rendering-06.webp",
        "assets/images/rendering-07.webp",
        "assets/images/rendering-08.webp",
        "assets/images/rendering-09.webp",
        "assets/images/rendering-10.webp"
      ]
    }
  ],

  // SERVICES
  services: [
    {
      title: "CAD Automation",
      subtitle: "SolidWorks · PDM · Design Tables",
      description: "Stop doing manually what a macro can do in seconds. I build SolidWorks automation that eliminates repetitive tasks, enforces standards, and lets your engineers focus on engineering.",
      deliverables: [
        "SolidWorks macros & API automation",
        "PDM Vault workflow optimization",
        "Design Table systems & configurators",
        "Drawing package automation"
      ],
      rate: "Starting at $85/hr · Fixed-price projects available",
      cta: { label: "Get a quote →", href: "#contact" }
    },
    {
      title: "AI Integration",
      subtitle: "Python · Claude SDK · Custom Tooling",
      description: "The rare engineer who can build the AI tool AND understand the mechanical context it operates in. Custom agents, workflow automation, and intelligent tooling for engineering environments.",
      deliverables: [
        "Custom AI agents for engineering workflows",
        "Natural language interfaces for CAD/PDM systems",
        "Automated reporting & documentation",
        "Intelligent design review tooling"
      ],
      rate: "Starting at $100/hr · Premium niche",
      cta: { label: "Discuss your project →", href: "#contact" }
    },
    {
      title: "Design Review & DFM",
      subtitle: "SolidWorks · GD&T · Manufacturing Feedback",
      description: "15+ years on the shop floor means I catch what CAD-only designers miss. DFM/DFA analysis, drawing package review, tolerance stack-up — delivered as actionable redlines.",
      deliverables: [
        "DFM/DFA analysis & redlines",
        "GD&T review & correction",
        "Tolerance stack-up analysis",
        "Drawing package audit"
      ],
      rate: "Starting at $75/hr · Per-drawing packages available",
      cta: { label: "Request a review →", href: "#contact" }
    }
  ],

  // CASE STUDIES
  caseStudies: [
    {
      title: "Reliability Engineering: Extending Asset Lifecycle from 3 to 5 Years",
      summary: { 
        problem: "Grinding paste failure mode", 
        solution: "Tribopolymer + IoT monitoring", 
        result: "+2 years asset life" 
      },
      image: "assets/images/case-study-asset-lifecycle.webp"
    },
    {
      title: "Designing the Future of Practice: A Capabilities Deck",
      summary: { 
        problem: "Generic design perception", 
        solution: "Custom engineering-first framework", 
        result: "3 new high-value leads" 
      },
      image: "assets/images/case-study-capabilities-deck.webp"
    },
    {
      title: "Strategic Engineering Hire for Power Tee's Jacksonville Expansion",
      summary: { 
        problem: "Lack of technical automation", 
        solution: "AI-driven production stack", 
        result: "Immediate operational scale" 
      },
      image: "assets/images/case-study-power-tee.webp"
    }
  ],

  // TESTIMONIALS
  testimonials: [
    {
      text:
        "Mark is the only designer I know who models a gearbox, then actually builds it and tests it on the torque guns himself. And while he doesn't program the twin turret mill-turn centers, he designs parts that account for the toolpaths and setups we need. He understands the machining strategy before he even draws the first line.",
      author: "Kevin B.",
      role: "Head CNC Programmer, STS",
      score: "98/100"
    },
    {
      text:
        "Mark understands that a tight tolerance on a print costs money. Because he's inspected these parts himself, he applies GD&T that strictly controls the critical geometry but leaves the rest open for speed. He balances precision with production.",
      author: "Lisa Fullem",
      role: "Quality Assurance Lead, STS",
      score: "100/100"
    },
    {
      text:
        "It's rare to find a designer who understands the constraints of a 5-axis mill and the realities of the assembly line. Mark designs parts that are easy to machine and foolproof to assemble. He's run the machines, built the gearboxes, and tested the product. That experience is visible in every drawing he releases.",
      author: "Darrin Phipps",
      role: "President, Black Creek Precision",
      score: "100/100"
    }
  ],

  // FOOTER CREDITS
  footerCredits: [
    "Designed + built by Mark Hintz",
    "SolidWorks brain, JavaScript hands"
  ]
};

// ============================================
// SKILLS TICKER DATA
// ============================================
const skillsTickerData = [
    "SolidWorks",
    "GD&T",
    "DFM/DFA",
    "Photo-Realistic Renderings",
    "Sheet Metal Design",
    "Weldments",
    "React/TypeScript",
    "AI Workflows",
    "Production Scheduling",
    "CNC Programming Support",
    "ASME Prints",
    "Planetary Gearboxes"
];

// ============================================
// WORD CYCLE DATA (Hero Subtitle Enhancement)
// ============================================
const wordCycleData = [
    "AI-driven custom tooling",
    "Production-ready designs",
    "Engineering precision"
];

// ============================================
// LUCID PORTFOLIO TEMPLATE - SCRIPT
// ============================================

// ============================================
// SCRAMBLE TEXT EFFECT
// ============================================
function scrambleText(el, finalText, duration = 1200) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%';
  const frames = Math.floor(duration / 16);
  let frame = 0;

  // Set to monospace during scramble to prevent layout jumps
  const originalFont = el.style.fontFamily;
  el.style.fontFamily = 'var(--font-mono)';
  el.style.display = 'inline-block';
  el.style.minWidth = '1ch'; // Prevent collapse

  function update() {
    const progress = frame / frames;
    const lockedChars = Math.floor(progress * finalText.length);
    let display = '';
    for (let i = 0; i < finalText.length; i++) {
      if (finalText[i] === ' ') { display += ' '; continue; }
      if (i < lockedChars) {
        display += finalText[i];
      } else {
        display += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.textContent = display;
    frame++;
    if (frame <= frames) {
      requestAnimationFrame(update);
    } else {
      el.textContent = finalText;
      el.style.fontFamily = originalFont; // Restore original font
    }
  }
  requestAnimationFrame(update);
}

// ============================================
// TYPEWRITER SPEC BLOCK
// ============================================
function typewriterBlock(containerEl) {
  const lines = containerEl.querySelectorAll('.spec-line');
  // Hide all lines initially
  lines.forEach(line => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-8px)';
    line.style.transition = 'none';
  });

  let delay = 0;
  const lineDelay = 180;
  lines.forEach((line, index) => {
    setTimeout(() => {
      line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      line.style.opacity = '1';
      line.style.transform = 'translateX(0)';
    }, delay);
    delay += lineDelay;
  });
}

// ============================================
// LENIS SMOOTH SCROLL (PREMIUM)
// ============================================
function initializeLenis() {
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    lenis.scrollTo(target);
                }
            });
        });
        
        console.log("Lenis initialized");
    } else {
        console.warn("Lenis not loaded, falling back to CSS smooth scroll");
    }
}

// ============================================
// 1. MAGNETIC TEXT REVEAL
// Character-by-character spring entrance
// ============================================
function initMagneticText() {
    const targets = document.querySelectorAll('.magnetic-text-target');
    
    targets.forEach((target, targetIndex) => {
        const text = target.textContent;
        if (!text) return;
        
        target.textContent = '';
        target.classList.add('magnetic-text');
        
        // Split into words, then characters
        const words = text.split(' ');
        
        let charIndex = 0;
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            
            [...word].forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.className = 'char';
                charSpan.textContent = char;
                // Calculate delay: base delay + target offset + char offset
                const delay = 0.3 + (targetIndex * 0.15) + (charIndex * 0.035);
                charSpan.style.animationDelay = `${delay}s`;
                wordSpan.appendChild(charSpan);
                charIndex++;
            });
            
            target.appendChild(wordSpan);
        });
    });
    
    console.log("Magnetic text initialized");
}

// ============================================
// 2. PARALLAX FLOATING BACKGROUND
// Mouse-reactive depth movement
// ============================================
function initParallaxFloating() {
    const layers = document.querySelectorAll('.parallax-layer');
    if (layers.length === 0) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        mouseX = (e.clientX - centerX) / centerX;
        mouseY = (e.clientY - centerY) / centerY;
    });
    
    function animate() {
        // Smooth interpolation
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        layers.forEach(layer => {
            const speed = parseFloat(getComputedStyle(layer).getPropertyValue('--parallax-speed')) || 0.03;
            const offsetX = currentX * 100 * speed;
            const offsetY = currentY * 100 * speed;
            
            layer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    console.log("Parallax floating initialized");
}

// ============================================
// 3. ROLLING TEXT HOVER EFFECT
// Slot-machine style character roll
// ============================================
function initRollingText() {
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        const text = link.textContent;
        link.textContent = '';
        link.classList.add('rolling-text');
        
        [...text].forEach((char, i) => {
            const wrapper = document.createElement('span');
            wrapper.className = 'char-wrapper';
            wrapper.setAttribute('data-char', char === ' ' ? '\u00A0' : char);
            wrapper.textContent = char === ' ' ? '\u00A0' : char;
            wrapper.style.transitionDelay = `${i * 0.02}s`;
            link.appendChild(wrapper);
        });
    });
    
    console.log("Rolling text hover initialized");
}

// ============================================
// 4. STAGGERED WORD CYCLE
// Auto-cycling phrases with stagger effect
// ============================================
function initTextCycle() {
    const subtitle = document.getElementById('hero-subtitle');
    if (!subtitle) return;
    
    const originalText = subtitle.textContent;
    const staticPart = "Bridging the gap between SolidWorks design and high-efficiency production through ";
    
    // Create container
    subtitle.innerHTML = '';
    const staticSpan = document.createElement('span');
    staticSpan.textContent = staticPart;
    subtitle.appendChild(staticSpan);
    
    const cycleContainer = document.createElement('span');
    cycleContainer.className = 'text-cycle-container';
    subtitle.appendChild(cycleContainer);
    
    // Create word elements (includes period at the end of each phrase)
    wordCycleData.forEach((phrase, index) => {
        const wordEl = document.createElement('span');
        wordEl.className = 'text-cycle-word';
        wordEl.setAttribute('data-index', index);
        
        // Add phrase with period at the end
        const phraseWithPeriod = phrase + '.';
        [...phraseWithPeriod].forEach((char, charIndex) => {
            const charSpan = document.createElement('span');
            charSpan.className = 'cycle-char';
            charSpan.textContent = char === ' ' ? '\u00A0' : char;
            charSpan.style.animationDelay = `${charIndex * 0.02}s`;
            wordEl.appendChild(charSpan);
        });
        
        cycleContainer.appendChild(wordEl);
    });
    
    let currentIndex = 0;
    const words = cycleContainer.querySelectorAll('.text-cycle-word');
    
    function cycleWord() {
        // Remove all classes
        words.forEach(w => {
            w.classList.remove('active', 'exit');
        });
        
        // Set current as active
        words[currentIndex].classList.add('active');
        
        // Schedule exit and next
        setTimeout(() => {
            words[currentIndex].classList.add('exit');
            words[currentIndex].classList.remove('active');
            
            currentIndex = (currentIndex + 1) % words.length;
            
            setTimeout(() => {
                words[currentIndex].classList.add('active');
            }, 400);
        }, 2500);
    }
    
    // Initial activation
    words[0].classList.add('active');
    
    // Start cycling after initial delay
    setTimeout(() => {
        setInterval(cycleWord, 3500);
    }, 2500);
    
    console.log("Text cycle initialized");
}

// ============================================
// 5. INFINITE MARQUEE TICKER
// Scrolling skills/keywords strip
// ============================================
function initSkillsTicker() {
    const track = document.getElementById('ticker-track');
    if (!track) return;
    
    // Create ticker content (duplicate for seamless loop)
    const createTickerContent = () => {
        return skillsTickerData.map(skill => 
            `<span class="ticker-item">${skill}</span>`
        ).join('');
    };
    
    // We need at least 2 copies for seamless loop
    track.innerHTML = createTickerContent() + createTickerContent();
    
    console.log("Skills ticker initialized");
}

// Wait for DOM and data to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    setupInteractions();
    setupAnimations();
    initializeLenis();
    setupTiltEffect();
    
    // Enhanced animations
    initMagneticText();
    initParallaxFloating();
    initRollingText();
    initTextCycle();
    initSkillsTicker();
});

// ============================================
// INITIALIZE PORTFOLIO WITH DATA
// ============================================
function initializePortfolio() {
    // Page title
    document.getElementById('page-title').textContent = portfolioData.personal.name;
    
    // Navigation
    const navLogo = document.getElementById('nav-logo');
    if (navLogo) navLogo.textContent = portfolioData.personal.name;

    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
        navLinks.innerHTML = '';
        portfolioData.navigation.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.className = 'nav-link';
            a.textContent = link.label;
            navLinks.appendChild(a);
        });
    }

    // Hero section - Super header and two-line title
    const superHeader = document.getElementById('hero-super-header');
    const line1 = document.getElementById('title-line-1');
    const line2 = document.getElementById('title-line-2');

    // Super header
    if (superHeader && portfolioData.personal.superHeader) {
        superHeader.textContent = portfolioData.personal.superHeader;
    }

    // Check if title is an object (new format) or string (old format)
    if (line1 && line2 && typeof portfolioData.personal.title === 'object' && portfolioData.personal.title.line1) {
        const finalLine1 = portfolioData.personal.title.line1;
        const finalLine2 = portfolioData.personal.title.line2;

        // Trigger super header animation
        setTimeout(() => {
            superHeader.classList.add('animate');
        }, 100);

        // Scramble effect on title lines (300ms delay, stagger line2)
        setTimeout(() => {
            scrambleText(line1, finalLine1, 1200);
        }, 300);
        setTimeout(() => {
            scrambleText(line2, finalLine2, 1200);
        }, 500);

        // Ensure magnetic-text class doesn't conflict (clear it)
        line1.classList.remove('magnetic-text-target', 'magnetic-text');
        line2.classList.remove('magnetic-text-target', 'magnetic-text');
    } else if (line1) {
        // Fallback for old string format
        const fallback1 = portfolioData.personal.title || 'Title Line 1';
        setTimeout(() => { scrambleText(line1, fallback1, 1200); }, 300);
        if (line2) setTimeout(() => { scrambleText(line2, 'Title Line 2', 1200); }, 500);
        line1.classList.remove('magnetic-text-target', 'magnetic-text');
    }

    const heroSubtitle = document.getElementById('hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = portfolioData.personal.bio;
        heroSubtitle.style.opacity = '1'; // Ensure visible
    }

    const heroActions = document.getElementById('hero-actions');
    if (heroActions) {
        heroActions.innerHTML = '';
        portfolioData.heroActions.forEach((action, idx) => {
            const a = document.createElement('a');
            a.href = action.href;
            a.className = action.primary ? 'hero-link hero-cta-primary' : 'hero-link';
            a.textContent = action.label;
            if (action.target) a.target = action.target;
            heroActions.appendChild(a);
        });
    }

    // Inject spec block after hero-actions
    if (heroActions) {
        // Remove existing if any
        const existingSpec = document.querySelector('.hero-spec-block');
        if (existingSpec) existingSpec.remove();

        const specBlock = document.createElement('div');
        specBlock.className = 'hero-spec-block';
        specBlock.innerHTML = `
          <div class="spec-line"><span class="spec-key">&gt; SPEC:</span> <span class="spec-val">Mark Hintz</span></div>
          <div class="spec-line"><span class="spec-key">&gt; ROLE:</span> <span class="spec-val">Mechanical Designer + Automation Engineer</span></div>
          <div class="spec-line"><span class="spec-key">&gt; TOL:</span> <span class="spec-val">&#177;0.0005&quot; | 15 YRS | JAX, FL</span></div>
          <div class="spec-line"><span class="spec-key">&gt; STATUS:</span> <span class="spec-val spec-status available">AVAILABLE FOR WORK</span></div>
          <div class="spec-line"><span class="spec-key">&gt; STACK:</span> <span class="spec-val">SolidWorks &middot; PDM &middot; Python &middot; AI Tooling</span></div>
        `;
        heroActions.insertAdjacentElement('afterend', specBlock);

        // Trigger typewriter on spec block after a short delay
        setTimeout(() => {
            typewriterBlock(specBlock);
        }, 800);
    }
    
    // About section
    const aboutText = document.getElementById('about-text');
    if (aboutText && portfolioData.personal.about) {
        aboutText.textContent = portfolioData.personal.about;
    }

    // About section scroll-reveal setup (will be observed in setupAnimations)
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateY(24px)';
        aboutContent.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    }
    
    // Projects
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        projectsGrid.innerHTML = '';
        portfolioData.projects.forEach((project, index) => {
            const card = document.createElement('div');
            const isFeatured = project.featured === true;

            if (isFeatured) {
                card.className = 'project-card featured tolerance-zone';
            } else {
                card.className = 'project-card';
            }

            // Build tech tags HTML
            const tagsHtml = project.tags && project.tags.length > 0
                ? `<div class="project-tags">${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>`
                : '';

            // Build outcome HTML
            const outcomeHtml = project.outcome
                ? `<div class="project-outcome"><span class="outcome-icon">→</span><span class="outcome-text">${project.outcome}</span></div>`
                : '';

            // Toolpath SVG overlay (only on featured)
            const toolpathHtml = isFeatured ? `
                <div class="toolpath-overlay">
                  <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" class="toolpath-svg">
                    <path class="toolpath-line" d="M20,20 L380,20 L380,60 L20,60 L20,100 L380,100 L380,140 L20,140 L20,180 L380,180 L380,220 L20,220 L20,260 L380,260"
                          fill="none" stroke="rgba(62,201,201,0.4)" stroke-width="1.5"
                          stroke-dasharray="2000" stroke-dashoffset="2000"/>
                  </svg>
                </div>` : '';

            // Tolerance callout HTML (only on featured) — matches existing Sprint 3 CSS
            const tolCalloutHtml = isFeatured ? `
                <div class="tol-callout tol-callout-tr">
                  <div class="tol-line tol-line-h"></div>
                  <div class="tol-box">
                    <span>FEATURES: 16</span>
                    <span>SPRINTS: 8</span>
                  </div>
                </div>
                <div class="tol-callout tol-callout-bl">
                  <div class="tol-line tol-line-v"></div>
                  <div class="tol-box">
                    <span>STACK: FULL</span>
                    <span>STATUS: LIVE</span>
                  </div>
                </div>` : '';

            card.innerHTML = `
                <div class="project-image-wrapper">
                    <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
                    ${toolpathHtml}
                </div>
                <div class="project-content">
                    <div class="project-content-top">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-category">${project.category}</p>
                        ${tagsHtml}
                    </div>
                    <div class="project-content-bottom">
                        ${outcomeHtml}
                    </div>
                </div>
                ${tolCalloutHtml}
            `;

            if (project.gallery && project.gallery.length > 0) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => openLightbox(project.gallery, project.title));
            } else if (project.link && project.link !== '#') {
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => window.open(project.link, '_blank'));
            }
            projectsGrid.appendChild(card);
        });

        // Staggered scroll-reveal on project cards
        document.querySelectorAll('.project-card').forEach((card, i) => {
            card.style.transitionDelay = `${i * 100}ms`;
            card.classList.add('reveal-ready');
        });
    }
    
    // Services — new card layout (Sprint 5)
    const servicesContent = document.getElementById('services-content');
    if (servicesContent) {
        servicesContent.innerHTML = '';
        portfolioData.services.forEach((service, i) => {
            const card = document.createElement('div');
            card.className = 'service-card reveal-ready';
            card.style.transitionDelay = `${i * 100}ms`;

            const deliverablesHTML = service.deliverables.map(d =>
                `<li>${d}</li>`
            ).join('');

            card.innerHTML = `
                <div>
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-subtitle">${service.subtitle}</p>
                </div>
                <p class="service-description">${service.description}</p>
                <ul class="service-deliverables">${deliverablesHTML}</ul>
                <div class="service-rate">${service.rate}</div>
                <a class="service-cta" href="${service.cta.href}">${service.cta.label}</a>
            `;
            servicesContent.appendChild(card);
        });
    }

    // Inject mid-page conversion banner after services section
    const servicesSection = document.getElementById('services');
    if (servicesSection && servicesSection.parentNode) {
        // Remove existing if any
        const existingBanner = document.querySelector('.conversion-banner');
        if (existingBanner) existingBanner.remove();

        const banner = document.createElement('div');
        banner.className = 'conversion-banner';
        banner.innerHTML = `
            <div class="conversion-inner">
                <div class="conversion-text">
                    <p class="conversion-eyebrow">CURRENTLY ACCEPTING PROJECTS</p>
                    <h3 class="conversion-heading">Got a CAD mess? Let's fix it.</h3>
                    <p class="conversion-sub">SolidWorks automation · AI tooling · DFM review · Available now.</p>
                </div>
                <a href="#contact" class="conversion-cta">Start a conversation →</a>
            </div>
        `;
        servicesSection.parentNode.insertBefore(banner, servicesSection.nextSibling);
    }


    
    // Case Studies
    const caseStudiesGrid = document.getElementById('case-studies-grid');
    if (caseStudiesGrid) {
        caseStudiesGrid.innerHTML = '';
        portfolioData.caseStudies.forEach((study, i) => {
            const card = document.createElement('div');
            card.className = 'case-study-card reveal-ready';
            card.style.transitionDelay = `${i * 120}ms`;
            card.innerHTML = `
                <div class="case-study-image-container">
                    <img src="${study.image}" alt="${study.title}" class="case-study-image" loading="lazy" onerror="this.style.display='none'">
                    <div class="blueprint-overlay"></div>
                </div>
                <div class="case-study-info">
                    <h3 class="case-study-title">${study.title}</h3>
                    <div class="case-study-summary">
                        <div class="summary-line"><span class="label">PRB:</span> <span>${study.summary.problem}</span></div>
                        <div class="summary-line"><span class="label">SOL:</span> <span>${study.summary.solution}</span></div>
                        <div class="summary-line"><span class="label">RES:</span> <span>${study.summary.result}</span></div>
                    </div>
                    <span class="case-study-cta">View Report →</span>
                </div>
            `;
            caseStudiesGrid.appendChild(card);
        });
    }
    
    // Testimonials
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (testimonialsGrid) {
        testimonialsGrid.innerHTML = '';
        portfolioData.testimonials.forEach((testimonial, i) => {
            const card = document.createElement('div');
            card.className = 'testimonial-card reveal-ready';
            card.style.transitionDelay = `${i * 150}ms`;
            card.innerHTML = `
                <div class="quality-score">[ QUALITY SCORE: ${testimonial.score} ]</div>
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="testimonial-author">
                    <div class="testimonial-avatar"></div>
                    <div>
                        <div class="testimonial-name">${testimonial.author}</div>
                        <div class="testimonial-role">${testimonial.role}</div>
                    </div>
                </div>
            `;
            testimonialsGrid.appendChild(card);
        });
    }
    
    // Sprint 8 — contact section is already built in HTML.
    // Just keep email/phone links correct from portfolioData.
    const copyEmail = document.getElementById('copy-email');
    if (copyEmail) {
        copyEmail.href = `mailto:${portfolioData.personal.email}`;
        copyEmail.textContent = portfolioData.personal.email;
    }
    const contactPhone = document.getElementById('contact-phone');
    if (contactPhone && portfolioData.personal.phone) {
        const phoneRaw = portfolioData.personal.phone.replace(/[^\d+]/g, '');
        contactPhone.href = `tel:+1${phoneRaw}`;
        contactPhone.textContent = portfolioData.personal.phone;
    }

    // Wire the contact form (mailto submit)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const projectType = (contactForm.querySelector('#project-type')?.value || '').trim();
            const summary    = (contactForm.querySelector('#project-summary')?.value || '').trim();
            const from       = (contactForm.querySelector('#contact-method')?.value || '').trim();
            const subject    = encodeURIComponent(`Technical Inquiry — ${projectType || 'Project'}`);
            const body       = encodeURIComponent(
                `Hi Mark,\n\nType: ${projectType}\n\n${summary}\n\nBest way to reach me: ${from}\n`
            );
            window.location.href = `mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`;
        });
    }

    const footerCopyright = document.getElementById('footer-copyright');
    if (footerCopyright) footerCopyright.textContent = portfolioData.personal.copyright;
    
    const footerCredits = document.getElementById('footer-credits');
    if (footerCredits) {
        footerCredits.innerHTML = '';
        portfolioData.footerCredits.forEach(credit => {
            const span = document.createElement('span');
            span.textContent = credit;
            footerCredits.appendChild(span);
        });
    }
}

// ============================================
// SETUP INTERACTIONS
// ============================================
function setupInteractions() {
    // Copy Email to Clipboard — click email link to copy, don't follow href
    const emailLink = document.getElementById('copy-email');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = portfolioData.personal.email;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast('Email copied to clipboard!');
                }).catch(() => {
                    window.location.href = `mailto:${email}`;
                });
            } else {
                window.location.href = `mailto:${email}`;
            }
        });
    }

    // Smooth scroll for all internal #hash links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// Light toast notification (no library needed)
function showToast(msg) {
    const existing = document.querySelector('.portfolio-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'portfolio-toast';
    toast.textContent = msg;
    toast.style.cssText = `
        position:fixed; bottom:90px; left:50%; transform:translateX(-50%);
        background:var(--accent-primary); color:#000;
        font-family:var(--font-mono); font-size:0.75rem; letter-spacing:0.05em;
        padding:0.6rem 1.2rem; border-radius:2px; z-index:9999;
        animation:toastIn 0.3s ease forwards;
        pointer-events:none;
    `;
    const style = document.createElement('style');
    style.textContent = `@keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(8px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }`;
    document.head.appendChild(style);
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

// ============================================
// SETUP ANIMATIONS
// ============================================
function setupAnimations() {
    // Observer for MASK REVEALS
    const maskObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const maskObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                maskObserver.unobserve(entry.target); // Run once
            }
        });
    }, maskObserverOptions);
    
    document.querySelectorAll('.reveal-mask').forEach(mask => {
        maskObserver.observe(mask);
    });

    // Observer for Standard Fades (fallback/secondary elements)
    const fadeObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, fadeObserverOptions);
    
    // Staggered reveal observer for service cards (Sprint 5)
    const serviceRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                serviceRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.service-card.reveal-ready').forEach(card => {
        serviceRevealObserver.observe(card);
    });

    // Sticky CTA visibility (Sprint 5)
    const stickyCta = document.querySelector('.sticky-cta');
    if (stickyCta) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        }, { passive: true });

        stickyCta.addEventListener('click', () => {
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Animate content wrappers that aren't masked (e.g., subtitles, buttons)
    document.querySelectorAll('.hero-subtitle, .hero-actions, .about-text, .case-study-card, .testimonial-card').forEach((el, index) => {
        // Only if not already handled by another animation class
        if (!el.classList.contains('animate')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            fadeObserver.observe(el);
        }
    });

    // Staggered reveal observer for project cards
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.project-card.reveal-ready').forEach(card => {
        revealObserver.observe(card);
    });

    // About content scroll-reveal observer
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        const aboutRevealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    aboutRevealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        aboutRevealObserver.observe(aboutContent);
    }

    // Tolerance callout observer
    const tolObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('tol-visible');
                tolObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.tolerance-zone').forEach(el => tolObserver.observe(el));
}

// ============================================
// LIGHTBOX FUNCTIONALITY
// ============================================
let currentGallery = [];
let currentIndex = 0;

function openLightbox(gallery, title) {
    currentGallery = gallery;
    currentIndex = 0;
    
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    updateLightboxImage();
    
    // Set up event listeners
    document.getElementById('lightbox-close').onclick = closeLightbox;
    document.getElementById('lightbox-prev').onclick = prevImage;
    document.getElementById('lightbox-next').onclick = nextImage;
    document.addEventListener('keydown', handleLightboxKeyboard);
    
    // Close on background click
    lightbox.onclick = (e) => {
        if (e.target === lightbox) closeLightbox();
    };
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleLightboxKeyboard);
}

function updateLightboxImage() {
    const img = document.getElementById('lightbox-image');
    const counter = document.getElementById('lightbox-counter');
    
    img.src = currentGallery[currentIndex];
    img.setAttribute('loading', 'lazy');
    counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    
    // Show/hide nav buttons based on gallery length
    document.getElementById('lightbox-prev').style.display = currentGallery.length > 1 ? 'block' : 'none';
    document.getElementById('lightbox-next').style.display = currentGallery.length > 1 ? 'block' : 'none';
}

function prevImage() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxImage();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateLightboxImage();
}

function handleLightboxKeyboard(e) {
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
    }
}

// ============================================
// 3D TILT EFFECT
// ============================================
function setupTiltEffect() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Fast transition for responsive following
            card.style.transition = 'transform 0.1s linear, background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Max rotation degrees
            const maxRotateX = 8; // Reduced slightly for subtlety
            const maxRotateY = 8;
            
            // Calculate rotation (inverted for feel)
            const rotateX = ((y - centerY) / centerY) * -maxRotateX;
            const rotateY = ((x - centerX) / centerX) * maxRotateY;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Slow, smooth reset
            card.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}
