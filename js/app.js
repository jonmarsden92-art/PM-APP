function init() {
  loadFromStorage();
  renderSidebar();
  showDashboard();
}

function showDashboard() {
  state.currentView = 'dashboard';
  renderTopbar('Dashboard');

  renderContent(`
    <div class="p-6">
      <h2>Welcome to FluxForge</h2>
    </div>
  `);
}

window.app = {
  init,
  showDashboard
};

document.addEventListener('DOMContentLoaded', init);
