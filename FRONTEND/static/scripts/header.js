let logoutBtn = document.querySelector('.logoutBtn')
logoutBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href = "/";
    localStorage.removeItem('token')
})