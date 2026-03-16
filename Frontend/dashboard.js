// =============================================
// DASHBOARD.JS - Dashboard functionality
// =============================================

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
});

// =============================================
// INITIALIZATION
// =============================================

function initializeDashboard() {
    console.log('Initializing Dashboard...');
    
    // Initialize all charts
    initHealthTrendChart();
    
    // Setup controls
    setupFarmSelector();
    setupDateRange();
    
    // Animate elements on load
    animateHealthScore();
    animateMetrics();
    
    // Load initial farm data
    loadFarmData();
}

// =============================================
// FARM DATA MANAGEMENT
// =============================================

function loadFarmData() {
    const farmSelect = document.getElementById('farm-select');
    if (!farmSelect) return;
    
    const selectedFarm = farmSelect.value;
    console.log('Loading data for farm:', selectedFarm);
    
    // Simulate API call
    setTimeout(() => {
        updateDashboardData({
            farm: selectedFarm,
            ndvi: 0.58,
            health: 78,
            moisture: 62,
            temperature: 28,
            rainfall: 12
        });
        showNotification('Farm data updated successfully!', 'success');
    }, 500);
}

function updateDashboardData(data) {
    // Update metrics displays
    updateMetric('ndvi-score', data.ndvi);
    updateMetric('health-score', data.health);
    updateMetric('moisture', data.moisture);
    updateMetric('temperature', data.temperature);
    updateMetric('rainfall', data.rainfall);
    
    // Update alerts summary
    updateAlerts();
}

function updateMetric(elementId, value) {
    const element = document.querySelector(`[data-metric="${elementId}"]`);
    if (element) {
        element.textContent = value;
    }
}

// =============================================
// EVENT LISTENERS
// =============================================

function setupEventListeners() {
    // Farm selector
    const farmSelect = document.getElementById('farm-select');
    if (farmSelect) {
        farmSelect.addEventListener('change', loadFarmData);
    }
    
    // Update button
    const updateBtn = document.querySelector('.dashboard-controls .btn-primary');
    if (updateBtn) {
        updateBtn.addEventListener('click', () => {
            loadFarmData();
        });
    }
    
    // Date range
    const dateRange = document.getElementById('date-range');
    if (dateRange) {
        dateRange.addEventListener('change', loadFarmData);
    }
}

function setupFarmSelector() {
    const farmSelect = document.getElementById('farm-select');
    if (!farmSelect) return;
    
    // Pre-populate with sample farms
    const farms = [
        'Farm A - Karnataka',
        'Farm B - Punjab',
        'Farm C - Maharashtra',
        'Farm D - Gujarat'
    ];
    
    farmSelect.innerHTML = farms.map(farm => 
        `<option>${farm}</option>`
    ).join('');
}

function setupDateRange() {
    const dateRange = document.getElementById('date-range');
    if (!dateRange) return;
    
    // Set default to today
    dateRange.valueAsDate = new Date();
}

// =============================================
// CHART INITIALIZATION
// =============================================

function initHealthTrendChart() {
    const canvasElement = document.getElementById('healthTrendChart');
    if (!canvasElement || typeof Chart === 'undefined') return;
    
    const ctx = canvasElement.getContext('2d');
    
    // Generate demo data
    const days = Array.from({length: 30}, (_, i) => `Day ${i+1}`);
    const healthData = Array.from({length: 30}, () => Math.floor(Math.random() * 20) + 70);
    const colors = getChartColors();
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Crop Health Score (%)',
                data: healthData,
                borderColor: colors.primary,
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointBackgroundColor: colors.primary,
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            ...getDefaultChartOptions(),
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// =============================================
// ANIMATIONS
// =============================================

function animateHealthScore() {
    const healthScores = document.querySelectorAll('.score-circle');
    healthScores.forEach(circle => {
        const ring = circle.querySelector('.progress-ring-circle');
        if (ring) {
            ring.style.animation = 'progress-load 1.5s ease-out forwards';
        }
    });
}

function animateMetrics() {
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach(value => {
        value.style.animation = 'fadeIn 0.6s ease-out forwards';
    });
}

// =============================================
// ALERTS MANAGEMENT
// =============================================

function updateAlerts() {
    const alertsPanel = document.querySelector('.alerts-panel');
    if (!alertsPanel) return;
    
    // Simulated alerts - can be replaced with API data
    const alerts = [
        {
            type: 'warning',
            icon: '⚠️',
            title: 'Low Soil Moisture Tomorrow',
            time: 'Expected around 2 PM'
        },
        {
            type: 'success',
            icon: '✓',
            title: 'Soil Conditions Improved',
            time: '2 hours ago'
        },
        {
            type: 'info',
            icon: 'ℹ️',
            title: 'Fertilizer Application Recommended',
            time: 'Based on current NDVI analysis'
        }
    ];
    
    // Clear existing alerts (if not already populated)
    // alertsPanel.innerHTML = '';
}

// =============================================
// EXPORT FUNCTIONS
// =============================================

function exportDashboardData() {
    const data = {
        farm: document.getElementById('farm-select').value,
        timestamp: new Date().toISOString(),
        metrics: {
            ndvi: 0.58,
            health: 78,
            moisture: 62,
            temperature: 28,
            rainfall: 12
        }
    };
    
    const csv = [
        ['Metric', 'Value'],
        ['NDVI Score', data.metrics.ndvi],
        ['Health Score', data.metrics.health + '%'],
        ['Soil Moisture', data.metrics.moisture + '%'],
        ['Temperature', data.metrics.temperature + '°C'],
        ['Rainfall', data.metrics.rainfall + 'mm']
    ];
    
    exportToCSV(csv, `farm_data_${data.farm}.csv`);
    showNotification('Dashboard data exported successfully!', 'success');
}

function printDashboard() {
    window.print();
}

// =============================================
// REAL-TIME DATA UPDATES (Simulated)
// =============================================

function setupRealTimeUpdates() {
    // Update every 30 seconds (demo purposes)
    setInterval(() => {
        // Fetch new data from API
        // updateDashboardData(apiResponse);
    }, 30000);
}

// =============================================
// HELPER FUNCTIONS
// =============================================

function formatNDVI(value) {
    if (value >= 0.5) return 'Healthy';
    if (value >= 0.3) return 'Moderate';
    return 'Poor';
}

function formatHealthStatus(score) {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
}

// =============================================
// CONSOLE LOG
// =============================================

console.log('📊 Dashboard module loaded');