<style>
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
  
  .chat-header {
    background: #0d6efd;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 16px;
    color: white;
  }
  
  .chat-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .chat-close-btn {
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
  
  .chat-close-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .chat-box {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #1a1a1a;
  }
  
  .msg {
    margin-bottom: 16px;
    animation: fadeIn 0.3s ease-in;
    clear: both;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .user .bubble {
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
  
  .bot .bubble {
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
  
  .input-box {
    display: flex;
    padding: 12px 16px;
    background: #252525;
    border-top: 1px solid #333;
    gap: 8px;
  }
  
  .input-box input {
    flex: 1;
    border: 1px solid #444;
    outline: none;
    background: #1a1a1a;
    color: white;
    padding: 10px 14px;
    border-radius: 20px;
    font-size: 14px;
  }
  
  .input-box input:focus {
    border-color: #0d6efd;
  }
  
  .input-box button {
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
  
  .input-box button:hover {
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
    font-size: 30px;
    transition: transform 0.3s ease;
  }
  
  .chatbot-float-btn:hover {
    transform: scale(1.1);
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
  }
  
  .chatbot-overlay.active {
    display: block;
  }
</style>

<!-- Overlay (clicking outside closes dropdown) -->
<div class="chatbot-overlay" id="chatbotOverlay" onclick="closeChatbot()"></div>

<!-- Chatbot Dropdown -->
<div class="chatbot-dropdown" id="chatbotDropdown">
  <div class="chat-header">
    <div class="chat-header-title">
      <span>🤖</span>
      <span>AI Assistant</span>
    </div>
    <button class="chat-close-btn" onclick="closeChatbot()" title="Close">×</button>
  </div>
  <div class="chat-box" id="chatBox">
    <div class="msg bot">
      <div class="bubble">👋 Hi! I'm your AI assistant. Ask me anything!</div>
    </div>
  </div>
  <div class="input-box">
    <input type="text" id="userInput" placeholder="Type your question..." onkeypress="if(event.key==='Enter') sendMessage()" />
    <button onclick="sendMessage()">Send</button>
  </div>
</div>

<!-- Floating button (optional - for mobile/quick access) -->
<div class="chatbot-float-btn" onclick="toggleChatbot()" title="Open AI Chatbot">
  🤖
</div>

<script>
// Toggle chatbot dropdown
function toggleChatbot() {
  const dropdown = document.getElementById('chatbotDropdown');
  const overlay = document.getElementById('chatbotOverlay');
  
  if (dropdown.classList.contains('active')) {
    closeChatbot();
  } else {
    openChatbot();
  }
}

// Open chatbot dropdown
function openChatbot() {
  document.getElementById('chatbotDropdown').classList.add('active');
  document.getElementById('chatbotOverlay').classList.add('active');
  
  // Focus input after opening
  setTimeout(() => {
    const input = document.getElementById('userInput');
    if (input) input.focus();
  }, 100);
}

// Close chatbot dropdown
function closeChatbot() {
  document.getElementById('chatbotDropdown').classList.remove('active');
  document.getElementById('chatbotOverlay').classList.remove('active');
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeChatbot();
  }
});

// Send message function
async function sendMessage() {
  const input = document.getElementById('userInput');
  const chatBox = document.getElementById('chatBox');
  const userMsg = input.value.trim();
  if (!userMsg) return;

  chatBox.innerHTML += '<div class="msg user"><div class="bubble">' + escapeHtml(userMsg) + '</div></div>';
  input.value = '';
  chatBox.innerHTML += '<div class="msg bot" id="loading"><div class="bubble">🤖 Thinking...</div></div>';
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await frappe.call({
      method: 'business_theme_v14.business_theme_v14.chatbot_api.get_response',
      args: { message: userMsg }
    });
    
    const loadingEl = document.getElementById('loading');
    if (loadingEl) loadingEl.remove();
    
    const botMsg = response.message?.message || "Sorry, I couldn't process that.";
    chatBox.innerHTML += '<div class="msg bot"><div class="bubble">' + escapeHtml(botMsg) + '</div></div>';
  } catch (error) {
    const loadingEl = document.getElementById('loading');
    if (loadingEl) loadingEl.remove();
    
    chatBox.innerHTML += '<div class="msg bot"><div class="bubble" style="color: #ff6b6b;">⚠️ Error: ' + escapeHtml(error.message) + '</div></div>';
  }
  chatBox.scrollTop = chatBox.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Add chatbot icon to navbar
(function() {
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
    a.innerHTML = '<span style="font-size: 20px;">🤖</span>';
    
    li.appendChild(a);
    navbar.insertBefore(li, navbar.firstChild);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(addNavbarIcon, 1000);
    });
  } else {
    setTimeout(addNavbarIcon, 1000);
  }
})();
</script>
