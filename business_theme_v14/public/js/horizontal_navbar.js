// Horizontal Navbar - ITChamps Logo Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Add custom-logo class to navbar-brand for CSS styling
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        navbarBrand.classList.add('custom-logo');
        // Remove any existing images
        const existingImages = navbarBrand.querySelectorAll('img');
        existingImages.forEach(img => img.remove());
    }
});