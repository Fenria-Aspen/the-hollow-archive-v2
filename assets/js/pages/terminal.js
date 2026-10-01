// Terminal interface for secret commands

const TerminalPage = {
  render() {
    return `
      <section class="hero">
        <h1>ARCHIVE TERMINAL</h1>
        <p class="lead">Command line interface for archive access.</p>
      </section>

      <section class="panel terminal-panel">
        <div id="terminal" class="terminal">
          <div class="terminal-line">>>> ARCHIVE TERMINAL v2.1</div>
          <div class="terminal-line">>>> Type 'help' for available commands</div>
          <div class="terminal-line"></div>
        </div>
        <input type="text" id="terminal-input" class="terminal-input" placeholder="Enter command..." autocomplete="off" />
      </section>
    `;
  },
  
  attach() {
    const input = document.getElementById('terminal-input');
    const terminal = document.getElementById('terminal');
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const command = input.value.trim().toLowerCase();
        input.value = '';
        
        this.addLine(`> ${command}`);
        this.executeCommand(command);
        terminal.scrollTop = terminal.scrollHeight;
      }
    });
  },
  
  addLine(text) {
    const terminal = document.getElementById('terminal');
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.textContent = text;
    terminal.appendChild(line);
  },
  
  executeCommand(command) {
    const commands = {
      'help': () => {
        this.addLine('Available commands:');
        this.addLine('  status - Current archive status');
        this.addLine('  progress - Completion percentage');
        this.addLine('  inventory - List collected items');
        this.addLine('  secrets - Show discovered secrets');
        this.addLine('  decrypt [text] - Quick caesar decoder (shift 3)');
      },
      'status': () => {
        this.addLine(`Archive Status: ACT ${GameState.currentAct + 1}/5`);
        this.addLine(`Puzzles Solved: ${GameState.solvedPuzzles.size}`);
        this.addLine(`Secrets Found: ${GameState.discoveredSecrets.size}`);
      },
      'progress': () => {
        this.addLine(`Progress: ${GameState.getCompletion()}%`);
      },
      'inventory': () => {
        if (GameState.inventory.items.size === 0) {
          this.addLine('Inventory empty.');
        } else {
          GameState.inventory.items.forEach((item, id) => {
            this.addLine(`[${id}] ${item.name}`);
          });
        }
      }
    };
    
    if (command.startsWith('decrypt ')) {
      const text = command.replace('decrypt ', '');
      const result = Ciphers.caesar(text, 3);
      this.addLine(result);
    } else if (commands[command]) {
      commands[command]();
    } else {
      this.addLine('Unknown command. Type "help" for options.');
    }
  }
};
