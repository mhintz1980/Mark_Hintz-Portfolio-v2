// ============================================
// GD&T SCROLL ANIMATIONS
// ============================================

class GDTAnimations {
  constructor() {
    this.container = document.querySelector('.gdt-background');
    this.symbols = [
      '⌀', '⏥', '⏤', '◎', '△', '▷', '//', '⊥', '⟂', '○', '□', '◇',
      '⌀', '⏥', '⏤', '◎', '△', '▷', '//', '⊥', '⟂', '○', '□', '◇'
    ];
    this.lines = [];
    this.elements = [];
    this.scrollY = 0;
    
    this.init();
    this.attachScrollListener();
  }

  init() {
    // Create SVG container
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'gdt-svg');
    svg.setAttribute('viewBox', '0 0 1400 5000');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    
    // Create dimension lines and technical elements
    this.createDimensionLines(svg);
    this.createTolerance Callouts(svg);
    this.createCenterlines(svg);
    this.createExtensionLines(svg);
    
    this.container.appendChild(svg);
    
    // Create floating GD&T symbols
    this.createFloatingSymbols();
  }

  createDimensionLines(svg) {
    // Horizontal dimension lines
    const lines = [
      { x1: 50, y1: 300, x2: 400, y2: 300 },
      { x1: 900, y1: 800, x2: 1300, y2: 800 },
      { x1: 100, y1: 1500, x2: 500, y2: 1500 },
      { x1: 950, y1: 2200, x2: 1350, y2: 2200 },
      { x1: 150, y1: 3000, x2: 450, y2: 3000 },
      { x1: 800, y1: 3800, x2: 1200, y2: 3800 },
    ];

    lines.forEach((line, idx) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', `dimension-line dimension-line-${idx}`);
      g.setAttribute('opacity', '0.15');
      
      // Main line
      const mainLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      mainLine.setAttribute('x1', line.x1);
      mainLine.setAttribute('y1', line.y1);
      mainLine.setAttribute('x2', line.x2);
      mainLine.setAttribute('y2', line.y1);
      mainLine.setAttribute('stroke', '#333333');
      mainLine.setAttribute('stroke-width', '1');
      
      // Extension lines
      const ext1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ext1.setAttribute('x1', line.x1);
      ext1.setAttribute('y1', line.y1 - 20);
      ext1.setAttribute('x2', line.x1);
      ext1.setAttribute('y2', line.y1 + 20);
      ext1.setAttribute('stroke', '#333333');
      ext1.setAttribute('stroke-width', '0.8');
      
      const ext2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ext2.setAttribute('x1', line.x2);
      ext2.setAttribute('y1', line.y1 - 20);
      ext2.setAttribute('x2', line.x2);
      ext2.setAttribute('y2', line.y1 + 20);
      ext2.setAttribute('stroke', '#333333');
      ext2.setAttribute('stroke-width', '0.8');
      
      g.appendChild(mainLine);
      g.appendChild(ext1);
      g.appendChild(ext2);
      svg.appendChild(g);
    });
  }

  createToleranceCallouts(svg) {
    const callouts = [
      { x: 420, y: 300, text: '±0.005"' },
      { x: 1320, y: 800, text: '⌀0.250"' },
      { x: 520, y: 1500, text: '⊥ 0.002"' },
      { x: 1370, y: 2200, text: '∥ 0.003"' },
      { x: 470, y: 3000, text: '⌀0.001" TIR' },
      { x: 1220, y: 3800, text: '△ 0.010"' },
    ];

    callouts.forEach((callout, idx) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', `tolerance-callout tolerance-callout-${idx}`);
      g.setAttribute('opacity', '0.12');
      
      // Leader line
      const leader = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      leader.setAttribute('x1', callout.x - 30);
      leader.setAttribute('y1', callout.y);
      leader.setAttribute('x2', callout.x);
      leader.setAttribute('y2', callout.y);
      leader.setAttribute('stroke', '#666666');
      leader.setAttribute('stroke-width', '0.8');
      leader.setAttribute('stroke-dasharray', '2,2');
      
      // Text
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', callout.x + 5);
      text.setAttribute('y', callout.y + 4);
      text.setAttribute('font-family', 'JetBrains Mono, monospace');
      text.setAttribute('font-size', '12');
      text.setAttribute('fill', '#555555');
      text.textContent = callout.text;
      
      g.appendChild(leader);
      g.appendChild(text);
      svg.appendChild(g);
    });
  }

  createCenterlines(svg) {
    const centerlines = [
      { x1: 200, y1: 400, x2: 200, y2: 600 },
      { x1: 1000, y1: 900, x2: 1000, y2: 1100 },
      { x1: 300, y1: 1600, x2: 300, y2: 1800 },
      { x1: 1100, y1: 2300, x2: 1100, y2: 2500 },
      { x1: 250, y1: 3100, x2: 250, y2: 3300 },
      { x1: 1050, y1: 3900, x2: 1050, y2: 4100 },
    ];

    centerlines.forEach((line, idx) => {
      const centerline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      centerline.setAttribute('class', `centerline centerline-${idx}`);
      centerline.setAttribute('x1', line.x1);
      centerline.setAttribute('y1', line.y1);
      centerline.setAttribute('x2', line.x2);
      centerline.setAttribute('y2', line.y2);
      centerline.setAttribute('stroke', '#999999');
      centerline.setAttribute('stroke-width', '0.8');
      centerline.setAttribute('stroke-dasharray', '4,4');
      centerline.setAttribute('opacity', '0.1');
      svg.appendChild(centerline);
    });
  }

  createExtensionLines(svg) {
    const extensions = [
      { x: 100, y1: 250, y2: 350 },
      { x: 950, y1: 750, y2: 850 },
      { x: 150, y1: 1450, y2: 1550 },
      { x: 1000, y1: 2150, y2: 2250 },
      { x: 200, y1: 2950, y2: 3050 },
      { x: 900, y1: 3750, y2: 3850 },
    ];

    extensions.forEach((ext, idx) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', `extension-line extension-line-${idx}`);
      line.setAttribute('x1', ext.x);
      line.setAttribute('y1', ext.y1);
      line.setAttribute('x2', ext.x);
      line.setAttribute('y2', ext.y2);
      line.setAttribute('stroke', '#777777');
      line.setAttribute('stroke-width', '0.8');
      line.setAttribute('opacity', '0.08');
      svg.appendChild(line);
    });
  }

  createFloatingSymbols() {
    // Create floating GD&T symbols that appear on scroll
    const positions = [
      { top: '15%', left: '10%' },
      { top: '25%', left: '85%' },
      { top: '40%', left: '15%' },
      { top: '55%', left: '80%' },
      { top: '70%', left: '12%' },
      { top: '85%', left: '88%' },
      { top: '35%', left: '75%' },
      { top: '50%', left: '8%' },
      { top: '65%', left: '82%' },
      { top: '20%', left: '70%' },
    ];

    positions.forEach((pos, idx) => {
      const symbol = document.createElement('div');
      symbol.className = 'floating-symbol';
      symbol.style.top = pos.top;
      symbol.style.left = pos.left;
      symbol.setAttribute('data-index', idx);
      symbol.textContent = this.symbols[idx % this.symbols.length];
      
      this.container.appendChild(symbol);
      this.elements.push(symbol);
    });
  }

  attachScrollListener() {
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
      this.updateAnimations();
    }, { passive: true });
  }

  updateAnimations() {
    // Update floating symbols with parallax and fade effects
    this.elements.forEach((el, idx) => {
      const speed = 0.3 + (idx % 3) * 0.1;
      const offset = this.scrollY * speed;
      const opacity = Math.max(0, Math.min(1, (this.scrollY - 500 + idx * 100) / 300));
      
      el.style.transform = `translateY(${offset}px) scale(${0.8 + opacity * 0.4})`;
      el.style.opacity = opacity * 0.4;
    });

    // Animate SVG elements
    const svg = this.container.querySelector('.gdt-svg');
    if (svg) {
      const progress = Math.min(this.scrollY / 3000, 1);
      
      // Fade in dimension lines
      const dimensionLines = this.container.querySelectorAll('.dimension-line');
      dimensionLines.forEach((line, idx) => {
        const lineOpacity = Math.min((this.scrollY - 200 - idx * 150) / 400, 0.2);
        line.setAttribute('opacity', Math.max(0, lineOpacity));
      });

      // Fade in tolerance callouts
      const callouts = this.container.querySelectorAll('.tolerance-callout');
      callouts.forEach((callout, idx) => {
        const calloutOpacity = Math.min((this.scrollY - 400 - idx * 200) / 400, 0.15);
        callout.setAttribute('opacity', Math.max(0, calloutOpacity));
      });

      // Animate centerlines
      const centerlines = this.container.querySelectorAll('.centerline');
      centerlines.forEach((line, idx) => {
        const lineOpacity = Math.min((this.scrollY - 300 - idx * 180) / 400, 0.12);
        line.setAttribute('opacity', Math.max(0, lineOpacity));
      });
    }
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GDTAnimations();
});
