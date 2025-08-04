import frappe

def boot_session(bootinfo):
    """
    Boot session hook to add theme-specific data to the boot information
    This data will be available in the frontend via frappe.boot
    """
    # Add theme information to boot
    bootinfo.theme_info = {
        "name": "Business Theme V14 - Sky Blue Edition",
        "version": "1.0.0",
        "primary_color": "#1e90ff",
        "secondary_color": "#87ceeb",
        "features": [
            "Sky Blue Color Scheme",
            "Dynamic Icons",
            "Smooth Animations",
            "Enhanced UI/UX",
            "Mobile Responsive"
        ]
    }
    
    # Add user theme preferences
    if frappe.session.user and frappe.session.user != "Guest":
        user_theme_pref = frappe.db.get_value("User", frappe.session.user, "theme_preference")
        bootinfo.user_theme_preference = user_theme_pref or "Auto"
    
    # Add module icons mapping
    bootinfo.module_icons = get_module_icons()
    
    # Add theme settings
    bootinfo.theme_settings = get_theme_settings()

def get_module_icons():
    """
    Return mapping of modules to their icons
    """
    return {
        "Accounts": "fa-calculator",
        "Selling": "fa-shopping-cart",
        "Buying": "fa-shopping-bag",
        "Stock": "fa-cubes",
        "Manufacturing": "fa-industry",
        "Projects": "fa-tasks",
        "Human Resources": "fa-users",
        "CRM": "fa-handshake-o",
        "Support": "fa-life-ring",
        "Assets": "fa-building",
        "Quality Management": "fa-certificate",
        "Website": "fa-globe",
        "Setup": "fa-cogs",
        "Integrations": "fa-plug",
        "Customize": "fa-paint-brush",
        "Home": "fa-home",
        "Dashboard": "fa-dashboard",
        "Reports": "fa-bar-chart",
        "File Manager": "fa-folder-open",
        "Desk": "fa-desktop",
        "Email": "fa-envelope",
        "Calendar": "fa-calendar",
        "To Do": "fa-check-square-o",
        "Note": "fa-sticky-note",
        "Chat": "fa-comments",
        "Learning": "fa-graduation-cap",
        "Payroll": "fa-money",
        "Loan Management": "fa-university",
        "Healthcare": "fa-heartbeat",
        "Agriculture": "fa-leaf",
        "Education": "fa-book",
        "Non Profit": "fa-heart",
        "Hospitality": "fa-bed",
        "Restaurant": "fa-cutlery",
        "Retail": "fa-store"
    }

def get_theme_settings():
    """
    Return theme-specific settings
    """
    return {
        "enable_animations": True,
        "enable_ripple_effects": True,
        "enable_hover_effects": True,
        "enable_loading_animation": True,
        "enable_keyboard_shortcuts": True,
        "sidebar_animation_delay": 50,
        "card_hover_animation": "translateY(-5px)",
        "primary_gradient": "linear-gradient(45deg, #1e90ff, #87ceeb)",
        "sidebar_gradient": "linear-gradient(180deg, #4682b4 0%, #5f9ea0 100%)",
        "page_gradient": "linear-gradient(135deg, #87ceeb 0%, #b3d9ff 100%)"
    }
