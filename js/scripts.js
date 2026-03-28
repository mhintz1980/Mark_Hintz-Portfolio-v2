// ============================================
// MAIN SCRIPTS - PORTFOLIO V2
// ============================================

// Populate projects
function populateProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  portfolioData.projects.forEach((project) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    card.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" loading="lazy" />
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-category">${project.category}</p>
        <p class="project-outcome">${project.outcome}</p>
        <div class="project-tags">
          ${tagsHTML}
        </div>
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// Populate services
function populateServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  portfolioData.services.forEach((service) => {
    const card = document.createElement('div');
    card.className = 'service-card';
    
    const deliverables = service.deliverables.map(d => `<li>${d}</li>`).join('');
    
    card.innerHTML = `
      <h3 class="service-title">${service.title}</h3>
      <p class="service-subtitle">${service.subtitle}</p>
      <p class="service-description">${service.description}</p>
      <ul class="service-deliverables">
        ${deliverables}
      </ul>
      <p class="service-rate">${service.rate}</p>
      <a href="${service.cta.href}" class="service-cta">${service.cta.label}</a>
    `;
    
    grid.appendChild(card);
  });
}

// Populate case studies
function populateCaseStudies() {
  const grid = document.getElementById('case-studies-grid');
  if (!grid) return;

  portfolioData.caseStudies.forEach((study) => {
    const card = document.createElement('div');
    card.className = 'case-study-card';
    
    card.innerHTML = `
      <div class="case-study-image">
        <img src="${study.image}" alt="${study.title}" loading="lazy" />
      </div>
      <div class="case-study-content">
        <h3 class="case-study-title">${study.title}</h3>
        <div class="case-study-summary">
          <div class="summary-item">
            <span class="summary-label">Problem</span>
            <p>${study.summary.problem}</p>
          </div>
          <div class="summary-item">
            <span class="summary-label">Solution</span>
            <p>${study.summary.solution}</p>
          </div>
          <div class="summary-item">
            <span class="summary-label">Result</span>
            <p>${study.summary.result}</p>
          </div>
        </div>
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// Populate testimonials
function populateTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  portfolioData.testimonials.forEach((testimonial) => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    card.innerHTML = `
      <div class="testimonial-score">${testimonial.score}</div>
      <p class="testimonial-text">"${testimonial.text}"</p>
      <div class="testimonial-author">
        <strong>${testimonial.author}</strong>
        <span class="testimonial-role">${testimonial.role}</span>
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// Populate skills ticker
function populateSkillsTicker() {
  const track = document.getElementById('ticker-track');
  if (!track) return;

  // Create two sets for seamless loop
  const skills = [...portfolioData.skills, ...portfolioData.skills];
  
  skills.forEach((skill) => {
    const item = document.createElement('span');
    item.className = 'ticker-item';
    item.textContent = skill;
    track.appendChild(item);
  });
}

// Set copyright year
function setCopyright() {
  const copyrightEl = document.getElementById('copyright');
  if (copyrightEl) {
    copyrightEl.textContent = portfolioData.personal.copyright;
  }
}

// Handle contact form
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Create mailto link
    const subject = `Portfolio Contact: ${data.name}`;
    const body = `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;
    const mailtoLink = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
    
    // Reset form
    form.reset();
  });
}

// Smooth scroll behavior
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Intersection Observer for fade-in animations
function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.project-card, .service-card, .case-study-card, .testimonial-card').forEach(el => {
    observer.observe(el);
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  populateProjects();
  populateServices();
  populateCaseStudies();
  populateTestimonials();
  populateSkillsTicker();
  setCopyright();
  setupContactForm();
  setupSmoothScroll();
  
  // Delay observer setup to allow DOM to settle
  setTimeout(setupIntersectionObserver, 100);
});
