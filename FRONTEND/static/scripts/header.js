logoutBtn = document.querySelector('.logoutBtn')
logoutBtn.onclick = function() {
    console.log("Adding event listener to logoutBtn");
    toastr.success("Logged out successfully");
    setTimeout(() => {
        window.location.href = "/";
    }, 1000);

    localStorage.removeItem('token')
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