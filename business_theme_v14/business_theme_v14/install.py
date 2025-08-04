import frappe
from frappe import _

def before_install():
    """
    Hook executed before app installation
    """
    print("Installing Business Theme V14 - Sky Blue Edition...")

def after_install():
    """
    Hook executed after app installation
    Setup theme configurations and custom settings
    """
    try:
        # Create custom theme settings
        setup_theme_settings()
        
        # Add custom fields if needed
        add_custom_fields()
        
        # Set default theme
        set_default_theme()
        
        frappe.db.commit()
        print("Business Theme V14 installed successfully!")
        
    except Exception as e:
        frappe.log_error(f"Error in theme installation: {str(e)}")
        print(f"Error installing theme: {str(e)}")

def setup_theme_settings():
    """
    Create theme-specific settings
    """
    # Create Website Theme if it doesn't exist
    if not frappe.db.exists("Website Theme", "Sky Blue Business"):
        theme_doc = frappe.get_doc({
            "doctype": "Website Theme",
            "theme": "Sky Blue Business",
            "module": "Business Theme V14",
            "custom": 1,
            "theme_scss": get_theme_scss(),
            "theme_url": "/assets/business_theme_v14/css/business_theme_v14.css"
        })
        theme_doc.insert(ignore_permissions=True)

def get_theme_scss():
    """
    Return SCSS variables for the theme
    """
    return """
// Sky Blue Business Theme Variables
$primary-color: #1e90ff;
$secondary-color: #87ceeb;
$background-color: #e6f3ff;
$sidebar-bg: linear-gradient(180deg, #4682b4 0%, #5f9ea0 100%);
$accent-color: #1e90ff;
$border-color: #87ceeb;

// Override default variables
$navbar-light-bg: linear-gradient(90deg, #4682b4, #1e90ff);
$body-bg: linear-gradient(135deg, #87ceeb 0%, #b3d9ff 100%);
$card-bg: rgba(255, 255, 255, 0.95);
"""

def add_custom_fields():
    """
    Add any custom fields required by the theme
    """
    # Example: Add theme preference field to User doctype
    custom_fields = [
        {
            "doctype": "Custom Field",
            "dt": "User",
            "fieldname": "theme_preference",
            "label": "Theme Preference",
            "fieldtype": "Select",
            "options": "Auto\nLight\nDark",
            "default": "Auto",
            "insert_after": "language"
        }
    ]
    
    for field in custom_fields:
        if not frappe.db.exists("Custom Field", {"dt": field["dt"], "fieldname": field["fieldname"]}):
            frappe.get_doc(field).insert(ignore_permissions=True)

def set_default_theme():
    """
    Set the theme as default for the site
    """
    # Update Website Settings
    website_settings = frappe.get_single("Website Settings")
    if website_settings:
        website_settings.website_theme = "Sky Blue Business"
        website_settings.save(ignore_permissions=True)
    
    # Update System Settings for desk theme
    system_settings = frappe.get_single("System Settings")
    if system_settings:
        system_settings.app_name = "Business Theme V14"
        system_settings.save(ignore_permissions=True)
