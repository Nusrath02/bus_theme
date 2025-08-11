/*!
 * Horizontal Navbar JavaScript
 * =============================
 * Frontend behavior file - affects UI functionality
 * 
 * Purpose:
 * - Clean logo implementation with duplicate removal
 * - ITChamps logo positioning and styling
 * - Glassmorphism navbar class application
 * - Dynamic search dropdown behavior
 * - Cross-browser compatibility enhancements
 * 
 * This file handles navbar interactions and logo display.
 * =============================
 */

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

// ITChamps Logo Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Find navbar-brand element
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        // Remove any existing images
        const existingImages = navbarBrand.querySelectorAll('img, svg');
        existingImages.forEach(img => img.remove());
        
        // Apply logo styling classes
        navbarBrand.classList.add('itchamps-logo');
        
        // Ensure proper styling
        navbarBrand.style.backgroundImage = "url('/assets/business_theme_v14/images/itchamps_logo.png')";
        navbarBrand.style.backgroundSize = "contain";
        navbarBrand.style.backgroundRepeat = "no-repeat";
        navbarBrand.style.backgroundPosition = "left center";
        navbarBrand.style.width = "180px";
        navbarBrand.style.height = "60px";
        navbarBrand.style.display = "flex";
        navbarBrand.style.alignItems = "center";
        
        console.log('✓ ITChamps logo applied successfully');
    }
    
    // Apply glassmorphism classes
    const navbar = document.querySelector('.navbar, .sticky-top');
    if (navbar) {
        navbar.classList.add('glass-navbar');
    }
});
EOF < /dev/null

// ITChamps Logo Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Find navbar-brand element
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        // Remove any existing images
        const existingImages = navbarBrand.querySelectorAll('img, svg');
        existingImages.forEach(img => img.remove());
        
        // Apply logo styling classes
        navbarBrand.classList.add('itchamps-logo');
        
        // Ensure proper styling
        navbarBrand.style.backgroundImage = "url('/assets/business_theme_v14/images/itchamps_logo.png')";
        navbarBrand.style.backgroundSize = "contain";
        navbarBrand.style.backgroundRepeat = "no-repeat";
        navbarBrand.style.backgroundPosition = "left center";
        navbarBrand.style.width = "180px";
        navbarBrand.style.height = "60px";
        navbarBrand.style.display = "flex";
        navbarBrand.style.alignItems = "center";
        
        console.log('✓ ITChamps logo applied successfully');
    }
    
    // Apply glassmorphism classes
    const navbar = document.querySelector('.navbar, .sticky-top');
    if (navbar) {
        navbar.classList.add('glass-navbar');
    }
});
EOF < /dev/null
