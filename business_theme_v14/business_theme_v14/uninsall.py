import frappe
from frappe import _

def before_uninstall():
    """
    Hook executed before app uninstallation
    """
    print("Preparing to uninstall Business Theme V14...")

def after_uninstall():
    """
    Hook executed after app uninstallation
    Clean up theme configurations
    """
    try:
        # Remove custom theme
        cleanup_theme_settings()
        
        # Remove custom fields
        remove_custom_fields()
        
        # Reset to default theme
        reset_default_theme()
        
        frappe.db.commit()
        print("Business Theme V14 uninstalled successfully!")
        
    except Exception as e:
        frappe.log_error(f"Error in theme uninstallation: {str(e)}")
        print(f"Error uninstalling theme: {str(e)}")

def cleanup_theme_settings():
    """
    Remove theme-specific settings
    """
    # Remove Website Theme
    if frappe.db.exists("Website Theme", "Sky Blue Business"):
        frappe.delete_doc("Website Theme", "Sky Blue Business", ignore_permissions=True)

def remove_custom_fields():
    """
    Remove custom fields added by the theme
    """
    custom_fields = [
        {"dt": "User", "fieldname": "theme_preference"}
    ]
    
    for field in custom_fields:
        if frappe.db.exists("Custom Field", {"dt": field["dt"], "fieldname": field["fieldname"]}):
            frappe.delete_doc("Custom Field", 
                            frappe.db.get_value("Custom Field", 
                                              {"dt": field["dt"], "fieldname": field["fieldname"]}, 
                                              "name"), 
                            ignore_permissions=True)

def reset_default_theme():
    """
    Reset to default theme
    """
    # Reset Website Settings
    website_settings = frappe.get_single("Website Settings")
    if website_settings:
        website_settings.website_theme = ""
        website_settings.save(ignore_permissions=True)
    
    # Reset System Settings
    system_settings = frappe.get_single("System Settings")
    if system_settings:
        system_settings.app_name = "ERPNext"
        system_settings.save(ignore_permissions=True)
