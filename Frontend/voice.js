// =============================================
// VOICE.JS - Voice Assistant functionality
// =============================================

// Initialize voice assistant on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeVoiceAssistant();
});

// =============================================
// STATE MANAGEMENT
// =============================================

const VoiceState = {
    isListening: false,
    conversationHistory: [],
    selectedLanguage: 'hi' // Hindi
};

// =============================================
// INITIALIZATION
// =============================================

function initializeVoiceAssistant() {
    console.log('Initializing Voice Assistant...');
    
    setupMicrophoneButton();
    setupTextInput();
    setupQuickButtons();
    setupClearButton();
    
    // Load conversation history from storage
    loadConversationHistory();
    
    // Add greeting message
    addGreetingMessage();
}

// =============================================
// MICROPHONE CONTROL
// =============================================

function setupMicrophoneButton() {
    const micButton = document.getElementById('micButton');
    if (!micButton) return;
    
    micButton.addEventListener('click', toggleMicrophone);
}

function toggleMicrophone() {
    VoiceState.isListening = !VoiceState.isListening;
    
    const micButton = document.getElementById('micButton');
    const waveformContainer = document.getElementById('waveformContainer');
    const voiceStatus = document.getElementById('voiceStatus');
    const micInstruction = document.querySelector('.mic-instruction');
    
    if (VoiceState.isListening) {
        // Start listening
        micButton.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8787)';
        micButton.style.transform = 'scale(1.1)';
        if (waveformContainer) waveformContainer.style.display = 'block';
        if (micInstruction) micInstruction.textContent = 'Listening...';
        if (voiceStatus) voiceStatus.textContent = 'Microphone is active';
        
        // Simulate voice input after 3 seconds
        setTimeout(() => {
            if (VoiceState.isListening) {
                simulateVoiceInput();
            }
        }, 3000);
    } else {
        // Stop listening
        micButton.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        micButton.style.transform = 'scale(1)';
        if (waveformContainer) waveformContainer.style.display = 'none';
        if (micInstruction) micInstruction.textContent = 'Click to talk';
        if (voiceStatus) voiceStatus.textContent = '';
    }
}

function simulateVoiceInput() {
    const hindiQueries = [
        {
            user: 'मेरे खेत की स्वास्थ्य जांच करें',
            userEn: 'Check my crop health',
            ai: 'आपके खेत का NDVI स्कोर 0.58 है जो स्वस्थ है। मिट्टी की नमी 62% है।',
            aiEn: 'Your field NDVI is 0.58 which is healthy. Soil moisture is 62%.'
        },
        {
            user: 'अगले सप्ताह मौसम कैसा होगा?',
            userEn: 'How will the weather be next week?',
            ai: '3-4 दिन में बारिश होगी। अपनी सिंचाई को कम करें।',
            aiEn: 'Rain will come in 3-4 days. Reduce your irrigation.'
        },
        {
            user: 'मुझे किस खाद का उपयोग करना चाहिए?',
            userEn: 'Which fertilizer should I use?',
            ai: 'यूरिया और DAP का मिश्रण सही रहेगा। प्रति एकड़ 50 किलो यूरिया लगाएं।',
            aiEn: 'Urea and DAP mixture will be good. Apply 50kg Urea per acre.'
        }
    ];

    const randomQuery = hindiQueries[Math.floor(Math.random() * hindiQueries.length)];
    
    // Add user message
    addMessageToConversation(randomQuery.user, 'user', randomQuery.userEn);
    
    // Simulate AI response
    setTimeout(() => {
        addMessageToConversation(randomQuery.ai, 'ai', randomQuery.aiEn);
        VoiceState.isListening = false;
        
        const micButton = document.getElementById('micButton');
        const waveformContainer = document.getElementById('waveformContainer');
        if (micButton) {
            micButton.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
            micButton.style.transform = 'scale(1)';
        }
        if (waveformContainer) waveformContainer.style.display = 'none';
    }, 2000);
}

// =============================================
// TEXT INPUT HANDLING
// =============================================

function setupTextInput() {
    const textInput = document.getElementById('textInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (textInput && sendBtn) {
        sendBtn.addEventListener('click', sendTextMessage);
        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendTextMessage();
            }
        });
    }
}

function sendTextMessage() {
    const textInput = document.getElementById('textInput');
    if (!textInput) return;
    
    const message = textInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessageToConversation(message, 'user');
    textInput.value = '';
    
    // Simulate AI response
    generateAIResponse(message);
}

function generateAIResponse(userMessage) {
    // Simple response simulation
    const responses = [
        {
            message: 'समझ गया। इस पर तुरंत ध्यान दूंगा।',
            english: 'Understood. I will take action on this immediately.'
        },
        {
            message: 'यह बहुत महत्वपूर्ण है। कृपया आगामी 2 दिन में यह करें।',
            english: 'This is very important. Please do this within 2 days.'
        },
        {
            message: 'आपके खेत के लिए यह सर्वोत्तम समय है।',
            english: 'This is the best time for your farm.'
        }
    ];
    
    setTimeout(() => {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessageToConversation(randomResponse.message, 'ai', randomResponse.english);
    }, 800);
}

// =============================================
// MESSAGE HANDLING
// =============================================

function addMessageToConversation(text, type, englishText = '') {
    const conversationBox = document.getElementById('conversationBox');
    if (!conversationBox) return;
    
    const messageDiv = document.createElement('div');
    const className = type === 'user' ? 'message user-message' : 'message ai-message';
    
    if (type === 'user') {
        messageDiv.className = className;
        messageDiv.innerHTML = `<p class="message-text">${text}</p>`;
    } else {
        messageDiv.className = className;
        messageDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p class="message-text">${text}</p>
                ${englishText ? `<p class="message-text" style="font-size: 0.85em; opacity: 0.8;">${englishText}</p>` : ''}
            </div>
        `;
    }
    
    conversationBox.appendChild(messageDiv);
    conversationBox.scrollTop = conversationBox.scrollHeight;
    
    // Save to history
    VoiceState.conversationHistory.push({
        type,
        text,
        timestamp: new Date()
    });
    
    // Save to storage
    saveConversationHistory();
}

function addGreetingMessage() {
    const conversationBox = document.getElementById('conversationBox');
    if (!conversationBox || conversationBox.children.length > 0) return;
    
    addMessageToConversation(
        'नमस्ते! मैं आपका AI खेती सलाहकार हूं। आप मुझसे अपने खेत के स्वास्थ्य, मौसम, कीटों और खाद के बारे में पूछ सकते हैं।',
        'ai',
        'Hello! I\'m your AI farming advisor. You can ask me about your crop health, weather, pests, and fertilizer.'
    );
}

// =============================================
// QUICK BUTTONS
// =============================================

function setupQuickButtons() {
    const quickBtns = document.querySelectorAll('.quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
            askQuestion(question);
        });
    });
}

function askQuestion(question) {
    // Add question as user message
    addMessageToConversation(question, 'user');
    
    // Generate response
    generateAIResponse(question);
    
    // Scroll to conversation
    const conversationBox = document.getElementById('conversationBox');
    if (conversationBox) {
        conversationBox.scrollTop = conversationBox.scrollHeight;
    }
}

// =============================================
// CLEAR CHAT
// =============================================

function setupClearButton() {
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearConversation);
    }
}

function clearConversation() {
    const conversationBox = document.getElementById('conversationBox');
    if (!conversationBox) return;
    
    if (confirm('Are you sure you want to clear the conversation?')) {
        conversationBox.innerHTML = '';
        VoiceState.conversationHistory = [];
        saveConversationHistory();
        addGreetingMessage();
        showNotification('Conversation cleared', 'info');
    }
}

// =============================================
// STORAGE MANAGEMENT
// =============================================

function saveConversationHistory() {
    Storage.set('conversationHistory', VoiceState.conversationHistory.slice(-50)); // Keep last 50 messages
}

function loadConversationHistory() {
    const history = Storage.get('conversationHistory');
    if (history && history.length > 0) {
        VoiceState.conversationHistory = history;
        // Optionally restore messages to UI
        // history.forEach(msg => {
        //     addMessageToConversation(msg.text, msg.type);
        // });
    }
}

// =============================================
// LANGUAGE SUPPORT (Future Enhancement)
// =============================================

function setLanguage(lang) {
    VoiceState.selectedLanguage = lang;
    Storage.set('voiceLanguage', lang);
    showNotification(`Language changed to ${lang}`, 'info');
}

// =============================================
// ACCESSIBILITY
// =============================================

function ensureAccessibility() {
    const micButton = document.getElementById('micButton');
    if (micButton) {
        micButton.setAttribute('aria-label', 'Microphone button for voice input');
        micButton.setAttribute('role', 'button');
    }
    
    const textInput = document.getElementById('textInput');
    if (textInput) {
        textInput.setAttribute('aria-label', 'Text input for voice assistant');
    }
}

// =============================================
// CONSOLE LOG
// =============================================

console.log('🎤 Voice Assistant module loaded');