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