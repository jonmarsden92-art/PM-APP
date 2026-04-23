function addTask(projectId, task) {
  const project = state.projects.find(p => p.id === projectId);
  if (!project) return;

  project.tasks.push({
    id: 't-' + uid(),
    ...task,
    created: Date.now()
  });

  saveToStorage();
}
