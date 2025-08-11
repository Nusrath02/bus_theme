/*\!
 * Business Theme v14 - Core JavaScript
 * ====================================
 * Frontend behavior file - affects UI functionality
 * 
 * Core theme functionality and interactions
 * ====================================
 */
.alert-info {
    background: rgba(30, 144, 255, 0.1) !important;
    border: 1px solid #87ceeb !important;
    color: #2c3e50 !important;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
}

/* ===== LIST VIEW WITH GLASS EFFECTS ===== */
.list-row {
    border: 1px solid rgba(135, 206, 235, 0.2) !important;
    border-radius: 5px !important;
    margin-bottom: 5px !important;
    background: rgba(255, 255, 255, 0.8) !important;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
    transition: all 0.3s ease !important;
}

.list-row:hover {
    background: rgba(30, 144, 255, 0.05) !important;
    transform: translateX(3px) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    box-shadow: 0 4px 12px rgba(30, 144, 255, 0.1) !important;
}

/* ===== MODAL WITH GLASS EFFECTS ===== */
.modal-backdrop {
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
    background: rgba(0, 0, 0, 0.3) !important;
}

.modal-content {
    border-radius: 10px !important;
    border: 2px solid #87ceeb !important;
    box-shadow: 0 10px 30px rgba(30, 144, 255, 0.2) !important;
    background: var(--glass-bg) !important;
    backdrop-filter: var(--blur-strong) !important;
    -webkit-backdrop-filter: var(--blur-strong) !important;
    box-shadow: var(--shadow-md) !important;
    transform: scale(1.05) !important;
}

// Navbar
// Clean Logo Implementation - Remove Duplicates
document.addEventListener('DOMContentLoaded', function() {
    
    // Find navbar-brand element
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        
        // Remove ALL existing images and elements
        const existingImages = navbarBrand.querySelectorAll('img, svg, span');
        existingImages.forEach(element => {
            if (element.tagName === 'IMG' || element.tagName === 'SVG') {
                element.remove();
            }
        });
        
        // Remove any background images from inline styles
        navbarBrand.style.backgroundImage = 'none';
        
        // Add ONLY the custom-logo class for CSS styling
        navbarBrand.classList.add('custom-logo');
        
        // Ensure no duplicate pseudo-elements by cleaning classes
        navbarBrand.className = 'navbar-brand custom-logo';
        
        console.log('✓ Logo cleanup completed - showing only one ITChamps logo');
    }
});
EOF < /dev/null

    // navbar ended


/* ===== MENU ICONS ===== */
.sidebar-label::before {
    font-family: "Font Awesome 5 Free", FontAwesome;
    font-weight: 900;
    margin-right: 8px;
    color: #87ceeb;
}

/* Specific module icons */
.sidebar-label:contains("Dashboard")::before { content: "\f0e4"; }
.sidebar-label:contains("Accounts")::before { content: "\f155"; }
.sidebar-label:contains("Selling")::before { content: "\f07a"; }
.sidebar-label:contains("Buying")::before { content: "\f07b"; }
.sidebar-label:contains("Stock")::before { content: "\f1b2"; }
.sidebar-label:contains("Manufacturing")::before { content: "\f085"; }
.sidebar-label:contains("HR")::before { content: "\f0c0"; }
.sidebar-label:contains("Projects")::before { content: "\f073"; }
.sidebar-label:contains("CRM")::before { content: "\f2b9"; }

/* ===== LOADING ANIMATION ===== */
.page-loading {
    background: linear-gradient(135deg, #87ceeb 0%, #b3d9ff 100%) !important;
}

.loading-glass {
    background: var(--glass-bg) !important;
    backdrop-filter: var(--blur-light) !important;
    -webkit-backdrop-filter: var(--blur-light) !important;
    border: 1px solid var(--glass-border) !important;
    border-radius: var(--radius-lg) !important;
    position: relative !important;
    overflow: hidden !important;
}

.loading-glass::before {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    left: -100% !important;
    width: 100% !important;
    height: 100% !important;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent) !important;
    animation: shimmer 2s infinite !important;
}

@keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
}

/* ===== FOOTER ===== */
.footer {
    background: rgba(70, 130, 180, 0.1) !important;
    border-top: 1px solid #87ceeb !important;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
}

/* ===== CUSTOM SCROLLBAR ===== */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(135, 206, 235, 0.1);
}

::-webkit-scrollbar-thumb {
    background: #87ceeb;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}

::-webkit-scrollbar-thumb:hover {
    background: #1e90ff;
}

/* ===== MOBILE RESPONSIVE GLASS ===== */
@media (max-width: 768px) {
    .navbar,
    .sticky-top,
    .desk-nav {
        backdrop-filter: blur(15px) !important;
        -webkit-backdrop-filter: blur(15px) !important;
    }
    
    .navbar-nav {
        background: var(--glass-bg) !important;
        backdrop-filter: var(--blur-light) !important;
        -webkit-backdrop-filter: var(--blur-light) !important;
        border-radius: var(--radius-lg) !important;
        margin-top: var(--space-2) !important;
        padding: var(--space-2) !important;
        box-shadow: var(--glass-shadow) !important;
    }
    
    .search-bar input,
    #navbar-search {
        width: 200px !important;
    }
}

/* ===== PERFORMANCE OPTIMIZATIONS ===== */
/* Reduce blur on lower-end devices */
@media (max-width: 768px) and (-webkit-max-device-pixel-ratio: 1) {
    .navbar,
    .sticky-top,
    .desk-nav {
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
    }
}

/* Disable glass effects if user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
    .navbar,
    .sticky-top,
    .desk-nav,
    // .breadcrumb,
    .search-bar input {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        background: var(--bg-elevated) !important;
    }
}

/* ===== ACCESSIBILITY ENHANCEMENTS ===== */
/* High contrast mode adjustments */
@media (prefers-contrast: high) {
    .navbar,
    .sticky-top,
    .desk-nav {
        background: var(--bg-elevated) !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        border-bottom: 2px solid var(--border-base) !important;
    }
}

/* ===== ENHANCED SEARCH CONTAINER ===== */
.navbar .search-container,
.global-search {
    background: var(--glass-bg) !important;
    backdrop-filter: var(--blur-light) !important;
    -webkit-backdrop-filter: var(--blur-light) !important;
    border: 1px solid var(--glass-border) !important;
    border-radius: var(--radius-full) !important;
    padding: var(--space-1) !important;
    transition: var(--glass-transition) !important;
}

.navbar .search-container:focus-within,
.global-search:focus-within {
    background: var(--glass-bg-hover) !important;
    backdrop-filter: var(--blur-strong) !important;
    -webkit-backdrop-filter: var(--blur-strong) !important;
    border-color: var(--primary-500) !important;
    box-shadow: 0 0 0 3px rgba(30, 144, 255, 0.2) !important;
    transform: scale(1.02) !important;
}

/* ===== GLASS CLASS UTILITIES ===== */
.glass-navbar {
    background: var(--glass-bg) !important;
    backdrop-filter: var(--blur-light) !important;
    -webkit-backdrop-filter: var(--blur-light) !important;
}

.glass-search {
    background: var(--glass-bg) !important;
    backdrop-filter: var(--blur-light) !important;
    -webkit-backdrop-filter: var(--blur-light) !important;
}

.glass-dropdown {
    background: var(--glass-bg) !important;
    backdrop-filter: var(--blur-light) !important;
    -webkit-backdrop-filter: var(--blur-light) !important;
}

.glass-page-head {
    background: var(--glass-bg) !important;
    backdrop-filter: var(--blur-light) !important;
    -webkit-backdrop-filter: var(--blur-light) !important;
}

/* ===== ENHANCED VISUAL FEEDBACK ===== */
.layout-side-section .sidebar-label:active {
    transform: scale(0.98) translateX(5px) !important;
    transition: transform 0.1s ease !important;
}

.btn-primary:active {
    transform: translateY(0) scale(0.98) !important;
    transition: transform 0.1s ease !important;
}

.navbar-nav .nav-link:active {
    transform: scale(0.95) !important;
    transition: transform 0.1s ease !important;
}

/* ===== SMOOTH TRANSITIONS FOR ALL ELEMENTS ===== */
* {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter !important;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
    transition-duration: 150ms !important;
}

/* ===== FINAL POLISH ===== */
/* Focus visible for accessibility */
*:focus-visible {
    outline: 2px solid var(--primary-500) !important;
    outline-offset: 2px !important;
}

/* Improved link styling */
a {
    color: var(--primary-500) !important;
    text-decoration: none !important;
    transition: all var(--transition-fast) !important;
}

a:hover {
    color: var(--primary-600) !important;
    text-decoration: underline !important;
}

/* Enhanced glass effect for form focus */
.form-control:focus-visible {
    outline: none !important;
    border-color: var(--primary-500) !important;
    box-shadow: 0 0 0 3px rgba(30, 144, 255, 0.2) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
}
    -webkit-backdrop-filter: var(--blur-strong) !important;
}

.modal-header {
    background: linear-gradient(90deg, #87ceeb, #1e90ff) !important;
    color: white !important;
    border-radius: 8px 8px 0 0 !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
}

/* ===== TABS WITH GLASS EFFECTS ===== */
.nav-tabs .nav-link.active {
    background: #1e90ff !important;
    color: white !important;
    border: none !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
}

.nav-tabs .nav-link {
    color: #4682b4 !important;
    border-radius: 5px 5px 0 0 !important;
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
    transition: all 0.3s ease !important;
}

.nav-tabs .nav-link:hover {
    background: rgba(30, 144, 255, 0.1) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
}

/* ===== TOOLBAR WITH GLASS EFFECT ===== */
.page-actions,
.form-toolbar,
.list-toolbar {
    background: var(--glass-bg) !important;
    backdrop-filter: var(--blur-light) !important;
    -webkit-backdrop-filter: var(--blur-light) !important;
    border: 1px solid var(--glass-border) !important;
    border-radius: var(--radius-lg) !important;
    box-shadow: var(--shadow-sm) !important;
    transition: var(--glass-transition) !important;
    margin-bottom: var(--space-4) !important;
}

.page-actions:hover,
.form-toolbar:hover,
.list-toolbar:hover {
    background: var(--glass-bg-hover) !important;
    backdrop-filter: var(--blur-strong) !important;
    -webkit-backdrop-filter: var(--blur-strong) !important;
    box-shadow: var(--shadow-md) !important;
}

/* ===== USER MENU WITH GLASS EFFECT ===== */
.navbar-user,
.user-menu,
.avatar-frame {
    background: var(--glass-bg) !important;
    backdrop-filter: var(--blur-light) !important;
    -webkit-backdrop-filter: var(--blur-light) !important;
    border: 1px solid var(--glass-border) !important;
    border-radius: var(--radius-full) !important;
    padding: var(--space-2) !important;
    transition: var(--glass-transition) !important;
    box-shadow: var(--shadow-xs) !important;
}

.navbar-user:hover,
.user-menu:hover,
.avatar-frame:hover {
    background: var(--glass-bg-hover) !important;
    backdrop-filter: var(--blur-strong) !important;/* ===== BUSINESS THEME V14 WITH GLASSMORPHISM NAVBAR ===== */
/* Combined: Sky Blue Theme + Glass Effects for Professional Look */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* ===== ENHANCED COLOR VARIABLES ===== */
:root {
    /* Sky Blue Theme Colors */
    --primary-color: #1e90ff !important;
    --secondary-color: #87ceeb !important;
    --background-color: #e6f3ff !important;
    --sky-blue: #87ceeb;
    --deep-sky-blue: #1e90ff;
    --light-sky-blue: #e6f3ff;
    
    /* Glass Effect Variables */
    --glass-bg: rgba(255, 255, 255, 0.08);
    --glass-bg-hover: rgba(255, 255, 255, 0.12);
    --glass-border: rgba(255, 255, 255, 0.12);
    --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    --glass-shadow-hover: 0 12px 40px 0 rgba(31, 38, 135, 0.45);
    
    /* Blur Strength */
    --blur-light: blur(20px);
    --blur-strong: blur(25px);
    
    /* Professional Color Palette */
    --primary-50: #eff6ff;
    --primary-100: #dbeafe;
    --primary-200: #bfdbfe;
    --primary-300: #93c5fd;
    --primary-400: #60a5fa;
    --primary-500: #3b82f6;
    --primary-600: #2563eb;
    --primary-700: #1d4ed8;
    
    /* Text Colors */
    --text-primary: #1f2937;
    --text-secondary: #4b5563;
    --text-muted: #6b7280;
    --text-placeholder: #9ca3af;
    
    /* Background Colors */
    --bg-surface: #ffffff;
    --bg-elevated: rgba(255, 255, 255, 0.95);
    --border-base: #e5e7eb;
    
    /* Spacing */
    --space-1: 4px;
    --space-2: 8px;
    --space-2p5: 10px;
    --space-3: 12px;
    --space-4: 16px;
    --space-6: 24px;
    --space-8: 32px;
    
    /* Border Radius */
    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-full: 9999px;
    
    /* Shadows */
    --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    
    /* Transitions */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --glass-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Layout */
    --header-height: 64px;
    --font-bold: 700;
    --font-medium: 500;
    --font-semibold: 600;
    --text-xl: 20px;
    --text-sm: 14px;
}

/* Dark Theme Glass Adjustments */
[data-theme="dark"] {
    --glass-bg: rgba(15, 23, 42, 0.7);
    --glass-bg-hover: rgba(15, 23, 42, 0.85);
    --glass-border: rgba(255, 255, 255, 0.08);
}

/* ===== GLOBAL BACKGROUND - SKY BLUE THEME ===== */
.layout-main-section-wrapper,
.page-container,
body {
    background: linear-gradient(135deg, #87ceeb 0%, #b3d9ff 100%) !important;
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ===== GLASSMORPHISM NAVBAR - ENHANCED ===== */
.navbar,
.sticky-top,
.desk-nav {
    background: var(--glass-bg) !important;
    backdrop-filter: var(--blur-light) !important;
    -webkit-backdrop-filter: var(--blur-light) !important;
    border-bottom: 1px solid var(--glass-border) !important;
    box-shadow: var(--glass-shadow) !important;
    height: var(--header-height) !important;
    position: sticky !important;
    top: 0 !important;
    z-index: 1000 !important;
    transition: var(--glass-transition) !important;
    padding: 0 !important;
}

/* Enhanced hover effect for navbar */
.navbar:hover,
.sticky-top:hover,
.desk-nav:hover {
    background: var(--glass-bg-hover) !important;
    backdrop-filter: var(--blur-strong) !important;
    -webkit-backdrop-filter: var(--blur-strong) !important;
    box-shadow: var(--glass-shadow-hover) !important;
}

/* Navbar container */
.navbar-expand {
    background: transparent !important;
    padding: 0 var(--space-6) !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    max-width: 1400px !important;
    margin: 0 auto !important;
    width: 100% !important;
}

/* Enhanced navbar brand with glass effect */
.navbar-brand {
    font-weight: var(--font-bold) !important;
    font-size: var(--text-xl) !important;
    color: var(--text-primary) !important;
    text-decoration: none !important;
    margin-right: var(--space-8) !important;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
    transition: var(--glass-transition) !important;
    display: flex !important;
    align-items: center !important;
    gap: var(--space-3) !important;
}

.navbar-brand:hover {
    color: var(--primary-600) !important;
    transform: scale(1.05) !important;
}

/* Navbar navigation with glass effects */
.navbar-nav {
    display: flex !important;
    align-items: center !important;
    gap: var(--space-2) !important;
    margin-left: auto !important;
}

.navbar-nav .nav-link {
    color: var(--text-secondary) !important;
    font-weight: var(--font-medium) !important;
    font-size: var(--text-sm) !important;
    padding: var(--space-2) var(--space-3) !important;
    border-radius: var(--radius-md) !important;
    transition: var(--glass-transition) !important;
    text-decoration: none !important;
    display: flex !important;
    align-items: center !important;
    gap: var(--space-2) !important;
    background: rgba(255, 255, 255, 0.05) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.navbar-nav .nav-link:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    color: var(--primary-600) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2) !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
}

.navbar-nav .nav-link.active {
    background: var(--primary-100) !important;
    color: var(--primary-600) !important;
    font-weight: var(--font-semibold) !important;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25) !important;
}

/* ===== GLASSMORPHISM SEARCH BAR ===== */
.search-bar,
.search-bar input,
.form-control.search-input,
#navbar-search,
.nav-search {
    background: var(--glass-bg) !important;
    backdrop-filter: var(--blur-light) !important;
    -webkit-backdrop-filter: var(--blur-light) !important;
    border: 1px solid var(--glass-border) !important;
    border-radius: var(--radius-full) !important;
    color: var(--text-primary) !important;
    transition: var(--glass-transition) !important;
    outline: none !important;
    box-shadow: var(--shadow-xs) !important;
    padding: var(--space-2p5) var(--space-4) !important;
    font-size: var(--text-sm) !important;
    width: 300px !important;
}

.search-bar input:focus,
.form-control.search-input:focus,
#navbar-search:focus,
.nav-search:focus {
    background: rgba(255, 255, 255, 0.15) !important;
    backdrop-filter: var(--blur-strong) !important;
    -webkit-backdrop-filter: var(--blur-strong) !important;
    border-color: var(--primary-500) !important;
    box-shadow: 0 0 0 3px rgba(30, 144, 255, 0.2) !important;
    transform: scale(1.02) !important;
}

.search-bar input::placeholder,
#navbar-search::placeholder,
.nav-search::placeholder {
    color: rgba(255, 255, 255, 0.7) !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
}

/* ===== GLASSMORPHISM BREADCRUMBS ===== */
// .breadcrumb,
// #navbar-breadcrumbs {
//     background: var(--glass-bg) !important;
//     backdrop-filter: var(--blur-light) !important;
//     -webkit-backdrop-filter: var(--blur-light) !important;
//     border: 1px solid var(--glass-border) !important;
//     border-radius: var(--radius-lg) !important;
//     box-shadow: var(--shadow-sm) !important;
//     padding: var(--space-3) var(--space-4) !important;
//     margin: var(--space-2) 0 !important;
//     display: flex !important;
//     align-items: center !important;
//     gap: var(--space-2) !important;
//     font-size: var(--text-sm) !important;
//     list-style: none !important;
//     transition: var(--glass-transition) !important;
// }

// .breadcrumb:hover,
// #navbar-breadcrumbs:hover {
//     background: var(--glass-bg-hover) !important;
//     backdrop-filter: var(--blur-strong) !important;
//     -webkit-backdrop-filter: var(--blur-strong) !important;
//     box-shadow: var(--shadow-md) !important;
// }

// .breadcrumb-item,
// #navbar-breadcrumbs li {
//     display: flex !important;
//     align-items: center !important;
// }

// .breadcrumb-item:not(:first-child)::before,
// #navbar-breadcrumbs li:not(:first-child)::before {
//     content: "/" !important;
//     color: var(--text-muted) !important;
//     margin: 0 var(--space-2) !important;
// }

// .breadcrumb-item a,
// #navbar-breadcrumbs a {
//     color: var(--text-primary) !important;
//     text-decoration: none !important;
//     padding: var(--space-1) var(--space-2) !important;
//     border-radius: var(--radius-sm) !important;
//     transition: var(--glass-transition) !important;
//     font-weight: var(--font-medium) !important;
//     text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
// }

// .breadcrumb-item a:hover,
// #navbar-breadcrumbs a:hover {
//     background: rgba(255, 255, 255, 0.15) !important;
//     color: var(--primary-600) !important;
//     transform: scale(1.02) !important;
// }

/* ===== SIDEBAR - BLUE GRADIENT ===== */
.layout-side-section {
    // background: linear-gradient(180deg, #4682b4 0%, #2e86ab 100%) !important;
    border-right: 2px solid #1e90ff !important;
    /* Add subtle glass effect to sidebar */
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    box-shadow: var(--shadow-sm) !important;
}

/* Sidebar Labels - White Text with Glass Effect */
.layout-side-section .sidebar-label,
.layout-side-section .sidebar-label a {
    color: white !important;
    font-weight: 500 !important;
    padding: 10px 15px !important;
    border-radius: 5px !important;
    margin: 2px 5px !important;
    transition: all 0.3s ease !important;
    // background: rgba(255, 255, 255, 0.05) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.layout-side-section .sidebar-label:hover {
    // background: rgba(255, 255, 255, 0.2) !important;
    transform: translateX(5px) !important;
    backdrop-filter: blur(15px) !important;
    -webkit-backdrop-filter: blur(15px) !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.layout-side-section .sidebar-label.active {
    // background: rgba(30, 144, 255, 0.2) !important;
    backdrop-filter: blur(15px) !important;
    -webkit-backdrop-filter: blur(15px) !important;
    border-color: rgba(30, 144, 255, 0.4) !important;
    box-shadow: 0 4px 15px rgba(30, 144, 255, 0.2) !important;
}

/* ===== MAIN CONTENT AREA - WHITE WITH TRANSPARENCY ===== */
.layout-main-section {
    background: rgba(255, 255, 255, 0.95) !important;
    border-radius: 10px !important;
    margin: 10px !important;
    box-shadow: 0 4px 20px rgba(30, 144, 255, 0.1) !important;
    border: 1px solid rgba(135, 206, 235, 0.3) !important;
    /* Add subtle glass effect */
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
}

/* ===== BUTTONS - SKY BLUE ===== */
.btn-primary {
    background: linear-gradient(45deg, #1e90ff, #87ceeb) !important;
    border: none !important;
    border-radius: 6px !important;
    color: white !important;
    font-weight: 500 !important;
    transition: all 0.3s ease !important;
    /* Add glass effect to buttons */
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    box-shadow: 0 4px 12px rgba(30, 144, 255, 0.3) !important;
}

.btn-primary:hover {
    background: linear-gradient(45deg, #0066cc, #6bb6ff) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(30, 144, 255, 0.4) !important;
    backdrop-filter: blur(15px) !important;
    -webkit-backdrop-filter: blur(15px) !important;
}

/* ===== GLASS BUTTONS IN NAVBAR ===== */
.navbar .btn,
.page-head .btn {
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: var(--blur-light) !important;
    -webkit-backdrop-filter: var(--blur-light) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: var(--text-primary) !important;
    border-radius: var(--radius-md) !important;
    transition: var(--glass-transition) !important;
    box-shadow: var(--shadow-xs) !important;
}

.navbar .btn:hover,
.page-head .btn:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: var(--blur-strong) !important;
    -webkit-backdrop-filter: var(--blur-strong) !important;
    transform: translateY(-1px) !important;
    box-shadow: var(--shadow-sm) !important;
}

.navbar .btn-primary,
.page-head .btn-primary {
    background: rgba(30, 144, 255, 0.8) !important;
    color: white !important;
    border-color: rgba(30, 144, 255, 0.9) !important;
}

.navbar .btn-primary:hover,
.page-head .btn-primary:hover {
    background: rgba(30, 144, 255, 0.9) !important;
    border-color: rgba(30, 144, 255, 1) !important;
}

/* ===== FORM CONTROLS - SKY BLUE FOCUS ===== */
.form-control {
    border: 1px solid #b3d9ff !important;
    border-radius: 6px !important;
    background: rgba(255, 255, 255, 0.9) !important;
    transition: all 0.3s ease !important;
}

.form-control:focus {
    border: 2px solid #1e90ff !important;
    box-shadow: 0 0 0 0.2rem rgba(30, 144, 255, 0.25) !important;
    background: white !important;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
}

/* ===== CARDS AND WIDGETS WITH GLASS EFFECTS ===== */
.widget,
.card {
    background: rgba(255, 255, 255, 0.95) !important;
    border: 1px solid rgba(135, 206, 235, 0.3) !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 15px rgba(30, 144, 255, 0.1) !important;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
    transition: all 0.3s ease !important;
}

.widget:hover,
.card:hover {
    box-shadow: 0 8px 25px rgba(30, 144, 255, 0.2) !important;
    transform: translateY(-2px) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
}

/* ===== TABLES WITH GLASS HEADERS ===== */
.table thead th {
    background: linear-gradient(90deg, #87ceeb, #1e90ff) !important;
    color: white !important;
    border: none !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
}

.table tbody tr:hover {
    background: rgba(30, 144, 255, 0.05) !important;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
}

/* ===== DROPDOWNS WITH GLASS EFFECT ===== */
.dropdown-menu,
.context-menu {
    background: var(--glass-bg) !important;
    backdrop-filter: var(--blur-light) !important;
    -webkit-backdrop-filter: var(--blur-light) !important;
    border: 1px solid var(--glass-border) !important;
    border-radius: var(--radius-lg) !important;
    box-shadow: var(--glass-shadow) !important;
    padding: var(--space-2) !important;
    margin-top: var(--space-1) !important;
}

.dropdown-item,
.context-menu-item {
    color: var(--text-primary) !important;
    padding: var(--space-2) var(--space-3) !important;
    border-radius: var(--radius-sm) !important;
    transition: var(--glass-transition) !important;
    font-weight: var(--font-medium) !important;
    background: transparent !important;
}

.dropdown-item:hover,
.context-menu-item:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    color: var(--primary-600) !important;
    transform: translateX(4px) !important;
}

/* ===== PAGE HEADERS WITH GLASS EFFECT ===== */
.page-head,
.page-header {
    background: var(--glass-bg) !important;
    backdrop-filter: var(--blur-light) !important;
    -webkit-backdrop-filter: var(--blur-light) !important;
    border: 1px solid var(--glass-border) !important;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    box-shadow: var(--glass-shadow) !important;
    position: sticky !important;
    top: var(--header-height) !important;
    z-index: 45 !important;
    transition: var(--glass-transition) !important;
    margin-bottom: var(--space-2) !important;
}

.page-head:hover,
.page-header:hover {
    background: var(--glass-bg-hover) !important;
    backdrop-filter: var(--blur-strong) !important;
    -webkit-backdrop-filter: var(--blur-strong) !important;
    box-shadow: var(--glass-shadow-hover) !important;
}

.page-head .title-text,
.page-header .title-text,
.page-title {
    color: var(--text-primary) !important;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
    font-weight: var(--font-semibold) !important;
}

/* ===== PAGE TITLE ===== */
.page-head .page-title {
    color: #2c3e50 !important;
    font-weight: 600 !important;
}

/* ===== NOTIFICATIONS WITH GLASS EFFECT ===== */
.alert,
.msgprint,
.notification {
    background: var(--glass-bg) !important;
    backdrop-filter: var(--blur-light) !important;
    -webkit-backdrop-filter: var(--blur-light) !important;
    border: 1px solid var(--glass-border) !important;
    border-radius: var(--radius-lg) !important;
    box-shadow: var(--shadow-sm) !important;
    transition: var(--glass-transition) !important;
}

.alert:hover,
.msgprint:hover,
.notification:hover {
    backdrop-filter: var(--blur-strong) !important;
    -webkit-backdrop-filter: var(--blur-strong) !important;
    box-shadow: var(--shadow-md) !important;
}

.alert-info {
    background: rgba(30, 144, 255, 0.1) !important;
    border: 1px solid #
