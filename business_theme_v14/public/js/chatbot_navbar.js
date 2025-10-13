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
            width: 400px;
            max-width: 95vw;
            height: 600px;
            max-height: 80vh;
            background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            border: 1px solid #333;
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
            background: #0d6efd;
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 600;
            font-size: 16px;
            color: white;
        }
        
        .chatbot-header-title {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .chatbot-icon {
            width: 24px;
            height: 24px;
            object-fit: contain;
        }
        
        .chatbot-close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            transition: background 0.2s;
            padding: 0;
        }
        
        .chatbot-close-btn:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .chatbot-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #1a1a1a;
        }
        
        .chat-msg {
            margin-bottom: 16px;
            animation: fadeIn 0.3s ease-in;
            clear: both;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .chat-msg.user .msg-bubble {
            background: #0d6efd;
            color: white;
            display: inline-block;
            padding: 10px 14px;
            border-radius: 16px 16px 4px 16px;
            max-width: 85%;
            word-wrap: break-word;
            float: right;
            font-size: 14px;
        }
        
        .chat-msg.bot .msg-bubble {
            background: #2a2a2a;
            color: #00e676;
            display: inline-block;
            padding: 10px 14px;
            border-radius: 16px 16px 16px 4px;
            max-width: 85%;
            word-wrap: break-word;
            border: 1px solid #333;
            font-size: 14px;
        }
        
        .chatbot-input-area {
            display: flex;
            padding: 12px 16px;
            background: #252525;
            border-top: 1px solid #333;
            gap: 8px;
        }
        
        .chatbot-input-area input {
            flex: 1;
            border: 1px solid #444;
            outline: none;
            background: #1a1a1a;
            color: white;
            padding: 10px 14px;
            border-radius: 20px;
            font-size: 14px;
        }
        
        .chatbot-input-area input:focus {
            border-color: #0d6efd;
        }
        
        .chatbot-input-area button {
            background: #0d6efd;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            transition: background 0.2s;
            font-weight: 600;
            font-size: 14px;
        }
        
        .chatbot-input-area button:hover {
            background: #0b5ed7;
        }
        
        /* Floating chatbot button */
        .chatbot-float-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: #0d6efd;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(13, 110, 253, 0.4);
            z-index: 9998;
            transition: transform 0.3s ease;
        }
        
        .chatbot-float-btn:hover {
            transform: scale(1.1);
        }
        
        .chatbot-float-btn img {
            width: 36px;
            height: 36px;
            object-fit: contain;
        }
        
        /* Overlay for closing dropdown when clicking outside */
        .chatbot-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9998;
            background: transparent;
        }
        
        .chatbot-overlay.active {
            display: block;
        }
    `;
    document.head.appendChild(style);

    // Create chatbot HTML
    const chatbotHTML = `
        <!-- Overlay -->
        <div class="chatbot-overlay" id="chatbotOverlay"></div>
        
        <!-- Chatbot Dropdown -->
        <div class="chatbot-dropdown" id="chatbotDropdown">
            <div class="chatbot-header">
                <div class="chatbot-header-title">
                    <img src="/assets/business_theme_v14/images/robot_Ai.jpg" alt="AI" class="chatbot-icon">
                    <span>AI Assistant</span>
                </div>
                <button class="chatbot-close-btn" id="chatbotCloseBtn" title="Close">×</button>
            </div>
            <div class="chatbot-messages" id="chatbotMessages">
                <div class="chat-msg bot">
                    <div class="msg-bubble">👋 Hi! I'm your AI assistant. Ask me anything! Hi Nusrath🥰</div>
                </div>
            </div>
            <div class="chatbot-input-area">
                <input type="text" id="chatbotInput" placeholder="Type your question..." />
                <button id="chatbotSendBtn">Send</button>
            </div>
        </div>
        
        <!-- Floating button -->
        <div class="chatbot-float-btn" id="chatbotFloatBtn" title="Open AI Chatbot">
            <img src="/assets/business_theme_v14/images/robot_Ai.jpg" alt="AI Assistant">
        </div>
    `;

    // Add to body
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

    // Helper function to escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Send message function - DEFINE THIS FIRST!
    window.sendMessage = async function() {
        const userMsg = input.value.trim();
        if (!userMsg) return;

        console.log('Sending message:', userMsg);

        // Add user message
        messages.innerHTML += `
            <div class="chat-msg user">
                <div class="msg-bubble">${escapeHtml(userMsg)}</div>
            </div>
        `;
        input.value = '';

        // Add loading
        messages.innerHTML += `
            <div class="chat-msg bot" id="chatbotLoading">
                <div class="msg-bubble"><img src="/assets/business_theme_v14/images/robot_Ai.jpg" alt="AI" style="width: 16px; height: 16px; vertical-align: middle;"> Thinking...</div>
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
            messages.innerHTML += `
                <div class="chat-msg bot">
                    <div class="msg-bubble">${escapeHtml(botMsg)}</div>
                </div>
            `;
        } catch (error) {
            const loading = document.getElementById('chatbotLoading');
            if (loading) loading.remove();

            messages.innerHTML += `
                <div class="chat-msg bot">
                    <div class="msg-bubble" style="color: #ff6b6b;">⚠️ Error: ${escapeHtml(error.message)}</div>
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
        console.log('Chatbot closed');
    };

    // Event listeners - NOW AFTER FUNCTION DEFINITIONS!
    if (closeBtn) closeBtn.onclick = closeChatbot;
    if (overlay) overlay.onclick = closeChatbot;
    if (floatBtn) floatBtn.onclick = toggleChatbot;
    if (sendBtn) sendBtn.onclick = sendMessage;  // Now sendMessage is defined!
    
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();  // Now sendMessage is defined!
        });
    }

    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeChatbot();
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
        a.innerHTML = '<img src="/assets/business_theme_v14/images/robot_Ai.jpg" alt="AI" style="width: 24px; height: 24px; vertical-align: middle;">';

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
