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

/* ROUTING */
function render() {
  if (state.view === "dashboard") renderDashboard();
  if (state.view === "projects") renderProjects();
}

/* DASHBOARD */
function renderDashboard() {
  document.getElementById("page-title").innerText = "Dashboard";

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
  document.getElementById("page-title").innerText = "Projects";

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
        </div>
      `).join("")}
    </div>
  `;
}

/* ACTIONS */
function showDashboard() {
  state.view = "dashboard";
  render();
}

function showProjects() {
  state.view = "projects";
  render();
}

/* MODAL */
function openNewProject() {
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

/* SAVE PROJECT */
function saveProject() {
  const name = document.getElementById("project-name").value;

  if (!name) return;

  state.projects.push({
    id: Date.now(),
    name
  });

  save();
  closeModal();
  renderProjects();
}

/* INIT */
window.app = {
  showDashboard,
  showProjects,
  openNewProject,
  closeModal,
  saveProject
};

init();
