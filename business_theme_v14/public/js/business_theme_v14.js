// Simple Theme JavaScript - Just add icons and basic enhancements
$(document).ready(function() {
    console.log('Sky Blue Theme Loaded');
    
    // Add simple icons to sidebar
    addSidebarIcons();
    
    // Add hover effects
    addHoverEffects();
});

function addSidebarIcons() {
    // Simple icon mapping
    const icons = {
        'home': '🏠',
        'dashboard': '📊',
        'accounts': '💰',
        'selling': '🛒',
        'buying': '🛍️',
        'stock': '📦',
        'manufacturing': '🏭',
        'hr': '👥',
        'payroll': '💵',
        'projects': '📋',
        'crm': '🤝',
        'support': '🎧',
        'assets': '🏢',
        'website': '🌐',
        'setup': '⚙️',
        'settings': '🔧',
        'reports': '📈',
        'tools': '🛠️'
    };
    
    // Add icons to sidebar labels
    $('.sidebar-label').each(function() {
        const $label = $(this);
        const text = $label.text().toLowerCase().trim();
        
        // Find matching icon
        let icon = '📁'; // default folder icon
        Object.keys(icons).forEach(key => {
            if (text.includes(key)) {
                icon = icons[key];
            }
        });
        
        // Add icon if not already present
        if (!$label.find('.menu-icon').length) {
            $label.prepend(`<span class="menu-icon" style="margin-right: 8px; font-size: 16px;">${icon}</span>`);
        }
    });
}

function addHoverEffects() {
    // Add smooth hover effects to buttons
    $('.btn').hover(
        function() {
            $(this).css('transform', 'translateY(-1px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );
    
    // Add hover effects to cards
    $('.widget, .card').hover(
        function() {
            $(this).css({
                'transform': 'translateY(-3px)',
                'box-shadow': '0 6px 25px rgba(30, 144, 255, 0.15)'
            });
        },
        function() {
            $(this).css({
                'transform': 'translateY(0)',
                'box-shadow': '0 2px 15px rgba(30, 144, 255, 0.1)'
            });
        }
    );
}

// Add custom CSS for smooth transitions
const customCSS = `
<style>
.btn {
    transition: all 0.3s ease !important;
}

.widget, .card {
    transition: all 0.3s ease !important;
}

.sidebar-label {
    transition: all 0.3s ease !important;
}

.menu-icon {
    display: inline-block;
    transition: transform 0.3s ease;
}

.sidebar-label:hover .menu-icon {
    transform: scale(1.2);
}
</style>
`;

$('head').append(customCSS);
