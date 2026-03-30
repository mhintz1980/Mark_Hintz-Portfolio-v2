/**
 * CAD Background Parallax System
 * Creates 3D scroll-based animations for CAD mechanical drawings
 * Note: SVG content is statically defined and controlled
 */

// ============================================
// CAD DRAWING SVG DATA (Static, controlled content)
// ============================================
const cadDrawings = {
  // Gear with teeth
  gear: (function() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 300 300');
    svg.classList.add('cad-svg');

    // Outer gear profile
    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '150');
    circle1.setAttribute('cy', '150');
    circle1.setAttribute('r', '120');
    circle1.setAttribute('fill', 'none');
    circle1.setAttribute('stroke', 'var(--cad-line-primary)');
    circle1.setAttribute('stroke-width', '1.5');
    svg.appendChild(circle1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '150');
    circle2.setAttribute('cy', '150');
    circle2.setAttribute('r', '100');
    circle2.setAttribute('fill', 'none');
    circle2.setAttribute('stroke', 'var(--cad-line-secondary)');
    circle2.setAttribute('stroke-width', '1');
    svg.appendChild(circle2);

    // Gear teeth
    for (let i = 0; i < 24; i++) {
      const angle = (i * 15) * Math.PI / 180;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', 150 + 100 * Math.cos(angle));
      line.setAttribute('y1', 150 + 100 * Math.sin(angle));
      line.setAttribute('x2', 150 + 120 * Math.cos(angle));
      line.setAttribute('y2', 150 + 120 * Math.sin(angle));
      line.setAttribute('stroke', 'var(--cad-line-primary)');
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);
    }

    // Center bore
    const bore = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    bore.setAttribute('cx', '150');
    bore.setAttribute('cy', '150');
    bore.setAttribute('r', '25');
    bore.setAttribute('fill', 'none');
    bore.setAttribute('stroke', 'var(--cad-line-primary)');
    bore.setAttribute('stroke-width', '1.5');
    svg.appendChild(bore);

    // Centerlines
    const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    hLine.setAttribute('x1', '20');
    hLine.setAttribute('y1', '150');
    hLine.setAttribute('x2', '280');
    hLine.setAttribute('y2', '150');
    hLine.setAttribute('stroke', 'var(--cad-centerline)');
    hLine.setAttribute('stroke-width', '0.5');
    hLine.setAttribute('stroke-dasharray', '12,3,3,3');
    svg.appendChild(hLine);

    const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    vLine.setAttribute('x1', '150');
    vLine.setAttribute('y1', '20');
    vLine.setAttribute('x2', '150');
    vLine.setAttribute('y2', '280');
    vLine.setAttribute('stroke', 'var(--cad-centerline)');
    vLine.setAttribute('stroke-width', '0.5');
    vLine.setAttribute('stroke-dasharray', '12,3,3,3');
    svg.appendChild(vLine);

    return svg;
  })(),

  // Bracket with mounting holes
  bracket: (function() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 250 200');
    svg.classList.add('cad-svg');

    // Main bracket outline
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M20,20 L20,180 L230,180 L230,140 L60,140 L60,20 Z');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'var(--cad-line-primary)');
    path.setAttribute('stroke-width', '1.5');
    svg.appendChild(path);

    // Hidden lines
    const hidden1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    hidden1.setAttribute('x1', '60');
    hidden1.setAttribute('y1', '60');
    hidden1.setAttribute('x2', '230');
    hidden1.setAttribute('y2', '60');
    hidden1.setAttribute('stroke', 'var(--cad-hidden)');
    hidden1.setAttribute('stroke-width', '0.75');
    hidden1.setAttribute('stroke-dasharray', '5,3');
    svg.appendChild(hidden1);

    // Mounting holes
    [{cx: 40, cy: 40}, {cx: 40, cy: 160}].forEach(pos => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pos.cx);
      circle.setAttribute('cy', pos.cy);
      circle.setAttribute('r', '8');
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', 'var(--cad-line-primary)');
      circle.setAttribute('stroke-width', '1');
      svg.appendChild(circle);
    });

    return svg;
  })(),

  // Shaft with keyway
  shaft: (function() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 80');
    svg.classList.add('cad-svg');

    // Centerline
    const centerline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    centerline.setAttribute('x1', '20');
    centerline.setAttribute('y1', '40');
    centerline.setAttribute('x2', '380');
    centerline.setAttribute('y2', '40');
    centerline.setAttribute('stroke', 'var(--cad-centerline)');
    centerline.setAttribute('stroke-width', '0.5');
    centerline.setAttribute('stroke-dasharray', '12,3,3,3');
    svg.appendChild(centerline);

    // Main shaft body
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '50');
    rect.setAttribute('y', '20');
    rect.setAttribute('width', '300');
    rect.setAttribute('height', '40');
    rect.setAttribute('fill', 'none');
    rect.setAttribute('stroke', 'var(--cad-line-primary)');
    rect.setAttribute('stroke-width', '1.5');
    svg.appendChild(rect);

    // Keyway
    const keyway = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    keyway.setAttribute('x', '150');
    keyway.setAttribute('y', '20');
    keyway.setAttribute('width', '60');
    keyway.setAttribute('height', '12');
    keyway.setAttribute('fill', 'none');
    keyway.setAttribute('stroke', 'var(--cad-line-primary)');
    keyway.setAttribute('stroke-width', '1');
    svg.appendChild(keyway);

    return svg;
  })(),

  // Housing cross-section
  housing: (function() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 350 250');
    svg.classList.add('cad-svg');

    // Housing outline
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M30,30 L320,30 L320,220 L30,220 Z M60,60 L290,60 L290,190 L60,190 Z');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'var(--cad-line-primary)');
    path.setAttribute('stroke-width', '1.5');
    svg.appendChild(path);

    // Bearing seats
    const bearing = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    bearing.setAttribute('cx', '175');
    bearing.setAttribute('cy', '125');
    bearing.setAttribute('r', '40');
    bearing.setAttribute('fill', 'none');
    bearing.setAttribute('stroke', 'var(--cad-line-primary)');
    bearing.setAttribute('stroke-width', '1');
    svg.appendChild(bearing);

    // Bolt holes
    [{cx: 50, cy: 50}, {cx: 300, cy: 50}, {cx: 50, cy: 200}, {cx: 300, cy: 200}].forEach(pos => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pos.cx);
      circle.setAttribute('cy', pos.cy);
      circle.setAttribute('r', '6');
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', 'var(--cad-line-primary)');
      circle.setAttribute('stroke-width', '1');
      svg.appendChild(circle);
    });

    // Centerlines
    const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    hLine.setAttribute('x1', '100');
    hLine.setAttribute('y1', '125');
    hLine.setAttribute('x2', '250');
    hLine.setAttribute('y2', '125');
    hLine.setAttribute('stroke', 'var(--cad-centerline)');
    hLine.setAttribute('stroke-width', '0.5');
    hLine.setAttribute('stroke-dasharray', '12,3,3,3');
    svg.appendChild(hLine);

    return svg;
  })(),

  // Tolerance zone indicator
  toleranceZone: (function() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 120 80');
    svg.classList.add('cad-svg');

    // Box
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '10');
    rect.setAttribute('y', '10');
    rect.setAttribute('width', '100');
    rect.setAttribute('height', '60');
    rect.setAttribute('fill', 'none');
    rect.setAttribute('stroke', 'var(--cad-line-primary)');
    rect.setAttribute('stroke-width', '1');
    svg.appendChild(rect);

    // Lines
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '10');
    line1.setAttribute('y1', '35');
    line1.setAttribute('x2', '110');
    line1.setAttribute('y2', '35');
    line1.setAttribute('stroke', 'var(--cad-line-secondary)');
    line1.setAttribute('stroke-width', '0.5');
    svg.appendChild(line1);

    return svg;
  })(),

  // Dimension detail
  dimensionDetail: (function() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 100');
    svg.classList.add('cad-svg');

    // Extension lines
    const ext1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    ext1.setAttribute('x1', '30');
    ext1.setAttribute('y1', '30');
    ext1.setAttribute('x2', '30');
    ext1.setAttribute('y2', '80');
    ext1.setAttribute('stroke', 'var(--cad-dimension)');
    ext1.setAttribute('stroke-width', '0.5');
    svg.appendChild(ext1);

    const ext2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    ext2.setAttribute('x1', '170');
    ext2.setAttribute('y1', '30');
    ext2.setAttribute('x2', '170');
    ext2.setAttribute('y2', '80');
    ext2.setAttribute('stroke', 'var(--cad-dimension)');
    ext2.setAttribute('stroke-width', '0.5');
    svg.appendChild(ext2);

    // Dimension line
    const dimLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    dimLine.setAttribute('x1', '30');
    dimLine.setAttribute('y1', '60');
    dimLine.setAttribute('x2', '170');
    dimLine.setAttribute('y2', '60');
    dimLine.setAttribute('stroke', 'var(--cad-dimension)');
    dimLine.setAttribute('stroke-width', '0.5');
    svg.appendChild(dimLine);

    return svg;
  })
};

// ============================================
// PARALLAX BACKGROUND CLASS
// ============================================
class CADParallaxBackground {
  constructor() {
    this.layers = [];
    this.scrollY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.currentScrollY = 0;
    this.currentMouseX = 0;
    this.currentMouseY = 0;
    this.rafId = null;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.createBackgroundStructure();
    this.createCADLayers();
    this.setupEventListeners();
    this.animate();
  }

  createBackgroundStructure() {
    // Create main container
    const bgContainer = document.createElement('div');
    bgContainer.className = 'cad-background';
    bgContainer.id = 'cad-background';

    // Create fade gradients
    ['top', 'bottom', 'left', 'right'].forEach(direction => {
      const fade = document.createElement('div');
      fade.className = 'cad-fade-' + direction;
      bgContainer.appendChild(fade);
    });

    // Insert at start of body
    document.body.insertBefore(bgContainer, document.body.firstChild);

    // Remove old background elements
    const oldGlows = document.querySelector('.bg-glows');
    const oldNoise = document.querySelector('.bg-noise');
    if (oldGlows) oldGlows.remove();
    if (oldNoise) oldNoise.remove();
  }

  createCADLayers() {
    const container = document.getElementById('cad-background');
    const layerConfigs = [
      { z: 1, drawings: ['gear', 'housing'], positions: [{x: -200, y: 100}, {x: 800, y: 400}] },
      { z: 2, drawings: ['bracket', 'shaft', 'toleranceZone'], positions: [{x: 600, y: -100}, {x: -300, y: 500}, {x: 900, y: 700}] },
      { z: 3, drawings: ['dimensionDetail'], positions: [{x: 200, y: 300}] },
      { z: 4, drawings: ['shaft', 'bracket'], positions: [{x: 400, y: 800}, {x: 100, y: -200}] }
    ];

    layerConfigs.forEach((config, index) => {
      const layer = document.createElement('div');
      layer.className = 'cad-layer cad-layer-' + config.z;
      layer.style.cssText = 'transform: translateZ(var(--depth)); --depth: ' + (-200 + (config.z * 50)) + 'px;';

      config.drawings.forEach((drawingType, drawIndex) => {
        const pos = config.positions[drawIndex] || {x: 0, y: 0};
        const drawing = document.createElement('div');
        drawing.className = 'cad-drawing cad-' + drawingType;

        // Clone the SVG node
        if (cadDrawings[drawingType]) {
          drawing.appendChild(cadDrawings[drawingType].cloneNode(true));
        }

        const rotation = (Math.random() * 20 - 10).toFixed(1);
        const scale = (0.8 + Math.random() * 0.4).toFixed(2);
        const opacity = (0.3 + Math.random() * 0.3).toFixed(2);

        drawing.style.cssText = 'position: absolute; left: ' + pos.x + 'px; top: ' + pos.y + 'px; transform: rotate(' + rotation + 'deg) scale(' + scale + '); opacity: ' + opacity + ';';
        layer.appendChild(drawing);
      });

      container.appendChild(layer);
      this.layers.push({
        element: layer,
        depth: -200 + (config.z * 50),
        scrollFactor: 0.1 + (index * 0.1)
      });
    });
  }

  setupEventListeners() {
    // Scroll handler
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
    }, { passive: true });

    // Mouse handler
    document.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      this.mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    }, { passive: true });

    // Reduced motion preference change
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.isReducedMotion = e.matches;
    });
  }

  animate() {
    if (this.isReducedMotion) {
      this.rafId = requestAnimationFrame(() => this.animate());
      return;
    }

    // Smooth interpolation
    this.currentScrollY += (this.scrollY - this.currentScrollY) * 0.08;
    this.currentMouseX += (this.mouseX - this.currentMouseX) * 0.05;
    this.currentMouseY += (this.mouseY - this.currentMouseY) * 0.05;

    // Update each layer
    this.layers.forEach((layer, index) => {
      const scrollOffset = this.currentScrollY * layer.scrollFactor;
      const mouseOffsetX = this.currentMouseX * 50 * (index + 1);
      const mouseOffsetY = this.currentMouseY * 50 * (index + 1);

      layer.element.style.transform = 'translateZ(' + layer.depth + 'px) translateY(' + (-scrollOffset) + 'px) translateX(' + mouseOffsetX + 'px) translateY(' + mouseOffsetY + 'px)';
    });

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}

// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================
class ScrollAnimator {
  constructor() {
    this.observers = [];
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    this.setupSectionAnimations();
    this.setupCardAnimations();
    this.setupTextAnimations();
  }

  setupSectionAnimations() {
    // Section titles - 3D entrance
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          titleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '-50px' });

    sectionTitles.forEach(title => {
      title.classList.add('section-title');
      titleObserver.observe(title);
    });
  }

  setupCardAnimations() {
    // Project cards - 3D stagger entrance
    const cards = document.querySelectorAll('.project-card, .service-card, .case-study-card');
    cards.forEach((card, index) => {
      card.classList.add('card-3d-entrance');
      card.style.transitionDelay = ((index % 4) * 0.1) + 's';
    });

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '-30px' });

    cards.forEach(card => cardObserver.observe(card));

    // Testimonials - slide entrance
    const testimonials = document.querySelectorAll('.testimonial-card');
    testimonials.forEach((card, index) => {
      card.classList.add('testimonial-slide');
      card.style.transitionDelay = (index * 0.15) + 's';
    });

    const testimonialObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          testimonialObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    testimonials.forEach(card => testimonialObserver.observe(card));
  }

  setupTextAnimations() {
    // Text elements - subtle 3D reveal
    const textElements = document.querySelectorAll('.about-text, .service-description, .contact-description');
    textElements.forEach(el => {
      el.classList.add('text-reveal-3d');
    });

    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.3 });

    textElements.forEach(el => textObserver.observe(el));
  }
}

// ============================================
// PARALLAX SECTION EFFECTS
// ============================================
class ParallaxSections {
  constructor() {
    this.sections = [];
    this.init();
  }

  init() {
    this.createParallaxData();
    this.setupScrollHandler();
  }

  createParallaxData() {
    // Add data attributes for parallax effects
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.setAttribute('data-parallax-speed', '0.3');
    }

    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
      aboutSection.setAttribute('data-parallax-speed', '0.15');
    }
  }

  setupScrollHandler() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  updateParallax() {
    const scrollY = window.scrollY;

    // Hero parallax
    const hero = document.querySelector('.hero-section');
    if (hero) {
      const heroOffset = scrollY * 0.2;
      hero.style.transform = 'translateY(' + heroOffset + 'px)';
    }

    // Section-specific parallax
    document.querySelectorAll('[data-parallax-speed]').forEach(section => {
      const speed = parseFloat(section.getAttribute('data-parallax-speed'));
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        const offset = (rect.top - window.innerHeight) * speed;
        section.style.setProperty('--parallax-offset', offset + 'px');
      }
    });
  }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize CAD background
  window.cadParallax = new CADParallaxBackground();

  // Initialize scroll animations
  window.scrollAnimator = new ScrollAnimator();

  // Initialize section parallax
  window.parallaxSections = new ParallaxSections();

  console.log('CAD Parallax Background initialized');
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CADParallaxBackground, ScrollAnimator, ParallaxSections };
}
