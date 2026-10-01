// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
  GameState.init();
  UIRouter.currentPage = GameState.currentPage || 'landing';
  UIRouter.render();
  updateProgress();
  const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let index = 0;
  document.addEventListener('keydown', event => {
    if (event.key === konamiCode[index]) {
      index++;
      if (index === konamiCode.length) {
        GameState.discoverSecret('konami_code');
        alert('CHEAT CODE ACTIVATED\\nSecret content unlocked.');
        index = 0;
      }
    } else index = 0;
  });
});

function updateProgress() {
  const fill = document.querySelector('.progress-fill');
  if (fill) fill.style.width = `${GameState.getCompletion()}%`;
  const status = document.getElementById('footer-status');
  if (status) status.textContent = 'ONLINE';
}
