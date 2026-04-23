function renderSidebar() {
  document.getElementById('app-sidebar').innerHTML = `
    <div class="p-4 text-white">FluxForge</div>
  `;
}

function renderTopbar(title) {
  document.getElementById('topbar').innerHTML = `
    <div class="p-3 font-bold">${title}</div>
  `;
}

function renderContent(html) {
  document.getElementById('content-area').innerHTML = html;
}
