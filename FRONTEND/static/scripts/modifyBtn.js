const modify = document.querySelectorAll('.Modify');

const mod = document.querySelector('#mod');
const closeBtnM = document.getElementById("closeBtnM");
modify.forEach((i) => {
  i.onclick = function () {
    console.log('hello')
    mod.style.display = "block"; // Show modal
    overlay.style.display = "block"; // Show overlay to darken background
  }
})


closeBtnM.onclick = function() {
  mod.style.display = "none"; // Hide modal
  overlay.style.display = "none"; // Hide overlay
}