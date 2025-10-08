// SYConE Custom Footer Implementation for ERPNext/Frappe
// Add this script to your custom app or theme

// Multiple initialization methods to ensure footer loads
$(document).ready(function() {
    createSyconEFooter();
});

frappe.ready(() => {
    createSyconEFooter();
});

// Also trigger on route changes for SPA navigation
$(document).on('page-change', function() {
    setTimeout(createSyconEFooter, 100);
});

// Additional fallback for page loads
window.addEventListener('load', function() {
    setTimeout(createSyconEFooter, 200);
});

function createSyconEFooter() {
    // Remove existing custom footer if present
    $('.sycone-custom-footer').remove();
    
    // Create simplified footer HTML structure
    const footerHTML = `
        <div class="sycone-custom-footer">
            <div class="sycone-footer-content">
                <!-- Copyright -->
                <div class="sycone-copyright">
                    <span>© 2025 SYConE CPMC Pvt Ltd. All Rights Reserved | Design: ITChamps</span>
                </div>
                
                <!-- SYConE Logo -->
                <img src="/assets/business_theme_v14/images/sycone_logo.png" alt="SYConE Logo" class="sycone-footer-logo">
            </div>
        </div>
    `;
    
    // Append footer to body
    $('body').append(footerHTML);
}

// Alternative method using frappe hooks if the above doesn't work
frappe.ui.page.on_route_change = function() {
    setTimeout(createSyconEFooter, 200);
};
