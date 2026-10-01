// UI Router and main interface controller

const UIRouter = {
  currentPage: 'landing',
  
  navigate(page) {
    this.currentPage = page;
    this.render();
    GameState.currentPage = page;
    GameState.save();
  },
  
  render() {
    const content = document.getElementById('content-area');
    let html = '';
    
    if (this.currentPage === 'landing') {
      html = LandingPage.render();
    } else if (this.currentPage.startsWith('act')) {
      const actNum = parseInt(this.currentPage.replace('act', ''));
      html = Acts.render('act' + actNum);
    } else if (this.currentPage === 'inventory') {
      html = InventoryPage.render();
    } else if (this.currentPage === 'evidence') {
      html = EvidencePage.render();
    } else if (this.currentPage === 'decoder') {
      html = DecoderPage.render();
    } else if (this.currentPage === 'terminal') {
      html = TerminalPage.render();
    }
    
    content.innerHTML = html;
    
    // Attach event handlers
    if (this.currentPage === 'landing') {
      LandingPage.attach();
    } else if (this.currentPage.startsWith('act')) {
      Acts.attach();
    } else if (this.currentPage === 'terminal') {
      TerminalPage.attach();
    } else if (this.currentPage === 'decoder') {
      // Decoder already has inline handlers
    }
    
    // Update nav
    this.updateNav();
  },
  
  updateNav() {
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.classList.remove('active');
      const section = link.dataset.section;
      if (section === this.currentPage) {
        link.classList.add('active');
      }
    });
  }
};

// Sidebar navigation
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
  
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      UIRouter.navigate(section);
      menu.classList.remove('open');
    });
  });
});

// Footer time updater
function updateFooterTime() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById('footer-time').textContent = time;
}

setInterval(updateFooterTime, 1000);
updateFooterTime();
