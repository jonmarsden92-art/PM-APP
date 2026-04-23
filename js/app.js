const KEY = "fluxforge_v1";

const state = {
  projects: [],
  view: "dashboard",
  currentProject: null,
  readOnly: false
};

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  parseURL();
  load();
  bindEvents();
  render();
});

/* EVENTS (robust) */
function bindEvents() {
  document.body.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (!action) return;

    switch (action) {
      case "dashboard": state.view="dashboard"; render(); break;
      case "projects": state.view="projects"; render(); break;
      case "kanban": state.view="kanban"; render(); break;
      case "new-project": openModal(); break;
      case "close-modal": closeModal(); break;
      case "save-project": saveProject(); break;
      case "export": exportData(); break;
      case "import": importData(); break;
      case "share": generateShare(); break;
    }
  });
}

/* STORAGE */
function load() {
  if (state.readOnly) return;
  const d = localStorage.getItem(KEY);
  if (d) state.projects = JSON.parse(d);
}

function save() {
  if (state.readOnly) return;
  localStorage.setItem(KEY, JSON.stringify(state.projects));
}

/* SHARE MODE */
function parseURL() {
  const params = new URLSearchParams(location.search);
  if (params.get("data")) {
    state.projects = JSON.parse(atob(params.get("data")));
    state.readOnly = true;
  }
}

/* RENDER */
function render() {
  if (state.view === "dashboard") renderDashboard();
  if (state.view === "projects") renderProjects();
  if (state.view === "project") renderProject();
  if (state.view === "kanban") renderKanban();
}

/* DASHBOARD */
function renderDashboard() {
  setTitle("Dashboard");
  setContent(`
    <div class="bg-white p-6 rounded shadow">
      Projects: ${state.projects.length}
    </div>
  `);
}

/* PROJECT LIST */
function renderProjects() {
  setTitle("Projects");

  if (!state.projects.length) {
    setContent(`<p>No projects yet</p>`);
    return;
  }

  setContent(`
    <div class="grid gap-4">
      ${state.projects.map(p => `
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">${p.name}</h3>
          <p class="text-sm">${p.desc}</p>
          <button data-open="${p.id}" class="mt-2 text-blue-500">Open</button>
        </div>
      `).join("")}
    </div>
  `);

  document.querySelectorAll("[data-open]").forEach(btn => {
    btn.onclick = () => {
      state.currentProject = btn.dataset.open;
      state.view = "project";
      render();
    };
  });
}

/* PROJECT VIEW */
function renderProject() {
  const p = state.projects.find(x => x.id === state.currentProject);
  if (!p) return;

  setTitle(p.name);

  setContent(`
    <input id="task-input" class="border p-2 mb-3" placeholder="New task">
    <button id="add-task" class="bg-blue-500 text-white px-3 py-1 rounded">Add</button>

    <ul class="mt-4 space-y-1">
      ${p.tasks.map(t => `<li class="bg-white p-2 rounded shadow">${t}</li>`).join("")}
    </ul>
  `);

  document.getElementById("add-task").onclick = () => {
    const val = document.getElementById("task-input").value;
    if (!val) return;
    p.tasks.push(val);
    save();
    renderProject();
  };
}

/* KANBAN */
function renderKanban() {
  setTitle("Kanban");
  setContent(`
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-white p-4 rounded">To Do</div>
      <div class="bg-white p-4 rounded">Doing</div>
      <div class="bg-white p-4 rounded">Done</div>
    </div>
  `);
}

/* MODAL */
function openModal() {
  if (state.readOnly) return;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

/* CREATE PROJECT */
function saveProject() {
  const name = document.getElementById("project-name").value;
  const desc = document.getElementById("project-desc").value;

  if (!name) return;

  state.projects.push({
    id: Date.now().toString(),
    name,
    desc,
    tasks: []
  });

  save();
  closeModal();
  state.view = "projects";
  render();
}

/* SHARE */
function generateShare() {
  const data = btoa(JSON.stringify(state.projects));
  const url = `${location.origin}${location.pathname}?data=${data}`;
  document.getElementById("share-link").innerText = url;
}

/* EXPORT */
function exportData() {
  const data = JSON.stringify(state.projects);
  navigator.clipboard.writeText(data);
  alert("Copied");
}

/* IMPORT */
function importData() {
  const d = prompt("Paste data");
  if (!d) return;
  state.projects = JSON.parse(d);
  save();
  render();
}

/* UTILS */
function setTitle(t) { document.getElementById("title").innerText = t; }
function setContent(html) { document.getElementById("content").innerHTML = html; }
