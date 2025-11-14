class PremiumChatbot {
    constructor() {
        // Gemini API Configuration
        this.apiKey = 'AIzaSyCmiRnSf5spvb6rDMENqdRIAeXAM39Oeao';
        this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
        
        this.isOpen = false;
        this.isProcessing = false;
        this.conversationHistory = [];
        this.maxHistory = 20;
        this.elements = {};
        this.apiCallCount = 0;
        this.lastApiCallTime = 0;
        
        this.init();
    }

    init() {
        if (!this.loadElements()) {
            console.warn('Chatbot elements not found');
            return;
        }
        this.loadEventListeners();
    }

    loadElements() {
        this.elements.widget = document.getElementById('aiChatWidget');
        this.elements.toggle = document.getElementById('aiChatToggle');
        this.elements.close = document.getElementById('chatClose');
        this.elements.messages = document.getElementById('chatMessages');
        this.elements.input = document.getElementById('chatInput');
        this.elements.sendButton = document.getElementById('sendButton');
        this.elements.voiceButton = document.getElementById('voiceButton');
        this.elements.attachButton = document.getElementById('attachButton');
        this.elements.notificationBadge = document.getElementById('notificationBadge');

        if (!this.elements.widget || !this.elements.toggle) return false;
        return true;
    }

    loadEventListeners() {
        this.elements.toggle.addEventListener('click', () => this.toggleChat());
        if (this.elements.close) this.elements.close.addEventListener('click', () => this.closeChat());
        if (this.elements.sendButton) this.elements.sendButton.addEventListener('click', () => this.sendMessage());
        
        if (this.elements.input) {
            this.elements.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            this.elements.input.addEventListener('input', () => this.resizeInput());
        }

        if (this.elements.voiceButton) this.elements.voiceButton.addEventListener('click', () => this.startVoiceInput());
        if (this.elements.attachButton) this.elements.attachButton.addEventListener('click', () => this.showAttachmentOptions());

        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                const text = e.currentTarget.dataset.prompt || e.currentTarget.textContent;
                if (this.elements.input) this.elements.input.value = text;
                setTimeout(() => this.sendMessage(), 100);
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.elements.widget) {
            this.elements.widget.classList.toggle('active', this.isOpen);
        }
        if (this.isOpen && this.elements.input) {
            this.elements.input.focus();
            this.scrollToBottom();
        }
    }

    openChat() {
        if (!this.isOpen) this.toggleChat();
    }

    closeChat() {
        if (this.isOpen) this.toggleChat();
    }

    async sendMessage() {
        if (!this.elements.input || this.isProcessing) return;

        const message = this.elements.input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.elements.input.value = '';
        this.resizeInput();

        const normalized = message.toLowerCase().replace(/[^\w\s]/g, '');
        if (normalized === 'hi') {
            this.addMessage("Hi dear student, I'm GITA smart AI 🤖 How can I assist you today?", 'ai');
            return;
        }

        this.setProcessingState(true);
        try {
            const response = await this.callGeminiAPI(message);
            this.addMessage(response, 'ai');
        } catch (err) {
            // Show user-friendly error messages
            let errorMessage = '';
            
            if (err.message.includes('overloaded')) {
                errorMessage = '⏳ I\'m currently overloaded with requests. Please try again in a moment. Thank you for your patience!';
            } else if (err.message.includes('API key') || err.message.includes('authentication') || err.message.includes('Authentication')) {
                errorMessage = '🔑 I\'m having authentication issues with my AI service. Please try again later.';
            } else if (err.message.includes('timeout') || err.message.includes('Timeout')) {
                errorMessage = '⏰ The request took too long. Please try again with a shorter question.';
            } else if (err.message.includes('network') || err.message.includes('Network') || err.message.includes('Failed to fetch')) {
                errorMessage = '🌐 I\'m having trouble connecting to my service. Please check your internet and try again.';
            } else if (err.message.includes('Empty') || err.message.includes('empty')) {
                errorMessage = '😔 I couldn\'t generate a response. Please try rephrasing your question.';
            } else if (err.message.includes('No response')) {
                errorMessage = '😔 Sorry, I couldn\'t process your request. Please try again later.';
            } else if (err.message.includes('Invalid')) {
                errorMessage = '⚠️ There was an issue with your request. Please try with a different question.';
            } else {
                errorMessage = '😔 Sorry, I\'m unable to respond right now due to some issues. Please try again later!';
            }
            
            this.addMessage(errorMessage, 'ai');
            console.error('Error details:', err.message);
        } finally {
            this.setProcessingState(false);
        }
    }

    setProcessingState(on) {
        this.isProcessing = on;
        if (this.elements.sendButton) {
            this.elements.sendButton.disabled = on;
            this.elements.sendButton.innerHTML = on ? '<i class="fas fa-spinner fa-spin"></i>' : '<i class="fas fa-paper-plane"></i>';
        }
        if (this.elements.input) this.elements.input.disabled = on;
        if (on) this.showTypingIndicator();
        else this.hideTypingIndicator();
    }

    async callGeminiAPI(prompt) {
        try {
            this.apiCallCount++;

            if (!prompt || prompt.trim().length === 0) {
                throw new Error('Message cannot be empty');
            }

            console.log('');
            console.log('═══════════════════════════════════════════════════════');
            console.log('📤 API Call #' + this.apiCallCount);
            console.log('📝 Message: ' + prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''));
            console.log('═══════════════════════════════════════════════════════');

            // Build contents array
            const contents = [];

            // Add system prompt only on first message
            if (this.conversationHistory.length === 0) {
                contents.push({
                    role: 'user',
                    parts: [{ text: 'You are a helpful study assistant for GITA Autonomous College. Help students with their academics in a friendly manner.' }]
                });
                contents.push({
                    role: 'model',
                    parts: [{ text: 'I\'m your study assistant! I\'m here to help you understand concepts, solve problems, and excel in your studies. What can I help you with?' }]
                });
            }

            // Add conversation history
            for (const msg of this.conversationHistory) {
                contents.push({
                    role: msg.role,
                    parts: [{ text: msg.text }]
                });
            }

            // Add current message
            contents.push({
                role: 'user',
                parts: [{ text: prompt }]
            });

            console.log('📊 History: ' + this.conversationHistory.length + ' messages');
            console.log('📋 Sending: ' + contents.length + ' total messages');

            // Prepare request
            const requestBody = {
                contents: contents,
                generationConfig: {
                    temperature: 0.9,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048
                },
                safetySettings: [
                    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
                ]
            };

            console.log('🔄 Calling Gemini API...');
            const startTime = Date.now();

            const response = await fetch(`${this.baseURL}?key=${this.apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            const duration = Date.now() - startTime;
            console.log('⏱️ Response in ' + duration + 'ms');
            console.log('📥 Status: ' + response.status);

            const data = await response.json();

            if (!response.ok) {
                const error = data.error || {};
                const msg = error.message || 'Unknown error';
                console.error('❌ API Error:', msg);
                
                if (msg.includes('overloaded') || response.status === 429) {
                    throw new Error('API is overloaded. Please try again later.');
                } else if (msg.includes('API key') || msg.includes('authentication') || response.status === 401) {
                    throw new Error('API authentication issue. Please try again.');
                } else if (response.status === 403) {
                    throw new Error('Permission denied. Please try again.');
                } else if (response.status >= 500) {
                    throw new Error('Server error. Please try again later.');
                } else {
                    throw new Error('API error: ' + msg);
                }
            }

            if (data.error) {
                const msg = data.error.message || 'Unknown error';
                console.error('❌ Error:', msg);
                
                if (msg.includes('overloaded')) {
                    throw new Error('API is overloaded. Please try again later.');
                } else if (msg.includes('API key') || msg.includes('authentication')) {
                    throw new Error('API authentication issue. Please try again.');
                } else {
                    throw new Error('API error: ' + msg);
                }
            }

            // Extract response
            if (!data.candidates || !data.candidates[0]) {
                throw new Error('No response from API');
            }

            const candidate = data.candidates[0];
            if (!candidate.content || !candidate.content.parts || !candidate.content.parts[0]) {
                throw new Error('Invalid API response structure');
            }

            const responseText = candidate.content.parts[0].text;
            if (!responseText || responseText.trim().length === 0) {
                throw new Error('Empty response from API');
            }

            console.log('✅ Got response: ' + responseText.length + ' characters');
            console.log('═══════════════════════════════════════════════════════');

            // Save to history with correct role names
            this.conversationHistory.push({ role: 'user', text: prompt });
            this.conversationHistory.push({ role: 'model', text: responseText });

            // Trim history
            if (this.conversationHistory.length > this.maxHistory * 2) {
                this.conversationHistory = this.conversationHistory.slice(-this.maxHistory * 2);
            }

            return responseText;

        } catch (error) {
            console.error('🔴 ERROR:', error.message);
            console.error('═══════════════════════════════════════════════════════');
            throw error;
        }
    }

    addMessage(text, sender) {
        if (!this.elements.messages) return;

        const msg = document.createElement('div');
        msg.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = '';

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        msg.appendChild(avatar);
        const content = document.createElement('div');
        content.className = 'message-content';
        content.appendChild(bubble);
        content.appendChild(time);
        msg.appendChild(content);

        this.elements.messages.appendChild(msg);
        this.scrollToBottom();

        // If it's an AI message, use typewriter animation
        if (sender === 'ai') {
            this.typewriterEffect(bubble, text);
        } else {
            // For user messages, display immediately
            bubble.innerHTML = this.formatText(text);
        }
    }

    typewriterEffect(bubble, text) {
        const formattedText = this.formatText(text);
        const div = document.createElement('div');
        div.innerHTML = formattedText;
        const plainText = div.innerText;

        let index = 0;
        let displayHtml = '';

        const typeChar = () => {
            if (index < plainText.length) {
                const char = plainText[index];
                
                if (char === '\n') {
                    displayHtml += '<br>';
                } else if (char === ' ') {
                    displayHtml += '&nbsp;';
                } else if (char === '<') {
                    displayHtml += '&lt;';
                } else if (char === '>') {
                    displayHtml += '&gt;';
                } else if (char === '&') {
                    displayHtml += '&amp;';
                } else {
                    displayHtml += char;
                }

                bubble.innerHTML = displayHtml + '<span class="typing-cursor"></span>';
                this.scrollToBottom();
                
                index++;
                
                // Vary the speed slightly for more natural effect
                const delay = Math.random() > 0.9 ? 50 : 20;
                setTimeout(typeChar, delay);
            } else {
                // Remove cursor when done
                bubble.innerHTML = displayHtml;
                this.scrollToBottom();
            }
        };

        // Apply formatting after typing completes
        setTimeout(() => {
            typeChar();
        }, 100);
    }

    formatText(s) {
        if (!s) return '';
        const esc = String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return esc.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    showTypingIndicator() {
        if (!this.elements.messages) return;
        if (document.getElementById('typingIndicator')) return;

        const div = document.createElement('div');
        div.id = 'typingIndicator';
        div.className = 'message ai-message';
        div.innerHTML = '<div class="message-avatar"><i class="fas fa-robot"></i></div><div class="message-content"><div class="message-bubble typing-dots"><span></span><span></span><span></span></div></div>';
        this.elements.messages.appendChild(div);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const el = document.getElementById('typingIndicator');
        if (el) el.remove();
    }

    resizeInput() {
        if (!this.elements.input) return;
        this.elements.input.style.height = 'auto';
        this.elements.input.style.height = Math.min(this.elements.input.scrollHeight, 120) + 'px';
    }

    scrollToBottom() {
        if (!this.elements.messages) return;
        setTimeout(() => {
            this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
        }, 50);
    }

    showAttachmentOptions() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.txt,.doc,.docx,.jpg,.png';
        input.onchange = (e) => {
            const file = e.target.files?.[0];
            if (file) this.handleFileAttachment(file);
        };
        input.click();
    }

    handleFileAttachment(file) {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            this.addMessage('File too large (max 5MB)', 'ai');
            return;
        }

        this.addMessage(`📎 Attached: ${file.name}`, 'user');

        const reader = new FileReader();
        reader.onload = async () => {
            const txt = String(reader.result || '').slice(0, 3000);
            try {
                const resp = await this.callGeminiAPI(`Analyze this file excerpt:\n${txt}`);
                this.addMessage(resp, 'ai');
            } catch (e) {
                this.addMessage('Error processing file', 'ai');
            }
        };
        reader.onerror = () => {
            this.addMessage('Could not read file', 'ai');
        };
        reader.readAsText(file);
    }

    startVoiceInput() {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) {
            this.addMessage('Voice not supported', 'ai');
            return;
        }

        const rec = new SR();
        rec.lang = 'en-US';
        this.addMessage('🎤 Listening...', 'ai');

        rec.onresult = (e) => {
            let text = '';
            for (let i = e.resultIndex; i < e.results.length; i++) {
                text += e.results[i][0].transcript;
            }
            if (text && this.elements.input) {
                this.elements.input.value = text;
                this.sendMessage();
            }
        };

        rec.start();
    }

    changeTheme() {
        const themes = ['light', 'dark', 'blue', 'green'];
        const cur = localStorage.getItem('chatTheme') || 'dark';
        const next = themes[(themes.indexOf(cur) + 1) % themes.length];
        localStorage.setItem('chatTheme', next);
        if (this.elements.widget) {
            this.elements.widget.className = this.elements.widget.className.replace(/theme-\w+/, '');
            this.elements.widget.classList.add(`theme-${next}`);
        }
    }

    exportChat() {
        if (!this.elements.messages) return;
        const text = this.elements.messages.innerText;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.premiumChatbot = new PremiumChatbot();
});
