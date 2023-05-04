const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Unable to log you in at this time. Please verify your email and password and try again.');
            }
        } catch (err) {
            console.error(err)
        }
    }
};

const signupFormHandler = async (event) => {
event.preventDefault();

const email = document.querySelector('#email-signup').value.trim();
const userName = email.split('@')[0];
const password = document.querySelector('#password-signup').value.trim();

if (email && password) {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('You forgot to say the magic word.');
  }
}
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);