// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Login form handling
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Hide login, show orders
  document.querySelector('.login-section').style.display = 'none';
  document.getElementById('orders').style.display = 'block';

  // Scroll to orders
  document.getElementById('orders').scrollIntoView({ behavior: 'smooth' });

  alert('Login successful! Viewing current orders...');
});

// Order button functionality
document.querySelectorAll('.order-btn').forEach(button => {
  button.addEventListener('click', function () {
    alert('Order placed successfully! (Design purposes only)');
  });
});
