let btn = document.querySelector(".sign-up-btn");
let nameInput = document.querySelector(".name input");
let emailInput = document.querySelector(".email input");
let passwordInput = document.querySelector(".password input");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    let name = nameInput.value;
    let email = emailInput.value;
    let password = passwordInput.value;
    handleSignup(name, email, password);
});
const handleSignup = async (name, email, password) => {
    try {
        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            alert('Name can only contain letters and spaces');
            return;
        }
        if (name.length < 2 || name.length > 50) {
            alert('Name must be between 2 and 50 characters');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        if (email.length > 100) {
            alert('Email is too long');
            return;
        }

        if (password.length < 8 || password.length > 14) {
            alert('Password must be between 8 and 14 characters');
            return;
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)) {
            alert('Password must contain uppercase, lowercase, number and special character');
            return;
        }

        const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
        }

        alert("Successfully Signed Up. Please login");
        window.location.href = "/login";
    } catch (error) {
        console.error('Signup error:', error);
        alert(error.message || 'Failed to sign up. Please try again.');
    }
}