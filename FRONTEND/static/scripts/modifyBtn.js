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
    const expenseId = this.dataset.expenseId;
    const description = document.querySelector('#mod input[placeholder="Enter expense name"]').value;
    const category = document.querySelector('#mod select').value;
    const amount = document.querySelector('#mod input[placeholder="Enter amount"]').value;

    try {
        const response = await fetch(`http://localhost:3000/api/v1/expenses/${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                description,
                category,
                amount: Number(amount)
            })
        });

        const data = await response.json();
        if (data.message === "expense changed") {
            // Close modal
            mod.style.display = "none";
            overlay.style.display = "none";
            
            // Refresh the table
            await initializeDetailPage();
        }
        alert(data.message);
    } catch (error) {
        console.error('Error modifying expense:', error);
        alert('Failed to modify expense');
    }
});