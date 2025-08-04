// Horizontal Navbar Module Navigation
// Creates RemoteHub-style horizontal navigation with all modules

frappe.ready(function() {
    console.log("Horizontal Navbar initialized");
    createHorizontalNavbar();
    initializeNavbarInteractions();
});

function createHorizontalNavbar() {
    $(document).ready(function() {
        // Wait for navbar to be available
        setTimeout(function() {
            buildHorizontalModuleNavigation();
        }, 1000);
    });
}

function buildHorizontalModuleNavigation() {
    // List of all ERPNext modules with their information
    const modules = [
        { name: 'Home', icon: '🏠', href: '/app/home', color: '#3b82f6' },
        { name: 'Accounting', icon: '💰', href: '/app/accounting', color: '#10b981' },
        { name: 'Buying', icon: '🛒', href: '/app/buying', color: '#8b5cf6' },
        { name: 'Selling', icon: '💼', href: '/app/selling', color: '#06b6d4' },
        { name: 'Stock', icon: '📦', href: '/app/stock', color: '#84cc16' },
        { name: 'Assets', icon: '🏭', href: '/app/assets', color: '#eab308' },
        { name: 'HR', icon: '👥', href: '/app/hr', color: '#ec4899' },
        { name: 'Manufacturing', icon: '⚙️', href: '/app/manufacturing', color: '#6b7280' },
        { name: 'Quality', icon: '✅', href: '/app/quality-management', color: '#10b981' },
        { name: 'Projects', icon: '📊', href: '/app/projects', color: '#f59e0b' },
        { name: 'Support', icon: '🎧', href: '/app/support', color: '#3b82f6' },
        { name: 'Users', icon: '👤', href: '/app/user', color: '#6366f1' },
        { name: 'Website', icon: '🌐', href: '/app/website', color: '#06b6d4' },
        { name: 'Payroll', icon: '💳', href: '/app/payroll', color: '#84cc16' },
        { name: 'CRM', icon: '🤝', href: '/app/crm', color: '#ec4899' },
        { name: 'Tools', icon: '🔧', href: '/app/build', color: '#6b7280' }
    ];

    // Find or create navbar container
    let $navbar = $('.navbar, .desk-nav');
    if (!$navbar.length) {
        console.warn("Navbar not found, creating one");
        $('body').prepend('<nav class="navbar"></nav>');
        $navbar = $('.navbar');
    }

    // Clear existing navbar content and rebuild
    $navbar.html('');

    // Create navbar structure
    const navbarHTML = `
        <div class="navbar-expand">
            <!-- Left: ITChamps Logo + Brand -->
            <div class="navbar-brand" href="/app">
                <!-- Logo will be added via CSS ::before -->
                <!-- Brand name will be added via CSS ::after -->
            </div>
            
            <!-- Center: Horizontal Module Navigation -->
            <div class="navbar-modules horizontal-modules">
                ${modules.map(module => `
                    <a href="${module.href}" class="module-link" data-module="${module.name}" title="${module.name}">
                        <span class="module-icon">${module.icon}</span>
                        <span class="module-name">${module.name}</span>
                    </a>
                `).join('')}
            </div>
            
            <!-- Right: Search + User Menu -->
            <div class="navbar-right">
                <div class="search-container">
                    <input type="text" class="search-bar" placeholder="Search or type a command (Ctrl + G)" />
                </div>
                <div class="user-menu" title="User Menu">
                    <span style="font-size: 20px;">👤</span>
                </div>
                <div class="notifications" title="Notifications">
                    <span style="font-size: 20px;">🔔</span>
                </div>
            </div>
            
            <!-- Mobile Menu Toggle (hidden on desktop) -->
            <button class="mobile-menu-toggle" style="display: none;">
                <span>☰</span>
            </button>
        </div>
        
        <!-- Mobile Dropdown Menu -->
        <div class="mobile-modules-menu">
            ${modules.map(module => `
                <a href="${module.href}" class="module-link" data-module="${module.name}">
                    <span class="module-icon">${module.icon}</span>
                    <span class="module-name">${module.name}</span>
                </a>
            `).join('')}
        </div>
    `;

    $navbar.html(navbarHTML);

    // Mark active module based on current URL
    const currentPath = window.location.pathname;
    $('.module-link').each(function() {
        const href = $(this).attr('href');
        if (currentPath.includes(href.replace('/app/', ''))) {
            $(this).addClass('active');
        }
    });

    console.log("Horizontal navbar created with", modules.length, "modules");
}

function initializeNavbarInteractions() {
    // Module link click handlers
    $(document).on('click', '.module-link', function(e) {
        e.preventDefault();
        
        const href = $(this).attr('href');
        const moduleName = $(this).data('module');
        
        // Add loading state
        $(this).addClass('loading');
        
        // Remove active from other modules
        $('.module-link').removeClass('active');
        
        // Add active to clicked module
        $(this).addClass('active');
        
        // Navigate to module
        setTimeout(() => {
            window.location.href = href;
        }, 200);
        
        // Show feedback
        showModuleFeedback(moduleName);
    });

    // Search functionality
    $(document).on('input', '.search-bar', function() {
        const query = $(this).val().toLowerCase();
        
        if (query.length > 0) {
            // Filter modules based on search
            $('.module-link').each(function() {
                const moduleName = $(this).data('module').toLowerCase();
                if (moduleName.includes(query)) {
                    $(this).css('opacity', '1');
                } else {
                    $(this).css('opacity', '0.3');
                }
            });
        } else {
            // Reset all modules
            $('.module-link').css('opacity', '1');
        }
    });

    // Search enter key
    $(document).on('keypress', '.search-bar', function(e) {
        if (e.which === 13) { // Enter key
            const query = $(this).val();
            if (query) {
                // Navigate to global search or first matching module
                const firstMatch = $('.module-link').filter(function() {
                    return $(this).css('opacity') === '1';
                }).first();
                
                if (firstMatch.length) {
                    firstMatch.click();
                }
            }
        }
    });

    // User menu click
    $(document).on('click', '.user-menu', function() {
        // Show user dropdown (implement as needed)
        showUserMenu();
    });

    // Notifications click
    $(document).on('click', '.notifications', function() {
        // Show notifications (implement as needed)
        showNotifications();
    });

    // Mobile menu toggle
    $(document).on('click', '.mobile-menu-toggle', function() {
        $('.mobile-modules-menu').toggleClass('show');
        
        // Update toggle icon
        const icon = $(this).find('span');
        if ($('.mobile-modules-menu').hasClass('show')) {
            icon.text('✖️');
        } else {
            icon.text('☰');
        }
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.mobile-menu-toggle, .mobile-modules-menu').length) {
            $('.mobile-modules-menu').removeClass('show');
            $('.mobile-menu-toggle span').text('☰');
        }
    });

    // Handle window resize
    $(window).on('resize', function() {
        const width = $(window).width();
        
        if (width > 768) {
            $('.mobile-modules-menu').removeClass('show');
            $('.mobile-menu-toggle span').text('☰');
            $('.mobile-menu-toggle').hide();
            $('.navbar-modules').show();
        } else {
            $('.mobile-menu-toggle').show();
            $('.navbar-modules').hide();
        }
    });

    console.log("Navbar interactions initialized");
}

// Utility Functions
function showModuleFeedback(moduleName) {
    // Create temporary feedback element
    const $feedback = $(`
        <div class="module-feedback" style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(59, 130, 246, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            z-index: 9999;
            transform: translateX(300px);
            transition: all 0.3s ease;
        ">
            📂 Opening ${moduleName}...
        </div>
    `);
    
    $('body').append($feedback);
    
    // Animate in
    setTimeout(() => {
        $feedback.css('transform', 'translateX(0)');
    }, 100);
    
    // Remove after 2 seconds
    setTimeout(() => {
        $feedback.css('transform', 'translateX(300px)');
        setTimeout(() => {
            $feedback.remove();
        }, 300);
    }, 2000);
}

function showUserMenu() {
    // Create user dropdown menu
    if ($('.user-dropdown').length) {
        $('.user-dropdown').remove();
        return;
    }
    
    const userMenuHTML = `
        <div class="user-dropdown" style="
            position: absolute;
            top: 100%;
            right: 60px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
            padding: 16px;
            min-width: 200px;
            z-index: 9999;
            transform: translateY(-10px);
            opacity: 0;
            transition: all 0.3s ease;
        ">
            <div style="padding: 12px; border-bottom: 1px solid rgba(59, 130, 246, 0.1); margin-bottom: 12px;">
                <div style="font-weight: 600; color: var(--text-primary);">👤 User Name</div>
                <div style="font-size: 12px; color: var(--text-muted);">user@company.com</div>
            </div>
            <a href="/app/user-profile" style="
                display: flex; align-items: center; gap: 12px; padding: 8px 12px; 
                border-radius: 8px; text-decoration: none; color: var(--text-secondary);
                transition: all 0.2s ease; margin-bottom: 4px;
            ">
                <span>👤</span> My Profile
            </a>
            <a href="/app/user-settings" style="
                display: flex; align-items: center; gap: 12px; padding: 8px 12px; 
                border-radius: 8px; text-decoration: none; color: var(--text-secondary);
                transition: all 0.2s ease; margin-bottom: 4px;
            ">
                <span>⚙️</span> Settings
            </a>
            <hr style="border: none; height: 1px; background: rgba(59, 130, 246, 0.1); margin: 8px 0;">
            <a href="/logout" style="
                display: flex; align-items: center; gap: 12px; padding: 8px 12px; 
                border-radius: 8px; text-decoration: none; color: #ef4444;
                transition: all 0.2s ease;
            ">
                <span>🚪</span> Logout
            </a>
        </div>
    `;
    
    $('.navbar-right').append(userMenuHTML);
    
    // Animate in
    setTimeout(() => {
        $('.user-dropdown').css({
            'transform': 'translateY(0)',
            'opacity': '1'
        });
    }, 50);
    
    // Add hover effects to dropdown items
    $('.user-dropdown a').hover(
        function() {
            $(this).css('background', 'var(--primary-50)');
        },
        function() {
            $(this).css('background', 'transparent');
        }
    );
    
    // Close when clicking outside
    setTimeout(() => {
        $(document).on('click.userMenu', function(e) {
            if (!$(e.target).closest('.user-menu, .user-dropdown').length) {
                $('.user-dropdown').remove();
                $(document).off('click.userMenu');
            }
        });
    }, 100);
}

function showNotifications() {
    // Create notifications dropdown
    if ($('.notifications-dropdown').length) {
        $('.notifications-dropdown').remove();
        return;
    }
    
    const notificationsHTML = `
        <div class="notifications-dropdown" style="
            position: absolute;
            top: 100%;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
            padding: 16px;
            min-width: 300px;
            max-height: 400px;
            overflow-y: auto;
            z-index: 9999;
            transform: translateY(-10px);
            opacity: 0;
            transition: all 0.3s ease;
        ">
            <div style="
                font-weight: 600; 
                color: var(--text-primary); 
                margin-bottom: 16px;
                padding-bottom: 12px;
                border-bottom: 1px solid rgba(59, 130, 246, 0.1);
                display: flex;
                align-items: center;
                gap: 8px;
            ">
                🔔 Notifications
            </div>
            <div class="notification-item" style="
                display: flex; align-items: center; gap: 12px; padding: 12px; 
                border-radius: 12px; margin-bottom: 8px; background: var(--primary-50);
                border-left: 4px solid var(--primary-500);
            ">
                <span style="font-size: 20px;">📋</span>
                <div>
                    <div style="font-weight: 600; font-size: 14px; color: var(--text-primary);">Welcome to ERPNext!</div>
                    <div style="font-size: 12px; color: var(--text-muted);">Your workspace is ready to use</div>
                </div>
            </div>
            <div class="notification-item" style="
                display: flex; align-items: center; gap: 12px; padding: 12px; 
                border-radius: 12px; margin-bottom: 8px; background: var(--bg-surface);
            ">
                <span style="font-size: 20px;">✅</span>
                <div>
                    <div style="font-weight: 600; font-size: 14px; color: var(--text-primary);">Theme Applied</div>
                    <div style="font-size: 12px; color: var(--text-muted);">ITChamps theme is now active</div>
                </div>
            </div>
            <div style="text-align: center; padding-top: 12px; border-top: 1px solid rgba(59, 130, 246, 0.1);">
                <a href="/app/notifications" style="
                    color: var(--primary-600); 
                    text-decoration: none; 
                    font-weight: 500;
                    font-size: 14px;
                ">View All Notifications</a>
            </div>
        </div>
    `;
    
    $('.navbar-right').append(notificationsHTML);
    
    // Animate in
    setTimeout(() => {
        $('.notifications-dropdown').css({
            'transform': 'translateY(0)',
            'opacity': '1'
        });
    }, 50);
    
    // Close when clicking outside
    setTimeout(() => {
        $(document).on('click.notifications', function(e) {
            if (!$(e.target).closest('.notifications, .notifications-dropdown').length) {
                $('.notifications-dropdown').remove();
                $(document).off('click.notifications');
            }
        });
    }, 100);
}

// Enhanced Search with Module Filtering
function initializeEnhancedNavbarSearch() {
    let searchTimeout;
    
    $(document).on('input', '.search-bar', function() {
        const $input = $(this);
        const query = $input.val().toLowerCase();
        
        clearTimeout(searchTimeout);
        
        if (query.length > 0) {
            // Show search suggestions
            searchTimeout = setTimeout(() => {
                showSearchSuggestions(query);
            }, 300);
            
            // Filter visible modules
            $('.module-link').each(function() {
                const moduleName = $(this).data('module').toLowerCase();
                if (moduleName.includes(query)) {
                    $(this).css({
                        'opacity': '1',
                        'transform': 'scale(1.05)',
                        'box-shadow': '0 4px 12px rgba(59, 130, 246, 0.3)'
                    });
                } else {
                    $(this).css({
                        'opacity': '0.3',
                        'transform': 'scale(0.95)',
                        'box-shadow': 'none'
                    });
                }
            });
        } else {
            // Reset all modules
            $('.module-link').css({
                'opacity': '1',
                'transform': 'scale(1)',
                'box-shadow': ''
            });
            hideSearchSuggestions();
        }
    });
    
    // Global search shortcut (Ctrl+G)
    $(document).on('keydown', function(e) {
        if (e.ctrlKey && e.key === 'g') {
            e.preventDefault();
            $('.search-bar').focus();
        }
    });
}

function showSearchSuggestions(query) {
    // Remove existing suggestions
    $('.search-suggestions').remove();
    
    // Create search suggestions
    const suggestions = [
        { name: 'Customer', icon: '👤', href: '/app/customer' },
        { name: 'Supplier', icon: '🏢', href: '/app/supplier' },
        { name: 'Item', icon: '📦', href: '/app/item' },
        { name: 'Sales Invoice', icon: '💰', href: '/app/sales-invoice' },
        { name: 'Purchase Order', icon: '🛒', href: '/app/purchase-order' },
        { name: 'Employee', icon: '👥', href: '/app/employee' },
        { name: 'Project', icon: '📊', href: '/app/project' }
    ].filter(item => item.name.toLowerCase().includes(query));
    
    if (suggestions.length === 0) return;
    
    const suggestionsHTML = `
        <div class="search-suggestions" style="
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
            margin-top: 8px;
            z-index: 9999;
            overflow: hidden;
        ">
            ${suggestions.map(item => `
                <a href="${item.href}" class="suggestion-item" style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border-bottom: 1px solid rgba(59, 130, 246, 0.1);
                    text-decoration: none;
                    color: var(--text-primary);
                    transition: all 0.2s ease;
                    font-weight: 500;
                ">
                    <span style="font-size: 18px;">${item.icon}</span>
                    <span>${item.name}</span>
                </a>
            `).join('')}
        </div>
    `;
    
    $('.search-container').css('position', 'relative').append(suggestionsHTML);
    
    // Add hover effects
    $('.suggestion-item').hover(
        function() {
            $(this).css('background', 'var(--primary-50)');
        },
        function() {
            $(this).css('background', 'transparent');
        }
    );
}

function hideSearchSuggestions() {
    $('.search-suggestions').remove();
}

// Navbar Scroll Behavior
function initializeNavbarScrollBehavior() {
    let lastScrollTop = 0;
    
    $(window).on('scroll', function() {
        const scrollTop = $(window).scrollTop();
        const $navbar = $('.navbar');
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide navbar
            $navbar.css('transform', 'translateY(-100%)');
        } else {
            // Scrolling up - show navbar
            $navbar.css('transform', 'translateY(0)');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Module Badge System (for notifications)
function updateModuleBadges() {
    // Example: Add notification badges to modules
    const moduleBadges = {
        'HR': 3,        // 3 pending approvals
        'Support': 5,   // 5 open tickets
        'Selling': 2    // 2 new leads
    };
    
    Object.keys(moduleBadges).forEach(moduleName => {
        const count = moduleBadges[moduleName];
        const $module = $(`.module-link[data-module="${moduleName}"]`);
        
        if ($module.length && count > 0) {
            // Add or update badge
            let $badge = $module.find('.badge');
            if (!$badge.length) {
                $badge = $('<span class="badge"></span>');
                $module.append($badge);
            }
            
            $badge.text(count).addClass('show');
        }
    });
}

// Brand Click Handler
function initializeBrandInteraction() {
    $(document).on('click', '.navbar-brand', function(e) {
        e.preventDefault();
        
        // Add click animation
        $(this).css('transform', 'scale(0.95)');
        setTimeout(() => {
            $(this).css('transform', 'scale(1.05)');
            setTimeout(() => {
                $(this).css('transform', 'scale(1)');
                // Navigate to home
                window.location.href = '/app/home';
            }, 150);
        }, 100);
        
        // Show welcome message
        showModuleFeedback('Home Dashboard');
    });
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    $(document).on('keydown', function(e) {
        // Alt + Number for quick module access
        if (e.altKey && e.key >= '1' && e.key <= '9') {
            e.preventDefault();
            const moduleIndex = parseInt(e.key) - 1;
            const $targetModule = $('.module-link').eq(moduleIndex);
            
            if ($targetModule.length) {
                $targetModule.click();
            }
        }
        
        // Escape key to clear search
        if (e.key === 'Escape') {
            $('.search-bar').val('').trigger('input').blur();
            hideSearchSuggestions();
        }
    });
}

// Initialize all navbar features
$(document).ready(function() {
    // Wait for page to load completely
    setTimeout(() => {
        initializeEnhancedNavbarSearch();
        initializeNavbarScrollBehavior();
        initializeBrandInteraction();
        initializeKeyboardShortcuts();
        updateModuleBadges();
        
        // Add helpful tooltips
        $('.module-link').each(function() {
            const moduleName = $(this).data('module');
            $(this).attr('title', `Go to ${moduleName} (Alt + ${$(this).index() + 1})`);
        });
        
        console.log("All navbar features initialized");
        
        // Show welcome notification
        setTimeout(() => {
            showModuleFeedback('ITChamps Theme Loaded Successfully! 🎉');
        }, 1000);
        
    }, 1500);
});

// Module Loading States
function setModuleLoading(moduleName, isLoading) {
    const $module = $(`.module-link[data-module="${moduleName}"]`);
    
    if (isLoading) {
        $module.addClass('loading').css('pointer-events', 'none');
        $module.find('.module-icon').text('⏳');
    } else {
        $module.removeClass('loading').css('pointer-events', 'auto');
        // Restore original icon based on module
        const originalIcon = {
            'Home': '🏠', 'Accounting': '💰', 'Buying': '🛒', 'Selling': '💼',
            'Stock': '📦', 'Assets': '🏭', 'HR': '👥', 'Manufacturing': '⚙️',
            'Quality': '✅', 'Projects': '📊', 'Support': '🎧', 'Users': '👤',
            'Website': '🌐', 'Payroll': '💳', 'CRM': '🤝', 'Tools': '🔧'
        };
        $module.find('.module-icon').text(originalIcon[moduleName] || '📋');
    }
}

// Export functions for external use
window.HorizontalNavbar = {
    showModuleFeedback: showModuleFeedback,
    updateModuleBadges: updateModuleBadges,
    setModuleLoading: setModuleLoading,
    showUserMenu: showUserMenu,
    showNotifications: showNotifications
};

// Frappe integration
if (typeof frappe !== 'undefined') {
    // Override frappe's navbar setup
    frappe.ui.toolbar.setup = (function(original_setup) {
        return function() {
            // Call original setup first
            original_setup.apply(this, arguments);
            
            // Then apply our horizontal navbar
            setTimeout(() => {
                buildHorizontalModuleNavigation();
                console.log("Frappe toolbar overridden with horizontal navbar");
            }, 500);
        };
    })(frappe.ui.toolbar.setup);
    
    // Hook into page navigation
    $(document).on('page:change', function() {
        // Update active module when page changes
        setTimeout(() => {
            const currentPath = window.location.pathname;
            $('.module-link').removeClass('active');
            
            $('.module-link').each(function() {
                const href = $(this).attr('href');
                if (currentPath.includes(href.replace('/app/', ''))) {
                    $(this).addClass('active');
                }
            });
        }, 100);
    });
}
