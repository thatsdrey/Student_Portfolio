"use strict";
const $ = (s) => document.querySelector(s);
const svg = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;

const ICONS = {
  home: '<path d="M3 11l9-8 9 8v10H3z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  folder: '<path d="M3 6h7l2 2h9v11H3z"/>',
  cal: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/>',
  pin: '<path d="M12 22s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 3 9 3 12 0v-5"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
  x: '<path d="M4 4l16 16M20 4L4 20"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  display: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>'
};

const SOCIALS = [
  { name: "GitHub", icon: "github", url: "https://github.com/thatsdrey" },
  { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/thatsdrey/" },
  { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/thats_d.rey/" },
  { name: "X", icon: "x", url: "https://x.com/_thatsdrey" },
  { name: "theerealdaniel@gmail.com", icon: "mail", url: "mailto:theerealdaniel@gmail.com" }
];

/* ---------- shared UI: icons, social links, footer year ---------- */
function renderSocials() {
  document.querySelectorAll("[data-socials]").forEach((ul) => {
    ul.innerHTML = SOCIALS.map((s) => {
      const ext = s.url.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
      return `<li><a href="${s.url}"${ext}>${svg(ICONS[s.icon])}<span>${s.name}</span></a></li>`;
    }).join("");
  });
}
document.querySelectorAll("i[data-i]").forEach((i) => (i.innerHTML = svg(ICONS[i.dataset.i])));
renderSocials();
document.querySelectorAll("[data-year]").forEach((y) => (y.textContent = new Date().getFullYear()));

/* ---------- responsive navigation ---------- */
const menuBtn = $("#menu-toggle"), header = $("header"), mainNav = $("#main-nav");
function setMenuOpen(open) {
  header.classList.toggle("nav-open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menuBtn.querySelector("i").innerHTML = svg(ICONS[open ? "x" : "menu"]);
}
menuBtn.addEventListener("click", () => {
  setMenuOpen(menuBtn.getAttribute("aria-expanded") !== "true");
});
mainNav.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenuOpen(false);
});
document.addEventListener("click", (e) => {
  if (!header.contains(e.target)) setMenuOpen(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuBtn.focus();
  }
});
window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
  if (e.matches) setMenuOpen(false);
});

/* ---------- light / dark theme ---------- */
const root = document.documentElement;
const themeChoices = document.querySelectorAll("[data-theme-choice]");
const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
let themePreference;
try { themePreference = localStorage.getItem("dd-theme"); } catch (e) {}
let selectedTheme = ["light", "dark"].includes(themePreference) ? themePreference : "system";

function applyTheme(choice) {
  root.dataset.theme = choice === "system" ? (colorScheme.matches ? "dark" : "light") : choice;
  themeChoices.forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.themeChoice === choice);
  });
}
themeChoices.forEach((button) => {
  button.addEventListener("click", () => {
    selectedTheme = button.dataset.themeChoice;
    applyTheme(selectedTheme);
    try { localStorage.setItem("dd-theme", selectedTheme); } catch (e) {}
  });
});
colorScheme.addEventListener("change", () => {
  if (selectedTheme === "system") applyTheme("system");
});
applyTheme(selectedTheme);

/* ---------- home: typing effect ---------- */
const roleEl = $("#role");
if (roleEl) {
  const roles = ["Backend Developer", "Python Developer", "Aspiring AI/ML Engineer", "Future LLM Builder"];
  let r = 0, c = 0, deleting = false;
  (function tick() {
    const word = roles[r];
    roleEl.textContent = word.slice(0, c);
    if (!deleting && c === word.length) { deleting = true; return setTimeout(tick, 1400); }
    if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; }
    c += deleting ? -1 : 1;
    setTimeout(tick, deleting ? 40 : 80);
  })();
}

/* ---------- planner ---------- */
if ($("#task-form")) {
  const KEY = "dd-academic-planner";
  const form = $("#task-form"), list = $("#task-list");
  let editId = null;

  const day = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
  const seed = () => [
    { id: 1, title: "Finish COS 106 term project", desc: "Polish every page, test on mobile, then deploy to GitHub Pages.", date: day(3), time: "18:00", done: false },
    { id: 2, title: "Python practice session", desc: "Solve three problems on lists, dictionaries and functions.", date: day(1), time: "09:00", done: false },
    { id: 3, title: "freeCodeCamp backend module", desc: "Complete the next lesson and push the notes to GitHub.", date: day(5), time: "20:00", done: false },
    { id: 4, title: "Read about how LLMs work", desc: "Watch one intro video on transformers and write a short summary.", date: day(7), time: "16:30", done: false },
    { id: 5, title: "Set up this planner", desc: "Open the planner and try adding, editing and deleting tasks.", date: day(0), time: "", done: true }
  ];
  const load = () => {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(s)) return s; } catch (e) {}
    return seed();
  };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(tasks)); } catch (e) {} };
  let tasks = load();

  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };
  const dueDate = (t) => (t.date ? new Date(`${t.date}T${t.time || "23:59"}`) : null);
  const dueText = (t) => {
    const d = dueDate(t);
    if (!d) return "No due date";
    return "Due " + d.toLocaleString([], { dateStyle: "medium", ...(t.time ? { timeStyle: "short" } : {}) });
  };

  function render() {
    list.replaceChildren();
    if (!tasks.length) list.append(el("li", "empty", "No tasks yet. Add your first task using the form."));
    tasks.forEach((t) => {
      const li = el("li", "task" + (t.done ? " done" : ""));
      li.dataset.id = t.id;
      const cb = el("input");
      cb.type = "checkbox"; cb.checked = t.done; cb.dataset.act = "toggle";
      cb.setAttribute("aria-label", "Mark “" + t.title + "” as completed");
      const late = !t.done && dueDate(t) && dueDate(t) < new Date();
      const body = el("div", "tbody");
      body.append(el("h3", "", t.title), el("p", "", t.desc), el("p", "due" + (late ? " late" : ""), dueText(t) + (late ? " (overdue)" : "")));
      const acts = el("div", "acts");
      const edit = el("button", "sm", "Edit"); edit.dataset.act = "edit";
      const del = el("button", "sm danger", "Delete"); del.dataset.act = "delete";
      acts.append(edit, del);
      li.append(cb, body, acts);
      list.append(li);
    });
    const done = tasks.filter((t) => t.done).length;
    $("#count").textContent = `${done} of ${tasks.length} tasks completed`;
  }

  function resetForm() {
    editId = null; form.reset();
    $("#form-title").textContent = "Add a task";
    $("#t-save").textContent = "Add task";
    $("#t-cancel").hidden = true;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = $("#t-title").value.trim();
    if (!title) { $("#t-title").focus(); return; }
    const data = { title, desc: $("#t-desc").value.trim(), date: $("#t-date").value, time: $("#t-time").value };
    if (editId) tasks = tasks.map((t) => (t.id === editId ? { ...t, ...data } : t));
    else tasks.push({ id: Date.now(), done: false, ...data });
    save(); resetForm(); render();
  });
  $("#t-cancel").addEventListener("click", resetForm);

  list.addEventListener("click", (e) => {
    const act = e.target.dataset.act, li = e.target.closest("li");
    if (!act || !li) return;
    const id = Number(li.dataset.id), t = tasks.find((x) => x.id === id);
    if (act === "toggle") t.done = e.target.checked;
    if (act === "delete") tasks = tasks.filter((x) => x.id !== id);
    if (act === "edit") {
      editId = id;
      $("#t-title").value = t.title; $("#t-desc").value = t.desc;
      $("#t-date").value = t.date; $("#t-time").value = t.time;
      $("#form-title").textContent = "Edit task";
      $("#t-save").textContent = "Save changes";
      $("#t-cancel").hidden = false;
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      $("#t-title").focus();
      return;
    }
    save(); render();
  });
  render();
}

/* ---------- contact form validation ---------- */
const contact = $("#contact-form");
if (contact) {
  const val = (n) => contact.elements[n].value.trim();
  const setErr = (n, msg) => { $("#e-" + n).textContent = msg; return !msg; };
  const emailOk = (s) => contact.elements.email.checkValidity() && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
  const phoneOk = (s, code) => {
    const number = s.replace(/[\s().-]/g, "");
    if (!/^\d+$/.test(number)) return false;
    if (code === "+234") return /^[789]\d{9}$/.test(number);
    return number.length >= 4 && number.length + code.length - 1 <= 15;
  };
  const countryCode = contact.elements["country-code"];
  const phoneInput = contact.elements.phone;
  countryCode.addEventListener("change", () => {
    phoneInput.placeholder = countryCode.value === "+234" ? "803 123 4567" : "Local number";
    setErr("phone", "");
  });

  contact.addEventListener("submit", (e) => {
    e.preventDefault();
    const results = [
      setErr("name", val("name") ? "" : "Enter your name."),
      setErr("email", !val("email") ? "Enter your email address." : emailOk(val("email")) ? "" : "Enter a valid email address, like name@example.com."),
      setErr("phone", !val("phone") ? "Enter your phone number." : phoneOk(val("phone"), countryCode.value) ? "" : countryCode.value === "+234" ? "Enter the 10-digit Nigerian number without the leading 0, like 8031234567." : "Enter at least 4 digits for the selected country code."),
      setErr("message", val("message") ? "" : "Write a message.")
    ];
    const status = $("#form-status");
    if (results.includes(false)) { status.hidden = true; return; }
    status.textContent = `Thanks, ${val("name")}. Your details are valid, so your email app will open with the message ready to send.`;
    status.hidden = false;
    const body = `${val("message")}\n\nFrom: ${val("name")}\nPhone: ${countryCode.value} ${val("phone")}\nEmail: ${val("email")}`;
    window.location.href = `mailto:theerealdaniel@gmail.com?subject=${encodeURIComponent("Portfolio message from " + val("name"))}&body=${encodeURIComponent(body)}`;
    contact.reset();
  });
}
