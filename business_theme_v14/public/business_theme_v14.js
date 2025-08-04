// Enhanced Business Theme JavaScript
// Add dynamic icons and enhanced functionality

$(document).ready(function() {
    // Initialize theme enhancements
    initializeThemeEnhancements();
    addDynamicIcons();
    addPageAnimations();
    addCustomInteractions();
});

function initializeThemeEnhancements() {
    console.log('Business Theme V14 - Sky Blue Edition Loaded');
    
    // Add theme class to body
    $('body').addClass('sky-blue-theme');
    
    // Add loading animation
    addLoadingAnimation();
    
    // Initialize tooltips
    initializeTooltips();
}

function addDynamicIcons() {
    // Module/Page specific icon mappings
    const moduleIcons = {
        'accounts': 'fa-calculator',
        'selling': 'fa-shopping-cart',
        'buying': 'fa-shopping-bag',
        'stock': 'fa-cubes',
        'manufacturing': 'fa-industry',
        'projects': 'fa-tasks',
        'hr': 'fa-users',
        'crm': 'fa-handshake-o',
        'support': 'fa-life-ring',
        'assets': 'fa-building',
        'quality': 'fa-certificate',
        'website': 'fa-globe',
        'setup': 'fa-cogs',
        'integrations': 'fa-plug',
        'customize': 'fa-paint-brush',
        'dashboard': 'fa-dashboard',
        'reports': 'fa-bar-chart',
        'file-manager': 'fa-folder-open',
        'desk': 'fa-desktop',
        'email': 'fa-envelope',
        'calendar': 'fa-calendar',
        'todo': 'fa-check-square-o',
        'notes': 'fa-sticky-note',
        'chat': 'fa-comments'
    };
    
    // Add icons to sidebar links
    $('.sidebar-label').each(function() {
        const $label = $(this);
        const text = $label.text().toLowerCase().trim();
        
        // Find matching icon
        let iconClass = 'fa-circle-o'; // default icon
        Object.keys(moduleIcons).forEach(key => {
            if (text.includes(key)) {
                iconClass = moduleIcons[key];
            }
        });
        
        // Add icon if not already present
        if (!$label.find('.fa').length) {
            $label.prepend(`<i class="fa ${iconClass} page-icon"></i> `);
        }
    });
    
    // Add icons to breadcrumbs dynamically
    addBreadcrumbIcons();
    
    // Add icons to buttons
    addButtonIcons();
    
    // Add icons to tabs
    addTabIcons();
}

function addBreadcrumbIcons() {
    $('#navbar-breadcrumbs a').each(function(index) {
        const $link = $(this);
        const text = $link.text().toLowerCase();
        
        // Set specific icons based on breadcrumb level and content
        let iconClass = 'fa-home';
        
        if (index === 0) {
            iconClass = 'fa-home';
        } else if (text.includes('list') || text.includes('tree')) {
            iconClass = 'fa-list';
        } else if (text.includes('form') || text.includes('new')) {
            iconClass = 'fa-plus-circle';
        } else if (text.includes('report')) {
            iconClass = 'fa-bar-chart';
        } else if (text.includes('dashboard')) {
            iconClass = 'fa-dashboard';
        } else {
            iconClass = 'fa-folder-o';
        }
        
        // Add data attribute for CSS styling
        $link.attr('data-icon', iconClass);
    });
}

function addButtonIcons() {
    // Add icons to common buttons
    const buttonIcons = {
        'new': 'fa-plus',
        'save': 'fa-save',
        'submit': 'fa-check',
        'cancel': 'fa-times',
        'delete': 'fa-trash',
        'edit': 'fa-edit',
        'refresh': 'fa-refresh',
        'export': 'fa-download',
        'import': 'fa-upload',
        'print': 'fa-print',
        'email': 'fa-envelope',
        'duplicate': 'fa-copy',
        'reload': 'fa-refresh'
    };
    
    $('.btn').each(function() {
        const $btn = $(this);
        const text = $btn.text().toLowerCase().trim();
        
        Object.keys(buttonIcons).forEach(key => {
            if (text.includes(key) && !$btn.find('.fa').length) {
                $btn.prepend(`<i class="fa ${buttonIcons[key]}"></i> `);
            }
        });
    });
}

function addTabIcons() {
    // Add icons to tabs
    const tabIcons = {
        'details': 'fa-info-circle',
        'connections': 'fa-link',
        'timeline': 'fa-clock-o',
        'attachments': 'fa-paperclip',
        'comments': 'fa-comments',
        'dashboard': 'fa-dashboard',
        'settings': 'fa-cog'
    };
    
    $('.nav-tabs .nav-link, .nav-pills .nav-link').each(function() {
        const $tab = $(this);
        const text = $tab.text().toLowerCase().trim();
        
        Object.keys(tabIcons).forEach(key => {
            if (text.includes(key) && !$tab.find('.fa').length) {
                $tab.prepend(`<i class="fa ${tabIcons[key]}"></i> `);
            }
        });
    });
}

function addPageAnimations() {
    // Add smooth transitions for page loads
    $('.layout-main-section').hide().fadeIn(800);
    
    // Add stagger animation for list items
    $('.list-row').each(function(index) {
        $(this).css({
            'opacity': '0',
            'transform': 'translateY(20px)'
        }).delay(index * 50).animate({
            'opacity': '1'
        }, 500).css('transform', 'translateY(0px)');
    });
    
    // Add hover animations for cards
    $('.widget, .form-grid').hover(
        function() {
            $(this).addClass('widget-hover');
        },
        function() {
            $(this).removeClass('widget-hover');
        }
    );
}

function addCustomInteractions() {
    // Add ripple effect to buttons
    $('.btn-primary').on('click', function(e) {
        addRippleEffect(e, this);
    });
    
    // Add smooth scrolling for internal links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
    
    // Add search enhancement
    enhanceSearch();
}

function addRippleEffect(event, element) {
    const $element = $(element);
    const $ripple = $('<span class="ripple"></span>');
    
    const size = Math.max($element.outerWidth(), $element.outerHeight());
    const x = event.offsetX - size / 2;
    const y = event.offsetY - size / 2;
    
    $ripple.css({
        width: size,
        height: size,
        left: x,
        top: y
    }).addClass('ripple-animate');
    
    $element.append($ripple);
    
    setTimeout(() => {
        $ripple.remove();
    }, 600);
}

function addLoadingAnimation() {
    // Add loading overlay
    const loadingHTML = `
        <div id="theme-loader" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #87ceeb 0%, #b3d9ff 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                border-top-color: #1e90ff;
                animation: spin 1s ease-in-out infinite;
            "></div>
        </div>
        <style>
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        </style>
    `;
    
    if ($('#theme-loader').length === 0) {
        $('body').prepend(loadingHTML);
        
        $(window).on('load', function() {
            $('#theme-loader').fadeOut(500, function() {
                $(this).remove();
            });
        });
    }
}

function initializeTooltips() {
    // Initialize tooltips for buttons and icons
    $('[data-toggle="tooltip"]').tooltip();
    
    // Add tooltips to buttons without titles
    $('.btn').each(function() {
        const $btn = $(this);
        if (!$btn.attr('title') && !$btn.attr('data-original-title')) {
            const text = $btn.text().trim();
            if (text) {
                $btn.attr('title', text).tooltip();
            }
        }
    });
}

function addKeyboardShortcuts() {
    $(document).keydown(function(e) {
        // Ctrl+Alt+N for new document
        if (e.ctrlKey && e.altKey && e.which === 78) {
            e.preventDefault();
            $('.btn-primary:contains("New")').first().click();
        }
        
        // Ctrl+Alt+S for save
        if (e.ctrlKey && e.altKey && e.which === 83) {
            e.preventDefault();
            $('.btn-primary:contains("Save")').first().click();
        }
        
        // Ctrl+Alt+R for refresh
        if (e.ctrlKey && e.altKey && e.which === 82) {
            e.preventDefault();
            location.reload();
        }
    });
}

function enhanceSearch() {
    // Add search icon to search inputs
    $('.search-bar input').each(function() {
        const $input = $(this);
        if (!$input.parent().find('.search-icon').length) {
            $input.before('<i class="fa fa-search search-icon" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #87ceeb; z-index: 10;"></i>');
            $input.css('padding-left', '35px');
        }
    });
}

// Add custom CSS for animations and effects
function addCustomStyles() {
    const customCSS = `
        <style>
        .widget-hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 8px 30px rgba(30, 144, 255, 0.2) !important;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            pointer-events: none;
            transform: scale(0);
        }
        
        .ripple-animate {
            animation: ripple-animation 0.6s linear;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .sky-blue-theme .sidebar-label {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .search-icon {
            pointer-events: none;
        }
        
        .page-icon {
            transition: all 0.3s ease;
        }
        
        .sidebar-label:hover .page-icon {
            transform: scale(1.2);
            color: #87ceeb !important;
        }
        </style>
    `;
    
    $('head').append(customCSS);
}

// Initialize custom styles
addCustomStyles();

// Add theme switch functionality (optional)
function addThemeSwitch() {
    const themeSwitchHTML = `
        <div id="theme-switch" style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #1e90ff, #87ceeb);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(30, 144, 255, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
        ">
            <i class="fa fa-paint-brush" style="color: white; font-size: 18px;"></i>
        </div>
    `;
    
    $('body').append(themeSwitchHTML);
    
    $('#theme-switch').hover(
        function() {
            $(this).css('transform', 'scale(1.1)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );
}

// Call theme switch
addThemeSwitch();
