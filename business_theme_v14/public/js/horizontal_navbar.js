/*!
 * Business Theme v14 - Horizontal Navbar
 * =====================================
 * Essential navbar functionality with ITChamps logo
 */

// ITChamps Logo Implementation
document.addEventListener('DOMContentLoaded', function() {
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        // Clean existing content
        navbarBrand.innerHTML = '';
        
        // Apply ITChamps logo styling
        navbarBrand.style.backgroundImage = "url('/assets/business_theme_v14/images/itchamps_logo.png')";
        navbarBrand.style.backgroundSize = "contain";
        navbarBrand.style.backgroundRepeat = "no-repeat";
        navbarBrand.style.backgroundPosition = "left center";
        navbarBrand.style.width = "180px";
        navbarBrand.style.height = "60px";
        navbarBrand.style.display = "flex";
        navbarBrand.style.alignItems = "center";
        
        console.log('✓ ITChamps logo applied');
    }
});