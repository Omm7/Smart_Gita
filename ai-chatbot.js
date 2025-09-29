
class PremiumChatbot {
    constructor() {
        
        this.apiKey = 'AIzaSyD3nZncaJyM045MWglg3HwxvOTHypWqvro';
        this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
        
        
        this.isOpen = false;
        this.isProcessing = false;
        this.messageCount = 0;
        this.conversationHistory = [];
        this.userName = null;
        this.hasGreeted = false;
        
        
        this.elements = {};
        
        
        this.init();
    }

    init() {
        console.log('🚀 Ultra-Premium iOS Chatbot Initializing...');
        
        
        setTimeout(() => {
            if (this.loadElements()) {
                this.loadEventListeners();
                this.setupUserPreferences();
                console.log('✅ Premium Chatbot Ready!');
            }
        }, 100);
    }

    loadElements() {
        try {
            this.elements = {
                widget: document.getElementById('aiChatWidget'),
                toggle: document.getElementById('aiChatToggle'),
                close: document.getElementById('chatClose'),
                messages: document.getElementById('chatMessages'),
                input: document.getElementById('chatInput'),
                sendButton: document.getElementById('sendButton'),
                menuToggle: document.getElementById('menuToggle'),
                actionMenu: document.getElementById('actionMenu'),
                voiceButton: document.getElementById('voiceButton'),
                attachButton: document.getElementById('attachButton'),
                notificationBadge: document.getElementById('notificationBadge')
            };

            
            if (!this.elements.widget || !this.elements.toggle) {
                console.error('❌ Essential elements missing');
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error loading elements:', error);
            return false;
        }
    }

    loadEventListeners() {
        
        this.elements.toggle.addEventListener('click', () => this.toggleChat());
        this.elements.close.addEventListener('click', () => this.closeChat());
        
        
        this.elements.sendButton.addEventListener('click', () => this.sendMessage());
        this.elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        
        this.elements.input.addEventListener('input', () => this.resizeInput());

        
        this.elements.menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleActionMenu();
        });

        
        this.elements.voiceButton.addEventListener('click', () => this.toggleVoiceInput());

        
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                const prompt = e.target.dataset.prompt;
                this.elements.input.value = prompt;
                setTimeout(() => this.sendMessage(), 200);
            });
        });

        
        document.addEventListener('click', () => {
            this.elements.actionMenu.classList.remove('active');
        });

        console.log('✅ All event listeners loaded');
    }

    setupUserPreferences() {
        
        const savedName = localStorage.getItem('chatbotUserName');
        const savedHistory = localStorage.getItem('chatbotHistory');
        
        if (savedName) this.userName = savedName;
        if (savedHistory) this.conversationHistory = JSON.parse(savedHistory);
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.elements.widget.classList.add('active');
        this.elements.input.focus();
        this.scrollToBottom();
        
        
        this.hideNotification();
        
        console.log('💬 Chat opened');
    }

    closeChat() {
        this.isOpen = false;
        this.elements.widget.classList.remove('active');
        this.elements.actionMenu.classList.remove('active');
        
        console.log('💬 Chat closed');
    }

    toggleActionMenu() {
        this.elements.actionMenu.classList.toggle('active');
    }

    async sendMessage() {
        if (this.isProcessing) {
            console.log('⚠️ Already processing message');
            return;
        }

        const message = this.elements.input.value.trim();
        if (!message) {
            console.log('⚠️ Empty message');
            return;
        }

        console.log('📤 Sending message:', message);

        
        this.addMessage(message, 'user');
        this.elements.input.value = '';
        this.resizeInput();

        
        this.setProcessingState(true);

        try {
            const response = await this.callGeminiAPI(message);
            console.log('📥 Received AI response');
            
            
            setTimeout(() => {
                this.addMessage(response, 'ai');
                this.showNotification();
            }, 800);

        } catch (error) {
            console.error('❌ Error:', error);
            setTimeout(() => {
                this.addMessage(this.handleAPIError(error), 'ai');
            }, 800);
        } finally {
            this.setProcessingState(false);
        }
    }

    setProcessingState(processing) {
        this.isProcessing = processing;
        
        
        this.elements.sendButton.disabled = processing;
        this.elements.input.disabled = processing;
        this.elements.sendButton.innerHTML = processing ? 
            '<i class="fas fa-spinner fa-spin"></i>' : 
            '<i class="fas fa-paper-plane"></i>';

        
        if (processing) {
            this.showTypingIndicator();
        } else {
            this.hideTypingIndicator();
        }
    }

    async callGeminiAPI(prompt) {
        console.log('🔗 Calling Gemini API...');
        
        
        if (!this.apiKey) {
            throw new Error('API key not configured');
        }

        try {
            const conversationContext = this.buildConversationContext(prompt);
            
            const response = await fetch(`${this.baseURL}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: conversationContext,
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Invalid response format');
            }
            
        } catch (error) {
            console.error('🔌 API Call Failed:', error);
            throw error;
        }
    }

    buildConversationContext(currentPrompt) {
        
        if (!this.hasGreeted && !this.userName) {
            this.extractUserName(currentPrompt);
        }

        const systemPrompt = {
            role: "user",
            parts: [{
                text: `You are an ultra-premium AI study assistant with an elegant, iOS-inspired personality. You're helpful, precise, and maintain a sophisticated yet friendly tone.

${this.userName && !this.hasGreeted ? `The user's name appears to be ${this.userName}. Greet them personally in your first response, but don't mention their name in every message.` : ''}

Focus Areas:
• Academic explanations & concept clarification
• Homework guidance & study strategies
• Exam preparation & project assistance
• Technical concept breakdowns

Response Style:
- Be exceptionally clear and structured
- Use elegant, professional language
- Include practical examples when helpful
- Provide actionable next steps
- Maintain a supportive, encouraging tone

Current Query: "${currentPrompt}"

Provide a comprehensive, premium educational response.`
            }]
        };

        
        const history = this.conversationHistory.slice(-4);
        return [...history, systemPrompt];
    }

    extractUserName(message) {
        
        const namePatterns = [
            /(?:my name is|i am|i'm) (\w+)/i,
            /(?:call me|you can call me) (\w+)/i,
            /^(\w+)$/i 
        ];

        for (const pattern of namePatterns) {
            const match = message.match(pattern);
            if (match && match[1]) {
                this.userName = match[1];
                localStorage.setItem('chatbotUserName', this.userName);
                console.log(`👤 Extracted user name: ${this.userName}`);
                break;
            }
        }
    }

    updateConversationHistory(userMessage, aiResponse) {
        
        this.conversationHistory.push({
            role: "user",
            parts: [{ text: userMessage }]
        });

        this.conversationHistory.push({
            role: "model", 
            parts: [{ text: aiResponse }]
        });

        
        if (this.conversationHistory.length > 10) {
            this.conversationHistory = this.conversationHistory.slice(-10);
        }

        
        localStorage.setItem('chatbotHistory', JSON.stringify(this.conversationHistory));
    }

    handleAPIError(error) {
        console.error('API Error:', error);
        
        if (error.message.includes('429')) {
            return "I'm currently assisting other students. Please wait a moment and try again. ⏳";
        } else if (error.message.includes('network')) {
            return "I'm having connection issues. Please check your internet connection. 📡";
        } else if (error.message.includes('API key')) {
            return "The AI service is being configured. Please try again later. ⚙️";
        } else {
            return "I'm temporarily unavailable. Please try again in a few moments. 🔄";
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = sender === 'ai' ? 
            '<i class="fas fa-robot"></i>' : 
            '<i class="fas fa-user"></i>';
        
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        
        
        const formattedText = this.formatMessage(text);
        bubbleDiv.innerHTML = formattedText;
        
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.getCurrentTime();
        
        
        if (sender === 'ai') {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'message-actions';
            actionsDiv.innerHTML = `
                <button class="action-button" onclick="premiumChatbot.copyToClipboard(this)" title="Copy">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="action-button" onclick="premiumChatbot.pinMessage(this)" title="Pin">
                    <i class="fas fa-thumbtack"></i>
                </button>
            `;
            contentDiv.appendChild(actionsDiv);
        }
        
        contentDiv.appendChild(bubbleDiv);
        contentDiv.appendChild(timeDiv);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.elements.messages.appendChild(messageDiv);
        this.scrollToBottom();
        
        
        if (sender === 'ai') {
            this.updateConversationHistory('', text);
            if (!this.hasGreeted) {
                this.hasGreeted = true;
            }
        }
        
        this.messageCount++;
    }

    formatMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message';
        typingDiv.id = 'typingIndicator';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const typingContent = document.createElement('div');
        typingContent.className = 'typing-indicator';
        typingContent.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="typing-text">AI is thinking...</div>
        `;
        
        contentDiv.appendChild(typingContent);
        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(contentDiv);
        
        this.elements.messages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    resizeInput() {
        this.elements.input.style.height = 'auto';
        this.elements.input.style.height = Math.min(this.elements.input.scrollHeight, 120) + 'px';
    }

    scrollToBottom() {
        setTimeout(() => {
            this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
        }, 100);
    }

    showNotification() {
        if (!this.isOpen && this.elements.notificationBadge) {
            this.elements.notificationBadge.style.display = 'flex';
        }
    }

    hideNotification() {
        if (this.elements.notificationBadge) {
            this.elements.notificationBadge.style.display = 'none';
        }
    }

    
    copyToClipboard(button) {
        const messageText = button.closest('.message').querySelector('.message-bubble').textContent;
        navigator.clipboard.writeText(messageText).then(() => {
            
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = originalHTML;
            }, 2000);
        });
    }

    pinMessage(button) {
        const message = button.closest('.message');
        message.style.background = 'rgba(255, 215, 0, 0.1)';
        button.innerHTML = '<i class="fas fa-check"></i>';
        console.log('📌 Message pinned');
    }

    toggleVoiceInput() {
        
        console.log('🎤 Voice input toggled');
        this.addMessage('Voice input feature coming soon! 🎤', 'ai');
    }

    exportChat() {
        const chatContent = this.elements.messages.innerText;
        const blob = new Blob([chatContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-export-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    searchChat() {
        const query = prompt('Search in conversation:');
        if (query) {
            const messages = this.elements.messages.querySelectorAll('.message-bubble');
            messages.forEach(msg => {
                if (msg.textContent.toLowerCase().includes(query.toLowerCase())) {
                    msg.style.background = 'rgba(0, 122, 255, 0.1)';
                    setTimeout(() => {
                        msg.style.background = '';
                    }, 3000);
                }
            });
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Ultra-Premium Chatbot...');
    window.premiumChatbot = new PremiumChatbot();
});
