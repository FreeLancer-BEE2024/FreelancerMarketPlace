// login.js

// Get the login form elements
const loginForm = document.querySelector('.login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const loginButton = document.querySelector('.login-button');

// Add an event listener to the login button
loginButton.addEventListener('click', async (e) => {
  e.preventDefault();

  // Get the username and password values
  const email = usernameInput.value;
  const password = passwordInput.value;

  // Make a POST request to the login API
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login successful, redirect to index.html
      window.location.href = 'index.html';
    } else {
      // Login failed, display an error message
      alert('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    alert('Error logging in');
  }
});