// ITChamps Dashboard JavaScript
frappe.ready(function() {
    // Check if we're on the dashboard page
    if (window.location.pathname === '/dashboard' || window.location.pathname === '/') {
        initITChampsDashboard();
    }
});

function initITChampsDashboard() {
    // Add dashboard class to body for CSS targeting
    $('body').addClass('dashboard-page');
    
    // Hide sidebar and adjust layout
    $('.layout-side-section').hide();
    $('.layout-main-section-wrapper').css('margin-left', '0');
    $('.layout-main-section').css({
        'margin-left': '0',
        'width': '100%',
        'margin': '0',
        'border-radius': '0',
        'background': 'transparent'
    });
    
    // Initialize card click handlers
    $('.module-card').on('click', function() {
        const module = $(this).data('module');
        if (module) {
            navigateToModule(module);
        }
    });
    
    // Clean up logo
    cleanupLogo();
    
    // Add animation to cards
    animateCards();
}

function navigateToModule(moduleName) {
    const moduleMap = {
        'home': '',
        'hr': 'hr',
        'payroll': 'payroll',
        'recruitment': 'job-applicant',
        'attendance': 'attendance',
        'performance': 'appraisal',
        'leaves': 'leave-application',
        'expenses': 'expense-claim',
        'accounting': 'accounts',
        'selling': 'selling',
        'buying': 'buying',
        'stock': 'stock',
        'assets': 'asset',
        'manufacturing': 'manufacturing',
        'projects': 'projects',
        'crm': 'crm',
        'support': 'issue',
        'website': 'website'
    };
    
    const route = moduleMap[moduleName] || moduleName;
    window.location.href = route ? `/app/${route}` : '/app';
}

function cleanupLogo() {
    // Your existing logo cleanup code
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        const existingImages = navbarBrand.querySelectorAll('img, svg, span');
        existingImages.forEach(element => {
            if (element.tagName === 'IMG' || element.tagName === 'SVG') {
                element.remove();
            }
        });
        
        navbarBrand.style.backgroundImage = 'none';
        navbarBrand.classList.add('custom-logo');
        navbarBrand.className = 'navbar-brand custom-logo';
    }
}

function animateCards() {
    // Animate cards on load
    const cards = document.querySelectorAll('.module-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Global function for onclick handlers
window.navigateToModule = navigateToModule;
