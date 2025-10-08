// ========================================
// 1. CLOCK FUNCTIONALITY
// ========================================
$(document).ready(function () {
  clockUpdate();
  setInterval(clockUpdate, 1000);
});

function padZero(x) {
  return x < 10 ? `0${x}` : x;
}

function base12(x) {
  if (x > 12) {
    x = x - 12;
  } else if (x == 0) {
    x = 12;
  }
  return x;
}

function formatTime(dt, seconds) {
  const h = padZero(base12(dt.getHours()));
  const m = padZero(dt.getMinutes());
  const s = padZero(dt.getSeconds());
  const suffix = dt.getHours() >= 12 ? "PM" : "AM";
  return `${h}:${m}:${s} <small>${suffix}</small>`;
}

function clockUpdate() {
  let clock_html;
  const container_style =
    'style="display: grid;grid-template-columns: auto auto;justify-items: stretch;justify-content: space-between;"';
  const container_item_style = 'style="font-weight:bold;font-size:large;"';
  const is_multi_clock =
    frappe.boot.time_zone.user &&
    frappe.boot.time_zone.user != frappe.boot.time_zone.system;
  
  if (is_multi_clock) {
    const now_user = new Date(frappe.datetime.convert_to_user_tz());
    const now_sys = new Date(frappe.datetime.convert_to_system_tz());
    clock_html = `
      <div ${container_style}>
        <div>User:</div><div ${container_item_style}>${formatTime(now_user)}</div>
        <div>Site:</div><div ${container_item_style}>${formatTime(now_sys)}</div>
      </div>`;
  } else {
    const now_user = new Date(frappe.datetime.convert_to_user_tz());
    clock_html = `<div ${container_style}>
      <div>Time:</div><div ${container_item_style}>${formatTime(now_user)}</div>
    </div>`;
  }
  
  $("#desk-navbar-extended-clock").html(`<div>${clock_html}</div>`);
}

setTimeout(() => {
  $(".dropdown-navbar-user a:contains('Show Time')").attr(
    "id",
    "desk-navbar-extended-clock",
  );
  $(".dropdown-navbar-user button:contains('Show Time')").attr(
    "id",
    "desk-navbar-extended-clock",
  );
}, 1000);

// ========================================
// 2. WIDER AWESOMEBAR
// ========================================
frappe.ready(function() {
  // Wait for the page to fully load
  setTimeout(function() {
    // Make awesomebar wider
    const awesomebar = document.querySelector('#navbar-search');
    if (awesomebar) {
      awesomebar.style.maxWidth = '600px';
      awesomebar.style.minWidth = '400px';
      
      // Also adjust the parent container
      const searchContainer = awesomebar.closest('.form-group');
      if (searchContainer) {
        searchContainer.style.flex = '1';
        searchContainer.style.maxWidth = '600px';
      }
    }
    
    // Target the input specifically
    const searchInput = document.querySelector('#navbar-search input');
    if (searchInput) {
      searchInput.style.width = '100%';
    }
  }, 1000);
});

// ========================================
// 3. VOICE SEARCH [WIP - Basic Implementation]
// ========================================
frappe.ready(function() {
  setTimeout(function() {
    addVoiceSearchButton();
  }, 1500);
});

function addVoiceSearchButton() {
  const searchInput = document.querySelector('#navbar-search input');
  
  if (!searchInput || document.querySelector('.voice-search-btn')) {
    return; // Already added or input not found
  }
  
  // Check if browser supports speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.log('Speech recognition not supported in this browser');
    return;
  }
  
  // Create voice search button
  const voiceBtn = document.createElement('button');
  voiceBtn.className = 'voice-search-btn btn btn-sm';
  voiceBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>';
  voiceBtn.title = 'Voice Search (Click to speak)';
  voiceBtn.style.cssText = `
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 5px;
    z-index: 10;
  `;
  
  // Position the input's parent relatively
  const inputGroup = searchInput.closest('.input-group') || searchInput.parentElement;
  if (inputGroup) {
    inputGroup.style.position = 'relative';
    inputGroup.appendChild(voiceBtn);
  }
  
  // Initialize speech recognition
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = frappe.boot.lang || 'en-US';
  
  let isListening = false;
  
  voiceBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (isListening) {
      recognition.stop();
      return;
    }
    
    try {
      recognition.start();
      isListening = true;
      voiceBtn.style.color = '#ff5858';
      frappe.show_alert({
        message: 'Listening... Speak now',
        indicator: 'blue'
      });
    } catch (error) {
      console.error('Voice recognition error:', error);
      frappe.show_alert({
        message: 'Could not start voice recognition',
        indicator: 'red'
      });
    }
  });
  
  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    
    // Trigger search
    const inputEvent = new Event('input', { bubbles: true });
    searchInput.dispatchEvent(inputEvent);
    
    frappe.show_alert({
      message: `Searching for: ${transcript}`,
      indicator: 'green'
    });
  };
  
  recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
    let errorMsg = 'Voice search error';
    
    if (event.error === 'no-speech') {
      errorMsg = 'No speech detected. Please try again.';
    } else if (event.error === 'not-allowed') {
      errorMsg = 'Microphone access denied. Please enable it in browser settings.';
    }
    
    frappe.show_alert({
      message: errorMsg,
      indicator: 'red'
    });
  };
  
  recognition.onend = function() {
    isListening = false;
    voiceBtn.style.color = '';
  };
}

// Re-add voice button on page navigation
$(document).on('page-change', function() {
  setTimeout(addVoiceSearchButton, 1000);
});
