// Runtime fixes for puzzle forms and hints.
(function () {
  function findPuzzle(id) {
    for (const act of Acts.data) {
      const puzzle = act.sections.find(section => section.id === id);
      if (puzzle) return puzzle;
    }
    return null;
  }

  Acts.checkPuzzle = function (puzzleId, answer) {
    const puzzle = findPuzzle(puzzleId);
    const form = document.querySelector(`.puzzle-form[data-puzzle-id="${puzzleId}"]`);
    if (!puzzle || !form) return;
    const result = form.querySelector('.puzzle-result');
    const input = form.querySelector('input');
    const normalize = value => String(value || '').trim().toUpperCase().replace(/[^A-Z0-9 ]/g, '').replace(/\s+/g, ' ');
    const accepted = [puzzle.answer, ...(puzzle.alternate_answers || [])].map(normalize);

    if (accepted.includes(normalize(answer))) {
      result.textContent = `✓ ${puzzle.successMessage || 'Correct.'}`;
      result.className = 'puzzle-result success';
      input.disabled = true;
      form.querySelector('button[type="submit"]').disabled = true;
      GameState.solvePuzzle(puzzleId);
      (puzzle.rewards || []).forEach(reward => {
        if (reward.type === 'item') GameState.addItem(reward.id, { name: reward.name, description: reward.description, icon: '📦' });
        if (reward.type === 'evidence') GameState.addEvidence(reward.id, { title: reward.name, description: reward.description });
        if (reward.type === 'unlock') GameState.unlockSection(reward.section);
      });
      const fill = document.querySelector('.progress-fill');
      if (fill) fill.style.width = `${GameState.getCompletion()}%`;
    } else {
      result.textContent = '✗ INCORRECT. Try again.';
      result.className = 'puzzle-result error';
      GameState.recordAttempt(puzzleId, answer);
      input.value = '';
      input.focus();
    }
  };

  Acts.showHint = function (puzzleId) {
    const puzzle = findPuzzle(puzzleId);
    const form = document.querySelector(`.puzzle-form[data-puzzle-id="${puzzleId}"]`);
    if (!puzzle || !form || !puzzle.hints) return;
    Acts.attemptCount = Acts.attemptCount || {};
    const index = Math.min(Acts.attemptCount[puzzleId] || 0, puzzle.hints.length - 1);
    const result = form.querySelector('.puzzle-result');
    result.textContent = `💡 ${puzzle.hints[index]}`;
    result.className = 'puzzle-result hint';
    Acts.attemptCount[puzzleId] = index + 1;
  };
})();
