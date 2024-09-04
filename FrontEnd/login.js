// // login.js

// // Get the login form elements
// const loginForm = document.querySelector('.login-form');
// const usernameInput = document.querySelector('#username');
// const passwordInput = document.querySelector('#password');
// const loginButton = document.querySelector('.login-button');

// // Add an event listener to the login button
// loginButton.addEventListener('click', async (e) => {
//   e.preventDefault();

//     // Get the username and password values
//     const email = usernameInput.value;
//     const password = passwordInput.value;
  
//     try {
//       const response = await fetch("http://localhost:3000/api/login", {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         // Login successful, redirect to index.html
//         console.log("user verified");
//         window.location.href = 'index.html';
//       } else {
//         // Login failed, display the error message
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Error logging in');
//   }
// });




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

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login successful, store the token and redirect to index.html
      const token = data.token;
      document.cookie = `jwtToken=${token}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
      window.location.href = 'index.html';
    } else {
      // Login failed, display the error message
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert('Error logging in');
  }
});