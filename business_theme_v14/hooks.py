from . import __version__ as app_version

app_name = "business_theme_v14"
app_title = "Business Theme V14"
app_publisher = "Your Company"
app_description = "Modern Professional Theme for ERPNext with Glassmorphism UI"
app_icon = "octicon octicon-browser"
app_color = "orange"
app_email = "your-email@company.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# Include CSS files - ALL FILES IN CORRECT ORDER FOR HORIZONTAL NAVBAR
app_include_css = [
    "/assets/business_theme_v14/css/business_theme_v14.css",           # Base sky blue theme
    "/assets/business_theme_v14/css/glassmorphism_navbar.css",        # Glass effects  
    "/assets/business_theme_v14/css/horizontal_navbar_modules.css",   # Horizontal module navbar
    "/assets/business_theme_v14/css/professional_friendly_ui.css"     # Card-based UI
]

# Include JS files - ALL JAVASCRIPT FILES
app_include_js = [
    "/assets/business_theme_v14/js/business_theme_v14.js",            # Base functionality
    "/assets/business_theme_v14/js/horizontal_navbar.js",             # Horizontal navbar logic
    "/assets/business_theme_v14/js/friendly_ui_interactions.js"       # Enhanced interactions
]

# Include CSS and JS in specific doctypes
# --------------------------------------

# CSS files to include in all forms
# doctype_css = {
#     "Web Page": "public/css/custom_web_page.css",
#     "Sales Invoice": "public/css/sales_invoice.css"
# }

# JS files to include in all forms
# doctype_js = {
#     "Sales Invoice": "public/js/sales_invoice.js"
# }

# Include CSS and JS in website
# ------------------------------

# CSS files to include in website
website_route_rules = [
    {"from_route": "/business-theme/<path:app_path>", "to_route": "business-theme"},
]

# Home Pages
# ----------

# application home page (will also be the default route)
# home_page = "business-dashboard"

# website home page (default web page)
# website_home_page = "business-theme"

# Role that doesn't require authentication
# website_guest_role = "Website Manager"

# Authentication and Permissions
# -------------------------------

# Authentication hooks
# auth_hooks = [
#     "business_theme_v14.auth.validate_auth"
# ]

# Translation
# -----------

# make a translation file for specified languages
# Translations will be found at path below
# if not translated the doc will be in English
# e.g. in erpnext.po
# Translation for ERPNext will be found at erpnext/erpnext.po
# language_pack = ["es", "fr", "de", "pt", "ru", "ar", "hi", "zh", "ja"]

# Generators
# ----------

# Generate website page based on doctype 
# website_generators = ["Business Theme Page"]

# Installation
# ------------

# before_install = "business_theme_v14.install.before_install"
after_install = "business_theme_v14.install.after_install"

# Uninstallation
# --------------

before_uninstall = "business_theme_v14.uninstall.before_uninstall"
# after_uninstall = "business_theme_v14.uninstall.after_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "business_theme_v14.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#     "Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#     "Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#     "ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#     "*": {
#         "on_update": "method",
#         "on_cancel": "method",
#         "on_trash": "method"
#     }
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
#     "all": [
#         "business_theme_v14.tasks.all"
#     ],
#     "daily": [
#         "business_theme_v14.tasks.daily"
#     ],
#     "hourly": [
#         "business_theme_v14.tasks.hourly"
#     ],
#     "weekly": [
#         "business_theme_v14.tasks.weekly"
#     ]
#     "monthly": [
#         "business_theme_v14.tasks.monthly"
#     ]
# }

# Testing
# -------

# before_tests = "business_theme_v14.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#     "frappe.desk.doctype.event.event.get_events": "business_theme_v14.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#     "Task": "business_theme_v14.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Jinja Environment
# -----------------

# jinja = {
#     "methods": [
#         "business_theme_v14.utils.jinja_methods"
#     ]
# }

# Request Events
# --------------
# before_request = ["business_theme_v14.utils.before_request"]
# after_request = ["business_theme_v14.utils.after_request"]

# Job Events
# ----------
# before_job = ["business_theme_v14.utils.before_job"]
# after_job = ["business_theme_v14.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#     {
#         "doctype": "{doctype_1}",
#         "filter_by": "{filter_by}",
#         "redact_fields": ["{field_1}", "{field_2}"],
#         "partial": 1,
#     },
#     {
#         "doctype": "{doctype_2}",
#         "filter_by": "{filter_by}",
#         "partial": 1,
#     },
#     {
#         "doctype": "{doctype_3}",
#         "strict": False,
#     },
#     {
#         "doctype": "{doctype_4}"
#     }
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#     "business_theme_v14.auth.validate"
# ]

# Boot Session
# ------------

# boot_session = "business_theme_v14.boot.boot_session"

# Website context
# ---------------

# website_context = {
#     "favicon": "/assets/business_theme_v14/images/favicon.png",
#     "splash_image": "/assets/business_theme_v14/images/splash.png"
# }

# Brand
# -----

# brand_html = """
# <div class="brand-logo">
#     <img src="/assets/business_theme_v14/images/logo.png" alt="Business Theme">
#     <span>Business Theme</span>
# </div>
# """
