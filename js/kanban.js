function moveTask(taskId, newStatus) {
  state.projects.forEach(p => {
    const task = p.tasks.find(t => t.id === taskId);
    if (task) task.status = newStatus;
  });

  saveToStorage();
}
