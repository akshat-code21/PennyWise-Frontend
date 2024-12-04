
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
  let categoryDropdown = document.querySelector('.categorySelect')
  let amountInput = document.querySelector('.amountInput')
  
  let expenseName = expenseNameInput.value.trim();
  let category = categoryDropdown.value;
  let amount = amountInput.value.trim();

  // Validate inputs
  if (!expenseName) {
    toastr.warning('Please enter an expense name');
    expenseNameInput.focus();
    return;
  }

  // Validate expense name format
  if (!isNaN(expenseName) || /^\d+$/.test(expenseName)) {
    toastr.warning('Expense name cannot be a number');
    expenseNameInput.focus();
    return;
  }

  if (expenseName.length > 100) {
    toastr.error('Expense name is too long (max 100 characters)');
    expenseNameInput.focus();
    return;
  }

  if (!/^[a-zA-Z0-9\s\-_.,!?@#$%^&*()]+$/.test(expenseName)) {
    toastr.warning('Expense name contains invalid characters');
    expenseNameInput.focus();
    return;
  }

  if (!category) {
    toastr.warning('Please select a category');
    categoryDropdown.focus();
    return;
  }

  if (!amount) {
    toastr.warning('Please enter an amount');
    amountInput.focus();
    return;
  }

  // Validate amount
  const numAmount = Number(amount);
  if (isNaN(numAmount) || numAmount <= 0) {
    toastr.warning('Please enter a valid positive amount');
    amountInput.focus();
    return;
  }

  if (numAmount > 1000000) {
    toastr.warning('Amount cannot exceed 1,000,000');
    amountInput.focus();
    return;
  }

  addExpense(expenseName, category, numAmount);
})
const addExpense = async(expenseName, category, amount) => { 
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found');
        }

        const response = await fetch('http://localhost:3000/api/v1/expenses/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                description: expenseName,
                amount: Number(amount),
                category
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to add expense');
        }

        // Close modal after successful addition
        popup.style.display = "none";
        overlay.style.display = "none";
        
        // Clear the form
        document.querySelector('.expenseNameInput').value = '';
        document.querySelector('.categorySelect').value = '';
        document.querySelector('.amountInput').value = '';
        
        // Reset button style
        btn.style.backgroundColor = '';
        btn.style.color = 'black';
        
        // Refresh the data
        if (window.initializeDashboard) {
            await window.initializeDashboard();
        } else if (window.initializeDetailPage) {
            await window.initializeDetailPage();
        }
      window.location.reload();
      toastr.success('Expense added successfully');
    } catch (error) {
        console.error('Error adding expense:', error);
        toastr.error(error.message || 'Failed to add expense');
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
overlay.onclick = function () {
  console.log("hello");
  popup.style.display = "none";
  overlay.style.display = "none";
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