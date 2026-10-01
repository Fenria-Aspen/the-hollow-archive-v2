// Landing page and intro sequences

const LandingPage = {
  render() {
    return `
      <section class="hero landing-hero">
        <div class="glitch-text" data-text="THE HOLLOW ARCHIVE">
          THE HOLLOW ARCHIVE
        </div>
        <p class="lead">An interactive experience about forgotten names, hidden ledgers, and the witness who remembers.</p>
        <p class="subtitle">Completion: ${GameState.getCompletion()}%</p>
      </section>

      <section class="panel intro-panel">
        <p class="panel-title">CLASSIFIED TRANSMISSION</p>
        <blockquote>
          "The archive does not keep records. It keeps what was never meant to be remembered. Some names are erased from history. Others fade into silence. But they are not gone—they are *hidden*. And hidden things wait for those patient enough to seek them."
        </blockquote>
      </section>

      <section class="panel action-panel">
        <p class="panel-title">ARCHIVE ACCESS PROTOCOLS</p>
        
        <div class="action-grid">
          <button class="action-btn" data-action="begin">
            <span class="action-icon">►</span>
            BEGIN ACT I
          </button>
          
          ${GameState.unlockedSections.has('secrets') ? `
            <button class="action-btn secret-btn" data-action="secrets">
              <span class="action-icon">⚡</span>
              HIDDEN SECTIONS
            </button>
          ` : ''}
          
          ${GameState.completedActs.size > 0 ? `
            <button class="action-btn" data-action="continue">
              <span class="action-icon">⟳</span>
              CONTINUE (ACT ${GameState.currentAct + 1})
            </button>
          ` : ''}
        </div>
      </section>

      <section class="panel info-panel">
        <p class="panel-title">REQUIRED READING</p>
        <ul class="info-list">
          <li>📖 Five acts of discovery await.</li>
          <li>🔐 Cipher knowledge will be tested.</li>
          <li>📝 Collect evidence as you progress.</li>
          <li>🔗 Everything is connected. Nothing is coincidence.</li>
          <li>⚠️ Some secrets are meant to stay hidden.</li>
        </ul>
      </section>

      <section class="panel social-panel">
        <p class="panel-title">TRANSMISSION FREQUENCY</p>
        <p>Found something? Share your discoveries.</p>
        <div class="social-buttons">
          <button onclick="navigator.clipboard.writeText(window.location.href)">Copy Link</button>
          <button onclick="window.open('https://twitter.com/intent/tweet?text=I%27m%20exploring%20The%20Hollow%20Archive%20%23ARG')">Share on Twitter</button>
        </div>
      </section>
    `;
  },
  
  attach() {
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        if (action === 'begin') {
          this.startGame();
        } else if (action === 'continue') {
          UIRouter.navigate('act' + GameState.currentAct);
        } else if (action === 'secrets') {
          UIRouter.navigate('secrets');
        }
      });
    });
  },
  
  startGame() {
    GameState.unlockSection('act1');
    GameState.currentAct = 0;
    GameState.currentPage = 'act1';
    GameState.save();
    UIRouter.navigate('act1');
  }
};
