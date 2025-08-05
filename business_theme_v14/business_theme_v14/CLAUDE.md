# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Business Theme V14**, a modern Frappe/ERPNext theme featuring a sky blue color scheme and glassmorphism design. The theme transforms the default ERPNext interface with professional styling, horizontal navigation, and enhanced user interactions.

## Architecture

### Frappe App Structure
This follows standard Frappe app architecture with theme-specific enhancements:

- **hooks.py**: Central configuration defining asset loading order, installation hooks, and theme settings
- **business_theme_v14/**: Core Python module containing boot session data, installation logic, and utility functions
- **public/**: Static assets (CSS, JS, images) served by Frappe's asset system
- **config/**: Desktop and documentation configuration
- **templates/**: Custom page templates

### Critical Asset Loading Order
CSS files must load in this exact sequence (defined in hooks.py):
1. `business_theme_v14.css` - Base sky blue theme
2. `glassmorphism_navbar.css` - Glass effects for navigation
3. `horizontal_navbar_modules.css` - Horizontal navigation layout  
4. `professional_friendly_ui.css` - Card-based UI enhancements

### Key Integration Points
- **Boot Session Enhancement**: `boot.py` adds theme data to `frappe.boot` for frontend access
- **Custom User Field**: Installation adds theme preference field to User doctype
- **Website Theme Integration**: Creates "Sky Blue Business" website theme
- **Module Icon Mapping**: FontAwesome icons mapped to ERPNext modules

## Development Commands

### Installation/Setup
```bash
# Install theme on site
bench --site [sitename] install-app business_theme_v14

# Clear cache after changes
bench clear-cache

# Uninstall theme
bench --site [sitename] uninstall-app business_theme_v14
```

### Development Workflow
1. Edit CSS/JS files in `public/` directory
2. Modify Python files in `business_theme_v14/` module
3. Run `bench clear-cache` to see changes
4. Assets automatically served via Frappe's system

## Key Files and Functions

### Core Configuration
- **hooks.py**: Asset loading, installation hooks, theme configuration
- **install.py**: Post-installation setup, creates theme settings and custom fields
- **boot.py**: Adds theme data to boot session, module icons, user preferences
- **utils.py**: API endpoints, Jinja methods, color utilities

### Frontend Assets
- **CSS Order Critical**: Files must load in sequence defined in hooks.py
- **business_theme_v14.js**: Currently contains CSS code (needs reorganization)
- **horizontal_navbar.js**: Dynamic navbar creation and module navigation
- **friendly_ui_interactions.js**: Interactive animations and sidebar functionality

## Theme System Details

### Color Scheme
- Primary: #1e90ff (dodger blue)
- Secondary: #87ceeb (sky blue)
- Glass effects using backdrop-filter CSS property

### Special Requirements
- Modern browser support for backdrop-filter
- Font Awesome for module icons
- Inter font family (loaded via CDN)
- Mobile-first responsive design

### API Endpoints
Theme provides RESTful endpoints for:
- Theme data retrieval
- User preference management
- Module configuration

## Known Issues
- `business_theme_v14.js` contains CSS code instead of JavaScript
- Some dark mode features are partially implemented
- Asset organization could be improved for better maintainability