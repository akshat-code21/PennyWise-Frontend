import { validateSignup } from '../scripts/utils/validation.js';

let btn = document.querySelector(".sign-up-btn");
let nameInput = document.querySelector(".name input");
let emailInput = document.querySelector(".email input");
let passwordInput = document.querySelector(".password input");

// Add error message elements
const createErrorElement = (fieldContainer) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'black';
    errorDiv.style.fontSize = '18px';
    errorDiv.style.marginTop = '4px';
    errorDiv.style.fontWeight = 'bold';
    errorDiv.style.textShadow = '1px 0px 0px #000 ,-1px 0px 0px #000, 0px 1px 0px #000,0px -1px 0px #000';
    errorDiv.style.color = 'red';
    fieldContainer.appendChild(errorDiv);
    return errorDiv;
};

const nameError = createErrorElement(document.querySelector('.name'));
const emailError = createErrorElement(document.querySelector('.email'));
const passwordError = createErrorElement(document.querySelector('.password'));

const clearErrors = () => {
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
};

btn.addEventListener("click", (e) => {
    e.preventDefault();
    clearErrors();

    const userData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    const validationResult = validateSignup(userData);

    if (!validationResult.success) {
        validationResult.errors.forEach(error => {
            switch (error.field) {
                case 'name':
                    nameError.textContent = error.message;
                    break;
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

    handleSignup(userData.name, userData.email, userData.password);
});
const handleSignup = async (name, email, password) => {
    const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    })
    const data = await response.json();
    console.log(data);
    alert("Successfully Signed Up. Please login");
    window.location.href = "/login"
}