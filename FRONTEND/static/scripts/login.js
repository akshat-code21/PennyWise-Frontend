let btn = document.querySelector(".log-in-btn");
let emailInput = document.querySelector(".email input");
let passwordInput = document.querySelector(".password input");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  let email = emailInput.value;
  let password = passwordInput.value;
  handleLogin(email, password);
});
const handleLogin = async (email, password) => {
  try {
    if (!email || !password) {
      toastr.error('Please enter both email and password');
      return;
    }
    
    const response = await fetch("https://pennywise-backend-q3e3.onrender.com/api/v1/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    
    if (!data.token) {
      throw new Error('No token received from server');
    }

    // Store token in both localStorage and cookies
    localStorage.setItem("token", data.token);
    document.cookie = `token=${data.token}; path=/`;
    toastr.success("LoggedIn Successfully!");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);


  } catch (error) {
    console.error('Login error:', error);
    toastr.error(error.message || 'Failed to login. Please try again.');
  }
};

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
