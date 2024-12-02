const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
// Get the button that opens the modal
const Detail = document.querySelector('.Detail') 
const btn = document.getElementById("addExpenseBtn");

// Get the <span> element that closes the modal
const closeBtn = document.getElementById("closeBtn");

// When the user clicks the button, open the modal and overlay
btn.onclick = function() {
  popup.style.display = "flex"; // Show modal
  popup.style.justifyContent = "center"
  popup.style.alignItems = "center"
  overlay.style.display = "block"; // Show overlay to darken background
  btn.style.backgroundColor = '#019863';
  btn.style.color = '#ffffff';
}
// When the user clicks on <span> (x), close the modal and hide overlay
closeBtn.onclick = function() {
  popup.style.display = "none"; // Hide modal
  popup.style.justifyContent = ""
  popup.style.alignItems = ""
  overlay.style.display = "none"; // Hide overlay
  btn.style.backgroundColor = '';
  btn.style.color = 'black';
}

// When the user clicks anywhere outside of the modal, close it
overlay.onclick = function() {
  popup.style.display = "none";
  overlay.style.display = "none";
}
// console.log("hello");