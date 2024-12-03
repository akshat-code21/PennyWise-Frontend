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
let submitAddExpenseBtn = document.querySelector('.submitAddExpenseBtn')
submitAddExpenseBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  let expenseNameInput = document.querySelector('.expenseNameInput')
  let expenseName = expenseNameInput.value;
  let categoryDropdown = document.querySelector('.categorySelect')
  let category = categoryDropdown.value;
  let amountInput = document.querySelector('.amountInput')
  let amount = amountInput.value;
  addExpense(expenseName,category,amount)
})
const addExpense = async(expenseName,category,amount)=>{ 
  try {
    let response = await fetch('http://localhost:3000/api/v1/expenses/',{
      method : "POST",
      headers : {
        'Content-Type': 'application/json',
        'token' : localStorage.getItem('token')
      },
      body:JSON.stringify({description : expenseName,amount : Number(amount),category})
    });
    let data = await response.json();
    if (data.message === "expense added") {
      // Close modal after successful addition
      popup.style.display = "none";
      overlay.style.display = "none";
      
      // Clear the form
      document.querySelector('.expenseNameInput').value = '';
      document.querySelector('.categorySelect').value = '';
      document.querySelector('.amountInput').value = '';
      
      // Check which page we're on and refresh accordingly
      if (window.initializeDashboard) {
        await window.initializeDashboard();
      } else if (window.initializeDetailPage) {
        await window.initializeDetailPage();
      }
    }
    alert(data.message);
  } catch (error) {
    console.error('Error adding expense:', error);
    alert('Failed to add expense');
  }
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