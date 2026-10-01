// Evidence board system

const EvidencePage = {
  render() {
    const docs = Array.from(GameState.evidence.documents.values());
    const audio = Array.from(GameState.evidence.audioLogs.values());
    const photos = Array.from(GameState.evidence.photographs.values());
    const connections = GameState.evidence.connections;
    
    let html = `
      <section class="hero">
        <h1>EVIDENCE BOARD</h1>
        <p class="lead">Connect the pieces. Find the truth.</p>
      </section>
    `;
    
    if (docs.length > 0) {
      html += `
        <section class="panel">
          <p class="panel-title">DOCUMENTS (${docs.length})</p>
          <div class="evidence-list">
      `;
      docs.forEach(doc => {
        html += `
          <div class="evidence-item document" data-id="${doc.id}">
            <div class="evidence-icon">📄</div>
            <div class="evidence-content">
              <div class="evidence-title">${doc.title}</div>
              <div class="evidence-excerpt">${doc.excerpt || doc.description}</div>
              ${doc.date ? `<div class="evidence-meta">Date: ${doc.date}</div>` : ''}
            </div>
          </div>
        `;
      });
      html += '</div></section>';
    }
    
    if (audio.length > 0) {
      html += `
        <section class="panel">
          <p class="panel-title">AUDIO RECORDINGS (${audio.length})</p>
          <div class="evidence-list">
      `;
      audio.forEach(record => {
        html += `
          <div class="evidence-item audio">
            <div class="evidence-icon">🔊</div>
            <div class="evidence-content">
              <div class="evidence-title">${record.title}</div>
              <div class="evidence-excerpt">${record.transcript || 'Transcript unavailable'}</div>
            </div>
          </div>
        `;
      });
      html += '</div></section>';
    }
    
    if (connections.length > 0) {
      html += `
        <section class="panel">
          <p class="panel-title">CONNECTIONS (${connections.length})</p>
          <div class="connections-list">
      `;
      connections.forEach(conn => {
        html += `
          <div class="connection-item">
            <span class="conn-id1">${conn.id1}</span>
            <span class="conn-arrow">→</span>
            <span class="conn-desc">${conn.description}</span>
            <span class="conn-arrow">→</span>
            <span class="conn-id2">${conn.id2}</span>
          </div>
        `;
      });
      html += '</div></section>';
    }
    
    if (docs.length === 0 && audio.length === 0 && photos.length === 0) {
      html += `
        <section class="panel">
          <p>No evidence collected yet. Solve puzzles and discover documents to populate this board.</p>
        </section>
      `;
    }
    
    return html;
  }
};
