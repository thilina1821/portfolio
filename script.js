/* ===== Background decor ===== */
const bg = document.createElement('div');
bg.className = 'bg-decor';
bg.innerHTML = '<div class="grid-bg"></div><div class="blob blob-1"></div><div class="blob blob-2"></div><div class="blob blob-3"></div>';
document.body.prepend(bg);

/* ===== Navbar ===== */
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.nav-links a');
const SECTIONS = ['home', 'about', 'skills', 'projects', 'education', 'contact'];

function onScroll() {
  // shrink navbar
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // progress bar
  const h = document.documentElement;
  const pct = h.scrollHeight - h.clientHeight > 0
    ? (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 : 0;
  document.getElementById('progressBar').style.width = pct + '%';

  // active link
  const y = window.scrollY + 120;
  let current = SECTIONS[0];
  SECTIONS.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= y) current = id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.link === current));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

menuToggle.addEventListener('click', () => navbar.classList.toggle('menu-open'));
document.querySelectorAll('.mobile-menu a').forEach(a =>
  a.addEventListener('click', () => navbar.classList.remove('menu-open'))
);

/* ===== Reveal on scroll ===== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== Typing effect ===== */


/* ===== Marquee ===== */
const MARQUEE = ['HTML','CSS','JavaScript','TypeScript','React','Tailwind','Node.js','Express','Python','PostgreSQL','MySQL','Git','Supabase','Figma','REST'];
const mq = document.getElementById('marquee');
[...MARQUEE, ...MARQUEE].forEach(t => {
  const s = document.createElement('span');
  s.className = 'marquee-item';
  s.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> ' + t;
  mq.appendChild(s);
});

/* ===== Skills ===== */
const SKILLS = [
  { title: 'Frontend', grad: 'linear-gradient(135deg,var(--c-primary-500),var(--c-accent-500))',
    icon: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    items: [['HTML & CSS',90],['JavaScript / TypeScript',82],['React',78],['Tailwind CSS',85]] },
  { title: 'Backend', grad: 'linear-gradient(135deg,var(--c-accent-500),var(--c-success-500))',
    icon: '<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
    items: [['Node.js / Express',72],['REST APIs',75],['Python',65]] },
  { title: 'Databases', grad: 'linear-gradient(135deg,var(--c-success-500),var(--c-warning-500))',
    icon: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
    items: [['PostgreSQL',70],['MySQL',68],['Supabase',64]] },
  { title: 'Tools & Practices', grad: 'linear-gradient(135deg,var(--c-primary-500),var(--c-accent-500))',
    icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    items: [['Git & GitHub',80],['VS Code',90],['Agile / Scrum',60]] },
];
const skillsGrid = document.getElementById('skillsGrid');
SKILLS.forEach((g, gi) => {
  const card = document.createElement('div');
  card.className = 'glass skill-card tilt reveal' + (gi ? ' d' + gi : '');
  card.innerHTML = `
    <div class="skill-head">
      <span class="skill-ico" style="background:${g.grad}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">${g.icon}</svg></span>
      <h3>${g.title}</h3>
    </div>
    <div class="bars">
      ${g.items.map(([name, lvl]) => `
        <div class="bar">
          <div class="bar-top"><span>${name}</span><span>${lvl}%</span></div>
          <div class="bar-track"><div class="bar-fill" data-lvl="${lvl}"></div></div>
        </div>`).join('')}
    </div>`;
  skillsGrid.appendChild(card);
  revealObserver.observe(card);
});

// animate bars when skills section is visible
const skillsSec = document.getElementById('skills');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      skillsGrid.querySelectorAll('.bar-fill').forEach((f, i) => {
        setTimeout(() => { f.style.width = f.dataset.lvl + '%'; }, i * 80);
      });
      barObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
barObserver.observe(skillsSec);

/* ===== Projects ===== */
const PROJECTS = [
  { title:'Campus LMS Portal', category:'Full-Stack',
    description:'A learning management system for lecturers to publish course materials and students to submit assignments, take quizzes and track grades in real time.',
    tags:['React','Node.js','PostgreSQL','Supabase'],
    image:'https://images.pexels.com/photos/3888149/pexels-photo-3888149.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured:true },
  { title:'E-Commerce Storefront', category:'Web App',
    description:'A responsive online shop with product filtering, cart, Stripe checkout and an admin dashboard for managing inventory and orders.',
    tags:['React','Tailwind','Stripe','REST API'],
    image:'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title:'Event Booking UI Kit', category:'UI/UX',
    description:'A polished, accessible UI kit for event discovery and booking — designed and prototyped in Figma, implemented in React.',
    tags:['Figma','React','Tailwind','A11y'],
    image:'https://images.pexels.com/photos/14553720/pexels-photo-14553720.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title:'Fitness Tracker App', category:'Mobile',
    description:'A cross-platform fitness companion that logs workouts, visualises progress with charts and sends motivational reminders.',
    tags:['React Native','Charts','AsyncStorage'],
    image:'https://images.pexels.com/photos/9858906/pexels-photo-9858906.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title:'Library Inventory API', category:'Full-Stack',
    description:'A RESTful API for a university library with JWT auth, book search, borrowing workflow and fine calculation — documented with Swagger.',
    tags:['Node.js','Express','JWT','Swagger'],
    image:'https://images.pexels.com/photos/2764993/pexels-photo-2764993.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title:'Portfolio Website', category:'Web App',
    description:'This very site — a fully responsive, animated portfolio built with pure HTML, CSS and JavaScript.',
    tags:['HTML','CSS','JavaScript','Responsive'],
    image:'https://images.pexels.com/photos/16023919/pexels-photo-16023919.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];
const FILTERS = ['All','Web App','Full-Stack','UI/UX','Mobile'];
const filtersEl = document.getElementById('filters');
const featuredWrap = document.getElementById('featuredWrap');
const projectsGrid = document.getElementById('projectsGrid');
const emptyMsg = document.getElementById('emptyMsg');

let activeFilter = 'All';
function renderProjects() {
  const list = activeFilter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);
  const featured = list.find(p => p.featured);
  const rest = list.filter(p => !p.featured);

  featuredWrap.innerHTML = '';
  projectsGrid.innerHTML = '';
  emptyMsg.hidden = list.length > 0;

  if (featured) {
    const f = document.createElement('div');
    f.className = 'glass tilt featured reveal';
    f.innerHTML = `
      <div class="featured-img">
        <img src="${featured.image}" alt="${featured.title}" />
        <span class="featured-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon" style="width:.875rem;height:.875rem"><path d="M11.525 3.464a.5.5 0 0 1 .95 0l1.486 4.582a.5.5 0 0 0 .398.343l4.823.703a.5.5 0 0 1 .277.853l-3.49 3.4a.5.5 0 0 0-.143.443l.823 4.79a.5.5 0 0 1-.726.527l-4.317-2.27a.5.5 0 0 0-.466 0l-4.317 2.27a.5.5 0 0 1-.726-.527l.823-4.79a.5.5 0 0 0-.143-.443l-3.49-3.4a.5.5 0 0 1 .277-.853l4.823-.703a.5.5 0 0 0 .398-.343z"/></svg> Featured</span>
      </div>
      <div class="featured-body">
        <span class="featured-cat">${featured.category}</span>
        <h3>${featured.title}</h3>
        <p>${featured.description}</p>
        <div class="tag-row">${featured.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="featured-actions">
          <a href="#" class="btn btn-primary">Live demo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg></a>
          <a href="#" class="btn btn-ghost">Code <svg viewBox="0 0 24 24" fill="currentColor" class="icon"><path d="M12 .5C5.73.5.5 5.73.5 12.06c0 5.1 3.29 9.41 7.86 10.94.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.54 11.54 0 0 0 23.5 12.06C23.5 5.73 18.27.5 12 .5Z"/></svg></a>
        </div>
      </div>`;
    featuredWrap.appendChild(f);
    revealObserver.observe(f);
  }

  rest.forEach((p, i) => {
    const c = document.createElement('div');
    c.className = 'glass tilt project-card reveal' + (i ? ' d' + Math.min(i, 3) : '');
    c.innerHTML = `
      <div class="project-img">
        <img src="${p.image}" alt="${p.title}" />
        <span class="project-cat">${p.category}</span>
      </div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="project-links">
          <a href="#">Demo</a>
          <a href="#">Code</a>
        </div>
      </div>`;
    projectsGrid.appendChild(c);
    revealObserver.observe(c);
  });
}
FILTERS.forEach(flt => {
  const b = document.createElement('button');
  b.className = 'filter-btn' + (flt === 'All' ? ' active' : '');
  b.textContent = flt;
  b.addEventListener('click', () => {
    activeFilter = flt;
    filtersEl.querySelectorAll('.filter-btn').forEach(x => x.classList.toggle('active', x === b));
    renderProjects();
  });
  filtersEl.appendChild(b);
});
renderProjects();

/* ===== Education timeline ===== */
const TIMELINE = [
  { year:'2022 — Present', title:'B.Sc. in Information & Communication Technology (BICT)', place:'University',
    detail:'Core modules: Programming Fundamentals, Data Structures, Database Systems, Web Development, Software Engineering, Computer Networks and Project Management.',
    icon:'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>', tag:'Degree' },
  { year:'2022', title:'Started BICT — 2022 Batch', place:'Faculty of Technology',
    detail:'Admitted to the BICT programme as a member of the 2022 batch. Began building programming foundations.',
    icon:'<path d="M14 21h-7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8"/><path d="M14 17v6l3-3l3 3v-6"/><path d="M8 7h8"/><path d="M8 11h5"/>', tag:'Started' },
  { year:'2020', title:'G.C.E. Advanced Level — Physical Science Stream', place:'College',
    detail:'Completed A/Ls with a strong result in Mathematics and Physics, qualifying for university entry.',
    icon:'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>', tag:'A/L' },
  { year:'2018', title:'G.C.E. Ordinary Level', place:'College',
    detail:'Passed O/Ls with distinction including Information & Communication Technology as a subject.',
    icon:'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>', tag:'O/L' },
  { year:'2024', title:'Web Development Certification', place:'Online / Self-study',
    detail:'Completed focused coursework on modern React, Tailwind CSS and full-stack patterns.',
    icon:'<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2"/>', tag:'Cert' },
  { year:'2025', title:'Hackathon Finalist', place:'Inter-University Hackathon',
    detail:'Finalist in a 24-hour hackathon building a civic-tech prototype with a team of four.',
    icon:'<path d="M15.578 3.384 13.5 5.5l1.5 1.5 3-3.376A4.646 4.646 0 0 1 21.5 7c0 2.5-2 4.5-4.5 4.5-.5 0-1-.1-1.5-.3l-6.5 6.5c.2.5.3 1 .3 1.5a4.5 4.5 0 1 1-9 0c0-2.5 2-4.5 4.5-4.5.5 0 1 .1 1.5.3l6.5-6.5c-.2-.5-.3-1-.3-1.5a4.5 4.5 0 1 1 9 0"/>', tag:'Award' },
];
const tl = document.getElementById('timeline');
tl.innerHTML = '<div class="timeline-line"></div>';
TIMELINE.forEach((it, i) => {
  const item = document.createElement('div');
  item.className = 'tl-item reveal' + (i ? ' d' + Math.min(i, 3) : '');
  item.innerHTML = `
    <div class="tl-node"><span class="tl-dot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">${it.icon}</svg></span></div>
    <div class="tl-spacer"></div>
    <div class="tl-card"><div class="glass tl-card-inner">
      <div class="tl-meta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon" style="width:1rem;height:1rem"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>${it.year}<span class="tl-tag">${it.tag}</span></div>
      <h3>${it.title}</h3>
      <p class="tl-place">${it.place}</p>
      <p>${it.detail}</p>
    </div></div>`;
  tl.appendChild(item);
  revealObserver.observe(item);
});

/* ===== Tilt cards ===== */
document.addEventListener('mousemove', e => {
  document.querySelectorAll('.tilt').forEach(el => {
    const r = el.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
      el.style.transform = '';
      return;
    }
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `translateY(-6px) perspective(800px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg)`;
  });
});

/* ===== Contact form ===== */
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const submitBtn = document.getElementById('submitBtn');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('fName').value.trim();
  const email = document.getElementById('fEmail').value.trim();
  const msg = document.getElementById('fMessage').value.trim();
  formMsg.hidden = true;
  formMsg.className = 'form-msg';

  if (!name || !email || !msg) {
    formMsg.hidden = false;
    formMsg.classList.add('error');
    formMsg.textContent = 'Please fill in all fields.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formMsg.hidden = false;
    formMsg.classList.add('error');
    formMsg.textContent = 'Please enter a valid email address.';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
  await new Promise(r => setTimeout(r, 1100));
  submitBtn.disabled = false;
  submitBtn.innerHTML = 'Send message <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M14.536 21.086a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.3 8.7-6.5 6.5"/></svg>';
  form.reset();
  formMsg.hidden = false;
  formMsg.classList.add('success');
  formMsg.textContent = "Thanks! Your message has been sent. I'll get back to you soon.";
  setTimeout(() => { formMsg.hidden = true; }, 4000);
});

/* ===== Back to top ===== */
document.getElementById('toTop').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);
