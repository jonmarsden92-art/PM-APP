const KEY = "fluxforge_saas";

const state = {
  projects: [],
  view: "dashboard",
  readOnly: false
};

/* INIT */
function init() {
  parseURL();
  load();
  render();
}

/* SHARE MODE */
function parseURL() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("data")) {
    state.projects = JSON.parse(atob(params.get("data")));
    state.readOnly = true;
  }
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

/* ROUTER */
function render() {
  if (state.view === "dashboard") dashboard();
  if (state.view === "projects") projects();
  if (state.view === "kanban") kanban();
}

/* DASHBOARD */
function dashboard() {
  setTitle("Dashboard");

  content(`
    <div class="bg-white p-6 rounded shadow">
      <h2>Projects: ${state.projects.length}</h2>
    </div>
  `);
}

/* PROJECTS */
function projects() {
  setTitle("Projects");

  content(`
    <div class="grid gap-4">
      ${state.projects.map(p => `
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">${p.name}</h3>
          <p class="text-sm">${p.desc}</p>
          <button onclick="app.openProject('${p.id}')">Open</button>
        </div>
      `).join("")}
    </div>
  `);
}

/* PROJECT VIEW */
function openProject(id) {
  const p = state.projects.find(x => x.id === id);

  content(`
    <h2 class="text-xl mb-4">${p.name}</h2>

    <input id="taskInput" placeholder="New task" class="border p-2 mb-3">

    <button onclick="app.addTask('${id}')">Add Task</button>

    <ul class="mt-4">
      ${p.tasks.map(t => `<li>${t}</li>`).join("")}
    </ul>
  `);
}

/* TASK */
function addTask(id) {
  const val = document.getElementById("taskInput").value;
  const p = state.projects.find(x => x.id === id);
  p.tasks.push(val);
  save();
  openProject(id);
}

/* KANBAN */
function kanban() {
  setTitle("Kanban");

  content(`
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-white p-4">To Do</div>
      <div class="bg-white p-4">Doing</div>
      <div class="bg-white p-4">Done</div>
    </div>
  `);
}

/* MODAL */
function openProjectModal() {
  if (state.readOnly) return;
  modal(true);
}

function closeModal() {
  modal(false);
}

function modal(show) {
  document.getElementById("modal").classList.toggle("hidden", !show);
}

/* SAVE */
function saveProject() {
  const name = document.getElementById("name").value;
  const desc = document.getElementById("desc").value;

  state.projects.push({
    id: Date.now().toString(),
    name,
    desc,
    tasks: []
  });

  save();
  closeModal();
  projects();
}

/* SHARE */
function generateShare() {
  const data = btoa(JSON.stringify(state.projects));
  const url = `${location.origin}${location.pathname}?data=${data}`;

  document.getElementById("shareLink").innerText = url;
}

/* EXPORT */
function exportData() {
  const data = JSON.stringify(state.projects);
  navigator.clipboard.writeText(data);
  alert("Copied to clipboard");
}

/* IMPORT */
function importData() {
  const d = prompt("Paste data");
  if (!d) return;

  state.projects = JSON.parse(d);
  save();
  render();
}

/* NAV */
function showDashboard() { state.view="dashboard"; render(); }
function showProjects() { state.view="projects"; render(); }
function showKanban() { state.view="kanban"; render(); }

/* UTILS */
function setTitle(t) { document.getElementById("title").innerText = t; }
function content(html) { document.getElementById("content").innerHTML = html; }

/* INIT */
window.app = {
  showDashboard,
  showProjects,
  showKanban,
  openProjectModal,
  closeModal,
  saveProject,
  openProject,
  addTask,
  generateShare,
  exportData,
  importData
};

init();
