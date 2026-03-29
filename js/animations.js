// ============================================
// GD&T SCROLL ANIMATIONS - ENHANCED
// ============================================

class GDTAnimations {
  constructor() {
    this.container = document.querySelector('.gdt-background');
    if (!this.container) return;

    this.symbols = [
      '⌀', '⏥', '⏤', '◎', '△', '▷', '//', '⊥', '⟂', '○', '□', '◇',
      '⌀', '⏥', '⏤', '◎', '△', '▷', '//', '⊥', '⟂', '○', '□', '◇',
      '⌀', '⏥', '⏤', '◎', '△', '▷', '//', '⊥', '⟂', '○'
    ];
    
    this.scrollY = 0;
    this.elements = [];
    this.lines = [];
    this.callouts = [];
    
    this.init();
    this.attachScrollListener();
    this.triggerInitialAnimation();
  }

  init() {
    // Create SVG container for CAD line work
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'gdt-svg');
    svg.setAttribute('viewBox', '0 0 1400 8000');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    // Create all CAD elements
    this.createDimensionLines(svg);
    this.createToleranceCallouts(svg);
    this.createCenterlines(svg);
    this.createExtensionLines(svg);
    this.createLeaderLines(svg);
    this.createSectionLines(svg);
    
    this.container.appendChild(svg);
    
    // Create floating GD&T symbols
    this.createFloatingSymbols();
  }

  createDimensionLines(svg) {
    // Horizontal dimension lines scattered throughout the page
    const lines = [
      { x1: 50, y1: 300, x2: 400, y2: 300, label: '12.50' },
      { x1: 900, y1: 800, x2: 1300, y2: 800, label: '8.75' },
      { x1: 100, y1: 1500, x2: 500, y2: 1500, label: '15.25' },
      { x1: 950, y1: 2200, x2: 1350, y2: 2200, label: '6.50' },
      { x1: 150, y1: 3000, x2: 450, y2: 3000, label: '10.00' },
      { x1: 800, y1: 3800, x2: 1200, y2: 3800, label: '14.75' },
      { x1: 100, y1: 4600, x2: 500, y2: 4600, label: '9.25' },
      { x1: 950, y1: 5400, x2: 1350, y2: 5400, label: '11.50' },
      { x1: 200, y1: 6200, x2: 550, y2: 6200, label: '7.80' },
      { x1: 850, y1: 7000, x2: 1250, y2: 7000, label: '13.25' },
    ];

    lines.forEach((line, idx) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', `dimension-line dimension-line-${idx}`);
      g.setAttribute('opacity', '0');
      
      // Main dimension line
      const mainLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      mainLine.setAttribute('x1', line.x1);
      mainLine.setAttribute('y1', line.y1);
      mainLine.setAttribute('x2', line.x2);
      mainLine.setAttribute('y2', line.y1);
      mainLine.setAttribute('stroke', '#2563EB');
      mainLine.setAttribute('stroke-width', '1.2');
      
      // Left extension line
      const ext1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ext1.setAttribute('x1', line.x1);
      ext1.setAttribute('y1', line.y1 - 25);
      ext1.setAttribute('x2', line.x1);
      ext1.setAttribute('y2', line.y1 + 25);
      ext1.setAttribute('stroke', '#2563EB');
      ext1.setAttribute('stroke-width', '0.8');
      
      // Right extension line
      const ext2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ext2.setAttribute('x1', line.x2);
      ext2.setAttribute('y1', line.y1 - 25);
      ext2.setAttribute('x2', line.x2);
      ext2.setAttribute('y2', line.y1 + 25);
      ext2.setAttribute('stroke', '#2563EB');
      ext2.setAttribute('stroke-width', '0.8');
      
      // Arrow heads
      const arrowSize = 8;
      const arrowLeft = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      arrowLeft.setAttribute('points', `${line.x1},${line.y1} ${line.x1 + arrowSize},${line.y1 - arrowSize / 2} ${line.x1 + arrowSize},${line.y1 + arrowSize / 2}`);
      arrowLeft.setAttribute('fill', '#2563EB');
      
      const arrowRight = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      arrowRight.setAttribute('points', `${line.x2},${line.y1} ${line.x2 - arrowSize},${line.y1 - arrowSize / 2} ${line.x2 - arrowSize},${line.y1 + arrowSize / 2}`);
      arrowRight.setAttribute('fill', '#2563EB');
      
      g.appendChild(mainLine);
      g.appendChild(ext1);
      g.appendChild(ext2);
      g.appendChild(arrowLeft);
      g.appendChild(arrowRight);
      
      svg.appendChild(g);
      this.lines.push({ element: g, triggerY: 200 + idx * 400 });
    });
  }

  createToleranceCallouts(svg) {
    const callouts = [
      { x: 420, y: 300, text: '±0.005"', symbol: '⌀' },
      { x: 1320, y: 800, text: '⌀0.250"', symbol: '⏥' },
      { x: 520, y: 1500, text: '⊥ 0.002"', symbol: '⏤' },
      { x: 1370, y: 2200, text: '∥ 0.003"', symbol: '◎' },
      { x: 470, y: 3000, text: '⌀0.001" TIR', symbol: '△' },
      { x: 1220, y: 3800, text: '△ 0.010"', symbol: '▷' },
      { x: 520, y: 4600, text: '⊥ 0.004"', symbol: '//' },
      { x: 1370, y: 5400, text: '∥ 0.002"', symbol: '⊥' },
      { x: 570, y: 6200, text: '⌀0.0015" TIR', symbol: '⟂' },
      { x: 1270, y: 7000, text: '△ 0.008"', symbol: '○' },
    ];

    callouts.forEach((callout, idx) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', `tolerance-callout tolerance-callout-${idx}`);
      g.setAttribute('opacity', '0');
      
      // Leader line (dashed)
      const leader = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      leader.setAttribute('x1', callout.x - 40);
      leader.setAttribute('y1', callout.y);
      leader.setAttribute('x2', callout.x);
      leader.setAttribute('y2', callout.y);
      leader.setAttribute('stroke', '#DC2626');
      leader.setAttribute('stroke-width', '0.8');
      leader.setAttribute('stroke-dasharray', '3,3');
      
      // Dot at leader end
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', callout.x - 40);
      dot.setAttribute('cy', callout.y);
      dot.setAttribute('r', '2');
      dot.setAttribute('fill', '#DC2626');
      
      // Text label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', callout.x + 10);
      text.setAttribute('y', callout.y + 5);
      text.setAttribute('font-family', 'JetBrains Mono, monospace');
      text.setAttribute('font-size', '13');
      text.setAttribute('font-weight', '500');
      text.setAttribute('fill', '#DC2626');
      text.textContent = callout.text;
      
      g.appendChild(leader);
      g.appendChild(dot);
      g.appendChild(text);
      svg.appendChild(g);
      this.callouts.push({ element: g, triggerY: 400 + idx * 400 });
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
      { x1: 300, y1: 4700, x2: 300, y2: 4900 },
      { x1: 1100, y1: 5500, x2: 1100, y2: 5700 },
      { x1: 350, y1: 6300, x2: 350, y2: 6500 },
      { x1: 1050, y1: 7100, x2: 1050, y2: 7300 },
    ];

    centerlines.forEach((line, idx) => {
      const centerline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      centerline.setAttribute('class', `centerline centerline-${idx}`);
      centerline.setAttribute('x1', line.x1);
      centerline.setAttribute('y1', line.y1);
      centerline.setAttribute('x2', line.x2);
      centerline.setAttribute('y2', line.y2);
      centerline.setAttribute('stroke', '#999999');
      centerline.setAttribute('stroke-width', '1');
      centerline.setAttribute('stroke-dasharray', '5,5');
      centerline.setAttribute('opacity', '0');
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
      { x: 150, y1: 4550, y2: 4650 },
      { x: 950, y1: 5350, y2: 5450 },
      { x: 200, y1: 6150, y2: 6250 },
      { x: 900, y1: 6950, y2: 7050 },
    ];

    extensions.forEach((ext, idx) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', `extension-line extension-line-${idx}`);
      line.setAttribute('x1', ext.x);
      line.setAttribute('y1', ext.y1);
      line.setAttribute('x2', ext.x);
      line.setAttribute('y2', ext.y2);
      line.setAttribute('stroke', '#888888');
      line.setAttribute('stroke-width', '0.8');
      line.setAttribute('opacity', '0');
      svg.appendChild(line);
    });
  }

  createLeaderLines(svg) {
    // Leader lines pointing to various elements
    const leaders = [
      { x1: 600, y1: 250, x2: 650, y2: 300 },
      { x1: 1100, y1: 750, x2: 1150, y2: 800 },
      { x1: 700, y1: 1450, x2: 750, y2: 1500 },
      { x1: 1200, y1: 2150, x2: 1250, y2: 2200 },
    ];

    leaders.forEach((leader, idx) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', `leader-line leader-line-${idx}`);
      line.setAttribute('x1', leader.x1);
      line.setAttribute('y1', leader.y1);
      line.setAttribute('x2', leader.x2);
      line.setAttribute('y2', leader.y2);
      line.setAttribute('stroke', '#666666');
      line.setAttribute('stroke-width', '0.8');
      line.setAttribute('opacity', '0');
      svg.appendChild(line);
    });
  }

  createSectionLines(svg) {
    // Section lines (thick lines with labels)
    const sections = [
      { x1: 50, y1: 1200, x2: 1350, y2: 1200, label: 'SECTION A-A' },
      { x1: 50, y1: 3500, x2: 1350, y2: 3500, label: 'SECTION B-B' },
      { x1: 50, y1: 5800, x2: 1350, y2: 5800, label: 'SECTION C-C' },
    ];

    sections.forEach((section, idx) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', `section-line section-line-${idx}`);
      g.setAttribute('opacity', '0');
      
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', section.x1);
      line.setAttribute('y1', section.y1);
      line.setAttribute('x2', section.x2);
      line.setAttribute('y2', section.y1);
      line.setAttribute('stroke', '#333333');
      line.setAttribute('stroke-width', '1.5');
      line.setAttribute('stroke-dasharray', '8,4');
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', 50);
      text.setAttribute('y', section.y1 - 10);
      text.setAttribute('font-family', 'JetBrains Mono, monospace');
      text.setAttribute('font-size', '11');
      text.setAttribute('font-weight', '600');
      text.setAttribute('fill', '#333333');
      text.setAttribute('letter-spacing', '2');
      text.textContent = section.label;
      
      g.appendChild(line);
      g.appendChild(text);
      svg.appendChild(g);
    });
  }

  createFloatingSymbols() {
    // Create many floating GD&T symbols at different positions
    const positions = [
      { top: '8%', left: '5%', delay: 0 },
      { top: '12%', left: '92%', delay: 100 },
      { top: '18%', left: '15%', delay: 200 },
      { top: '22%', left: '88%', delay: 150 },
      { top: '28%', left: '8%', delay: 250 },
      { top: '32%', left: '85%', delay: 180 },
      { top: '38%', left: '12%', delay: 300 },
      { top: '42%', left: '90%', delay: 220 },
      { top: '48%', left: '6%', delay: 350 },
      { top: '52%', left: '87%', delay: 270 },
      { top: '58%', left: '14%', delay: 400 },
      { top: '62%', left: '89%', delay: 310 },
      { top: '68%', left: '7%', delay: 450 },
      { top: '72%', left: '86%', delay: 360 },
      { top: '78%', left: '11%', delay: 500 },
      { top: '82%', left: '91%', delay: 410 },
      { top: '88%', left: '9%', delay: 550 },
      { top: '92%', left: '84%', delay: 460 },
    ];

    positions.forEach((pos, idx) => {
      const symbol = document.createElement('div');
      symbol.className = 'floating-symbol';
      symbol.style.top = pos.top;
      symbol.style.left = pos.left;
      symbol.setAttribute('data-index', idx);
      symbol.setAttribute('data-delay', pos.delay);
      symbol.textContent = this.symbols[idx % this.symbols.length];
      
      // Stagger the animation start
      symbol.style.animationDelay = `${pos.delay}ms`;
      
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
      const speed = 0.2 + (idx % 4) * 0.08;
      const offset = this.scrollY * speed;
      const triggerPoint = 300 + idx * 80;
      const opacity = Math.max(0, Math.min(1, (this.scrollY - triggerPoint) / 400));
      const scale = 0.7 + opacity * 0.5;
      
      el.style.transform = `translateY(${offset}px) scale(${scale})`;
      el.style.opacity = opacity * 0.5;
    });

    // Animate SVG elements
    const svg = this.container.querySelector('.gdt-svg');
    if (svg) {
      // Fade in dimension lines progressively
      const dimensionLines = this.container.querySelectorAll('.dimension-line');
      dimensionLines.forEach((line, idx) => {
        const triggerY = 200 + idx * 400;
        const lineOpacity = Math.min((this.scrollY - triggerY) / 300, 0.25);
        line.setAttribute('opacity', Math.max(0, lineOpacity));
      });

      // Fade in tolerance callouts
      const callouts = this.container.querySelectorAll('.tolerance-callout');
      callouts.forEach((callout, idx) => {
        const triggerY = 400 + idx * 400;
        const calloutOpacity = Math.min((this.scrollY - triggerY) / 300, 0.2);
        callout.setAttribute('opacity', Math.max(0, calloutOpacity));
      });

      // Animate centerlines
      const centerlines = this.container.querySelectorAll('.centerline');
      centerlines.forEach((line, idx) => {
        const triggerY = 300 + idx * 400;
        const lineOpacity = Math.min((this.scrollY - triggerY) / 300, 0.15);
        line.setAttribute('opacity', Math.max(0, lineOpacity));
      });

      // Animate extension lines
      const extensions = this.container.querySelectorAll('.extension-line');
      extensions.forEach((line, idx) => {
        const triggerY = 250 + idx * 400;
        const lineOpacity = Math.min((this.scrollY - triggerY) / 300, 0.12);
        line.setAttribute('opacity', Math.max(0, lineOpacity));
      });

      // Animate leader lines
      const leaders = this.container.querySelectorAll('.leader-line');
      leaders.forEach((line, idx) => {
        const triggerY = 500 + idx * 600;
        const lineOpacity = Math.min((this.scrollY - triggerY) / 300, 0.18);
        line.setAttribute('opacity', Math.max(0, lineOpacity));
      });

      // Animate section lines
      const sections = this.container.querySelectorAll('.section-line');
      sections.forEach((section, idx) => {
        const triggerY = 1000 + idx * 2300;
        const sectionOpacity = Math.min((this.scrollY - triggerY) / 300, 0.22);
        section.setAttribute('opacity', Math.max(0, sectionOpacity));
      });
    }
  }

  triggerInitialAnimation() {
    // Trigger a small scroll to start animations
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 100);
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GDTAnimations();
});
