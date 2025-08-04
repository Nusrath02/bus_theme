import frappe
from frappe import _

def jinja_methods():
    """
    Jinja methods for theme templates
    """
    return {
        "get_theme_color": get_theme_color,
        "get_module_icon": get_module_icon,
        "get_user_theme_preference": get_user_theme_preference,
        "format_theme_title": format_theme_title
    }

def jinja_filters():
    """
    Jinja filters for theme templates
    """
    return {
        "theme_color": theme_color_filter,
        "icon_class": icon_class_filter,
        "sky_blue_gradient": sky_blue_gradient_filter
    }

def get_theme_color(color_type="primary"):
    """
    Get theme color by type
    """
    colors = {
        "primary": "#1e90ff",
        "secondary": "#87ceeb",
        "background": "#e6f3ff",
        "accent": "#4682b4",
        "text": "#2c3e50",
        "border": "#b3d9ff"
    }
    return colors.get(color_type, colors["primary"])

def get_module_icon(module_name):
    """
    Get icon for a specific module
    """
    icons = {
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
        "Setup": "fa-cogs"
    }
    return icons.get(module_name, "fa-circle-o")

def get_user_theme_preference():
    """
    Get current user's theme preference
    """
    if frappe.session.user and frappe.session.user != "Guest":
        return frappe.db.get_value("User", frappe.session.user, "theme_preference") or "Auto"
    return "Auto"

def format_theme_title(title):
    """
    Format title with theme-specific styling
    """
    return f'<span class="theme-title" style="color: {get_theme_color("primary")};">{title}</span>'

def theme_color_filter(value, color_type="primary"):
    """
    Filter to apply theme color to a value
    """
    color = get_theme_color(color_type)
    return f'<span style="color: {color};">{value}</span>'

def icon_class_filter(module_name):
    """
    Filter to get icon class for a module
    """
    return f"fa {get_module_icon(module_name)}"

def sky_blue_gradient_filter(direction="45deg"):
    """
    Filter to create sky blue gradient
    """
    return f"linear-gradient({direction}, #87ceeb, #1e90ff)"

@frappe.whitelist()
def get_theme_data():
    """
    API method to get theme data
    """
    return {
        "colors": {
            "primary": get_theme_color("primary"),
            "secondary": get_theme_color("secondary"),
            "background": get_theme_color("background"),
            "accent": get_theme_color("accent")
        },
        "user_preference": get_user_theme_preference(),
        "module_icons": frappe.boot.module_icons if hasattr(frappe.boot, 'module_icons') else {}
    }

@frappe.whitelist()
def update_user_theme_preference(preference):
    """
    Update user's theme preference
    """
    if frappe.session.user and frappe.session.user != "Guest":
        frappe.db.set_value("User", frappe.session.user, "theme_preference", preference)
        return {"success": True, "message": _("Theme preference updated successfully")}
    return {"success": False, "message": _("Unable to update theme preference")}

def get_custom_css():
    """
    Generate custom CSS based on user preferences
    """
    preference = get_user_theme_preference()
    base_css = """
    :root {
        --theme-primary: {primary};
        --theme-secondary: {secondary};
        --theme-background: {background};
        --theme-accent: {accent};
    }
    """.format(
        primary=get_theme_color("primary"),
        secondary=get_theme_color("secondary"),
        background=get_theme_color("background"),
        accent=get_theme_color("accent")
    )
    
    if preference == "Dark":
        base_css += """
        [data-theme="dark"] {
            --theme-background: #1a1f2e;
            --theme-text: #ffffff;
        }
        """
    
    return base_css

def get_page_context(context):
    """
    Add theme-specific context to pages
    """
    context.theme_colors = {
        "primary": get_theme_color("primary"),
        "secondary": get_theme_color("secondary"),
        "background": get_theme_color("background"),
        "accent": get_theme_color("accent")
    }
    context.theme_preference = get_user_theme_preference()
    context.custom_css = get_custom_css()
    return context
