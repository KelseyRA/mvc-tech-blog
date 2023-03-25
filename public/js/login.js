const loginForm = document.querySelector('#login-button');

const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
      const userData = await response.json();
      console.log(userData);
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
    // loginForm.reset();
  }
};

loginForm.addEventListener('click', loginFormHandler);
