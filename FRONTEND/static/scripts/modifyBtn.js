const modify = document.querySelectorAll('.Modify');

const mod = document.querySelector('#mod');
const closeBtnM = document.getElementById("closeBtnM");

document.addEventListener('click', async function(e) {
    if (e.target && e.target.classList.contains('Modify')) {
        e.preventDefault();
        const expenseId = e.target.dataset.expenseId;
        const row = e.target.closest('tr');
        
        // Get expense details from the row
        const description = row.cells[0].textContent;
        const category = row.cells[1].textContent.toLowerCase();
        const amount = row.cells[3].textContent.replace('₹', '');

        // Fill the modify form with current values
        document.querySelector('#mod input[placeholder="Enter expense name"]').value = description;
        document.querySelector('#mod select').value = category;
        document.querySelector('#mod input[placeholder="Enter amount"]').value = amount;

        // Store the expense ID for the modify operation
        document.querySelector('#mod button').dataset.expenseId = expenseId;

        // Show the modal
        mod.style.display = "flex";
        mod.style.justifyContent = "center";
        mod.style.alignItems = "center";
        overlay.style.display = "block";
    }
});

closeBtnM.onclick = function() {
    mod.style.display = "none";
    mod.style.justifyContent = "";
    mod.style.alignItems = "";
    overlay.style.display = "none";
}

// Add event listener for the modify form submission
document.querySelector('#mod button').addEventListener('click', async function(e) {
    e.preventDefault();
    try {
        const expenseId = this.dataset.expenseId;
        const description = document.querySelector('#mod input[placeholder="Enter expense name"]').value.trim();
        const category = document.querySelector('#mod select').value;
        const amount = document.querySelector('#mod input[placeholder="Enter amount"]').value.trim();

        // Validate inputs (similar to add expense validation)
        if (!description || !category || !amount) {
            toastr.warning('Please fill in all fields');
            return;
        }

        const numAmount = Number(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            toastr.warning('Please enter a valid positive amount');
            return;
        }
        
        const response = await fetch(`https://pennywise-backend-lyz4.onrender.com/api/v1/expenses/${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                description,
                category,
                amount: numAmount
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to modify expense');
        }

        // Close modal
        mod.style.display = "none";
        overlay.style.display = "none";
        
        // Refresh the table
        await initializeDetailPage();
        toastr.success('Expense modified successfully');

    } catch (error) {
        console.error('Error modifying expense:', error);
        toastr.error(error.message || 'Failed to modify expense');
    }
});

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