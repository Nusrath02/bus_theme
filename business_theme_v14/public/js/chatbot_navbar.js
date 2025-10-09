frappe.ready(function() {
    add_chatbot_to_navbar();
});

$(document).on('app_ready', function() {
    add_chatbot_to_navbar();
});

function add_chatbot_to_navbar() {
    // Wait for page to fully load
    setTimeout(function() {
        // Check if already added
        if ($('#chatbot-navbar-btn').length) return;
        
        // Find the navbar (where bell icon is)
        const navbar = $('.navbar .navbar-nav');
        
        if (navbar.length) {
            // Create chatbot button HTML
            const chatbot_html = `
                <li class="nav-item" id="chatbot-navbar-btn" style="margin-right: 10px;">
                    <a class="nav-link" href="javascript:void(0)" 
                       onclick="openChatbotModal()" 
                       title="AI Assistant">
                        <span style="font-size: 22px; cursor: pointer;">🤖</span>
                    </a>
                </li>
            `;
            
            // Insert before notifications (bell icon)
            navbar.prepend(chatbot_html);
        }
    }, 1000);
}

// Function to open chatbot in a modal
function openChatbotModal() {
    // Create modal dialog
    const dialog = new frappe.ui.Dialog({
        title: '🤖 AI Assistant',
        size: 'large',
        fields: [
            {
                fieldtype: 'HTML',
                fieldname: 'chatbot_container'
            }
        ],
        primary_action_label: 'Close',
        primary_action: function() {
            dialog.hide();
        }
    });
    
    // Add chatbot HTML to modal
    const chatbot_html = `
        <style>
            .chatbot-modal-container {
                height: 600px;
                display: flex;
                flex-direction: column;
                background: #1a1a1a;
                border-radius: 8px;
                overflow: hidden;
            }
            .chatbot-header {
                background: #0d6efd;
                padding: 16px;
                text-align: center;
                font-weight: 600;
                color: white;
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
                padding: 12px 16px;
                border-radius: 18px 18px 4px 18px;
                max-width: 80%;
                word-wrap: break-word;
                float: right;
            }
            .chat-msg.bot .msg-bubble {
                background: #2a2a2a;
                color: #00e676;
                display: inline-block;
                padding: 12px 16px;
                border-radius: 18px 18px 18px 4px;
                max-width: 80%;
                word-wrap: break-word;
                border: 1px solid #333;
            }
            .chatbot-input-area {
                display: flex;
                padding: 16px;
                background: #252525;
                border-top: 1px solid #333;
                gap: 12px;
            }
            .chatbot-input-area input {
                flex: 1;
                border: 1px solid #444;
                outline: none;
                background: #1a1a1a;
                color: white;
                padding: 12px 16px;
                border-radius: 24px;
            }
            .chatbot-input-area button {
                background: #0d6efd;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 24px;
                cursor: pointer;
                font-weight: 600;
            }
            .chatbot-input-area button:hover {
                background: #0b5ed7;
            }
        </style>
        <div class="chatbot-modal-container">
            <div class="chatbot-header">AI Assistant</div>
            <div class="chatbot-messages" id="modalChatBox">
                <div class="chat-msg bot">
                    <div class="msg-bubble">👋 Hi! I'm your AI assistant. Ask me anything!</div>
                </div>
            </div>
            <div class="chatbot-input-area">
                <input type="text" id="modalChatInput" placeholder="Type your question..." />
                <button onclick="sendModalMessage()">Send</button>
            </div>
        </div>
    `;
    
    dialog.fields_dict.chatbot_container.$wrapper.html(chatbot_html);
    dialog.show();
    
    // Add Enter key support
    $('#modalChatInput').on('keypress', function(e) {
        if (e.key === 'Enter') {
            sendModalMessage();
        }
    });
    
    // Focus input
    setTimeout(() => $('#modalChatInput').focus(), 100);
}

// Function to send message from modal
window.sendModalMessage = async function() {
    const input = document.getElementById('modalChatInput');
    const chatBox = document.getElementById('modalChatBox');
    const userMsg = input.value.trim();
    
    if (!userMsg) return;
    
    // Add user message
    chatBox.innerHTML += `
        <div class="chat-msg user">
            <div class="msg-bubble">${escapeHtml(userMsg)}</div>
        </div>
    `;
    input.value = '';
    
    // Add loading message
    chatBox.innerHTML += `
        <div class="chat-msg bot" id="modalLoading">
            <div class="msg-bubble">🤖 Thinking...</div>
        </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
    
    try {
        // Call API
        const response = await frappe.call({
            method: 'business_theme_v14.business_theme_v14.chatbot_api.get_response',
            args: { message: userMsg }
        });
        
        // Remove loading
        document.getElementById('modalLoading')?.remove();
        
        // Add bot response
        const botMsg = response.message?.message || "Sorry, I couldn't process that.";
        chatBox.innerHTML += `
            <div class="chat-msg bot">
                <div class="msg-bubble">${escapeHtml(botMsg)}</div>
            </div>
        `;
    } catch (error) {
        document.getElementById('modalLoading')?.remove();
        chatBox.innerHTML += `
            <div class="chat-msg bot">
                <div class="msg-bubble" style="color: #ff6b6b;">⚠️ Error: ${escapeHtml(error.message)}</div>
            </div>
        `;
    }
    
    chatBox.scrollTop = chatBox.scrollHeight;
    input.focus();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
