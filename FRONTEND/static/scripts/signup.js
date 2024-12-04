let btn = document.querySelector(".sign-up-btn");
let nameInput = document.querySelector(".name input");
let emailInput = document.querySelector(".email input");
let passwordInput = document.querySelector(".password input");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    let name = nameInput.value;
    let email = emailInput.value;
    let password = passwordInput.value;
    handle(name, email, password);
});
const handle = async (name, email, password) => {
    try {
        if (!name || !email || !password) {
            toastr.warning('Please fill in all fields');
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            toastr.warning('Name can only contain letters and spaces');
            return;
        }
        if (name.length < 2 || name.length > 50) {
            toastr.warning('Name must be between 2 and 50 characters');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toastr.warning('Please enter a valid email address');
            return;
        }
        if (email.length > 100) {
            toastr.warning('Email is too long');
            return;
        }

        if (password.length < 8 || password.length > 14) {
            toastr.warning('Password must be between 8 and 14 characters');
            return;
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)) {
            toastr.warning('Password must contain uppercase, lowercase, number and special character');
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
            throw new Error(data.message || ' failed');
        }

        
        toastr.success("Successfully Signed Up. Please login");

        setTimeout(() => {
            window.location.href = "/login";
        }, 600); // Redirect after 600ms
    } catch (error) {
        console.error(' error:', error);
        toastr.error(error.message || 'Failed to sign up. Please try again.');
    }
}

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}