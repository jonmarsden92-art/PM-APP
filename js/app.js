const STORAGE_KEY = "fluxforge_data";

const state = {
  projects: [],
  view: "dashboard"
};

/* INIT */
function init() {
  load();
  render();
}

/* STORAGE */
function load() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) state.projects = JSON.parse(data);
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.projects));
}

/* ROUTER */
function render() {
  if (state.view === "dashboard") renderDashboard();
  if (state.view === "projects") renderProjects();
  if (state.view === "kanban") renderKanban();
}

/* DASHBOARD */
function renderDashboard() {
  setTitle("Dashboard");

  document.getElementById("content").innerHTML = `
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-lg font-bold">Welcome to FluxForge</h2>
      <p class="text-gray-500 mt-2">
        You have ${state.projects.length} projects.
      </p>
    </div>
  `;
}

/* PROJECTS */
function renderProjects() {
  setTitle("Projects");

  if (!state.projects.length) {
    document.getElementById("content").innerHTML = `
      <p>No projects yet.</p>
    `;
    return;
  }

  document.getElementById("content").innerHTML = `
    <div class="grid gap-4">
      ${state.projects.map(p => `
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">${p.name}</h3>
          <p class="text-sm text-gray-500">${p.desc || ""}</p>
        </div>
      `).join("")}
    </div>
  `;
}

/* KANBAN */
function renderKanban() {
  setTitle("Kanban");

  document.getElementById("content").innerHTML = `
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-white p-4 rounded">To Do</div>
      <div class="bg-white p-4 rounded">In Progress</div>
      <div class="bg-white p-4 rounded">Done</div>
    </div>
  `;
}

/* NAV */
function showDashboard() {
  state.view = "dashboard";
  render();
}

function showProjects() {
  state.view = "projects";
  render();
}

function showKanban() {
  state.view = "kanban";
  render();
}

/* MODAL */
function openProjectModal() {
  document.getElementById("project-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("project-modal").classList.add("hidden");
}

/* SAVE PROJECT */
function saveProject() {
  const name = document.getElementById("project-name").value;
  const desc = document.getElementById("project-desc").value;

  if (!name) return;

  state.projects.push({
    id: Date.now(),
    name,
    desc,
    tasks: []
  });

  save();
  closeModal();
  showProjects();
}

/* UTIL */
function setTitle(title) {
  document.getElementById("page-title").innerText = title;
}

/* INIT */
window.app = {
  showDashboard,
  showProjects,
  showKanban,
  openProjectModal,
  closeModal,
  saveProject
};

init();
