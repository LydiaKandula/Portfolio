"use strict";

/* ---------- Small helpers ---------- */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Build a DOM element with attributes and children (avoids innerHTML with data). */
const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else node.setAttribute(key, value);
  }
  children.forEach((child) => node.append(child));
  return node;
};

/* ---------- Theme switching (persisted) ---------- */
const initTheme = () => {
  const root = document.documentElement;
  const button = $("#themeToggle");
  const apply = (theme) => {
    root.setAttribute("data-theme", theme);
    const isDark = theme === "dark";
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    $("#themeIcon").textContent = isDark ? "☀" : "☾";
    $("#themeLabel").textContent = isDark ? "Light" : "Dark";
  };
  apply(root.getAttribute("data-theme") || "light");
  button.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  });
};

/* ---------- Reusable category filter bar (radio-style button group) ---------- */
const buildFilterBar = (container, categories, groupName, onChange) => {
  categories.forEach((category, index) => {
    const id = `${groupName}-${index}`;
    const input = el("input", { type: "radio", class: "btn-check", name: groupName, id, autocomplete: "off", value: category });
    if (index === 0) input.checked = true;
    const label = el("label", { class: "btn btn-outline-theme btn-sm", for: id, text: category });
    input.addEventListener("change", () => onChange(category));
    container.append(input, label);
  });
};

/* ---------- Skills filter ---------- */
const initSkills = () => {
  const grid = $("#skillGrid");
  const render = (category) => {
    grid.replaceChildren();
    skills
      .filter((group) => category === "All" || group.category === category)
      .forEach((group) => {
        const heading = el("h3", {}, el("span", { class: "skill-icon", "aria-hidden": "true", text: group.icon }), document.createTextNode(group.category));
        const chips = el("div", {}, ...group.items.map((item) => el("span", { class: "chip", text: item })));
        grid.append(el("li", { class: "skill-card" }, heading, chips));
      });
  };
  buildFilterBar($("#skillFilters"), ["All", ...skills.map((s) => s.category)], "skillFilter", render);
  render("All");
};

/* ---------- Projects: filter + details modal ---------- */
const initProjects = () => {
  const grid = $("#projectGrid");
  const count = $("#projectCount");
  const modalEl = $("#projectModal");
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

  const openModal = (project) => {
    $("#projectModalTitle").textContent = project.title;
    $("#projectModalDesc").textContent = project.description;
    $("#projectModalList").replaceChildren(...project.highlights.map((h) => el("li", { text: h })));
    $("#projectModalTech").replaceChildren(...project.tech.map((t) => el("span", { class: "tech", text: t })));
    const link = $("#projectModalLink");
    link.hidden = !project.repo;
    if (project.repo) link.href = project.repo;
    modal.show();
  };

  const card = (project) => {
    const details = el("button", { type: "button", class: "btn btn-outline-theme btn-sm", text: "Details" });
    details.addEventListener("click", () => openModal(project));
    const actions = el("div", { class: "d-flex gap-2 mb-3" }, details);
    if (project.repo) {
      actions.append(el("a", { class: "btn btn-accent btn-sm", href: project.repo, target: "_blank", rel: "noopener noreferrer", text: "Code ↗", "aria-label": `View ${project.title} code on GitHub` }));
    }
    return el("div", { class: "col-md-6 col-lg-4" },
      el("article", { class: "card project-card h-100" },
        el("div", { class: "card-body d-flex flex-column" },
          el("div", { class: "d-flex justify-content-between align-items-start" },
            el("span", { class: "project-icon", "aria-hidden": "true", text: project.icon }),
            el("span", { class: "badge badge-cat rounded-pill", text: `${project.category} · ${project.year}` })),
          el("h3", { class: "card-title", text: project.title }),
          el("p", { class: "card-text", text: project.description }),
          el("div", { class: "mt-auto" },
            el("div", { class: "mb-3" }, ...project.tech.map((t) => el("span", { class: "tech", text: t }))),
            actions))));
  };

  const render = (category) => {
    const visible = projects.filter((p) => category === "All" || p.category === category);
    grid.replaceChildren(...visible.map(card));
    count.textContent = `Showing ${visible.length} of ${projects.length} projects`;
  };
  buildFilterBar($("#projectFilters"), ["All", ...new Set(projects.map((p) => p.category))], "projectFilter", render);
  render("All");
};

/* ---------- Certifications: filter by issuer + live search ---------- */
const initCerts = () => {
  const grid = $("#certGrid");
  const count = $("#certCount");
  const search = $("#certSearch");
  let issuer = "All";

  const render = () => {
    const term = search.value.trim().toLowerCase();
    const visible = certifications.filter((c) =>
      (issuer === "All" || c.issuer === issuer) &&
      (c.name.toLowerCase().includes(term) || c.issuer.toLowerCase().includes(term)));
    grid.replaceChildren(...visible.map((c) =>
      el("div", { class: "col-sm-6 col-lg-4" },
        el("article", { class: "card cert-card" },
          el("div", { class: "card-body" },
            el("p", { class: "cert-issuer", text: c.issuer }),
            el("h3", { class: "card-title", text: c.name }))))));
    count.textContent = visible.length
      ? `Showing ${visible.length} of ${certifications.length} certifications`
      : "No certifications match your search.";
  };

  const issuers = ["All", ...new Set(certifications.map((c) => c.issuer))];
  buildFilterBar($("#certFilters"), issuers, "certFilter", (value) => { issuer = value; render(); });
  search.addEventListener("input", render);
  render();
};

/* ---------- Typing role animation ---------- */
const initTyping = () => {
  const target = $("#typedRole");
  if (reducedMotion) return;
  let roleIndex = 0, charIndex = roles[0].length, deleting = true;
  const tick = () => {
    const word = roles[roleIndex];
    target.textContent = word.slice(0, charIndex);
    if (deleting) charIndex--; else charIndex++;
    let delay = deleting ? 45 : 85;
    if (!deleting && charIndex > word.length) { deleting = true; delay = 1600; }
    else if (deleting && charIndex < 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; charIndex = 0; delay = 300; }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 1800);
};

/* ---------- Scroll reveal, counters, progress bar, tilt ---------- */
const initMotion = () => {
  const reveal = $$("[data-reveal]");
  const countUp = (node) => {
    const end = Number(node.dataset.count);
    if (reducedMotion) { node.textContent = end; return; }
    const start = performance.now(), duration = 1200;
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      node.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  $("#certCountHero").dataset.count = certifications.length; // keep the stat in sync with the data
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        $$("[data-count]", entry.target).forEach(countUp);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    reveal.forEach((node) => observer.observe(node));
  } else {
    reveal.forEach((node) => node.classList.add("in"));
    $$("[data-count]").forEach(countUp);
  }

  const bar = $("#progress");
  const top = $("#backToTop");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    top.hidden = window.scrollY < 500;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));

  // Gentle 3D tilt on the photo
  const polaroid = $("#polaroid");
  if (!reducedMotion && window.matchMedia("(hover: hover)").matches) {
    polaroid.addEventListener("mousemove", (e) => {
      const r = polaroid.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      polaroid.style.transform = `perspective(700px) rotate(${3 - x * 4}deg) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
    });
    polaroid.addEventListener("mouseleave", () => { polaroid.style.transform = ""; });
  }
};

/* ---------- Fetch API: public GitHub repos (with a built-in fallback list) ---------- */
const knownRepos = [
  { name: "Loan_Recommendation_Agent", html_url: `https://github.com/${GITHUB_USER}/Loan_Recommendation_Agent`, note: "AI loan advisor" },
  { name: "CodSoft", html_url: `https://github.com/${GITHUB_USER}/CodSoft`, language: "Python" },
];

const initGithub = async () => {
  const status = $("#githubStatus");
  const list = $("#githubList");
  let repos = [];
  let live = false;
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=8`);
    if (!response.ok) throw new Error(`GitHub responded with ${response.status}`);
    repos = await response.json();
    live = true;
  } catch (error) {
    /* offline or rate-limited: fall back to the known repositories below */
  }
  // Merge: live data wins, known repos fill any gaps (matched by name, case-insensitive)
  const seen = new Set(repos.map((r) => r.name.toLowerCase()));
  const merged = [...repos, ...knownRepos.filter((r) => !seen.has(r.name.toLowerCase()))];
  status.textContent = live
    ? `${merged.length} repositories on github.com/${GITHUB_USER}`
    : `Showing my main repositories (live GitHub data is unavailable right now)`;
  merged.forEach((repo) => {
    const link = el("a", { href: repo.html_url, target: "_blank", rel: "noopener noreferrer", text: repo.name });
    const detail = repo.language || repo.note;
    list.append(el("li", {}, link, el("span", { class: "muted small", text: detail ? ` – ${detail}` : "" })));
  });
};

/* ---------- Contact form validation ---------- */
const initForm = () => {
  const form = $("#contactForm");
  const alertBox = $("#formAlert");
  const message = $("#message");
  const counter = $("#messageCount");

  const rules = {
    name: (v) => (v.trim().length < 2 ? "Please enter your name (at least 2 characters)." :
                  !/^[A-Za-z][A-Za-z .'-]*$/.test(v.trim()) ? "Name can only contain letters, spaces, . ' and -." : ""),
    email: (v) => (!v.trim() ? "Email is required." :
                   !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Enter a valid email, e.g. name@example.com." : ""),
    phone: (v) => (v.trim() && !/^(\+91[\s-]?)?[6-9]\d{9}$/.test(v.trim().replace(/\s+/g, "")) ? "Enter a valid 10-digit Indian mobile number." : ""),
    subject: (v) => (!v ? "Please choose a subject." : ""),
    message: (v) => (v.trim().length < 20 ? `Message must be at least 20 characters (currently ${v.trim().length}).` : ""),
  };

  const validateField = (field) => {
    const error = rules[field.name](field.value);
    $(`#${field.name}Error`).textContent = error;
    field.classList.toggle("is-invalid", Boolean(error));
    field.classList.toggle("is-valid", !error && field.value.trim() !== "");
    field.setAttribute("aria-invalid", String(Boolean(error)));
    return !error;
  };

  const fields = $$("input[name], select[name], textarea[name]", form);
  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => { if (field.classList.contains("is-invalid")) validateField(field); });
  });
  message.addEventListener("input", () => { counter.textContent = `${message.value.length} / 500`; });

  const showAlert = (type, text) => {
    alertBox.replaceChildren(el("div", { class: `alert alert-${type} alert-dismissible fade show` },
      document.createTextNode(text),
      el("button", { type: "button", class: "btn-close", "data-bs-dismiss": "alert", "aria-label": "Close" })));
    alertBox.focus();
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const results = fields.map(validateField);
    if (results.includes(false)) {
      const bad = results.filter((ok) => !ok).length;
      showAlert("danger", `Please fix ${bad} ${bad === 1 ? "field" : "fields"} and try again.`);
      fields[results.indexOf(false)].focus();
      return;
    }
    const name = $("#name").value.trim().split(" ")[0];
    form.reset();   // the reset handler clears old alerts, so show the new one afterwards
    showAlert("success", `Thanks, ${name}! Your message passed validation. (This demo has no backend, so nothing is actually sent. Please reach me on LinkedIn instead.)`);
  });

  form.addEventListener("reset", () => {
    alertBox.replaceChildren();
    $$(".invalid-feedback", form).forEach((box) => { box.textContent = ""; });
    fields.forEach((f) => { f.classList.remove("is-valid", "is-invalid"); f.removeAttribute("aria-invalid"); });
    counter.textContent = "0 / 500";
  });
};

/* ---------- Misc ---------- */
const initMisc = () => {
  $("#year").textContent = new Date().getFullYear();
  $$("#navLinks .nav-link").forEach((link) =>
    link.addEventListener("click", () => {
      const menu = bootstrap.Collapse.getInstance($("#navLinks"));
      if (menu) menu.hide();
    }));
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initSkills();
  initProjects();
  initCerts();
  initTyping();
  initMotion();
  initForm();
  initMisc();
  initGithub();
});
