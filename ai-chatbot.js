
class PremiumChatbot {
    constructor() {
        
        this.apiKey = 'AIzaSyD3nZncaJyM045MWglg3HwxvOTHypWqvro';
        this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
        
        
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

        
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                const prompt = e.target.dataset.prompt;
                this.elements.input.value = prompt;
                setTimeout(() => this.sendMessage(), 200);
            });
        });

        
        this.elements.voiceButton.addEventListener('click', () => this.startVoiceInput());
        this.elements.attachButton.addEventListener('click', () => this.showAttachmentOptions());

        console.log('✅ All event listeners loaded');
    }

    setupUserPreferences() {
        
        const savedName = localStorage.getItem('chatbotUserName');
        const savedHistory = localStorage.getItem('chatbotHistory');
        
        if (savedName) this.userName = savedName;
        // Don't load history on startup - start fresh for better API performance
        // if (savedHistory) this.conversationHistory = JSON.parse(savedHistory);
        
        // Clear old history that might cause issues
        localStorage.removeItem('chatbotHistory');
        this.conversationHistory = [];
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
            // Special-case greeting: respond immediately to "hi"
            const normalized = message.trim().toLowerCase().replace(/[^
