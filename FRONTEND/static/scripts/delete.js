document.addEventListener('DOMContentLoaded', function() {
    const deleteModal = document.getElementById("deleteModal");
    const deleteOverlay = document.getElementById("deleteOverlay");
    let currentExpenseId = null;

    if (!deleteModal || !deleteOverlay) {
        console.error('Delete modal elements not found:', {
            deleteModal: !!deleteModal,
            deleteOverlay: !!deleteOverlay
        });
        return;
    }

    // When user clicks Delete link
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('Delete')) {
            e.preventDefault();
            currentExpenseId = e.target.dataset.expenseId;
            
            // Show delete confirmation modal
            deleteModal.style.display = "flex";
            deleteModal.style.justifyContent = "center";
            deleteModal.style.alignItems = "center";
            deleteOverlay.style.display = "block";
        }
    });

    // When user confirms delete
    const confirmDeleteBtn = document.querySelector('.confirmDelete');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', async function() {
            if (!currentExpenseId) {
                toastr.warning('No expense selected for deletion');
                return;
            }
            
            try {
                const response = await fetch(`https://pennywise-backend-q3e3.onrender.com/api/v1/expenses/${currentExpenseId}`, {
                    method: 'DELETE',
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                });

                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to delete expense');
                }

                // Close modal
                deleteModal.style.display = "none";
                deleteOverlay.style.display = "none";
                
                // Refresh the table
                if (window.initializeDashboard) {
                    await window.initializeDashboard();
                } else if (window.initializeDetailPage) {
                    await window.initializeDetailPage();
                }

                toastr.success('Expense deleted successfully');

            } catch (error) {
                console.error('Error deleting expense:', error);
                toastr.error(error.message || 'Failed to delete expense');
            }
        });
    }

    // When user cancels delete
    const cancelDeleteBtn = document.querySelector('.cancelDelete');
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', function() {
            deleteModal.style.display = "none";
            deleteOverlay.style.display = "none";
            currentExpenseId = null;
        });
    }

    // When user clicks outside the modal
    deleteOverlay.addEventListener('click', function() {
        deleteModal.style.display = "none";
        deleteOverlay.style.display = "none";
        currentExpenseId = null;
    });
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