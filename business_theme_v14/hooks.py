# Enhanced Business Theme V14 - hooks.py
# Modern HR Dashboard with Advanced Glassmorphism
# Updated by: ITCHAMPS Development Team

app_name = "business_theme_v14"
app_title = "Business Theme V14 - Enhanced"
app_publisher = "ITChamps"
app_description = "Modern HR business theme with advanced glassmorphism effects for ERPNext"
app_version = "1.5.0"

# Enhanced CSS includes - Load in order
app_include_css = [
    # Base theme (your existing file)
    "/assets/business_theme_v14/business_theme_v14.css",
    
    # Enhanced glassmorphism theme (new file)
    "/assets/business_theme_v14/business_theme_v15.css"
]

# Enhanced JavaScript includes - Load in order  
app_include_js = [
    # Your existing navbar JS
    "/assets/business_theme_v14/horizontal_navbar.js",
    
    # Enhanced glassmorphism features (new file)
    "/assets/business_theme_v14/enhanced_glass.js"
]

# Enhanced theme features
app_include_global_css = [
    "/assets/business_theme_v14/business_theme_v15.css"
]

# Add custom boot information
boot_session = [
    "business_theme_v14.boot.boot_session"
]

# Website context for theme
website_context = {
    "brand_html": """
        <div class="navbar-brand-enhanced">
            <div class="logo-container">
                <div class="logo-icon">IT</div>
                <div class="logo-text">
                    <h1>ITCHAMPS</h1>
                    <p>Human Resources Management</p>
                </div>
            </div>
        </div>
    """,
    "favicon": "/assets/business_theme_v14/images/itchamps_favicon.png"
}

# Custom Jinja filters for theme
jinja = {
    "methods": [
        "business_theme_v14.utils.get_theme_color",
        "business_theme_v14.utils.format_currency_glass",
        "business_theme_v14.utils.get_user_avatar"
    ]
}

# Schedule events for theme maintenance
scheduler_events = {
    "daily": [
        "business_theme_v14.tasks.cleanup_theme_cache"
    ]
}

# Document event hooks for enhanced features
doc_events = {
    "*": {
        "before_save": "business_theme_v14.hooks.before_save",
        "after_insert": "business_theme_v14.hooks.after_insert"
    }
}

# Override hooks for enhanced functionality
override_whitelisted_methods = {
    "business_theme_v14.api.get_dashboard_data": "business_theme_v14.api.get_enhanced_dashboard_data"
}

# Enhanced fixture data
fixtures = [
    {
        "dt": "Custom Field",
        "filters": [
            ["name", "in", ["User-theme_preference", "User-dashboard_layout"]]
        ]
    },
    {
        "dt": "Property Setter", 
        "filters": [
            ["module", "=", "Business Theme V14"]
        ]
    }
]

# Installation hooks
after_install = "business_theme_v14.install.after_install"
before_uninstall = "business_theme_v14.install.before_uninstall"

# Enhanced permissions
has_permission = {
    "Dashboard": "business_theme_v14.permissions.has_dashboard_permission",
    "Theme Settings": "business_theme_v14.permissions.has_theme_permission"
}

# Custom dashboard configuration
dashboards = {
    "HR Dashboard": "business_theme_v14.dashboards.hr_dashboard",
    "Executive Dashboard": "business_theme_v14.dashboards.executive_dashboard",
    "Analytics Dashboard": "business_theme_v14.dashboards.analytics_dashboard"
}

# Enhanced user permissions
user_data_fields = [
    {
        "doctype": "User",
        "fieldname": "theme_preferences", 
        "fieldtype": "JSON"
    },
    {
        "doctype": "User",
        "fieldname": "dashboard_layout",
        "fieldtype": "JSON" 
    }
]

# Theme-specific email templates
email_template_paths = [
    "business_theme_v14/templates/emails"
]

# Enhanced print formats
print_formats = [
    "business_theme_v14.print_formats.glass_invoice",
    "business_theme_v14.print_formats.glass_quotation", 
    "business_theme_v14.print_formats.glass_report"
]

# Notification hooks for theme updates
notification_config = "business_theme_v14.notifications.get_notification_config"

# Enhanced startup functions
startup = [
    "business_theme_v14.startup.setup_enhanced_theme"
]

# Boot session enhancements
def boot_session(bootinfo):
    """Add enhanced theme data to boot session"""
    bootinfo.theme_config = {
        "name": "Business Theme V14 Enhanced",
        "version": "1.5.0",
        "features": [
            "Advanced Glassmorphism",
            "Interactive Animations", 
            "Responsive Design",
            "HR Dashboard",
            "Performance Optimized",
            "Accessibility Enhanced"
        ],
        "glass_effects": True,
        "animations": True,
        "mobile_responsive": True,
        "dark_mode_support": True,
        "performance_monitoring": True
    }
    
    # Add user-specific theme preferences
    if frappe.session.user != "Guest":
        user_theme = frappe.get_value("User", frappe.session.user, "theme_preferences")
        if user_theme:
            bootinfo.user_theme_preferences = frappe.parse_json(user_theme)
    
    # Add system theme configuration
    bootinfo.system_theme = {
        "primary_color": "#4facfe",
        "secondary_color": "#00f2fe", 
        "accent_color": "#1e90ff",
        "glass_opacity": 0.08,
        "blur_strength": "20px",
        "animation_speed": "0.3s"
    }

# Error page templates with glass theme
error_page_templates = {
    "404": "business_theme_v14/templates/errors/404_glass.html",
    "403": "business_theme_v14/templates/errors/403_glass.html", 
    "500": "business_theme_v14/templates/errors/500_glass.html"
}

# Enhanced theme routes
website_route_rules = [
    {"from_route": "/theme-demo", "to_route": "Theme Demo"},
    {"from_route": "/glass-dashboard", "to_route": "Glass Dashboard"},
    {"from_route": "/hr-portal", "to_route": "HR Portal"}
]

# Custom CSS/JS for specific doctypes
doctype_js = {
    "User": "assets/business_theme_v14/js/user_theme.js",
    "Dashboard": "assets/business_theme_v14/js/dashboard_glass.js"
}

doctype_css = {
    "User": "assets/business_theme_v14/css/user_theme.css", 
    "Dashboard": "assets/business_theme_v14/css/dashboard_glass.css"
}

# Performance monitoring
performance_config = {
    "enable_monitoring": True,
    "fps_threshold": 30,
    "memory_threshold": "500MB",
    "load_time_threshold": "3s"
}

# Accessibility features
accessibility_config = {
    "enable_high_contrast": True,
    "enable_reduced_motion": True,
    "enable_screen_reader": True,
    "keyboard_navigation": True,
    "focus_indicators": True
}

# Mobile responsiveness settings
mobile_config = {
    "breakpoints": {
        "mobile": "768px",
        "tablet": "1024px", 
        "desktop": "1200px"
    },
    "touch_optimized": True,
    "swipe_gestures": True
}

# Theme customization options
customization_options = {
    "allow_color_changes": True,
    "allow_layout_changes": True,
    "allow_animation_toggle": True,
    "allow_blur_adjustment": True,
    "preset_themes": [
        "Default Glass",
        "Ocean Blue", 
        "Corporate Professional",
        "Dark Mode Glass",
        "High Contrast"
    ]
}

# Integration settings
integration_settings = {
    "frappe_version": ">=14.0.0",
    "erpnext_version": ">=14.0.0", 
    "compatible_apps": [
        "erpnext",
        "frappe", 
        "hrms",
        "payments"
    ]
}

# Advanced features toggle
advanced_features = {
    "particle_animation": True,
    "glassmorphism_effects": True,
    "smooth_transitions": True,
    "hover_animations": True,
    "loading_animations": True,
    "performance_optimization": True,
    "caching": True
}

# Security settings
security_config = {
    "csp_directives": {
        "style-src": "'self' 'unsafe-inline' fonts.googleapis.com",
        "font-src": "'self' fonts.gstatic.com",
        "img-src": "'self' data: blob:"
    },
    "allowed_hosts": ["*"]  # Configure based on your requirements
}

# Backup and restore hooks
backup_hooks = {
    "before_backup": "business_theme_v14.backup.backup_theme_settings",
    "after_restore": "business_theme_v14.backup.restore_theme_settings"
}

# Update hooks
update_hooks = {
    "before_migrate": "business_theme_v14.updates.before_migrate",
    "after_migrate": "business_theme_v14.updates.after_migrate"
}

# Quality assurance
quality_config = {
    "css_validation": True,
    "js_linting": True,
    "accessibility_testing": True,
    "performance_testing": True,
    "browser_compatibility": [
        "Chrome >= 90",
        "Firefox >= 88", 
        "Safari >= 14",
        "Edge >= 90"
    ]
}

# Documentation
documentation = {
    "installation_guide": "/docs/installation.md",
    "customization_guide": "/docs/customization.md",
    "api_reference": "/docs/api.md",
    "troubleshooting": "/docs/troubleshooting.md"
}

# Support information
support_info = {
    "developer": "ITChamps",
    "email": "support@itchamps.com",
    "website": "https://itchamps.com",
    "documentation": "https://github.com/itchamps/business_theme_v14",
    "issue_tracker": "https://github.com/itchamps/business_theme_v14/issues"
}
