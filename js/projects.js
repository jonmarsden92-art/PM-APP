function createProject(data) {
  return {
    id: 'p-' + uid(),
    ...data,
    tasks: [],
    created: Date.now(),
    updated: Date.now()
  };
}

function addProject(project) {
  state.projects.push(project);
  saveToStorage();
}
