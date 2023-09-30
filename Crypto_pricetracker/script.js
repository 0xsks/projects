// script.js

let chart = null; // Track the current chart

const cryptoSymbols = ['bitcoin', 'ethereum', 'solana', 'matic-network'];
const cryptoCards = document.querySelectorAll('.crypto-card');
const cryptoSummary = document.getElementById('crypto-summary');
const chartContainer = document.getElementById('crypto-chart-container');
const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=' + cryptoSymbols.join(',') + '&vs_currencies=usd';

let activeSymbol = null; // Track the currently active symbol for the chart
// Function to fetch live crypto summary
async function fetchAndDisplayDescription(symbol) {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${symbol}`);
    const data = await response.json();

    const summaryText = document.querySelector('.summary-text');

    // Create a new DOMParser
    const parser = new DOMParser();

    // Parse the HTML content
    const doc = parser.parseFromString(data.description.en, 'text/html');

    // Safely set the HTML content
    summaryText.innerHTML = doc.body.innerHTML;
}

// Function to fetch live crypto data
async function fetchCryptoData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data) {
            cryptoCards.forEach(async (card) => {
                const symbol = card.getAttribute('data-crypto-symbol').toLowerCase();
                const cryptoInfo = card.querySelector('.crypto-info');
                const cryptoPrice = cryptoInfo.querySelector('.crypto-price');

                if (data[symbol] && data[symbol].usd) {
                    const price = data[symbol].usd.toFixed(2);
                    cryptoPrice.textContent = '$' + price;
                } else {
                    cryptoPrice.textContent = 'Price not available';
                }
            });
        } else {
            console.error('Failed to fetch crypto data');
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to create and display a chart
async function createChart(symbol) {
    // Destroy the previous chart if it exists
    if (chart) {
        chart.destroy();
    }

    // Clear the previous description
    const summaryText = document.querySelector('.summary-text');
    summaryText.innerHTML = '';

    // Fetch historical data
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=30`);
    const data = await response.json();

    // Prepare data for the chart
    const labels = data.prices.map(item => new Date(item[0]).toLocaleDateString());
    const prices = data.prices.map(item => item[1]);

    // Create the chart
    const ctx = document.getElementById('crypto-chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${symbol.toUpperCase()} Price`,
                data: prices,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
    });

    // Fetch and display coin description
    fetchAndDisplayDescription(symbol);
}

// Function to show the cryptocurrency summary
function showCryptoSummary() {
    cryptoSummary.style.display = 'block';
}

// Function to hide the cryptocurrency summary
function hideCryptoSummary() {
    cryptoSummary.style.display = 'none';
}

// Add click event listeners to crypto cards
cryptoCards.forEach((card) => {
    card.addEventListener('click', () => {
        const symbol = card.getAttribute('data-crypto-symbol').toLowerCase();
        createChart(symbol);
        showCryptoSummary();
    });
});
  

// Initial state: Hide the cryptocurrency summary and fetch live data
hideCryptoSummary();
fetchCryptoData();

// Refresh data every 5 minutes (300,000 milliseconds)
setInterval(fetchCryptoData, 300000);

// You can add your Chart.js chart configuration here.