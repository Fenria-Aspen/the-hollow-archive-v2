// Inventory management system

const InventoryPage = {
  render() {
    const items = Array.from(GameState.inventory.items.values());
    
    if (items.length === 0) {
      return `
        <section class="hero">
          <h1>INVENTORY</h1>
          <p class="lead">Nothing collected yet.</p>
        </section>
        <section class="panel">
          <p>As you progress through the archive, you will collect artifacts and fragments of knowledge. They will appear here.</p>
        </section>
      `;
    }
    
    let html = `
      <section class="hero">
        <h1>INVENTORY</h1>
        <p class="lead">${items.length} item(s) collected</p>
      </section>
      <div class="inventory-grid">
    `;
    
    items.forEach(item => {
      html += `
        <div class="inventory-item">
          <div class="item-icon">${item.icon || '📦'}</div>
          <div class="item-name">${item.name}</div>
          <div class="item-desc">${item.description}</div>
          ${item.notes ? `<div class="item-notes">${item.notes}</div>` : ''}
        </div>
      `;
    });
    
    html += '</div>';
    return html;
  }
};
