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
  const response = await fetch("http://localhost:3000/api/v1/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  
  // Store token in both localStorage and cookies
  localStorage.setItem("token", data.token);
  document.cookie = `token=${data.token}; path=/`;
  
  window.location.href = "/dashboard";
};
