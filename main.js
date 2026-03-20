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
    const newTheme = isLight ? 'dark' : 'light';
    
    document.body.className = newTheme;
    themeToggle.textContent = newTheme === 'light' ? 'Dark Mode' : 'Light Mode';
    localStorage.setItem('theme', newTheme);
  });

  // Lotto Logic
  function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      numbers.add(num);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  }

  function getRangeClass(num) {
    if (num <= 10) return 'range-1';
    if (num <= 20) return 'range-2';
    if (num <= 30) return 'range-3';
    if (num <= 40) return 'range-4';
    return 'range-5';
  }

  function updateUI() {
    const newNumbers = generateLottoNumbers();
    
    balls.forEach((ball, index) => {
      // Add animation effect
      ball.classList.remove('active');
      ball.classList.remove('range-1', 'range-2', 'range-3', 'range-4', 'range-5');
      
      // Force reflow for animation
      void ball.offsetWidth;

      const num = newNumbers[index];
      ball.textContent = num;
      ball.classList.add(getRangeClass(num));
      ball.classList.add('active');
    });
  }

  generateBtn.addEventListener('click', updateUI);
});
