if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (!location.hash) window.scrollTo(0, 0);

const TEXT = {
  en: {
    nav_home: "Home", nav_about: "About", nav_portfolio: "Portfolio", nav_contact: "Contact",
    greet: "Hi, I'm",
    role: "Aspiring ML Engineer & Data Scientist",
    tagline: "Turning data into models and models into working apps.",
    intro: "I’m a Computer Science student at BINUS University, specializing in Intelligent Systems. I build machine learning projects, and two of them are live web apps you can try.",
    btn_projects: "View Projects", btn_cv: "Download CV",
    about_eyebrow: "About", about_title_a: "A bit about", about_title_b: "me",
    about_p1: "I got into AI because I like seeing a messy pile of data turn into something that can actually make a prediction. I enjoy figuring out which data matters, how to prepare it, and which model best fits the problem.",
    about_p2: "I don’t like leaving a model sitting in a notebook, so whenever I can, I wrap it in a simple web app that someone without a technical background can try. So far, I’ve worked with tabular data, images, and text, and I continue to learn and grow with every project.",
    card1_title: "Model Building", card1_text: "Training and evaluating machine learning models for classification and prediction.",
    card2_title: "Data Preparation", card2_text: "Cleaning, exploring, and shaping raw data so models have something solid to learn from.",
    card3_title: "Web Deployment", card3_text: "Turning finished models into simple web apps that anyone can open and try.",
    pf_title_a: "Portfolio", pf_title_b: "Showcase",
    pf_sub: "Explore my projects, certifications, and technical skills.",
    tab_projects: "Projects", tab_certs: "Certificates", tab_stack: "Tech Stack",
    f_all: "All", f_aiml: "AI/ML", f_software: "Software & Data", f_uiux: "UI/UX Design", f_research: "Research",
    btn_demo: "Live Demo", btn_github: "GitHub", btn_figma: "Figma", btn_files: "View Files", btn_details: "Details", tag_team: "Team project",
    pf_empty: "More coming soon.",
    ct_label: "Contact",
    ct_title_a: "Let's build something", ct_title_b: "useful.",
    ct_text: "Open to internship opportunities in machine learning and data science. Got a role or a project in mind? Send me a message.",
    ct_btn_email: "Send an email", ct_copy: "Copy", ct_copied: "Copied!",
    ft_text: "Computer Science student at BINUS University, turning machine learning models into working apps.",
    ft_quick: "Quick links", ft_connect: "Connect",
    ft_rights: "© 2026 Veby Novalisa. All rights reserved.",
    ft_top: "Back to top",
    pf_more: "More experiments and code live on my GitHub."
  }
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const typed = document.getElementById("typed");
let typingRun = 0;

function typeRole(text) {
  const run = ++typingRun;
  typed.setAttribute("aria-label", text);
  if (reduceMotion) { typed.textContent = text; return; }
  typed.textContent = "";
  let i = 0;
  (function step() {
    if (run !== typingRun) return;
    typed.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(step, 65);
  })();
}

function setLang(lang) {
  const t = TEXT[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t[el.dataset.i18n]; });
  typeRole(t.role);
}

setLang("en");

const nav = document.querySelector(".nav");
const links = [...document.querySelectorAll(".menu a")];
const sections = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);

function onScroll() {
  nav.classList.toggle("scrolled", window.scrollY > 8);
  const y = window.scrollY + 140;
  let current = sections[0];
  sections.forEach(s => { if (s.offsetTop <= y) current = s; });
  links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current.id));
}
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();

const revealEls = document.querySelectorAll(".section-head, .about-photo, .about-story, .card, .pf-tabs, .pf-filters, .ct-cta, .ct-cards");
revealEls.forEach(el => el.classList.add("reveal"));
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach(el => el.classList.add("in"));
} else {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

const FILTERS = {
  projects: ["f_all", "f_aiml", "f_research", "f_software", "f_uiux"]
};
const pfState = { tab: "projects", filter: "f_all" };
const pfFilters = document.getElementById("pfFilters");

function renderFilters() {
  const t = TEXT[document.documentElement.lang] || TEXT.en;
  pfFilters.innerHTML = "";
  const list = FILTERS[pfState.tab] || [];
  pfFilters.hidden = list.length === 0;
  list.forEach(key => {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.i18n = key;
    b.dataset.filter = key;
    b.textContent = t[key];
    b.classList.toggle("on", key === pfState.filter);
    b.setAttribute("aria-pressed", String(key === pfState.filter));
    pfFilters.appendChild(b);
  });
}

document.querySelectorAll(".pf-tab").forEach(tab =>
  tab.addEventListener("click", () => {
    pfState.tab = tab.dataset.tab;
    pfState.filter = "f_all";
    document.querySelectorAll(".pf-tab").forEach(x => {
      x.classList.toggle("on", x === tab);
      x.setAttribute("aria-selected", String(x === tab));
    });
    renderFilters();
    renderGrid();
  })
);

pfFilters.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  pfState.filter = b.dataset.filter;
  renderFilters();
  renderGrid();
});

const PROJECTS = [
  {
    category: "aiml",
    title: "LoanCalc AI",
    images: [
      "assets/projects/loancalc.png", "assets/loancalc.png",
      "assets/projects/loancalc.jpg", "assets/loancalc.jpg"
    ],
    desc: {
      en: "Predicts loan approval from applicant data, mapping Indonesian SLIK credit categories to a credit score for a Gradient Boosting model."
    },
    tags: ["Python", "scikit-learn", "Gradient Boosting", "Flask"],
    team: true,
    demo: "https://loan-approval-project-sandy.vercel.app/",
    details: "project-loancalc.html"
  },
  {
    category: "aiml",
    title: "LinguID",
    images: [
      "assets/projects/linguid.png", "assets/linguid.png",
      "assets/projects/linguid.jpg", "assets/linguid.jpg"
    ],
    desc: {
      en: "Classifies Indonesian words as Formal, Non-Baku, or Typo with parallel ML and rule-based pipelines. 88.38% ML accuracy."
    },
    tags: ["Python", "scikit-learn", "TF-IDF", "FastAPI", "NLP"],
    team: true,
    demo: "https://linguid-nlp-analysis-output.vercel.app",
    details: "project-linguid.html"
  },
  {
    category: "aiml",
    also: ["research"],
    title: "Anemia Detection",
    images: [
      "assets/projects/anemia.png", "assets/anemia.png",
      "assets/projects/anemia.jpg", "assets/anemia.jpg"
    ],
    desc: {
      en: "Non-invasive anemia screening from fingernail photos. Compares three CNNs; InceptionV3 reached 91.94% accuracy."
    },
    tags: ["Python", "TensorFlow", "OpenCV", "Transfer Learning"],
    team: true,
    demo: "https://github.com/vebynovalisa/Anemia-Detection-Non-Invasive-Screening-from-Fingernail-Images-Using-CNN",
    demoKey: "btn_github",
    details: "project-anemia.html"
  },
  {
    category: "aiml",
    title: "Fruit Freshness",
    images: [
      "assets/projects/fruit-freshness.png", "assets/fruit-freshness.png",
      "assets/projects/fruit-freshness.jpg", "assets/fruit-freshness.jpg"
    ],
    desc: {
      en: "Classifies fruit photos as fresh or rotten. Compares EfficientNetB0 and ResNet50V2; the best reached 94.44% accuracy."
    },
    tags: ["Python", "TensorFlow", "OpenCV", "Transfer Learning"],
    team: true,
    demo: "https://github.com/vebynovalisa/fruit-freshness-classification",
    demoKey: "btn_github",
    details: "project-fruit-freshness.html"
  },
  {
    category: "software",
    title: "Dishcovery",
    images: [
      "assets/projects/dishcovery.png", "assets/dishcovery.png",
      "assets/projects/dishcovery.jpg", "assets/dishcovery.jpg"
    ],
    desc: {
      en: "Recipe website that ranks dishes by how well they match your ingredients and skips ones you avoid. 880+ recipes."
    },
    tags: ["Python", "Flask", "SQLite", "JavaScript", "REST API"],
    team: true,
    demo: "https://github.com/haniahumayra/dishcovery",
    demoKey: "btn_github",
    details: "project-dishcovery.html"
  },
  {
    category: "software",
    title: "Renewable Energy DB",
    images: [
      "assets/renewable-energy/thumb.png", "assets/projects/renewable-energy.png",
      "assets/renewable-energy.png"
    ],
    desc: {
      en: "Relational database for a renewable energy installer, normalized to 3NF. 13 tables link sales, projects, suppliers and payments."
    },
    tags: ["MySQL", "SQL", "ERD", "Normalization", "Database Design"],
    team: true,
    demo: "https://drive.google.com/drive/folders/1sKdxE23aeEkBIeYe5Y8go1aKVvR1WU9B",
    demoKey: "btn_files",
    details: "project-renewable-energy.html"
  },
  {
    category: "uiux",
    title: "KelilingiJawa",
    images: [
      "assets/projects/kelilingijawa.png", "assets/kelilingijawa.png",
      "assets/projects/kelilingijawa.jpg", "assets/kelilingijawa.jpg"
    ],
    desc: {
      en: "Mobile app prototype for open trips in Java. Shows how well each group trip matches you, with a daily itinerary."
    },
    tags: ["Figma", "UI/UX", "Mobile App", "Prototype"],
    team: true,
    demo: "https://www.figma.com/design/EAd5dVOsHtVTyS0voKo1uB/AOL-AI?node-id=0-1",
    demoKey: "btn_figma",
    details: "project-kelilingijawa.html"
  }
];

const FILTER_CAT = { f_aiml: "aiml", f_research: "research", f_software: "software", f_uiux: "uiux" };
const CAT_KEY = { aiml: "f_aiml", software: "f_software", uiux: "f_uiux" };
const pfGrid = document.getElementById("pfGrid");

const ICON_PH = '<svg class="proj-ph" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/></svg>';
const ICON_OUT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const ICON_ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

function buildCard(p, t, lang) {
  const card = document.createElement("article");
  card.className = "proj-card";
  const tags = p.tags.map(x => `<li>${x}</li>`).join("");
  card.innerHTML = `
    <div class="proj-media">
      ${ICON_PH}
      <img alt="${p.title}" loading="lazy">
      <span class="proj-cat">${t[CAT_KEY[p.category]]}</span>
      ${p.team ? `<span class="proj-team">${t.tag_team}</span>` : ""}
    </div>
    <div class="proj-body">
      <h3>${p.title}</h3>
      <p class="proj-desc">${p.desc[lang] || p.desc.en}</p>
      <ul class="proj-tags">${tags}</ul>
      <div class="proj-actions">
        <a class="proj-demo" href="${p.demo}" target="_blank" rel="noopener">${p.demoKey ? t[p.demoKey] : t.btn_demo} ${ICON_OUT}</a>
        ${p.details ? `<a class="proj-details" href="${p.details}">${t.btn_details} ${ICON_ARROW}</a>` : `<button type="button" class="proj-details">${t.btn_details} ${ICON_ARROW}</button>`}
      </div>
    </div>`;
  const img = card.querySelector("img");
  let k = 0;
  img.addEventListener("error", () => {
    k++;
    if (k < p.images.length) img.src = p.images[k];
    else img.classList.add("broken");
  });
  img.src = p.images[0];
  return card;
}

const CERTS = [
  {
    code: "AI-900",
    title: "Azure AI Fundamentals",
    issuer: "Microsoft Elevate × BINUS University",
    date: { en: "March 2026" },
    image: "assets/certs/microsoft-elevate-ai.png"
  }
];

const CERT_TEXT = {
  en: { view: "View certificate", close: "Close" }
};

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.hidden = true;
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.innerHTML = '<button type="button" class="lightbox-close"></button><img alt="">';
document.body.appendChild(lightbox);
const lbImg = lightbox.querySelector("img");
const lbClose = lightbox.querySelector(".lightbox-close");
let lbReturn = null;

function openLightbox(src, alt, trigger) {
  const ct = CERT_TEXT[document.documentElement.lang] || CERT_TEXT.en;
  lbReturn = trigger;
  lbImg.src = src;
  lbImg.alt = alt;
  lbClose.setAttribute("aria-label", ct.close);
  lbClose.innerHTML = "&times;";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lbClose.focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  if (lbReturn) lbReturn.focus();
}
lightbox.addEventListener("click", e => { if (e.target !== lbImg) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });

function buildCertCard(c, lang) {
  const ct = CERT_TEXT[lang] || CERT_TEXT.en;
  const card = document.createElement("article");
  card.className = "cert-card";
  card.innerHTML = `
    <button type="button" class="cert-media" aria-label="${ct.view}: ${c.title}">
      ${ICON_PH}
      <img alt="${c.title}" loading="lazy">
    </button>
    <div class="cert-body">
      ${c.code ? `<span class="cert-code">${c.code}</span>` : ""}
      <h3>${c.title}</h3>
      <p class="cert-issuer">${c.issuer}</p>
      <p class="cert-meta"><span>${c.date[lang] || c.date.en}</span>${c.note ? `<span>${c.note[lang] || c.note.en}</span>` : ""}</p>
    </div>`;
  const img = card.querySelector("img");
  img.addEventListener("error", () => img.classList.add("broken"));
  img.src = c.image;
  card.querySelector(".cert-media").addEventListener("click", e => {
    if (!img.classList.contains("broken")) openLightbox(c.image, c.title, e.currentTarget);
  });
  return card;
}

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
const STACK = [
  { name: { en: "Programming Languages" }, items: [
    { n: "Python", i: "python/python-original", main: true },
    { n: "Java", i: "java/java-original" },
    { n: "C", i: "c/c-original" },
    { n: "C++", i: "cplusplus/cplusplus-original" },
    { n: "JavaScript", i: "javascript/javascript-original" }
  ]},
  { name: { en: "AI / Machine Learning" }, items: [
    { n: "TensorFlow", i: "tensorflow/tensorflow-original", main: true },
    { n: "Keras", i: "keras/keras-original" },
    { n: "scikit-learn", i: "scikitlearn/scikitlearn-original", main: true },
    { n: "OpenCV", i: "opencv/opencv-original" }
  ]},
  { name: { en: "Natural Language Processing" }, items: [
    { n: "NLTK" }, { n: "spaCy" }, { n: "Gensim" }
  ]},
  { name: { en: "Data Science & Visualization" }, items: [
    { n: "NumPy", i: "numpy/numpy-original" },
    { n: "pandas", i: "pandas/pandas-original", main: true },
    { n: "Matplotlib", i: "matplotlib/matplotlib-original" },
    { n: "Seaborn" }
  ]},
  { name: { en: "Web Development" }, items: [
    { n: "HTML5", i: "html5/html5-original" },
    { n: "CSS3", i: "css3/css3-original" },
    { n: "Flask", i: "flask/flask-original", main: true },
    { n: "FastAPI", i: "fastapi/fastapi-original" }
  ]},
  { name: { en: "Database" }, items: [
    { n: "MySQL", i: "mysql/mysql-original" },
    { n: "SQLite", i: "sqlite/sqlite-original" }
  ]},
  { name: { en: "Tools & Applications" }, items: [
    { n: "Git", i: "git/git-original", main: true },
    { n: "GitHub", i: "github/github-original", main: true },
    { n: "Visual Studio Code", i: "vscode/vscode-original" },
    { n: "Jupyter Notebook", i: "jupyter/jupyter-original" },
    { n: "Figma", i: "figma/figma-original" },
    { n: "Postman", i: "postman/postman-original", more: true },
    { n: "Eclipse IDE", i: "eclipse/eclipse-original", more: true },
    { n: "MySQL Workbench", more: true },
    { n: "phpMyAdmin", more: true },
    { n: "draw.io", more: true },
    { n: "Cisco Packet Tracer", more: true }
  ]},
  { name: { en: "Deployment" }, items: [
    { n: "Vercel", i: "vercel/vercel-original" }
  ]}
];

const STACK_TEXT = {
  en: { more: "Show more", less: "Show less", legend: "Outlined cards are my main skills" }
};
let stackOpen = false;

function buildStackItem(it) {
  const el = document.createElement("div");
  el.className = "stack-item";
  const mono = it.n.replace(/[^A-Za-z0-9]/g, "").slice(0, 1);
  const monoHTML = `<span class="stack-mono" aria-hidden="true">${mono.toUpperCase()}</span>`;
  el.innerHTML = `<span class="stack-logo">${it.i ? '<img alt="" loading="lazy">' : monoHTML}</span><span class="stack-name">${it.n}</span>`;
  if (it.i) {
    const img = el.querySelector("img");
    img.addEventListener("error", () => { img.outerHTML = monoHTML; });
    img.src = DEVICON + it.i + ".svg";
  }
  return el;
}

function buildStackCat(cat, lang) {
  const st = STACK_TEXT[lang] || STACK_TEXT.en;
  const sec = document.createElement("section");
  sec.className = "stack-cat";
  sec.innerHTML = `<h3>${cat.name[lang] || cat.name.en}</h3>`;
  const base = cat.items.filter(x => !x.more);
  const extra = cat.items.filter(x => x.more);
    const grid = document.createElement("div");
  grid.className = "stack-grid";
  base.forEach(x => grid.appendChild(buildStackItem(x)));
  extra.forEach(x => {
    const el = buildStackItem(x);
    el.hidden = !stackOpen;
    grid.appendChild(el);
  });
  sec.appendChild(grid);
  if (extra.length) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "stack-more";
    btn.setAttribute("aria-expanded", String(stackOpen));
    btn.textContent = stackOpen ? st.less : `${st.more} (${extra.length})`;
    btn.addEventListener("click", () => { stackOpen = !stackOpen; renderGrid(); });
    sec.appendChild(btn);
  }
  return sec;
}

function renderGrid() {
  const lang = document.documentElement.lang;
  const t = TEXT[lang] || TEXT.en;
  pfGrid.innerHTML = "";
  pfGrid.classList.toggle("is-stack", pfState.tab === "stack");
  if (pfState.tab === "stack") {
    STACK.forEach(c => pfGrid.appendChild(buildStackCat(c, lang)));
    return;
  }
  if (pfState.tab === "certificates") {
    CERTS.forEach(c => pfGrid.appendChild(buildCertCard(c, lang)));
    if (!CERTS.length) pfGrid.innerHTML = `<p class="pf-empty">${t.pf_empty}</p>`;
    return;
  }
  const items = pfState.tab === "projects"
    ? PROJECTS.filter(p => !FILTER_CAT[pfState.filter] || p.category === FILTER_CAT[pfState.filter] || (p.also || []).includes(FILTER_CAT[pfState.filter]))
    : [];
  if (!items.length) {
    pfGrid.innerHTML = `<p class="pf-empty">${t.pf_empty}</p>`;
    return;
  }
  items.forEach(p => pfGrid.appendChild(buildCard(p, t, lang)));
}

const CONTACT = { email: "vebynovalisaveby@gmail.com", subject: "Hello Veby" };
const MAILTO = `mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.subject)}`;

document.querySelectorAll("[data-mail]").forEach(a => { a.href = MAILTO; });
document.querySelectorAll("[data-mail-text]").forEach(el => { el.textContent = CONTACT.email; });

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
  return new Promise((resolve, reject) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    ta.remove();
    ok ? resolve() : reject();
  });
}

const copyBtn = document.querySelector("[data-copy-email]");
if (copyBtn) {
  const copyLabel = copyBtn.querySelector("[data-i18n]");
  let copyTimer;
  copyBtn.addEventListener("click", () => {
    const t = TEXT[document.documentElement.lang] || TEXT.en;
    copyText(CONTACT.email).then(() => {
      copyLabel.textContent = t.ct_copied;
      copyBtn.classList.add("done");
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copyLabel.textContent = (TEXT[document.documentElement.lang] || TEXT.en).ct_copy;
        copyBtn.classList.remove("done");
      }, 2000);
    }).catch(() => { window.prompt("Email:", CONTACT.email); });
  });
}

renderFilters();
renderGrid();
