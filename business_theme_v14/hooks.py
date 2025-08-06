from . import __version__ as app_version

app_name = "business_theme_v14"
app_title = "Business Theme V14"
app_publisher = "ITChamps"
app_description = "Business Theme with ITChamps Dashboard"
app_email = "admin@itchamps.com"
app_license = "MIT"

# Include CSS and JS files
app_include_css = [
    "/assets/business_theme_v14/css/business_theme_v14.css",
    "/assets/business_theme_v14/css/itchamps_dashboard.css"
]

app_include_js = [
    "/assets/business_theme_v14/js/business_theme_v14.js",
    "/assets/business_theme_v14/js/itchamps_dashboard.js"
]

# Website settings
website_context = {
    "favicon": "/assets/business_theme_v14/images/itchamps_logo.png",
    "splash_image": "/assets/business_theme_v14/images/itchamps_logo.png"
}

# Add custom routes
website_route_rules = [
    {"from_route": "/dashboard", "to_route": "dashboard"},
]

# Set dashboard as home page
home_page = "dashboard"

# Override home page for logged-in users
override_home_page = "business_theme_v14.templates.pages.dashboard"

# Boot session to pass custom data
boot_session = "business_theme_v14.boot.get_bootinfo"

# Website theme
website_theme = "business_theme_v14"
