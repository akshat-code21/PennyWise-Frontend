// Pie chart configuration with legend on the right
const ctx = document.getElementById('expensePieChart');
const expensePieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Shopping', 'Health', 'Travel', 'Food', 'Entertainment'],
    datasets: [{
      label: 'Expense Distribution',
      data: [25, 20, 15, 25, 15], // Example data; adjust as needed
      backgroundColor: [
        '#52b788', // Light green (Shopping)
        '#95d5b2', // Soft green (Health)
        '#74c69d', // Muted green (Travel)
        '#1b4332', // Deep green (Food)
        '#2d6a4f'  // Rich forest green (Entertainment)
      ],
      borderColor: [
        '#3a5a40', // Olive green (Shopping)
        '#6a994e', // Medium green (Health)
        '#40916c', // Base green (Travel)
        '#52796f', // Smoky green (Food)
        '#081c15'  // Darkest green (Entertainment)
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right', // Move the legend to the right
        labels: {
          color: '#1C160C', // Text color for legend labels
          font: {
            size: 13,
            weight: 'bold'
          },
          padding: 20 // Add some spacing for clarity
        }
      }
    }
  }
});

// Get the modal and overlay elements
