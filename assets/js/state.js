// Game state management system

const GameState = {
  // Core progression
  currentAct: 0,
  currentPage: 'landing',
  completedActs: new Set(),
  
  // Player inventory
  inventory: {
    items: new Map(),
    totalItems: 0
  },
  
  // Evidence collected
  evidence: {
    documents: new Map(),
    audioLogs: new Map(),
    photographs: new Map(),
    connections: [] // Links between evidence pieces
  },
  
  // Decrypted messages
  decrypted: new Map(),
  
  // Puzzles solved
  solvedPuzzles: new Set(),
  attemptedPuzzles: new Map(), // Track wrong answers
  
  // Discovered locations/sections
  unlockedSections: new Set(['landing', 'act1']),
  discoveredSecrets: new Set(),
  
  // Time tracking
  startTime: null,
  sessionTime: 0,
  
  // Endings discovered
  endingsFound: new Set(),
  
  // Initialize state from localStorage
  init() {
    const saved = localStorage.getItem('hollow-archive-state');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        Object.assign(this, data);
        this.completedActs = new Set(data.completedActs || []);
        this.solvedPuzzles = new Set(data.solvedPuzzles || []);
        this.unlockedSections = new Set(data.unlockedSections || ['landing', 'act1']);
        this.discoveredSecrets = new Set(data.discoveredSecrets || []);
        this.endingsFound = new Set(data.endingsFound || []);
        this.inventory.items = new Map(data.inventory?.items || []);
        this.evidence.documents = new Map(data.evidence?.documents || []);
        this.evidence.audioLogs = new Map(data.evidence?.audioLogs || []);
        this.evidence.photographs = new Map(data.evidence?.photographs || []);
        this.decrypted = new Map(data.decrypted || []);
      } catch (e) {
        console.warn('Failed to load saved state:', e);
      }
    }
    this.startTime = this.startTime || Date.now();
  },
  
  // Save state to localStorage
  save() {
    const data = {
      currentAct: this.currentAct,
      currentPage: this.currentPage,
      completedActs: Array.from(this.completedActs),
      solvedPuzzles: Array.from(this.solvedPuzzles),
      unlockedSections: Array.from(this.unlockedSections),
      discoveredSecrets: Array.from(this.discoveredSecrets),
      endingsFound: Array.from(this.endingsFound),
      inventory: {
        items: Array.from(this.inventory.items),
        totalItems: this.inventory.totalItems
      },
      evidence: {
        documents: Array.from(this.evidence.documents),
        audioLogs: Array.from(this.evidence.audioLogs),
        photographs: Array.from(this.evidence.photographs),
        connections: this.evidence.connections
      },
      decrypted: Array.from(this.decrypted),
      startTime: this.startTime
    };
    localStorage.setItem('hollow-archive-state', JSON.stringify(data));
  },
  
  // Add item to inventory
  addItem(id, item) {
    this.inventory.items.set(id, {
      ...item,
      acquiredAt: Date.now()
    });
    this.inventory.totalItems++;
    this.save();
  },
  
  // Add evidence
  addEvidence(id, evidence, type = 'documents') {
    this.evidence[type].set(id, {
      ...evidence,
      discoveredAt: Date.now()
    });
    this.save();
  },
  
  // Link evidence together
  linkEvidence(id1, id2, description) {
    this.evidence.connections.push({
      id1, id2, description,
      linkedAt: Date.now()
    });
    this.save();
  },
  
  // Mark puzzle as solved
  solvePuzzle(puzzleId) {
    this.solvedPuzzles.add(puzzleId);
    this.save();
  },
  
  // Record wrong attempt
  recordAttempt(puzzleId, answer) {
    if (!this.attemptedPuzzles.has(puzzleId)) {
      this.attemptedPuzzles.set(puzzleId, []);
    }
    this.attemptedPuzzles.get(puzzleId).push({
      answer,
      timestamp: Date.now()
    });
  },
  
  // Unlock new section
  unlockSection(sectionId) {
    this.unlockedSections.add(sectionId);
    this.save();
  },
  
  // Discover secret
  discoverSecret(secretId) {
    this.discoveredSecrets.add(secretId);
    this.save();
  },
  
  // Record ending
  recordEnding(endingId) {
    this.endingsFound.add(endingId);
    this.save();
  },
  
  // Get game completion percentage
  getCompletion() {
    const maxActs = 5;
    const maxSecrets = 12;
    const maxEndings = 3;
    const totalMax = maxActs + maxSecrets + maxEndings;
    
    const currentTotal = this.completedActs.size + this.discoveredSecrets.size + this.endingsFound.size;
    return Math.round((currentTotal / totalMax) * 100);
  },
  
  // Reset game
  reset() {
    if (confirm('Reset all progress? This cannot be undone.')) {
      localStorage.removeItem('hollow-archive-state');
      location.reload();
    }
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  GameState.init();
});
