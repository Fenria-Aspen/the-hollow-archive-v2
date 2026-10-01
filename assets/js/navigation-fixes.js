// Navigation fixes loaded after the legacy UI controller.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const sidebar = document.querySelector('.sidebar-nav');
  if (toggle && sidebar) {
    toggle.onclick = () => sidebar.classList.toggle('open');
  }

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.onclick = event => {
      event.preventDefault();
      const page = link.dataset.section;
      if (page === 'reset') {
        GameState.reset();
        return;
      }
      UIRouter.navigate(page);
      sidebar?.classList.remove('open');
    };
  });
});
