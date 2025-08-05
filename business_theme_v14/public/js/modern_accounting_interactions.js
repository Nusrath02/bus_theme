// Modern Accounting Theme Interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Add modern classes to accounting elements
    const accountingElements = {
        buttons: document.querySelectorAll('.btn'),
        cards: document.querySelectorAll('.number-card, .dashboard-graph'),
        setupSections: document.querySelectorAll('.setup-wizard-slide, .onboarding-step')
    };
    
    // Enhanced button interactions
    accountingElements.buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add hover effects to cards
    accountingElements.cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add modern classes for accounting page
    if (window.location.pathname.includes('accounting') || 
        document.querySelector('.page-title')?.textContent.includes('Accounting')) {
        
        document.body.classList.add('modern-accounting-theme');
        
        // Add accounting icon to page title if not exists
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle && !pageTitle.querySelector('.accounting-icon')) {
            const icon = document.createElement('span');
            icon.className = 'accounting-icon';
            icon.innerHTML = '📊';
            pageTitle.prepend(icon);
        }
    }
});