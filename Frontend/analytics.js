// =============================================
// ANALYTICS.JS - Analytics functionality
// =============================================

// Initialize analytics on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAnalytics();
});

// =============================================
// INITIALIZATION
// =============================================

function initializeAnalytics() {
    console.log('Initializing Analytics...');
    
    // Initialize all charts
    initNDVIChart();
    initYieldChart();
    initWeatherImpactChart();
    initHealthDistChart();
    initMonthlyChart();
    
    // Setup filters
    setupAnalyticsFilters();
    
    // Load initial data
    loadAnalyticsData();
}

// =============================================
// FILTER SETUP
// =============================================

function setupAnalyticsFilters() {
    const applyButton = document.querySelector('.analytics-filters .btn-primary');
    if (applyButton) {
        applyButton.addEventListener('click', applyAnalyticsFilters);
    }
}

function applyAnalyticsFilters() {
    const timePeriod = document.getElementById('timePeriodSelect')?.value || 'Last 30 Days';
    const field = document.getElementById('fieldSelect')?.value || 'All Fields';
    
    console.log('Applying filters:', { timePeriod, field });
    showNotification(`Filters applied: ${timePeriod} | ${field}`, 'success');
    
    loadAnalyticsData();
}

// =============================================
// DATA LOADING
// =============================================

function loadAnalyticsData() {
    console.log('Loading analytics data...');
    
    // Simulate loading
    showNotification('Analytics data updated', 'success');
    
    // In production, fetch from API
    // const timePeriod = document.querySelector('select').value;
    // const field = document.querySelectorAll('select')[1].value;
}

// =============================================
// CHART INITIALIZATION - NDVI Chart
// =============================================

function initNDVIChart() {
    const canvasElement = document.getElementById('ndviChart');
    if (!canvasElement || typeof Chart === 'undefined') return;
    
    const ctx = canvasElement.getContext('2d');
    const colors = getChartColors();
    
    // Generate 90-day data
    const days = Array.from({length: 90}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (90 - i));
        return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    });
    
    const ndviData = Array.from({length: 90}, () => {
        return (Math.random() * 0.3 + 0.3).toFixed(2); // NDVI between 0.3-0.6
    });
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: days.filter((_, i) => i % 10 === 0), // Show every 10th day
            datasets: [{
                label: 'NDVI Score',
                data: ndviData,
                borderColor: colors.primary,
                backgroundColor: `rgba(46, 125, 50, 0.1)`,
                tension: 0.4,
                fill: true,
                pointRadius: 2,
                pointBackgroundColor: colors.primary
            }]
        },
        options: {
            ...getDefaultChartOptions(),
            scales: {
                y: {
                    min: 0,
                    max: 1,
                    ticks: {
                        stepSize: 0.2,
                        callback: function(value) {
                            return value.toFixed(1);
                        }
                    }
                }
            }
        }
    });
}

// =============================================
// CHART INITIALIZATION - Yield Prediction Chart
// =============================================

function initYieldChart() {
    const canvasElement = document.getElementById('yieldChart');
    if (!canvasElement || typeof Chart === 'undefined') return;
    
    const ctx = canvasElement.getContext('2d');
    const colors = getChartColors();
    
    const crops = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
    const yieldData = [3.2, 3.5, 3.8, 4.0, 4.1, 4.2];
    const trendData = [3.1, 3.4, 3.7, 3.9, 4.0, 4.2];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: crops,
            datasets: [
                {
                    label: 'Predicted Yield (tons/ha)',
                    data: yieldData,
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                    borderWidth: 1
                },
                {
                    label: 'Trend Line',
                    data: trendData,
                    type: 'line',
                    borderColor: colors.secondary,
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            ...getDefaultChartOptions(),
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1) + ' t/ha';
                        }
                    }
                }
            }
        }
    });
}

// =============================================
// CHART INITIALIZATION - Weather Impact Chart
// =============================================

function initWeatherImpactChart() {
    const canvasElement = document.getElementById('weatherImpactChart');
    if (!canvasElement || typeof Chart === 'undefined') return;
    
    const ctx = canvasElement.getContext('2d');
    const colors = getChartColors();
    
    const factors = ['Rainfall', 'Temperature', 'Humidity', 'Wind Speed', 'Sunlight'];
    const correlation = [0.85, 0.65, 0.72, 0.45, 0.92];
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: factors,
            datasets: [{
                label: 'Impact on Crop Health',
                data: correlation,
                borderColor: colors.primary,
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                pointBackgroundColor: colors.primary,
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            ...getDefaultChartOptions(),
            scales: {
                r: {
                    beginAtZero: true,
                    max: 1,
                    ticks: {
                        callback: function(value) {
                            return (value * 100).toFixed(0) + '%';
                        },
                        stepSize: 0.2
                    }
                }
            }
        }
    });
}

// =============================================
// CHART INITIALIZATION - Health Distribution Chart
// =============================================

function initHealthDistChart() {
    const canvasElement = document.getElementById('healthDistChart');
    if (!canvasElement || typeof Chart === 'undefined') return;
    
    const ctx = canvasElement.getContext('2d');
    const colors = getChartColors();
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Excellent (80-100%)', 'Good (60-79%)', 'Fair (40-59%)', 'Poor (<40%)'],
            datasets: [{
                data: [45, 35, 15, 5],
                backgroundColor: [
                    colors.success,
                    colors.primary,
                    colors.warning,
                    colors.danger
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            ...getDefaultChartOptions(),
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// =============================================
// CHART INITIALIZATION - Monthly Comparison Chart
// =============================================

function initMonthlyChart() {
    const canvasElement = document.getElementById('monthlyChart');
    if (!canvasElement || typeof Chart === 'undefined') return;
    
    const ctx = canvasElement.getContext('2d');
    const colors = getChartColors();
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const ndviAvg = [0.45, 0.48, 0.52, 0.56, 0.62, 0.58];
    const healthAvg = [68, 71, 74, 76, 80, 78];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Avg NDVI',
                    data: ndviAvg,
                    backgroundColor: colors.primary,
                    yAxisID: 'y'
                },
                {
                    label: 'Health Score (%)',
                    data: healthAvg,
                    backgroundColor: colors.secondary,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    max: 1,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(2);
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    max: 100,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

// =============================================
// EXPORT FUNCTIONS
// =============================================

function exportAnalyticsReport() {
    const data = {
        timestamp: new Date().toISOString(),
        period: '30 Days',
        summary: {
            avgNDVI: '0.62',
            avgHealth: '82%',
            avgMoisture: '58%',
            riskDays: 3
        }
    };
    
    const reportContent = `
AI Farming Assistant - Analytics Report
Generated: ${data.timestamp}
Period: ${data.period}

SUMMARY
-------
Average NDVI: ${data.summary.avgNDVI}
Average Health Score: ${data.summary.avgHealth}
Average Moisture Level: ${data.summary.avgMoisture}
Risk Alert Days: ${data.summary.riskDays}

Recommendations:
1. Continue current irrigation schedule
2. Apply fertilizer in 1 week
3. Monitor for pests regularly
4. Prepare for upcoming rainfall
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    showNotification('Analytics report exported!', 'success');
}

function printAnalyticsReport() {
    window.print();
}

// =============================================
// DATA REFRESH
// =============================================

function refreshAnalytics() {
    console.log('Refreshing analytics...');
    
    // Reload all charts
    const chartElements = document.querySelectorAll('canvas');
    chartElements.forEach(canvas => {
        if (canvas.chart) {
            canvas.chart.destroy();
        }
    });
    
    // Re-initialize
    initializeAnalytics();
    showNotification('Analytics refreshed!', 'success');
}

// =============================================
// INSIGHTS GENERATION
// =============================================

function generateInsights() {
    const insights = [
        'NDVI has improved by 12% over the last 30 days, indicating better vegetation health.',
        'Rainfall has the strongest correlation with NDVI improvement.',
        'Temperature is within optimal range for current crop type.',
        'Soil moisture levels are stable and well-managed.',
        'Predicted yield is on track to exceed previous season\'s output.'
    ];
    
    return insights;
}

// =============================================
// CONSOLE LOG
// =============================================

console.log('📈 Analytics module loaded');