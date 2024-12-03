import { validateSignin } from '../scripts/utils/validation.js';

let btn = document.querySelector(".log-in-btn");
let emailInput = document.querySelector(".email input");
let passwordInput = document.querySelector(".password input");

// Add error message elements
const createErrorElement = (fieldContainer) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '4px';
    fieldContainer.appendChild(errorDiv);
    return errorDiv;
};

const emailError = createErrorElement(document.querySelector('.email'));
const passwordError = createErrorElement(document.querySelector('.password'));

const clearErrors = () => {
    emailError.textContent = '';
    passwordError.textContent = '';
};

btn.addEventListener("click", (e) => {
    e.preventDefault();
    clearErrors();

    const userData = {
        email: emailInput.value,
        password: passwordInput.value
    };

    const validationResult = validateSignin(userData);

    if (!validationResult.success) {
        validationResult.errors.forEach(error => {
            switch (error.field) {
                case 'email':
                    emailError.textContent = error.message;
                    break;
                case 'password':
                    passwordError.textContent = error.message;
                    break;
            }
        });
        return;
    }

    handleLogin(userData.email, userData.password);
});

const handleLogin = async (email, password) => {
  const response = await fetch("http://localhost:3000/api/v1/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  localStorage.setItem("token", data.token);
  window.location.href = "/dashboard";
};
