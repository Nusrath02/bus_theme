/*!
 * Business Theme v14 - Core JavaScript
 * ====================================
 * Frontend behavior file - affects UI functionality
 * 
 * Core theme functionality and interactions
 * ====================================
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

// Glassmorphism enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Add glass classes to navbar elements
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.add('glass-navbar');
    }
    
    // Add glass effect to search elements
    const searchInputs = document.querySelectorAll('.search-bar input, #navbar-search');
    searchInputs.forEach(input => {
        input.classList.add('glass-search');
    });
    
    // Add glass effect to dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
        dropdown.classList.add('glass-dropdown');
    });
    
    console.log('✓ Glassmorphism effects applied');
});