document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  const form = document.querySelector('form');
  const resultElement = document.getElementById('result');

  if (!form || !resultElement) return;

  const navigationMap = {
    landing: 'act1.html',
    act1: 'act2.html',
    act2: 'act3.html',
    act3: 'act4.html',
    act4: 'act5.html',
    act5: null
  };

  const showResult = (message, isSuccess) => {
    resultElement.textContent = message;
    resultElement.className = `result ${isSuccess ? 'success' : 'error'}`;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = form.querySelector('input[type="text"]');
    const userAnswer = input.value.trim().toUpperCase();
    const expectedAnswer = form.dataset.answer.toUpperCase();

    if (userAnswer !== expectedAnswer) {
      showResult('The archive rejects the answer. Try again.', false);
      return;
    }

    showResult('Signal accepted. The archive opens.', true);
    input.disabled = true;
    form.querySelector('button').disabled = true;

    const nextPage = navigationMap[page];
    if (nextPage) {
      setTimeout(() => {
        window.location.href = nextPage;
      }, 1200);
    } else {
      setTimeout(() => {
        showResult('Archive complete. You are now the witness. The archive remembers you.', true);
      }, 1200);
    }
  });
});
