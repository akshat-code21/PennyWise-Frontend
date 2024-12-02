async function fetchExpenses() {
  try {
    const response = await fetch("http://localhost:3000/api/v1/expenses/", {
      method: "GET",
      headers: {
        token: `${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch expenses");
    }

    const data = await response.json();
    return data.expenses;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
}

function formatDate(dateString) {
  try {
    if (!dateString) return "No Date";
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.error("Invalid date string:", dateString);
      return "Invalid Date";
    }

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Use local timezone
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  } catch (error) {
    console.error(
      "Error formatting date:",
      error,
      "for date string:",
      dateString
    );
    return "Date Error";
  }
}

function renderExpenseTable(expenses) {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  if (!expenses || expenses.length === 0) {
    tableBody.innerHTML = `
            <tr class="border-t border-t-[#d1dde6]">
                <td colspan="5" class="px-4 py-2 text-center text-[#507a95] text-sm font-normal leading-normal">
                    No expenses found
                </td>
            </tr>
        `;
    return;
  }

  expenses.forEach((expense) => {
    const formattedCategory =
      expense.category.charAt(0).toUpperCase() +
      expense.category.slice(1).toLowerCase();
    const formattedDate = formatDate(expense.date);

    const row = document.createElement("tr");
    row.className = "border-t border-t-[#d1dde6]";
    row.innerHTML = `
            <td class="px-4 py-2 text-[#0e161b] text-sm font-normal leading-normal">${expense.description}</td>
            <td class="px-4 py-2 text-[#507a95] text-sm font-normal leading-normal">${formattedCategory}</td>
            <td class="px-4 py-2 text-[#507a95] text-sm font-normal leading-normal">${formattedDate}</td>
            <td class="px-4 py-2 text-[#507a95] text-sm font-normal leading-normal">₹${expense.amount}</td>
            <td class="px-4 py-2 text-[#40916C] text-sm font-bold leading-normal whitespace-nowrap">
                <a href="#" class="hover:underline Modify" data-expense-id="${expense._id}">Modify</a> |
                <a href="#" class="hover:underline text-[#d9534f] Delete" data-expense-id="${expense._id}">Delete</a>
            </td>
        `;
    tableBody.appendChild(row);
  });
}

async function initializeDetailPage() {
  const expenses = await fetchExpenses();
  renderExpenseTable(expenses);
}

document.addEventListener("DOMContentLoaded", initializeDetailPage);
