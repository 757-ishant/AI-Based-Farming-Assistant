// =============================================
// GLOBAL SCRIPTS FOR AI FARMING ASSISTANT
// =============================================

// Navigation active state
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
});

function updateNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Smooth scroll behavior
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// =============================================
// MODAL FUNCTIONS
// =============================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// =============================================
// FORM HANDLING
// =============================================

function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log('Form submitted:', Object.fromEntries(formData));
    showNotification('Data submitted successfully!', 'success');
    event.target.reset();
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

// Format date to readable format
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-IN', options);
}

// Format time
function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(date).toLocaleTimeString('en-IN', options);
}

// Generate random data for charts (demo purposes)
function generateRandomData(length, min = 0, max = 100) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Get current date
function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

// =============================================
// NOTIFICATION SYSTEM
// =============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// =============================================
// LOCAL STORAGE HELPERS
// =============================================

const Storage = {
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    get: (key) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
    
    remove: (key) => {
        localStorage.removeItem(key);
    },
    
    clear: () => {
        localStorage.clear();
    }
};

// =============================================
// DEBOUNCE FUNCTION
// =============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// =============================================
// API SIMULATION
// =============================================

const API = {
    // Simulate API calls
    fetchFarmData: async (farmId) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    id: farmId,
                    name: 'Sample Farm',
                    ndvi: 0.58,
                    health: 78,
                    moisture: 62,
                    temperature: 28,
                    rainfall: 12
                });
            }, 500);
        });
    },
    
    updateFarmData: async (farmId, data) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ success: true, updated: data });
            }, 500);
        });
    }
};

// =============================================
// CHART HELPERS
// =============================================

function getChartColors() {
    return {
        primary: '#2E7D32',
        secondary: '#66BB6A',
        accent: '#42A5F5',
        success: '#4CAF50',
        warning: '#ff9800',
        danger: '#f44336'
    };
}

function getDefaultChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            }
        }
    };
}
    const sections = document.querySelectorAll('section[id]');

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = 'var(--text-light)';
        }
    });

// ===== DISABLE MODAL ON SCROLL =====
monitoringModal.addEventListener('wheel', (e) => {
    e.stopPropagation();
}, { passive: false });

// =============================================
// KEYBOARD SHORTCUTS
// =============================================

document.addEventListener('keydown', (e) => {
    // Escape key to close any open modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }
});

// =============================================
// ADD ANIMATION STYLES TO DOCUMENT
// =============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(300px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(300px);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// =============================================
// LOG APPLICATION VERSION
// =============================================

console.log('🌾 AI Farming Assistant v1.0.0');
console.log('📊 Built with HTML, CSS, and JavaScript');
