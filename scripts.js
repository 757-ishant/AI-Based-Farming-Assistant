// ===== DOM ELEMENTS =====
const monitoringModal = document.getElementById('monitoringModal');
const filterInputs = document.querySelectorAll('.modal-input');
const navLinks = document.querySelectorAll('.nav-link');
const micButton = document.querySelector('.microphone-button');
const waveform = document.querySelector('.voice-waveform');
const voiceInput = document.querySelector('.voice-input');
const sendBtn = document.querySelector('.btn-send');
const conversation = document.querySelector('.conversation');

// ===== SMOOTH SCROLL & NAVIGATION =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== MODAL OPERATIONS =====
function startMonitoring() {
    monitoringModal.style.display = 'flex';
    filterInputs[0].focus();
}

function closeModal() {
    monitoringModal.style.display = 'none';
}

window.addEventListener('click', (e) => {
    if (e.target === monitoringModal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== FARM MONITORING FORM =====
function handleMonitoring() {
    const farmName = filterInputs[0].value.trim();
    const farmLocation = filterInputs[1].value.trim();
    const emailAddress = filterInputs[2].value.trim();

    // Simple validation
    if (!farmName || !farmLocation || !emailAddress) {
        alert('Please fill in all fields');
        return;
    }

    if (!emailAddress.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    // Success message
    alert(`Farm "${farmName}" in ${farmLocation} registered successfully! Check your email at ${emailAddress} for more details.`);

    // Reset form
    filterInputs.forEach(input => input.value = '');
    closeModal();
}

// ===== VOICE ASSISTANT =====
let isMicActive = false;

function openVoiceAssistant() {
    scrollToSection('voice-assistant');
    setTimeout(() => {
        if (micButton && !isMicActive) {
            toggleMicrophone();
        }
    }, 500);
}

function toggleMicrophone() {
    isMicActive = !isMicActive;

    if (isMicActive) {
        micButton.style.transform = 'scale(1.1)';
        waveform.style.display = 'flex';
        waveform.innerHTML = `
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        `;

        // Auto-disable after 5 seconds
        setTimeout(() => {
            if (isMicActive) {
                simulateVoiceInput();
            }
        }, 3000);
    } else {
        waveform.style.display = 'none';
        micButton.style.transform = 'scale(1)';
    }
}

function simulateVoiceInput() {
    const hindiQueries = [
        { user: 'मेरी फसल में सूखा आ रहा है (My crop is getting dry)', ai: 'पानी दें। (Water your crop. Irrigation recommended.)' },
        { user: 'क्या मुझे कीटनाशक स्प्रे करना चाहिए? (Should I spray pesticides?)', ai: 'हाँ, कीटों का पता चला है। (Yes, pests detected. Recommended action: Neem spray.)' },
        { user: 'मिट्टी की गुणवत्ता क्या है? (What is soil quality?)', ai: 'बहुत अच्छी। (Excellent. NPK levels optimal.)' },
        { user: 'बारिश का पूर्वानुमान बताएं (Tell weather forecast)', ai: 'आने वाले 3 दिनों में बारिश होगी। (Rain expected in 3 days.)' }
    ];

    const randomQuery = hindiQueries[Math.floor(Math.random() * hindiQueries.length)];

    addChatBubble(randomQuery.user, 'user');
    setTimeout(() => {
        addChatBubble(randomQuery.ai, 'ai');
        isMicActive = false;
        waveform.style.display = 'none';
        micButton.style.transform = 'scale(1)';
    }, 1500);
}

function addChatBubble(message, type) {
    const chatBubble = document.createElement('div');
    chatBubble.className = `chat-bubble ${type}-bubble`;

    if (type === 'user') {
        chatBubble.innerHTML = `<p>${message}</p>`;
    } else {
        chatBubble.innerHTML = `
            <div class="ai-avatar">🤖</div>
            <div>
                <p>${message}</p>
                <small>AI Assistant</small>
            </div>
        `;
    }

    conversation.appendChild(chatBubble);
    conversation.scrollTop = conversation.scrollHeight;
}

// Voice input send button
if (document.querySelector('.input-area .btn-primary')) {
    document.querySelector('.input-area .btn-primary').addEventListener('click', () => {
        const message = voiceInput.value.trim();
        if (message) {
            addChatBubble(message, 'user');
            voiceInput.value = '';
            setTimeout(() => {
                addChatBubble('समझा। इस पर कार्य करूंगा। (Understood. I\'ll work on this.)', 'ai');
            }, 500);
        }
    });

    voiceInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.querySelector('.input-area .btn-primary').click();
        }
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards, steps, team cards, impact cards
document.querySelectorAll('.feature-card, .step, .team-card, .impact-card').forEach(el => {
    observer.observe(el);
});

// ===== DASHBOARD CHART =====
function initDashboard() {
    const trendChart = document.getElementById('trendChart');
    if (!trendChart) return;

    const ctx = trendChart.getContext('2d');
    const width = trendChart.width;
    const height = trendChart.height;

    // Draw simple trend line chart
    const data = [25, 32, 28, 45, 38, 52, 48, 60];
    const maxValue = Math.max(...data);
    const step = width / (data.length - 1);
    const heightScale = (height - 20) / maxValue;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'rgba(46, 125, 50, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < data.length; i++) {
        const x = i * step;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    // Draw trend line
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();

    data.forEach((value, index) => {
        const x = index * step;
        const y = height - (value * heightScale) - 10;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#2E7D32';
    data.forEach((value, index) => {
        const x = index * step;
        const y = height - (value * heightScale) - 10;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw fill
    ctx.fillStyle = 'rgba(46, 125, 50, 0.1)';
    ctx.beginPath();
    ctx.moveTo(0, height);

    data.forEach((value, index) => {
        const x = index * step;
        const y = height - (value * heightScale) - 10;
        ctx.lineTo(x, y);
    });

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
}

// ===== PARTICLE ANIMATION =====
function animateParticles() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle) => {
        const startY = particle.offsetTop;
        const randomDelay = Math.random() * 6000;

        setInterval(() => {
            const moveDistance = 100 + Math.random() * 50;
            particle.style.transform = `translateY(-${moveDistance}px)`;
        }, randomDelay);
    });
}

// ===== HEATMAP COLOR ANIMATION =====
function animateHeatmap() {
    const heatmapCells = document.querySelectorAll('.heatmap-cell');
    const colors = [
        'linear-gradient(135deg, #FF6B6B, #FF8787)', // Red - Very High
        'linear-gradient(135deg, #FFA726, #FFB74D)', // Orange - High
        'linear-gradient(135deg, #FFD700, #FFEB3B)', // Yellow - Medium
        'linear-gradient(135deg, #4CAF50, #66BB6A)'  // Green - Optimal
    ];

    heatmapCells.forEach((cell, index) => {
        cell.style.background = colors[index];
    });
}

// ===== SATELLITE ANIMATION =====
function initializeSatelliteAnimation() {
    const satellite = document.querySelector('.satellite');
    if (!satellite) return;

    // Continuous orbit animation is handled by CSS
    // Add subtle glow effect
    satellite.style.textShadow = '0 0 20px rgba(46, 125, 50, 0.6)';
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.impact-number');
    counters.forEach((counter) => {
        const target = parseInt(counter.innerText) || 0;
        let current = 0;
        const increment = target / 20;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.innerText = target + '+';
                clearInterval(timer);
            } else {
                counter.innerText = Math.floor(current) + '+';
            }
        }, 50);
    });
}

// ===== PROGRESS BAR ANIMATION =====
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar) => {
        const targetWidth = bar.style.width || '75%';
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    });
}

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    animateParticles();
    animateHeatmap();
    initializeSatelliteAnimation();
    animateProgressBars();

    // Small delay for counter animation to be visible
    setTimeout(() => {
        animateCounters();
    }, 500);

    // Initialize chat with welcome message
    if (conversation) {
        addChatBubble('नमस्ते किसान! मैं आपकी खेती में मदद कर सकता हूं। (Hello farmer! I can help with your farming.)', 'ai');
    }
});

// ===== ACTIVE NAV LINK INDICATOR =====
window.addEventListener('scroll', () => {
    let current = '';
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
});

// ===== DISABLE MODAL ON SCROLL =====
monitoringModal.addEventListener('wheel', (e) => {
    e.stopPropagation();
}, { passive: false });

// ===== FORM SUBMIT EVENT =====
const monitorForm = document.querySelector('.modal-content');
if (monitorForm) {
    const submitButton = monitorForm.querySelector('.btn-primary');
    if (submitButton) {
        submitButton.addEventListener('click', handleMonitoring);
    }
}
