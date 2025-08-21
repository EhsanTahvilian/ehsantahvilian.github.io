// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu){
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Dark mode toggle (persists in localStorage)
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const THEME_KEY = 'theme-v2-preference';
const saved = localStorage.getItem(THEME_KEY);
if(saved){ root.classList.toggle('dark', saved === 'dark'); themeToggle.textContent = saved === 'dark' ? '☀️' : '🌙'; }
themeToggle?.addEventListener('click', () => {
  const isDark = root.classList.toggle('dark');
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// Scroll progress bar
const progress = document.getElementById('progressBar');
const onScroll = () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
  progress.style.width = (scrolled * 100) + '%';
};
document.addEventListener('scroll', onScroll, { passive: true }); onScroll();

// Reveal on scroll
const revealables = document.querySelectorAll('.reveal, .reveal-delay, .reveal-delay2, .card, .i-card, .p-card, .a-card, .t-item');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} });
}, { threshold: 0.15 });
revealables.forEach(el => io.observe(el));

// Active nav on scroll
const navLinks = document.querySelectorAll('[data-nav]');
const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href')));
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting){
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-50% 0px -40% 0px', threshold: 0.1 });
sections.forEach(s => s && spy.observe(s));

// Inline SVG icons
const svg = {
  github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.35-1.75-1.35-1.75-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.26 1.86 1.26 1.08 1.86 2.83 1.32 3.52 1.01.11-.79.42-1.32.77-1.62-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.4 1.25-3.25-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.31 1.24a11.5 11.5 0 0 1 6.02 0c2.3-1.56 3.31-1.24 3.31-1.24.66 1.65.25 2.87.12 3.17.78.85 1.25 1.93 1.25 3.25 0 4.62-2.81 5.65-5.49 5.95.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.82.58A12 12 0 0 0 12 .5Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5Zm-.73 6.5h3V21h-3V10ZM9 10h2.87v1.49h.04c.4-.76 1.38-1.56 2.84-1.56C18 9.93 19 12 19 14.94V21h-3v-5.3c0-1.26-.02-2.88-1.76-2.88-1.77 0-2.04 1.38-2.04 2.8V21H9V10Z"/></svg>',
  email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v.4l10 6.67L22 6.4V6a2 2 0 0 0-2-2Zm2 5.2-8.73 5.82a2 2 0 0 1-2.54 0L2 9.2V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.2Z"/></svg>',
  link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10.6 13.4a1 1 0 0 1 0-1.4l3-3a4 4 0 1 1 5.6 5.6l-1.3 1.3a1 1 0 0 1-1.4-1.4l1.3-1.3a2 2 0 0 0-2.8-2.8l-3 3a1 1 0 0 1-1.4 0Zm2.8-2.8a1 1 0 0 1 0 1.4l-3 3a4 4 0 1 1-5.6-5.6l1.3-1.3a1 1 0 1 1 1.4 1.4L6.2 7.8a2 2 0 0 0 2.8 2.8l3-3a1 1 0 0 1 1.4 0Z"/></svg>'
};
document.querySelectorAll('.icon-link').forEach(a => {
  const label = (a.getAttribute('aria-label') || '').toLowerCase();
  a.innerHTML = label.includes('github') ? svg.github : label.includes('linkedin') ? svg.linkedin : label.includes('email') ? svg.email : svg.link;
});

// Footer year
document.getElementById('year')?.insertAdjacentText('beforeend', new Date().getFullYear());


// === v3 enhancements ===

// Smooth scroll with header offset
(function(){
  const header = document.querySelector('.nav-wrap');
  const offset = () => header ? header.getBoundingClientRect().height + 8 : 0;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if(target){
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset();
        window.scrollTo({ top, behavior:'smooth' });
        history.pushState(null, '', '#' + id);
      }
    });
  });
})();

// Top progress bar
(function(){
  const bar = document.querySelector('.progress__bar');
  if(!bar) return;
  const onScroll = () => {
    const h = document.documentElement;
    const s = (h.scrollTop)/(h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = s + '%';
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
})();

// Particle network background (AI/ML nodes + edges vibe)
(function(){
  const c = document.getElementById('bg-net');
  if(!c) return;
  const ctx = c.getContext('2d');
  let W, H, DPR = window.devicePixelRatio || 1;
  const N = Math.min(90, Math.floor(window.innerWidth/14));
  const nodes = Array.from({length: N}, () => ({
    x: Math.random(), y: Math.random(),
    vx: (Math.random()-.5)*.0015, vy: (Math.random()-.5)*.0015
  }));
  function resize(){
    W = c.width = Math.floor(innerWidth * DPR);
    H = c.height = Math.floor(innerHeight * DPR);
    c.style.width = innerWidth+'px';
    c.style.height = innerHeight+'px';
  }
  function step(){
    ctx.clearRect(0,0,W,H);
    // edges
    for(let i=0;i<N;i++){
      for(let j=i+1;j<N;j++){
        const dx = (nodes[i].x - nodes[j].x);
        const dy = (nodes[i].y - nodes[j].y);
        const d2 = dx*dx + dy*dy;
        if(d2 < .02){
          const a = ( .02 - d2 )/.02;
          ctx.globalAlpha = a * .4;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x*W, nodes[i].y*H);
          ctx.lineTo(nodes[j].x*W, nodes[j].y*H);
          ctx.strokeStyle = '#0C91A6';
          ctx.lineWidth = 1 * DPR;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    // nodes
    for(let n of nodes){
      n.x += n.vx; n.y += n.vy;
      if(n.x<0||n.x>1) n.vx*=-1;
      if(n.y<0||n.y>1) n.vy*=-1;
      ctx.beginPath();
      ctx.arc(n.x*W, n.y*H, 2.2*DPR, 0, Math.PI*2);
      ctx.fillStyle = '#0C91A6';
      ctx.fill();
    }
    requestAnimationFrame(step);
  }
  window.addEventListener('resize', resize);
  resize(); step();
})();
