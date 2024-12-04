async function fetchAIInsights() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
            return null;
        }

        showLoadingState();
        document.getElementById('errorState').classList.add('hidden');
        document.getElementById('noExpensesState').classList.add('hidden');
        document.getElementById('aiInsights').innerHTML = '';
        
        const response = await fetch('https://pennywise-backend-q3e3.onrender.com/api/v1/insights/ai-analysis', {
            headers: {
                'token': token
            }
        });
        
        console.log('Raw Response:', response);
        
        const data = await response.json();
        console.log('Parsed Data:', data);

        if (!response.ok) {
            console.error('Response not OK:', response.status, response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        if (!data) {
            console.error('No data received');
            throw new Error('No data received from server');
        }
        
        if (!data.insights) {
            console.error('No insights in data:', data);
            throw new Error('No insights found in response');
        }

        return data;
    } catch (error) {
        console.error('Detailed fetch error:', error);
        throw error;
    } finally {
        document.getElementById('loadingState').classList.add('hidden');
    }
}

function getIconForSection(title) {
    const iconClasses = "w-6 h-6 text-[#40916c]";
    
    if (title.includes("Key Observations")) {
        return `<svg class="${iconClasses}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>`;
    }
    
    if (title.includes("Budget Optimization")) {
        return `<svg class="${iconClasses}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>`;
    }
    
    if (title.includes("Risk Analysis")) {
        return `<svg class="${iconClasses}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>`;
    }
    
    if (title.includes("Positive Habits")) {
        return `<svg class="${iconClasses}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>`;
    }
    
    if (title.includes("Action Items")) {
        return `<svg class="${iconClasses}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>`;
    }

    // Default icon for any other section
    return `<svg class="${iconClasses}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>`;
}

function formatInsights(insights) {
    // Split insights into sections based on numbered headings (1., 2., etc.)
    const sections = insights.split(/(?=\d+\.\s+[A-Za-z\s]+:)/).filter(section => section.trim());
    
    return sections.map(section => {
        // Extract title and content
        const titleMatch = section.match(/^\d+\.\s+([^:]+):/);
        if (!titleMatch) return '';
        
        const title = titleMatch[1].trim();
        const content = section.slice(titleMatch[0].length).trim();
        
        // Process bullet points
        const bulletPoints = content.split('\n')
            .map(line => line.trim())
            .filter(line => line.startsWith('-'))
            .map(point => {
                // Remove the leading dash and clean up the text
                let cleanPoint = point.slice(1).trim();
                
                // Format currency
                cleanPoint = cleanPoint.replace(/₹(\d+)/g, '<span class="text-[#2d6a4f] font-semibold">₹$1</span>');
                
                // Bold important terms
                cleanPoint = cleanPoint.replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-[#2d6a4f]">$1</span>');
                
                return `<li class="mb-4 last:mb-0 pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-[#40916c] before:top-0">${cleanPoint}</li>`;
            })
            .join('');

        // Create the card with improved styling
        return `
             <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mb-6 last:mb-0">
                <div class="flex items-center gap-3 mb-4">
                    ${getIconForSection(title)}
                    <h3 class="text-xl font-bold text-[#40916c]">${title}</h3>
                </div>
                <ul class="space-y-2 text-gray-700 list-none">
                    ${bulletPoints}
                </ul>
            </div>
        `;
    }).join('');
}

// Update the CSS
const style = document.createElement('style');
style.textContent = `
    .font-semibold {
        font-weight: 600;
    }
    .leading-relaxed {
        line-height: 1.625;
    }
    .prose ul {
        list-style-type: none;
        padding-left: 0;
    }
    .prose ul > li {
        position: relative;
        padding-left: 1.75em;
        margin-bottom: 1em;
        border-bottom: 1px solid #f3f4f6;
        padding-bottom: 1em;
    }
    .prose ul > li:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    .prose ul > li::before {
        content: "•";
        position: absolute;
        left: 0.5em;
        color: #40916c;
        font-size: 1.2em;
    }
    .text-[#2d6a4f] {
        color: #2d6a4f;
    }
    .prose {
        font-size: 1rem;
        line-height: 1.75;
    }
    .prose p {
        margin-bottom: 1em;
    }
`;
document.head.appendChild(style);

// Update the loading state styling
function showLoadingState() {
    const loadingState = document.getElementById('loadingState');
    loadingState.innerHTML = `
        <div class="flex flex-col items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#40916c] border-t-transparent"></div>
            <p class="mt-4 text-[#40916c] font-medium">Analyzing your financial data...</p>
        </div>
    `;
    loadingState.classList.remove('hidden');
}

async function initializeSavingTipsPage() {
    try {
        document.getElementById('errorState').classList.add('hidden');
        document.getElementById('noExpensesState').classList.add('hidden');
        document.getElementById('aiInsights').innerHTML = '';

        const data = await fetchAIInsights();
        console.log('Received data in initialize:', data);

        if (!data) {
            console.log('No data received in initialize');
            document.getElementById('noExpensesState').classList.remove('hidden');
            return;
        }

        if (!data.insights) {
            console.log('No insights in data:', data);
            document.getElementById('noExpensesState').classList.remove('hidden');
            return;
        }

        const formattedInsights = formatInsights(data.insights);
        console.log('Formatted insights:', formattedInsights ? 'success' : 'failed');

        if (!formattedInsights) {
            console.error('Failed to format insights');
            throw new Error('Failed to format insights');
        }

        document.getElementById('aiInsights').innerHTML = formattedInsights;

    } catch (error) {
        console.error('Detailed initialization error:', {
            error,
            errorMessage: error.message,
            errorStack: error.stack
        });
        document.getElementById('errorState').classList.remove('hidden');
        document.getElementById('loadingState').classList.add('hidden');
        document.getElementById('noExpensesState').classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', initializeSavingTipsPage); 

// Add better error state styling
const errorStateStyle = `
    .error-state {
        background-color: #fee2e2;
        border-left: 4px solid #ef4444;
        border-radius: 0.5rem;
        padding: 1rem;
        margin: 1rem 0;
    }
    .error-state p {
        color: #dc2626;
        margin: 0;
    }
`;
document.head.appendChild(document.createElement('style')).textContent = errorStateStyle; 

// Add styles for better formatting
const additionalStyles = `
    .ai-insights-container {
        max-width: 800px;
        margin: 0 auto;
    }

    .bullet-point {
        position: relative;
        padding-left: 1.5rem;
    }

    .bullet-point::before {
        content: "•";
        position: absolute;
        left: 0.5rem;
        color: #40916c;
    }

    .insight-card {
        transition: all 0.3s ease;
    }

    .insight-card:hover {
        transform: translateY(-2px);
    }
   

`;

// Add the styles to the document
const styleElement = document.createElement('style');
styleElement.textContent = additionalStyles;
document.head.appendChild(styleElement); 