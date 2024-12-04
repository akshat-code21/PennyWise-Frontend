let insightsCharts = {};

async function fetchInsights() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
            return null;
        }
        
        const response = await fetch('https://pennywise-backend-q3e3.onrender.com/api/v1/insights/statistics', {
            headers: {
                'token': token
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch insights');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching insights:', error);
        return null;
    }
}

async function fetchAIInsights() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
            return null;
        }

        const response = await fetch('https://pennywise-backend-q3e3.onrender.com/api/v1/insights/ai-analysis', {
            headers: {
                'token': token
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch AI insights');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching AI insights:', error);
        return null;
    }
}

function createCategoryChart(data) {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    if (insightsCharts.categoryChart) {
        insightsCharts.categoryChart.destroy();
    }
    
    const formattedLabels = Object.keys(data.categorySpending).map(
        category => category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    );
    
    insightsCharts.categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: formattedLabels,
            datasets: [{
                data: Object.values(data.categorySpending),
                backgroundColor: [
                    '#52b788', '#95d5b2', '#74c69d', '#1b4332', '#2d6a4f'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Category-wise Spending',
                    color: '#40916c',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'right',
                    labels: {
                        color: '#40916c'
                    }
                }
            }
        }
    });
}

function createMonthlyChart(data) {
    const ctx = document.getElementById('monthlyChart').getContext('2d');
    if (insightsCharts.monthlyChart) {
        insightsCharts.monthlyChart.destroy();
    }
    
    insightsCharts.monthlyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(data.monthlySpending),
            datasets: [{
                label: 'Spending Trends',
                data: Object.values(data.monthlySpending),
                borderColor: '#40916c',
                backgroundColor: 'rgba(64, 145, 108, 0.1)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Spending Trends',
                    color: '#40916c',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    labels: {
                        color: '#40916c'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#40916c'
                    }
                },
                x: {
                    ticks: {
                        color: '#40916c'
                    }
                }
            }
        }
    });
}

function displayAIInsights(insights) {
    const container = document.getElementById('aiInsights');
    container.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-bold text-[#40916c] mb-4">AI Analysis</h3>
            <div class="whitespace-pre-line text-gray-700">
                ${insights.insights}
            </div>
        </div>
    `;
}

async function initializeInsightsPage() {
    try {
        const insights = await fetchInsights();
        if (insights) {
            document.getElementById('totalSpending').textContent = `₹${insights.monthlyTotalSpending}`;
            
            if (insights.highestExpense) {
                document.getElementById('highestExpense').textContent = 
                    `₹${insights.highestExpense.amount} (${insights.highestExpense.description})`;
            }
            
            if (insights.lowestExpense) {
                document.getElementById('lowestExpense').textContent = 
                    `₹${insights.lowestExpense.amount} (${insights.lowestExpense.description})`;
            }
            
            createCategoryChart(insights);
            createMonthlyChart(insights);
        }

        const aiInsights = await fetchAIInsights();
        if (aiInsights) {
            displayAIInsights(aiInsights);
        }
    } catch (error) {
        console.error('Error initializing insights page:', error);
    }
}

document.addEventListener('DOMContentLoaded', initializeInsightsPage);