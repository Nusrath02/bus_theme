// Initialize chatbot on page load
(function() {
    // Prevent double initialization
    if (window.chatbotInitialized) return;
    window.chatbotInitialized = true;

    console.log('Initializing chatbot...');

    // Add CSS styles
    const style = document.createElement('style');
    style.innerHTML = `
        /* Chatbot Dropdown Container */
        .chatbot-dropdown {
            display: none;
            position: fixed;
            top: 60px;
            right: 20px;
            width: 450px;
            max-width: 95vw;
            height: 650px;
            max-height: 85vh;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
            border: 1px solid #e0e0e0;
            z-index: 9999;
            flex-direction: column;
            overflow: hidden;
            animation: slideDown 0.3s ease-out;
        }
        
        .chatbot-dropdown.active {
            display: flex;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .chatbot-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 600;
            font-size: 18px;
            color: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .chatbot-header-title {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .chatbot-close-btn {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            transition: all 0.2s;
            padding: 0;
        }
        
        .chatbot-close-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        .chatbot-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f8f9fa;
        }
        
        .chatbot-messages::-webkit-scrollbar {
            width: 6px;
        }
        
        .chatbot-messages::-webkit-scrollbar-thumb {
            background: #cbd5e0;
            border-radius: 3px;
        }
        
        .chat-msg {
            margin-bottom: 20px;
            animation: fadeIn 0.3s ease-in;
            clear: both;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .chat-msg.user .msg-bubble {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: inline-block;
            padding: 12px 16px;
            border-radius: 18px 18px 4px 18px;
            max-width: 80%;
            word-wrap: break-word;
            float: right;
            font-size: 15px;
            line-height: 1.5;
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }
        
        .chat-msg.bot .msg-bubble {
            background: white;
            color: #2d3748;
            display: inline-block;
            padding: 16px;
            border-radius: 18px 18px 18px 4px;
            max-width: 85%;
            word-wrap: break-word;
            border: 1px solid #e2e8f0;
            font-size: 15px;
            line-height: 1.6;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        /* Markdown Styling */
        .msg-bubble h1,
        .msg-bubble h2 {
            font-size: 18px;
            font-weight: 700;
            color: #1a202c;
            margin: 16px 0 12px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid #e2e8f0;
        }
        
        .msg-bubble h1:first-child,
        .msg-bubble h2:first-child {
            margin-top: 0;
        }
        
        .msg-bubble h3 {
            font-size: 16px;
            font-weight: 600;
            color: #2d3748;
            margin: 14px 0 10px 0;
        }
        
        .msg-bubble p {
            margin: 10px 0;
            color: #4a5568;
        }
        
        .msg-bubble ul,
        .msg-bubble ol {
            margin: 12px 0;
            padding-left: 24px;
        }
        
        .msg-bubble li {
            margin: 8px 0;
            color: #4a5568;
            line-height: 1.6;
        }
        
        .msg-bubble strong {
            font-weight: 600;
            color: #2d3748;
        }
        
        .msg-bubble code {
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            padding: 2px 6px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            color: #e53e3e;
        }
        
        .msg-bubble pre {
            background: #2d3748;
            color: #e2e8f0;
            padding: 12px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 12px 0;
        }
        
        .msg-bubble pre code {
            background: none;
            border: none;
            color: #e2e8f0;
            padding: 0;
        }
        
        .msg-bubble a {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }
        
        .msg-bubble a:hover {
            text-decoration: underline;
        }
        
        .msg-bubble blockquote {
            border-left: 4px solid #667eea;
            padding-left: 16px;
            margin: 12px 0;
            color: #4a5568;
            font-style: italic;
        }
        
        .chatbot-input-area {
            display: flex;
            padding: 16px;
            background: white;
            border-top: 1px solid #e2e8f0;
            gap: 10px;
        }
        
        .chatbot-input-area input {
            flex: 1;
            border: 2px solid #e2e8f0;
            outline: none;
            background: #f7fafc;
            color: #2d3748;
            padding: 12px 16px;
            border-radius: 24px;
            font-size: 15px;
            transition: all 0.2s;
        }
        
        .chatbot-input-area input:focus {
            border-color: #667eea;
            background: white;
        }
        
        .chatbot-input-area button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 24px;
            cursor: pointer;
            transition: all 0.2s;
            font-weight: 600;
            font-size: 15px;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        .chatbot-input-area button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
        }
        
        .chatbot-input-area button:active {
            transform: translateY(0);
        }
        
        /* Floating chatbot button */
        .chatbot-float-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
            z-index: 9998;
            font-size: 32px;
            transition: all 0.3s ease;
        }
        
        .chatbot-float-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
        }
        
        /* Overlay */
        .chatbot-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9998;
            background: rgba(0, 0, 0, 0.3);
        }
        
        .chatbot-overlay.active {
            display: block;
        }
        
        /* Loading animation */
        .typing-indicator {
            display: inline-flex;
            gap: 4px;
            padding: 8px 0;
        }
        
        .typing-indicator span {
            width: 8px;
            height: 8px;
            background: #cbd5e0;
            border-radius: 50%;
            animation: typing 1.4s infinite;
        }
        
        .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typing {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);

    // Simple markdown parser
    function parseMarkdown(text) {
        // Escape HTML first
        text = text.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;');
        
        // Headers
        text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // Bold
        text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
        // Lists
        text = text.replace(/^\* (.+)$/gim, '<li>$1</li>');
        text = text.replace(/^- (.+)$/gim, '<li>$1</li>');
        text = text.replace(/^\d+\. (.+)$/gim, '<li>$1</li>');
        
        // Wrap lists
        text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        // Code blocks
        text = text.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
        
        // Inline code
        text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Links
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // Line breaks
        text = text.replace(/\n\n/g, '</p><p>');
        text = '<p>' + text + '</p>';
        
        // Clean up empty paragraphs
        text = text.replace(/<p><\/p>/g, '');
        text = text.replace(/<p>(<h[123]>)/g, '$1');
        text = text.replace(/(<\/h[123]>)<\/p>/g, '$1');
        text = text.replace(/<p>(<ul>)/g, '$1');
        text = text.replace(/(<\/ul>)<\/p>/g, '$1');
        
        return text;
    }

    // Create chatbot HTML
    const chatbotHTML = `
        <div class="chatbot-overlay" id="chatbotOverlay"></div>
        
        <div class="chatbot-dropdown" id="chatbotDropdown">
            <div class="chatbot-header">
                <div class="chatbot-header-title">
                    <span>🤖</span>
                    <span>AI Assistant</span>
                </div>
                <button class="chatbot-close-btn" id="chatbotCloseBtn" title="Close">×</button>
            </div>
            <div class="chatbot-messages" id="chatbotMessages">
                <div class="chat-msg bot">
                    <div class="msg-bubble">👋 Hi! I'm your AI assistant. How can I help you today?</div>
                </div>
            </div>
            <div class="chatbot-input-area">
                <input type="text" id="chatbotInput" placeholder="Ask me anything..." />
                <button id="chatbotSendBtn">Send</button>
            </div>
        </div>
        
        <div class="chatbot-float-btn" id="chatbotFloatBtn" title="Open AI Chatbot">
            🤖
        </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = chatbotHTML;
    document.body.appendChild(div);

    // Get elements
    const dropdown = document.getElementById('chatbotDropdown');
    const overlay = document.getElementById('chatbotOverlay');
    const closeBtn = document.getElementById('chatbotCloseBtn');
    const floatBtn = document.getElementById('chatbotFloatBtn');
    const input = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('chatbotSendBtn');
    const messages = document.getElementById('chatbotMessages');

    // Send message function
    window.sendMessage = async function() {
        const userMsg = input.value.trim();
        if (!userMsg) return;

        console.log('Sending message:', userMsg);

        // Escape HTML for user message
        const escapedMsg = userMsg.replace(/&/g, '&amp;')
                                  .replace(/</g, '&lt;')
                                  .replace(/>/g, '&gt;');

        // Add user message
        messages.innerHTML += `
            <div class="chat-msg user">
                <div class="msg-bubble">${escapedMsg}</div>
            </div>
        `;
        input.value = '';

        // Add loading indicator
        messages.innerHTML += `
            <div class="chat-msg bot" id="chatbotLoading">
                <div class="msg-bubble">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        messages.scrollTop = messages.scrollHeight;

        try {
            const response = await frappe.call({
                method: 'business_theme_v14.business_theme_v14.chatbot_api.get_response',
                args: { message: userMsg }
            });

            const loading = document.getElementById('chatbotLoading');
            if (loading) loading.remove();

            const botMsg = response.message?.message || "Sorry, I couldn't process that.";
            const formattedMsg = parseMarkdown(botMsg);
            
            messages.innerHTML += `
                <div class="chat-msg bot">
                    <div class="msg-bubble">${formattedMsg}</div>
                </div>
            `;
        } catch (error) {
            const loading = document.getElementById('chatbotLoading');
            if (loading) loading.remove();

            const errorMsg = error.message.replace(/&/g, '&amp;')
                                         .replace(/</g, '&lt;')
                                         .replace(/>/g, '&gt;');
            
            messages.innerHTML += `
                <div class="chat-msg bot">
                    <div class="msg-bubble" style="color: #e53e3e; border-color: #feb2b2;">
                        ⚠️ <strong>Error:</strong> ${errorMsg}
                    </div>
                </div>
            `;
            console.error('Chatbot error:', error);
        }

        messages.scrollTop = messages.scrollHeight;
        input.focus();
    };

    // Toggle chatbot
    window.toggleChatbot = function() {
        if (dropdown.classList.contains('active')) {
            closeChatbot();
        } else {
            openChatbot();
        }
    };

    // Open chatbot
    window.openChatbot = function() {
        dropdown.classList.add('active');
        overlay.classList.add('active');
        setTimeout(() => input && input.focus(), 100);
        console.log('Chatbot opened');
    };

    // Close chatbot
    window.closeChatbot = function() {
        dropdown.classList.remove('active');
        overlay.classList.remove('active');
        
        // Clear chat messages and restore welcome message
        messages.innerHTML = `
            <div class="chat-msg bot">
                <div class="msg-bubble">👋 Hi! I'm your AI assistant. How can I help you today?</div>
            </div>
        `;
        
        console.log('Chatbot closed');
    };

    // Event listeners
    if (closeBtn) closeBtn.onclick = closeChatbot;
    if (overlay) overlay.onclick = closeChatbot;
    if (floatBtn) floatBtn.onclick = toggleChatbot;
    if (sendBtn) sendBtn.onclick = sendMessage;
    
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dropdown.classList.contains('active')) {
            closeChatbot();
        }
    });

    // Add navbar icon
    function addNavbarIcon() {
        if (document.getElementById('chatbot-navbar-icon')) return;

        const navbar = document.querySelector('.navbar .navbar-nav');
        if (!navbar) {
            setTimeout(addNavbarIcon, 500);
            return;
        }

        const li = document.createElement('li');
        li.id = 'chatbot-navbar-icon';
        li.className = 'nav-item';
        li.style.marginRight = '12px';

        const a = document.createElement('a');
        a.className = 'nav-link';
        a.href = 'javascript:void(0)';
        a.title = 'AI Assistant';
        a.onclick = toggleChatbot;
        a.innerHTML = '<span style="font-size: 22px;">🤖</span>';

        li.appendChild(a);
        navbar.insertBefore(li, navbar.firstChild);
        
        console.log('Navbar icon added');
    }

    // Initialize navbar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(addNavbarIcon, 1000);
        });
    } else {
        setTimeout(addNavbarIcon, 1000);
    }

    console.log('Chatbot initialized successfully');
})();
