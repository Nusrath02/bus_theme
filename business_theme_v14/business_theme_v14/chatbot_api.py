<style>
  .chat-container {
    background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
    border-radius: 16px;
    width: 500px;
    max-width: 95%;
    max-height: 700px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    margin: 50px auto;
    border: 1px solid #333;
  }
  .chat-header {
    background: #0d6efd;
    padding: 16px;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    color: white;
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
    padding: 12px 16px;
    border-radius: 18px 18px 4px 18px;
    max-width: 80%;
    word-wrap: break-word;
    float: right;
  }
  .bot .bubble {
    background: #2a2a2a;
    color: #00e676;
    display: inline-block;
    padding: 12px 16px;
    border-radius: 18px 18px 18px 4px;
    max-width: 80%;
    word-wrap: break-word;
    border: 1px solid #333;
  }
  .input-box {
    display: flex;
    padding: 16px;
    background: #252525;
    border-top: 1px solid #333;
  }
  .input-box input {
    flex: 1;
    border: 1px solid #444;
    outline: none;
    background: #1a1a1a;
    color: white;
    padding: 12px 16px;
    border-radius: 24px;
  }
  .input-box button {
    background: #0d6efd;
    color: white;
    border: none;
    padding: 12px 24px;
    margin-left: 12px;
    border-radius: 24px;
    cursor: pointer;
  }
</style>

<div class="chat-container">
  <div class="chat-header">🤖 AI Assistant</div>
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

<script>
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
    
    document.getElementById('loading').remove();
    const botMsg = response.message?.message || "Sorry, I couldn't process that.";
    chatBox.innerHTML += '<div class="msg bot"><div class="bubble">' + escapeHtml(botMsg) + '</div></div>';
  } catch (error) {
    document.getElementById('loading').remove();
    chatBox.innerHTML += '<div class="msg bot"><div class="bubble" style="color: #ff6b6b;">⚠️ Error: ' + escapeHtml(error.message) + '</div></div>';
  }
  chatBox.scrollTop = chatBox.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
</script>
