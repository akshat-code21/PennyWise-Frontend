let pieChart = null;

async function fetchExpenses() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    const response = await fetch("https://pennywise-backend-q3e3.onrender.com/api/v1/expenses/", {
      method: "GET",
      headers: {
        token: token
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch expenses');
    }

    const data = await response.json();
    return data.expenses;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    toastr.error(error.message || 'Failed to fetch expenses');
    return [];
  }
}

function renderExpenseTable(expenses) {
  const tableBody = document.getElementById("expenseTableBody");
  tableBody.innerHTML = "";

  const categoryTotals = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = {
        total: 0,
        count: 0,
      };
    }
    acc[expense.category].total += expense.amount;
    acc[expense.category].count += 1;
    return acc;
  }, {});

  Object.entries(categoryTotals).forEach(([category, data], index) => {
    const row = document.createElement("tr");
    row.className = "border-t border-[#40916C] rows";

    const formattedCategory =
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    row.innerHTML = `
      <td class="px-4 py-3 text-left text-[#40916C] w-[400px] text-sm font-medium leading-normal">
        ${index + 1}
      </td>
      <td class="px-4 py-3 text-left text-[#40916C] w-[400px] text-sm font-medium leading-normal">
        ${formattedCategory}
      </td>
      <td class="px-4 py-3 text-left text-[#40916C] w-[400px] text-sm font-medium leading-normal">
        ₹${data.total}
      </td>
      <td class="px-4 py-3 text-left text-[#40916C] w-[400px] text-sm font-medium leading-normal">
        ${data.count} expense${data.count !== 1 ? "s" : ""}
      </td>
    `;

    tableBody.appendChild(row);
  });
}
window.initializeDashboard = async function () {
  const expenses = await fetchExpenses();
  const chartContainer = document.getElementById("chartContainer");
  const canvas = document.getElementById("expensePieChart");
  const noExpensesMessage = document.getElementById("noExpensesMessage");
  const tableBody = document.getElementById("expenseTableBody");

  if (!expenses || expenses.length === 0) {
    // Hide canvas and show message
    canvas.style.display = "none";
    noExpensesMessage.classList.remove("hidden");
    
    // Show message in table
    tableBody.innerHTML = `
      <tr class="border-t border-[#40916C] rows">
        <td colspan="4" class="px-4 py-3 text-center text-[#40916C] text-sm font-medium leading-normal">
          No expenses added yet
        </td>
      </tr>
    `;
  } else {
    // Show canvas and hide message
    canvas.style.display = "block";
    noExpensesMessage.classList.add("hidden");
    
    // Render table and chart
    renderExpenseTable(expenses);
    updatePieChart(expenses);
  }
};
function updatePieChart(expenses) {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
  const ctx = document.getElementById("expensePieChart").getContext("2d");
  if (pieChart) {
    pieChart.destroy();
  }
  const formattedLabels = Object.keys(categoryTotals).map(
    (category) =>
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
  );
  pieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: formattedLabels,
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: [
            "#52b788",
            "#95d5b2",
            "#74c69d",
            "#1b4332",
            "#2d6a4f",
          ],
          borderColor: ["#3a5a40", "#6a994e", "#40916c", "#52796f", "#081c15"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "right",
          labels: {
            color: "#1C160C",
            font: {
              size: 13,
              weight: "bold",
            },
            padding: 20,
          },
        },
      },
    },
  });
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


document.addEventListener("DOMContentLoaded", initializeDashboard);
