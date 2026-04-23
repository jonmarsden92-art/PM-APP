const STORAGE_KEY = 'fluxforge_data_v2';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.projects) state.projects = data.projects;
    }
  } catch (e) {
    console.error(e);
  }
}

function saveToStorage() {
  if (state.isReadOnly) return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      projects: state.projects,
      lastSave: Date.now()
    })
  );
}
