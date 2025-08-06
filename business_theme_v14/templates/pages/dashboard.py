import frappe

def get_context(context):
    context.no_cache = 1
    context.title = "ITChamps Dashboard"
    
    # Get HR statistics (handle if tables don't exist)
    try:
        context.total_employees = frappe.db.count('Employee', {'status': 'Active'})
    except:
        context.total_employees = 0
        
    try:
        context.total_departments = frappe.db.count('Department')
    except:
        context.total_departments = 0
        
    try:
        context.total_projects = frappe.db.count('Project', {'status': 'Open'})
    except:
        context.total_projects = 0
    
    # Get current user info
    context.user = frappe.session.user
    context.user_fullname = frappe.utils.get_fullname(frappe.session.user)
    
    return context
