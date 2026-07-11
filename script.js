// ---------- Nav toggle (mobile) ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id], .hero[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

// ---------- Portfolio data ----------
const projects = [
  { name: 'UniBite — Canteen Ordering App', cat: 'academic',  tag: 'Flutter · Firebase',       desc: 'Two-app system (student + staff) with in-app wallet, QR pickup codes and real-time order sync. Built for PUSL2023 coursework.', hue: 24,  img: 'assets/unibite.jpg' },
  { name: 'Minggle — Social Matching App',  cat: 'academic',  tag: 'Flutter · Firebase',       desc: 'Profile-based matching app with editable hobbies, auth, and real-time profile navigation.', hue: 200, img: 'assets/mingle.jpg' },
  { name: 'Utility Management System',      cat: 'academic',  tag: 'PHP · MySQL · Bootstrap',  desc: 'Web app for tracking and managing utility usage records, built with a relational schema.', hue: 160, img: 'assets/um.jpg' },
  { name: 'Project Approval Portal',        cat: 'academic',  tag: 'ASP.NET Core 8 · C#',      desc: 'Web-based workflow for submitting and approving academic project proposals.', hue: 40,  img: 'assets/pa.jpg' },
  { name: 'Duothon 5.0',                    cat: 'hackathon', tag: 'C++ · Algorithms',         desc: 'Inter-university competitive programming contest — graph theory and combinatorics problems.', hue: 300, img: 'assets/d.jpg' },
  { name: 'HacktoNight 3.0',             cat: 'hackathon', tag: 'Security · Forensics',     desc: 'Capture-the-flag competition covering cryptography, steganography and reverse engineering challenges.', hue: 190, img: 'assets/hc.jpg' },
  { name: 'Figmate - UI/UX Workshop',       cat: 'hackathon', tag: 'Web · Design',   desc: 'Phased, terminal-styled web platform built for a coding event roadmap.', hue: 320, img: 'assets/fg.jpg' },
  { name: 'Macro Mark Identity',            cat: 'freelance', tag: 'Branding',                 desc: 'Logo and brand identity system designed for a small freelance venture.', hue: 280, img: 'assets/mm.jpg' },
  { name: 'Shehan Graphics — Poster Set',   cat: 'freelance', tag: 'Photoshop · Illustrator',  desc: 'Social media and print poster series for freelance clients.', hue: 10,  img: 'assets/sg.jpg' },
];

const grid = document.getElementById('portfolioGrid');

// ---------- Scroll reveal (declared early so renderProjects can use it) ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function renderProjects(filter) {
  grid.innerHTML = '';
  const list = filter === 'all' ? projects : projects.filter(p => p.cat === filter);

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.innerHTML = `
      <div class="project-thumb" style="background-image:url('${p.img}');"></div>
      <div class="project-info">
        <h4>${p.name}</h4>
        <span class="project-tag">${p.tag}</span>
        <p class="project-desc">${p.desc}</p>
      </div>
    `;
    grid.appendChild(card);
  });

  // re-observe newly added cards for reveal animation
  document.querySelectorAll('.project-card.reveal').forEach(el => revealObserver.observe(el));
}

renderProjects('all');

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

document.querySelectorAll('.service-card, .about-photo, .about-content, .skill').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ---------- Skill rings ----------
const CIRCUMFERENCE = 2 * Math.PI * 42; // r=42

document.querySelectorAll('.skill').forEach(skill => {
  const ring = skill.querySelector('.ring-fg');
  const percent = parseInt(skill.dataset.percent, 10);
  ring.style.strokeDasharray = `${CIRCUMFERENCE}`;
  ring.style.strokeDashoffset = `${CIRCUMFERENCE}`;

  const ringObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
        ring.style.strokeDashoffset = `${offset}`;
        ringObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  ringObserver.observe(skill);
});

// ---------- Contact form (dummy submit) ----------
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !email) {
    note.textContent = 'Please fill in your name and email.';
    return;
  }
  note.textContent = `Thanks, ${name}! This is a demo form — no message was actually sent.`;
  form.reset();
});
