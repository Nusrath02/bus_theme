// SIMPLE HORIZONTAL NAVBAR FIX
// Add this to the beginning of your horizontal_navbar.js file

console.log("🚀 Horizontal Navbar Script Loading...");

// Force immediate execution
(function() {
    'use strict';
    
    console.log("📍 Starting navbar transformation...");
    
    // Wait for document ready with multiple fallbacks
    function initNavbar() {
        console.log("📍 initNavbar called");
        
        // Find the navbar
        let navbar = document.querySelector('.navbar, .desk-nav, .sticky-top');
        
        if (!navbar) {
            console.log("❌ Navbar not found, creating one...");
            navbar = document.createElement('nav');
            navbar.className = 'navbar';
            document.body.insertBefore(navbar, document.body.firstChild);
        }
        
        console.log("✅ Navbar found:", navbar);
        
        // Clear and rebuild navbar
        navbar.innerHTML = `
            <div class="navbar-expand">
                <!-- Left: ITChamps Logo + Brand -->
                <div class="navbar-brand">
                    <!-- Logo and brand will be styled via CSS -->
                </div>
                
                <!-- Center: Module Links -->
                <div class="navbar-modules horizontal-modules">
                    <a href="/app/home" class="module-link" data-module="Home">
                        <span class="module-icon">🏠</span>
                        <span class="module-name">Home</span>
                    </a>
                    <a href="/app/accounting" class="module-link" data-module="Accounting">
                        <span class="module-icon">💰</span>
                        <span class="module-name">Accounting</span>
                    </a>
                    <a href="/app/buying" class="module-link" data-module="Buying">
                        <span class="module-icon">🛒</span>
                        <span class="module-name">Buying</span>
                    </a>
                    <a href="/app/selling" class="module-link" data-module="Selling">
                        <span class="module-icon">💼</span>
                        <span class="module-name">Selling</span>
                    </a>
                    <a href="/app/stock" class="module-link" data-module="Stock">
                        <span class="module-icon">📦</span>
                        <span class="module-name">Stock</span>
                    </a>
                    <a href="/app/assets" class="module-link" data-module="Assets">
                        <span class="module-icon">🏭</span>
                        <span class="module-name">Assets</span>
                    </a>
                    <a href="/app/hr" class="module-link" data-module="HR">
                        <span class="module-icon">👥</span>
                        <span class="module-name">HR</span>
                    </a>
                    <a href="/app/manufacturing" class="module-link" data-module="Manufacturing">
                        <span class="module-icon">⚙️</span>
                        <span class="module-name">Mfg</span>
                    </a>
                    <a href="/app/projects" class="module-link" data-module="Projects">
                        <span class="module-icon">📊</span>
                        <span class="module-name">Projects</span>
                    </a>
                    <a href="/app/crm" class="module-link" data-module="CRM">
                        <span class="module-icon">🤝</span>
                        <span class="module-name">CRM</span>
                    </a>
                </div>
                
                <!-- Right: Search + User -->
                <div class="navbar-right">
                    <input type="text" class="search-bar" placeholder="Search..." />
                    <div class="user-menu">👤</div>
                </div>
            </div>
        `;
        
        console.log("✅ Navbar HTML inserted");
        
        // Mark current module as active
        const currentPath = window.location.pathname;
        const moduleLinks = navbar.querySelectorAll('.module-link');
        
        moduleLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (currentPath.includes(href.replace('/app/', ''))) {
                link.classList.add('active');
                console.log("✅ Active module:", link.dataset.module);
            }
        });
        
        // Add click handlers
        moduleLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log("🔗 Module clicked:", this.dataset.module);
                
                // Remove active from all
                moduleLinks.forEach(l => l.classList.remove('active'));
                
                // Add active to clicked
                this.classList.add('active');
                
                // Show feedback
                const feedback = document.createElement('div');
                feedback.innerHTML = `📂 Opening ${this.dataset.module}...`;
                feedback.style.cssText = `
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: rgba(59, 130, 246, 0.9);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 12px;
                    font-weight: 600;
                    z-index: 9999;
                    transform: translateX(300px);
                    transition: all 0.3s ease;
                `;
                
                document.body.appendChild(feedback);
                
                setTimeout(() => {
                    feedback.style.transform = 'translateX(0)';
                }, 100);
                
                setTimeout(() => {
                    feedback.remove();
                }, 2000);
            });
        });
        
        console.log("🎉 Horizontal navbar successfully created!");
        
        // Show success message
        setTimeout(() => {
            const successMsg = document.createElement('div');
            successMsg.innerHTML = '🎉 ITChamps Horizontal Navbar Loaded!';
            successMsg.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #10b981;
                color: white;
                padding: 12px 20px;
                border-radius: 12px;
                font-weight: 600;
                z-index: 9999;
                transform: translateX(300px);
                transition: all 0.3s ease;
            `;
            
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.style.transform = 'translateX(0)';
            }, 100);
            
            setTimeout(() => {
                successMsg.style.transform = 'translateX(300px)';
                setTimeout(() => successMsg.remove(), 300);
            }, 3000);
        }, 1000);
    }
    
    // Multiple initialization attempts
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
    
    // Backup initialization
    window.addEventListener('load', initNavbar);
    
    // Emergency fallback
    setTimeout(initNavbar, 2000);
    setTimeout(initNavbar, 5000);
    
    console.log("📍 Navbar initialization scheduled");

})();

// Also try jQuery approach if available
if (typeof $ !== 'undefined') {
    $(document).ready(function() {
        console.log("📍 jQuery ready - attempting navbar init...");
        setTimeout(() => {
            if (!document.querySelector('.navbar-modules')) {
                console.log("📍 Navbar modules not found, forcing creation...");
                initNavbar();
            }
        }, 1000);
    });
}

console.log("✅ Horizontal Navbar Script Loaded");
