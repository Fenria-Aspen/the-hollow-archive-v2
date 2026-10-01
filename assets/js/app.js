// Main application initialization

document.addEventListener('DOMContentLoaded', () => {
  // Initialize game state
  GameState.init();
  
  // Render initial page
  UIRouter.navigate(GameState.currentPage || 'landing');
  
  // Update progress bar
  const progressFill = document.querySelector('.progress-fill');
  const completion = GameState.getCompletion();
  progressFill.style.width = completion + '%';
  
  // Update status
  const statusEl = document.querySelector('.status');
  if (GameState.currentAct > 0) {
    statusEl.textContent = `ACT ${GameState.currentAct + 1}/5`;
  }
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Alt+1 through Alt+5 for act navigation
    if (e.altKey && e.key >= '1' && e.key <= '5') {
      const act = parseInt(e.key) - 1;
      if (GameState.unlockedSections.has('act' + (act + 1))) {
        UIRouter.navigate('act' + (act + 1));
      }
    }
    
    // Alt+H for home
    if (e.altKey && e.key === 'h') {
      UIRouter.navigate('landing');
    }
    
    // Alt+I for inventory
    if (e.altKey && e.key === 'i') {
      UIRouter.navigate('inventory');
    }
  });
  
  // Easter egg: Konami code
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        GameState.discoverSecret('konami_code');
        alert('🎮 CHEAT CODE ACTIVATED\n\nSecret content unlocked.');
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  console.log(`%c🏛️ THE HOLLOW ARCHIVE`, 'font-size: 20px; font-weight: bold; color: #ff4444;');
  console.log('Welcome, witness. The archive is watching.');
  console.log(`Completion: ${GameState.getCompletion()}%`);
});
