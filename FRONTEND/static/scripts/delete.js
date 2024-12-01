const Delete = document.querySelectorAll('.Delete');

const Del = document.querySelector('#Del');
const cancelBtn = document.querySelector(".cancelBtn");
const DeleteBtn = document.querySelector(".DeleteBtn");
Delete.forEach((i) => {
  i.onclick = function () {
    Del.style.display = "block"; // Show modal
    overlay.style.display = "block"; // Show overlay to darken background
  }
})


cancelBtn.onclick = function() {
  Del.style.display = "none"; // Hide modal
  overlay.style.display = "none"; // Hide overlay
}

DeleteBtn.onclick = function() {
  Del.style.display = "none"; // Hide modal
  overlay.style.display = "none"; // Hide overlay
}