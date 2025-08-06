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
