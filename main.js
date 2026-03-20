document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const generateBtn = document.getElementById('generate-btn');
  const ballContainer = document.getElementById('ball-container');
  const balls = document.querySelectorAll('.ball');

  // Theme Logic
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.className = savedTheme;
  themeToggle.textContent = savedTheme === 'light' ? 'Dark Mode' : 'Light Mode';

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light');
    document.body.className = isLight ? 'dark' : 'light';
    themeToggle.textContent = isLight ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
  });

  // Lotto Logic
  generateBtn.addEventListener('click', () => {
    const numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    numbers.sort((a, b) => a - b);

    balls.forEach((ball, index) => {
      ball.classList.remove('active', 'range-1', 'range-2', 'range-3', 'range-4', 'range-5');
      setTimeout(() => {
        const num = numbers[index];
        ball.textContent = num;
        ball.classList.add('active');
        
        // Add color range class
        if (num <= 10) ball.classList.add('range-1');
        else if (num <= 20) ball.classList.add('range-2');
        else if (num <= 30) ball.classList.add('range-3');
        else if (num <= 40) ball.classList.add('range-4');
        else ball.classList.add('range-5');
      }, index * 100);
    });
  });

  // Formspree AJAX Submission
  const form = document.getElementById('partnership-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const submitBtn = document.getElementById('submit-btn');
    
    submitBtn.disabled = true;
    submitBtn.textContent = '보내는 중...';
    status.textContent = '';
    status.className = '';

    try {
      const response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.textContent = '문의가 성공적으로 전송되었습니다. 감사합니다!';
        status.className = 'success';
        form.reset();
      } else {
        const result = await response.json();
        if (Object.hasOwnProperty.call(result, 'errors')) {
          status.textContent = result.errors.map(error => error.message).join(', ');
        } else {
          status.textContent = '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
        }
        status.className = 'error';
      }
    } catch (error) {
      status.textContent = '네트워크 오류가 발생했습니다.';
      status.className = 'error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '문의하기';
    }
  });
});
