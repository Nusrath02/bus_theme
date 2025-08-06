// Glassmorphism Components Auto-Application
document.addEventListener('DOMContentLoaded', function() {
    
    // Auto-apply glassmorphism classes to existing elements
    const glassElements = {
        // Convert containers to glass containers
        containers: document.querySelectorAll('.container, .main-section, .content-area'),
        
        // Convert sidebars to glass sidebars
        sidebars: document.querySelectorAll('.sidebar, .layout-side-section, .desk-sidebar'),
        
        // Convert cards to glass cards
        cards: document.querySelectorAll('.card, .widget, .dashboard-graph, .number-card'),
        
        // Convert buttons to glass buttons
        buttons: document.querySelectorAll('.btn:not(.btn-primary):not(.btn-secondary)'),
        
        // Convert inputs to glass inputs
        inputs: document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea, select'),
        
        // Convert modals to glass modals
        modals: document.querySelectorAll('.modal-content, .dialog, .popup')
    };
    
    // Apply glass container class
    glassElements.containers.forEach(container => {
        if (!container.classList.contains('glass-container')) {
            container.classList.add('glass-container');
        }
    });
    
    // Apply glass sidebar class
    glassElements.sidebars.forEach(sidebar => {
        if (!sidebar.classList.contains('glass-sidebar')) {
            sidebar.classList.add('glass-sidebar');
        }
    });
    
    // Apply glass card class
    glassElements.cards.forEach(card => {
        if (!card.classList.contains('glass-card')) {
            card.classList.add('glass-card');
        }
    });
    
    // Apply glass button class
    glassElements.buttons.forEach(button => {
        if (!button.classList.contains('glass-button')) {
            button.classList.add('glass-button');
        }
    });
    
    // Apply glass input class
    glassElements.inputs.forEach(input => {
        if (!input.classList.contains('glass-input')) {
            input.classList.add('glass-input');
        }
    });
    
    // Apply glass modal class
    glassElements.modals.forEach(modal => {
        if (!modal.classList.contains('glass-modal')) {
            modal.classList.add('glass-modal');
        }
    });
    
    // Add glassmorphism theme class to body for conditional styling
    document.body.classList.add('glassmorphism-theme');
    
    // Enhanced interaction feedback for glass elements
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('glass-button') || 
            e.target.classList.contains('glass-card')) {
            
            // Add click ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = e.target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            e.target.style.position = 'relative';
            e.target.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .glassmorphism-theme .glass-button,
    .glassmorphism-theme .glass-card {
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);