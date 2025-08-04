// Professional Friendly UI - Interactive Features
// Child-friendly interactions with smooth animations

frappe.ready(function() {
    console.log("Professional Friendly UI loaded successfully");
    
    // Initialize all interactive features
    initializeSidebarCards();
    initializeCardAnimations();
    initializeFriendlyInteractions();
    initializeResponsiveFeatures();
    initializeModuleIcons();
});

// Sidebar Card Expansion System
function initializeSidebarCards() {
    $(document).ready(function() {
        // Add data attributes to sidebar items for identification
        $('.sidebar-label, .list-link').each(function() {
            const text = $(this).text().trim();
            $(this).attr('data-module', text);
        });
        
        // Handle sidebar card clicks for expansion
        $('.sidebar-label, .list-link').on('click', function(e) {
            const $this = $(this);
            const $submenu = $this.next('.sidebar-submenu, .nested-menu');
            
            // If this item has a submenu, handle expansion
            if ($submenu.length > 0) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other expanded items
                $('.sidebar-label, .list-link').not($this).removeClass('active');
                $('.sidebar-submenu, .nested-menu').not($submenu).removeClass('show').slideUp(300);
                
                // Toggle current item
                $this.toggleClass('active');
                
                if ($this.hasClass('active')) {
                    $submenu.addClass('show').slideDown(300, function() {
                        // Add staggered animation to submenu items
                        $submenu.find('a').each(function(index) {
                            $(this).css({
                                'animation-delay': (index * 50) + 'ms',
                                'animation-duration': '0.3s',
                                'animation-name': 'slideInFromLeft',
                                'animation-fill-mode': 'both'
                            });
                        });
                    });
                } else {
                    $submenu.removeClass('show').slideUp(300);
                }
                
                // Add ripple effect
                createRippleEffect(e, this);
            }
        });
        
        // Auto-expand active module on page load
        setTimeout(function() {
            const currentPath = window.location.pathname;
            $('.sidebar-label, .list-link').each(function() {
                const href = $(this).attr('href');
                if (href && currentPath.includes(href)) {
                    $(this).addClass('active');
                    $(this).next('.sidebar-submenu, .nested-menu').addClass('show').show();
                }
            });
        }, 500);
        
        console.log("Sidebar cards initialized");
    });
}

// Card Animation System
function initializeCardAnimations() {
    // Intersection Observer for card entrance animations
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100); // Staggered animation
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all cards
    $(document).ready(function() {
        $('.card, .widget, .list-item, .sidebar-label').each(function() {
            // Set initial state for animation
            $(this).css({
                'opacity': '0',
                'transform': 'translateY(20px) scale(0.95)',
                'transition': 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            cardObserver.observe(this);
        });
    });
    
    console.log("Card animations initialized");
}

// Friendly User Interactions
function initializeFriendlyInteractions() {
    // Add click feedback to all interactive elements
    $(document).on('click', '.btn, .card, .sidebar-label, .list-item', function(e) {
        createRippleEffect(e, this);
        
        // Add bounce effect for buttons
        if ($(this).hasClass('btn')) {
            $(this).addClass('animate-bounce');
            setTimeout(() => {
                $(this).removeClass('animate-bounce');
            }, 600);
        }
    });
    
    // Hover sound effects (optional - can be enabled)
    $('.btn, .sidebar-label, .card').hover(
        function() {
            // Play subtle hover sound (if audio enabled)
            // playHoverSound();
            $(this).addClass('hover-active');
        },
        function() {
            $(this).removeClass('hover-active');
        }
    );
    
    // Success feedback animations
    $(document).on('click', '.btn-primary', function() {
        const $btn = $(this);
        const originalText = $btn.text();
        
        // Show loading state
        $btn.html('<span class="loading-spinner">⏳</span> Processing...');
        $btn.prop('disabled', true);
        
        // Simulate processing (remove this in production)
        setTimeout(() => {
            $btn.html('✅ Success!');
            $btn.css('background', 'linear-gradient(135deg, #10b981, #059669)');
            
            setTimeout(() => {
                $btn.html(originalText);
                $btn.css('background', '');
                $btn.prop('disabled', false);
            }, 2000);
        }, 1000);
    });
    
    console.log("Friendly interactions initialized");
}

// Responsive Features
function initializeResponsiveFeatures() {
    // Mobile sidebar toggle
    const $body = $('body');
    
    // Add mobile menu button to navbar
    if ($(window).width() <= 768 && !$('.mobile-menu-toggle').length) {
        $('.navbar-expand').prepend(`
            <button class="mobile-menu-toggle btn btn-ghost" style="margin-right: 16px;">
                <span style="font-size: 24px;">☰</span>
            </button>
        `);
    }
    
    // Handle mobile menu toggle
    $(document).on('click', '.mobile-menu-toggle', function() {
        $('.layout-side-section').toggleClass('show');
        $body.toggleClass('sidebar-open');
        
        // Update toggle icon
        const icon = $(this).find('span');
        if ($('.layout-side-section').hasClass('show')) {
            icon.text('✖️');
        } else {
            icon.text('☰');
        }
    });
    
    // Close sidebar when clicking outside on mobile
    $(document).on('click', function(e) {
        if ($(window).width() <= 768) {
            if (!$(e.target).closest('.layout-side-section, .mobile-menu-toggle').length) {
                $('.layout-side-section').removeClass('show');
                $body.removeClass('sidebar-open');
                $('.mobile-menu-toggle span').text('☰');
            }
        }
    });
    
    // Handle window resize
    $(window).on('resize', debounce(function() {
        const width = $(window).width();
        
        if (width > 768) {
            $('.layout-side-section').removeClass('show');
            $body.removeClass('sidebar-open');
            $('.mobile-menu-toggle').remove();
        } else if (!$('.mobile-menu-toggle').length) {
            $('.navbar-expand').prepend(`
                <button class="mobile-menu-toggle btn btn-ghost" style="margin-right: 16px;">
                    <span style="font-size: 24px;">☰</span>
                </button>
            `);
        }
    }, 250));
    
    console.log("Responsive features initialized");
}

// Module Icons Assignment
function initializeModuleIcons() {
    // Wait for DOM to be ready
    $(document).ready(function() {
        // Add module-specific attributes and icons
        const moduleIcons = {
            'Home': '🏠',
            'Accounting': '💰',
            'Payables': '💸',
            'Receivables': '💳',
            'Financial Reports': '📊',
            'Buying': '🛒',
            'Selling': '💼',
            'Stock': '📦',
            'Assets': '🏭',
            'HR': '👥',
            'Manufacturing': '⚙️',
            'Quality': '✅',
            'Projects': '📈',
            'Support': '🎧',
            'Users': '👤',
            'Website': '🌐',
            'Payroll': '💳',
            'CRM': '🤝',
            'Tools': '🔧',
            'ERPNext Settings': '⚙️',
            'Integrations': '🔗',
            'Build': '🏗️'
        };
        
        // Apply icons to sidebar items
        $('.sidebar-label, .list-link').each(function() {
            const text = $(this).text().trim();
            const icon = moduleIcons[text];
            
            if (icon) {
                $(this).attr('data-module', text);
                // Add icon as pseudo-element content
                $(this).css('position', 'relative');
            }
        });
        
        // Add hover effects for better feedback
        $('.sidebar-label, .list-link').hover(
            function() {
                $(this).css('transform', 'translateY(-2px) scale(1.02)');
            },
            function() {
                if (!$(this).hasClass('active')) {
                    $(this).css('transform', 'translateY(0) scale(1)');
                }
            }
        );
        
        console.log("Module icons initialized");
    });
}

// Enhanced Card Interactions
function initializeEnhancedCardFeatures() {
    // Card click handlers for list views
    $(document).on('click', '.list-row-container, .entity-card, .employee-card', function(e) {
        e.preventDefault();
        
        const $card = $(this);
        const href = $card.find('a').first().attr('href') || $card.data('href');
        
        // Add click animation
        $card.css('transform', 'scale(0.98)');
        setTimeout(() => {
            $card.css('transform', '');
            
            // Navigate to the link
            if (href) {
                window.location.href = href;
            }
        }, 150);
        
        // Create ripple effect
        createRippleEffect(e, this);
    });
    
    // Form field enhancements
    $('.form-control').on('focus', function() {
        $(this).closest('.form-group').addClass('focused');
    }).on('blur', function() {
        $(this).closest('.form-group').removeClass('focused');
    });
    
    // Table to card grid transformation
    setTimeout(() => {
        transformTableToCards();
    }, 1000);
    
    console.log("Enhanced card features initialized");
}

// Transform traditional tables into card grids
function transformTableToCards() {
    $('.table tbody tr').each(function() {
        const $row = $(this);
        const $cells = $row.find('td');
        
        if ($cells.length > 0) {
            // Wrap row in card container
            $row.wrap('<div class="list-row-container"></div>');
            
            // Transform first cell into card title
            const $firstCell = $cells.first();
            $firstCell.addClass('card-title-cell');
            
            // Add card styling
            $row.closest('.list-row-container').css({
                'cursor': 'pointer',
                'position': 'relative'
            });
            
            // Add click handler
            $row.closest('.list-row-container').on('click', function() {
                const $link = $(this).find('a').first();
                if ($link.length) {
                    window.location.href = $link.attr('href');
                }
            });
        }
    });
}

// Utility Functions
function createRippleEffect(event, element) {
    const $element = $(element);
    const $ripple = $('<div class="ripple-effect"></div>');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    $ripple.css({
        width: size,
        height: size,
        left: x,
        top: y,
        position: 'absolute',
        borderRadius: '50%',
        background: 'rgba(59, 130, 246, 0.3)',
        transform: 'scale(0)',
        animation: 'ripple-animation 0.6s linear',
        pointerEvents: 'none',
        zIndex: 1
    });
    
    $element.css('position', 'relative').append($ripple);
    
    setTimeout(() => {
        $ripple.remove();
    }, 600);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Theme customization functions
function initializeThemeCustomization() {
    // Add theme toggle button (optional)
    if (!$('.theme-toggle').length) {
        $('.navbar-nav').append(`
            <li class="nav-item">
                <a class="nav-link theme-toggle" href="#" title="Toggle Theme">
                    <span style="font-size: 20px;">🌙</span>
                    <small>Theme</small>
                </a>
            </li>
        `);
    }
    
    // Handle theme toggle
    $(document).on('click', '.theme-toggle', function(e) {
        e.preventDefault();
        
        const currentTheme = $('html').attr('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        $('html').attr('data-theme', newTheme);
        localStorage.setItem('preferred-theme', newTheme);
        
        // Update toggle icon
        const icon = $(this).find('span');
        icon.text(newTheme === 'light' ? '🌙' : '☀️');
        
        // Show feedback
        showNotification(`Switched to ${newTheme} theme`, 'success');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme) {
        $('html').attr('data-theme', savedTheme);
        $('.theme-toggle span').text(savedTheme === 'light' ? '🌙' : '☀️');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const icons = {
        'success': '✅',
        'error': '❌',
        'warning': '⚠️',
        'info': 'ℹ️'
    };
    
    const $notification = $(`
        <div class="friendly-notification ${type}" style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-card);
            border: 2px solid var(--primary-200);
            border-radius: var(--radius-xl);
            padding: var(--space-4) var(--space-6);
            box-shadow: var(--shadow-card-hover);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: var(--space-3);
            font-weight: 600;
            transform: translateX(400px);
            transition: all 0.3s ease;
        ">
            <span style="font-size: 20px;">${icons[type]}</span>
            <span>${message}</span>
        </div>
    `);
    
    $('body').append($notification);
    
    // Animate in
    setTimeout(() => {
        $notification.css('transform', 'translateX(0)');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        $notification.css('transform', 'translateX(400px)');
        setTimeout(() => {
            $notification.remove();
        }, 300);
    }, 3000);
}

// Enhanced Search Functionality
function initializeEnhancedSearch() {
    // Add search suggestions
    $('.search-bar input, #navbar-search').on('input', debounce(function() {
        const query = $(this).val().toLowerCase();
        
        if (query.length > 2) {
            // Simple search suggestions (can be enhanced with real API)
            const suggestions = [
                'Dashboard',
                'Employees',
                'Customers',
                'Items',
                'Sales Invoice',
                'Purchase Order',
                'Reports'
            ].filter(item => item.toLowerCase().includes(query));
            
            showSearchSuggestions(suggestions, this);
        } else {
            hideSearchSuggestions();
        }
    }, 300));
    
    // Hide suggestions when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.search-bar, .search-suggestions').length) {
            hideSearchSuggestions();
        }
    });
}

function showSearchSuggestions(suggestions, inputElement) {
    hideSearchSuggestions(); // Remove existing suggestions
    
    if (suggestions.length === 0) return;
    
    const $suggestions = $(`
        <div class="search-suggestions" style="
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-card-hover);
            margin-top: 8px;
            z-index: 1000;
            overflow: hidden;
        "></div>
    `);
    
    suggestions.forEach(suggestion => {
        const $item = $(`
            <div class="suggestion-item" style="
                padding: var(--space-3) var(--space-4);
                border-bottom: 1px solid rgba(59, 130, 246, 0.1);
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: var(--space-3);
            ">
                <span style="font-size: 16px;">🔍</span>
                <span>${suggestion}</span>
            </div>
        `);
        
        $item.hover(
            function() {
                $(this).css('background', 'var(--primary-50)');
            },
            function() {
                $(this).css('background', 'transparent');
            }
        );
        
        $item.on('click', function() {
            $(inputElement).val(suggestion);
            hideSearchSuggestions();
            // Trigger search (implement your search logic here)
            console.log('Searching for:', suggestion);
        });
        
        $suggestions.append($item);
    });
    
    $(inputElement).closest('.search-bar, .global-search').css('position', 'relative').append($suggestions);
}

function hideSearchSuggestions() {
    $('.search-suggestions').remove();
}

// Form Enhancements
function initializeFormEnhancements() {
    // Auto-save indicators
    $('.form-control').on('input', debounce(function() {
        const $input = $(this);
        const $indicator = $input.siblings('.auto-save-indicator');
        
        if (!$indicator.length) {
            $input.after('<span class="auto-save-indicator" style="color: var(--primary-500); font-size: 12px; margin-left: 8px;">💾 Saving...</span>');
        }
        
        // Simulate auto-save
        setTimeout(() => {
            $('.auto-save-indicator').text('✅ Saved').css('color', '#10b981');
            setTimeout(() => {
                $('.auto-save-indicator').fadeOut();
            }, 2000);
        }, 1000);
    }, 1000));
    
    // Field validation feedback
    $('.form-control').on('blur', function() {
        const $input = $(this);
        const value = $input.val();
        
        // Simple validation feedback
        if ($input.prop('required') && !value) {
            $input.css('border-color', '#ef4444');
            $input.after('<span class="validation-feedback" style="color: #ef4444; font-size: 12px;">❌ This field is required</span>');
        } else {
            $input.css('border-color', '#10b981');
            $('.validation-feedback').remove();
        }
    });
}

// Dashboard Enhancements
function initializeDashboardEnhancements() {
    // Animate dashboard numbers
    $('.number-card .number, .stat-card .number').each(function() {
        const $number = $(this);
        const finalValue = parseInt($number.text()) || 0;
        
        // Animate number counting
        $({ value: 0 }).animate({ value: finalValue }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
                $number.text(Math.floor(this.value));
            },
            complete: function() {
                $number.text(finalValue);
            }
        });
    });
    
    // Real-time clock (if needed)
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        $('.current-time').text(timeString);
    }
    
    if ($('.current-time').length) {
        setInterval(updateClock, 1000);
        updateClock();
    }
}

// Initialize all enhanced features
$(document).ready(function() {
    // Add CSS animations
    if (!$('#friendly-ui-animations').length) {
        $('<style id="friendly-ui-animations">')
            .text(`
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                @keyframes slideInFromLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% {
                        transform: translate3d(0, 0, 0);
                    }
                    40%, 43% {
                        transform: translate3d(0, -10px, 0);
                    }
                    70% {
                        transform: translate3d(0, -5px, 0);
                    }
                    90% {
                        transform: translate3d(0, -2px, 0);
                    }
                }
                
                .animate-bounce {
                    animation: bounce 0.6s ease-out;
                }
                
                .hover-active {
                    transform: translateY(-2px) scale(1.02);
                }
                
                .loading-spinner {
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .card-entrance {
                    animation: cardEntry 0.5s ease-out;
                }
                
                @keyframes cardEntry {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                /* Mobile sidebar overlay */
                .sidebar-open .layout-side-section {
                    left: 0 !important;
                }
                
                .sidebar-open::after {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                    z-index: 35;
                }
                
                /* Focus states for accessibility */
                .form-group.focused {
                    transform: scale(1.01);
                }
                
                .form-group.focused .form-label {
                    color: var(--primary-600) !important;
                }
                
                /* Enhanced button states */
                .btn:active {
                    transform: scale(0.98) !important;
                }
                
                .btn-primary:active {
                    background: linear-gradient(135deg, #2563eb, #1d4ed8) !important;
                }
            `)
            .appendTo('head');
    }
    
    // Initialize all features
    initializeEnhancedCardFeatures();
    initializeThemeCustomization();
    initializeEnhancedSearch();
    initializeFormEnhancements();
    initializeDashboardEnhancements();
    
    // Add welcome message
    setTimeout(() => {
        showNotification('Welcome! Interface optimized for easy use 😊', 'success');
    }, 2000);
});

// Export functions for external use
window.FriendlyUI = {
    showNotification: showNotification,
    createRippleEffect: createRippleEffect,
    transformTableToCards: transformTableToCards,
    debounce: debounce
};

// Frappe/ERPNext specific integrations
if (typeof frappe !== 'undefined') {
    // Override frappe's list view rendering
    frappe.views.ListView.prototype.render = (function(original_render) {
        return function() {
            const result = original_render.apply(this, arguments);
            
            // Transform rendered list into cards
            setTimeout(() => {
                transformTableToCards();
                
                // Add card classes to list rows
                $('.list-row').addClass('list-row-container');
                
                // Enhance with friendly interactions
                $('.list-row-container').hover(
                    function() {
                        $(this).css('transform', 'translateY(-3px) scale(1.01)');
                    },
                    function() {
                        $(this).css('transform', 'translateY(0) scale(1)');
                    }
                );
            }, 100);
            
            return result;
        };
    })(frappe.views.ListView.prototype.render);
    
    // Override form rendering for better card layout
    frappe.ui.form.Layout.prototype.make = (function(original_make) {
        return function() {
            const result = original_make.apply(this, arguments);
            
            // Enhance form sections
            setTimeout(() => {
                $('.section-head').addClass('form-section');
                $('.form-column').css({
                    'background': 'var(--bg-card)',
                    'border-radius': 'var(--radius-xl)',
                    'padding': 'var(--space-6)',
                    'margin-bottom': 'var(--space-4)',
                    'box-shadow': 'var(--shadow-card)'
                });
            }, 100);
            
            return result;
        };
    })(frappe.ui.form.Layout.prototype.make);
    
    console.log("Frappe integrations initialized");
}
