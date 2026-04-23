const state = {
  projects: [],
  currentView: 'dashboard',
  selectedProjectId: null,
  sidebarOpen: true,
  editingProjectId: null,
  editingTaskId: null,
  kanbanProjectId: null,
  calendarDate: new Date(),
  isReadOnly: false,
  viewMode: null,
  shareProjectId: null,
};

window.state = state;
