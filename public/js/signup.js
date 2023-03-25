const submitButton = document.querySelector('#submit');

const signupFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#user-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  console.log(username);
  console.log(password);
  if (username && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log(response);
    }
  }
};

submitButton.addEventListener('click', signupFormHandler);
