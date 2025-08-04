// Business Theme V14 with Glassmorphism UI - JavaScript Enhancements
// Modern interactive features for the glass navbar and UI elements

frappe.ready(function() {
    console.log("Business Theme V14 with Glassmorphism UI loaded successfully");
    
    // Initialize theme features
    initializeGlassmorphismEffects();
    initializeNavbarInteractions();
    initializeResponsiveFeatures();
    initializeAccessibilityFeatures();
});

// Glassmorphism Effects Initialization
function initializeGlassmorphismEffects() {
    // Add glassmorphism class to navbar elements
    $(document).ready(function() {
        // Enhance navbar with glass effects
        $('.navbar, .sticky-top, .desk-nav').addClass('glass-navbar');
        
        // Add glass effect to search elements
        $('.search-bar input, #navbar-search, .nav-search').addClass('glass-search');
        
        // Enhance dropdowns
        $('.dropdown-menu').addClass('glass-dropdown');
        
        // Add glass effect to page headers
        $('.page-head, .page-header').addClass('glass-page-head');
        
        console.log("Glassmorphism effects initialized");
    });
}

// Navbar Interaction Enhancements
function initializeNavbarInteractions() {
    // Smooth scroll behavior for navbar links
    $('.navbar-nav .nav-link').on
