/**
 * Enhanced Glassmorphism Theme JavaScript
 * Modern HR Dashboard Interactive Features
 * Add this as: /assets/business_theme_v14/enhanced_glass.js
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Enhanced Glassmorphism Theme Loading...');
    
    // Initialize all enhanced features
    initializeGlassTheme();
    initializeNavbarEnhancements();
    initializeSearchEnhancements();
    initializeCardAnimations();
    initializeFormEnhancements();
    initializeResponsiveFeatures();
    initializeAccessibility();
    
    console.log('✨ Enhanced Glassmorphism Theme Loaded Successfully!');
});

/**
 * Initialize Glass Theme Core Features
 */
function initializeGlassTheme() {
    // Add glass theme class to body
    document.body.classList.add('glass-theme-active');
    
    // Create floating particles background
    createFloatingParticles();
    
    // Initialize theme variables
    setGlassThemeVariables();
    
    // Add smooth loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);
}

/**
 * Create Animated Background Particles
 */
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    // Create multiple particles
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: float-particle ${6 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        // Random size and position
        const size = 60 + Math.random() * 80;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
    
    // Add CSS animation
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes float-particle {
                0%, 100% { 
                    transform: translateY(0px) rotate(0deg); 
                    opacity: 0.3;
                }
                50% { 
                    transform: translateY(-30px) rotate(180deg); 
                    opacity: 0.6;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Enhanced Navbar Features
 */
function initializeNavbarEnhancements() {
    const navbar = document.querySelector('.navbar, .sticky-top, .desk-nav');
    if (!navbar) return;
    
    // Enhanced ITCHAMPS Logo
    enhanceNavbarBrand();
    
    // Add glassmorphism search
    enhanceNavbarSearch();
    
    // Add user menu enhancements
    enhanceUserMenu();
    
    // Navbar scroll effects
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add blur effect based on scroll
        const blur = Math.min(currentScrollY / 10, 40);
        navbar.style.backdropFilter = `blur(${20 + blur}px)`;
        
        lastScrollY = currentScrollY;
    });
}

/**
 * Enhance Navbar Brand with ITCHAMPS Logo
 */
function enhanceNavbarBrand() {
    const navbarBrand = document.querySelector('.navbar-brand');
    if (!navbarBrand) return;
    
    // Clean existing content
    navbarBrand.innerHTML = '';
    
    // Remove any existing background images
    navbarBrand.style.backgroundImage = 'none';
    
    // Create enhanced logo structure
    const logoContainer = document.createElement('div');
    logoContainer.style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    `;
    
    // Create logo icon
    const logoIcon = document.createElement('div');
    logoIcon.style.cssText = `
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        color: white;
        font-size: 1.2rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
    `;
    logoIcon.textContent = 'IT';
    
    // Create logo text
    const logoText = document.createElement('div');
    logoText.style.cssText = `
        display: flex;
        flex-direction: column;
        color: white;
    `;
    
    const logoTitle = document.createElement('h1');
    logoTitle.style.cssText = `
        font-size: 1.8rem;
        font-weight: 700;
        color: white;
        margin: 0;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        letter-spacing: -0.5px;
    `;
    logoTitle.textContent = 'ITCHAMPS';
    
    const logoSubtitle = document.createElement('p');
    logoSubtitle.style.cssText = `
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.9);
        margin: 0;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
    `;
    logoSubtitle.textContent = 'Human Resources Management';
    
    logoText.appendChild(logoTitle);
    logoText.appendChild(logoSubtitle);
    logoContainer.appendChild(logoIcon);
    logoContainer.appendChild(logoText);
    navbarBrand.appendChild(logoContainer);
    
    // Add hover effects
    logoContainer.addEventListener('mouseenter', () => {
        logoContainer.style.background = 'rgba(255, 255, 255, 0.15)';
        logoContainer.style.transform = 'scale(1.05) translateY(-2px)';
        logoContainer.style.boxShadow = '0 0 20px rgba(30, 144, 255, 0.3)';
        logoContainer.style.borderColor = 'rgba(255, 255, 255, 0.25)';
    });
    
    logoContainer.addEventListener('mouseleave', () => {
        logoContainer.style.background = 'rgba(255, 255, 255, 0.05)';
        logoContainer.style.transform = 'scale(1) translateY(0)';
        logoContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        logoContainer.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    });
}

/**
 * Enhanced Search Bar
 */
function enhanceNavbarSearch() {
    const searchInputs = document.querySelectorAll('#navbar-search, .search-bar input, .form-control.search-input');
    
    searchInputs.forEach(searchInput => {
        if (!searchInput) return;
        
        // Create search container if it doesn't exist
        let searchContainer = searchInput.parentElement;
        if (!searchContainer.classList.contains('enhanced-search-container')) {
            searchContainer = document.createElement('div');
            searchContainer.className = 'enhanced-search-container';
            searchInput.parentNode.insertBefore(searchContainer, searchInput);
            searchContainer.appendChild(searchInput);
        }
        
        // Style the search container
        searchContainer.style.cssText = `
            position: relative;
            margin: 0 2rem;
        `;
        
        // Style the search input
        searchInput.style.cssText = `
            background: rgba(255, 255, 255, 0.08) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
            border-radius: 50px !important;
            padding: 0.75rem 2rem 0.75rem 3rem !important;
            color: white !important;
            font-size: 0.9rem !important;
            font-weight: 400 !important;
            width: 350px !important;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
        `;
        
        // Create search icon
        const searchIcon = document.createElement('div');
        searchIcon.innerHTML = '🔍';
        searchIcon.style.cssText = `
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.7);
            pointer-events: none;
            z-index: 1;
        `;
        searchContainer.appendChild(searchIcon);
        
        // Add focus effects
        searchInput.addEventListener('focus', () => {
            searchInput.style.background = 'rgba(255, 255, 255, 0.15) !important';
            searchInput.style.backdropFilter = 'blur(40px) !important';
            searchInput.style.borderColor = '#4facfe !important';
            searchInput.style.boxShadow = '0 0 0 3px rgba(79, 172, 254, 0.3), 0 0 20px rgba(30, 144, 255, 0.3) !important';
            searchInput.style.transform = 'scale(1.02) !important';
            searchInput.style.width = '400px !important';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.style.background = 'rgba(255, 255, 255, 0.08) !important';
            searchInput.style.backdropFilter = 'blur(20px) !important';
            searchInput.style.borderColor = 'rgba(255, 255, 255, 0.15) !important';
            searchInput.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1) !important';
            searchInput.style.transform = 'scale(1) !important';
            searchInput.style.width = '350px !important';
        });
        
        // Placeholder styling
        searchInput.placeholder = 'Search employees, documents, reports...';
        searchInput.style.setProperty('color', 'rgba(255, 255, 255, 0.7)', 'important');
    });
}

/**
 * Enhanced User Menu
 */
function enhanceUserMenu() {
    const userMenus = document.querySelectorAll('.navbar-user, .user-menu, .dropdown-toggle');
    
    userMenus.forEach(userMenu => {
        if (!userMenu) return;
        
        userMenu.style.cssText = `
            background: rgba(255, 255, 255, 0.08) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
            border-radius: 50px !important;
            padding: 0.5rem 1rem !important;
            color: white !important;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
            display: flex !important;
            align-items: center !important;
            gap: 0.5rem !important;
            margin-left: auto !important;
            cursor: pointer !important;
        `;
        
        // Add hover effects
        userMenu.addEventListener('mouseenter', () => {
            userMenu.style.background = 'rgba(255, 255, 255, 0.15) !important';
            userMenu.style.transform = 'scale(1.05) !important';
            userMenu.style.boxShadow = '0 0 20px rgba(30, 144, 255, 0.3) !important';
            userMenu.style.borderColor = 'rgba(255, 255, 255, 0.25) !important';
        });
        
        userMenu.addEventListener('mouseleave', () => {
            userMenu.style.background = 'rgba(255, 255, 255, 0.08) !important';
            userMenu.style.transform = 'scale(1) !important';
            userMenu.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1) !important';
            userMenu.style.borderColor = 'rgba(255, 255, 255, 0.15) !important';
        });
    });
}

/**
 * Enhanced Search Features
 */
function initializeSearchEnhancements() {
    // Add search dropdown enhancements
    const searchDropdowns = document.querySelectorAll('.dropdown-menu, .search-results');
    
    searchDropdowns.forEach(dropdown => {
        if (!dropdown) return;
        
        dropdown.style.cssText = `
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 12px !important;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
            padding: 0.5rem !important;
            margin-top: 0.5rem !important;
        `;
        
        // Style dropdown items
        const dropdownItems = dropdown.querySelectorAll('.dropdown-item, .search-result');
        dropdownItems.forEach(item => {
            item.style.cssText = `
                padding: 0.75rem 1rem !important;
                border-radius: 8px !important;
                margin: 0.125rem 0 !important;
                transition: all 0.2s ease !important;
                color: #2c3e50 !important;
                font-weight: 500 !important;
            `;
            
            item.addEventListener('mouseenter', () => {
                item.style.background = 'rgba(79, 172, 254, 0.1) !important';
                item.style.color = '#4facfe !important';
                item.style.transform = 'translateX(4px) !important';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent !important';
                item.style.color = '#2c3e50 !important';
                item.style.transform = 'translateX(0) !important';
            });
        });
    });
}

/**
 * Card Animation Enhancements
 */
function initializeCardAnimations() {
    // Create stats cards dynamically
    createStatsCards();
    
    // Enhance existing cards
    const cards = document.querySelectorAll('.widget, .card, .list-row');
    
    cards.forEach((card, index) => {
        // Add glass styling
        card.style.cssText = `
            background: rgba(255, 255, 255, 0.08) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
            border-radius: 16px !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
            margin-bottom: 1.5rem !important;
            padding: 1.5rem !important;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            position: relative !important;
            overflow: hidden !important;
            animation: slideInUp 0.6s ease forwards !important;
            animation-delay: ${index * 0.1}s !important;
            opacity: 0 !important;
            transform: translateY(30px) !important;
        `;
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.background = 'rgba(255, 255, 255, 0.15) !important';
            card.style.transform = 'translateY(-8px) scale(1.02) !important';
            card.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15) !important';
            card.style.borderColor = 'rgba(255, 255, 255, 0.25) !important';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = 'rgba(255, 255, 255, 0.08) !important';
            card.style.transform = 'translateY(0) scale(1) !important';
            card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1) !important';
            card.style.borderColor = 'rgba(255, 255, 255, 0.15) !important';
        });
    });
    
    // Add slide in animation
    if (!document.getElementById('card-animations')) {
        const style = document.createElement('style');
        style.id = 'card-animations';
        style.textContent = `
            @keyframes slideInUp {
                from {
                    transform: translateY(30px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Create Stats Cards for Dashboard
 */
function createStatsCards() {
    // Check if we're on a dashboard page
    const mainSection = document.querySelector('.layout-main-section');
    if (!mainSection) return;
    
    // Create stats container
    const statsContainer = document.createElement('div');
    statsContainer.className = 'stats-container';
    statsContainer.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    `;
    
    // Sample stats data (customize based on your needs)
    const statsData = [
        { number: '248', label: 'Total Employees', change: '+12 this month', positive: true },
        { number: '96.2%', label: 'Attendance Rate', change: '+2.1% vs last month', positive: true },
        { number: '12', label: 'New Hires', change: '+3 this week', positive: true },
        { number: '3', label: 'Pending Reviews', change: '-2 from last week', positive: true }
    ];
    
    statsData.forEach((stat, index) => {
        const statCard = document.createElement('div');
        statCard.className = 'stat-card';
        statCard.style.cssText = `
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            padding: 1.5rem;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
            animation: slideInUp 0.6s ease forwards;
            animation-delay: ${index * 0.1 + 0.2}s;
            opacity: 0;
            transform: translateY(30px);
            cursor: pointer;
        `;
        
        statCard.innerHTML = `
            <div class="stat-number" style="
                font-size: 2.5rem;
                font-weight: 800;
                color: white;
                text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                margin-bottom: 0.5rem;
            ">${stat.number}</div>
            <div class="stat-label" style="
                color: rgba(255, 255, 255, 0.9);
                font-size: 0.9rem;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 0.5rem;
            ">${stat.label}</div>
            <div class="stat-change ${stat.positive ? 'positive' : 'negative'}" style="
                font-size: 0.8rem;
                padding: 0.25rem 0.75rem;
                border-radius: 50px;
                font-weight: 600;
                background: ${stat.positive ? 'rgba(76, 217, 100, 0.2)' : 'rgba(255, 59, 48, 0.2)'};
                color: ${stat.positive ? '#4cd964' : '#ff3b30'};
                border: 1px solid ${stat.positive ? 'rgba(76, 217, 100, 0.4)' : 'rgba(255, 59, 48, 0.4)'};
                display: inline-block;
            ">${stat.change}</div>
        `;
        
        // Add hover effects
        statCard.addEventListener('mouseenter', () => {
            statCard.style.transform = 'translateY(-5px) scale(1.05)';
            statCard.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            statCard.style.background = 'rgba(255, 255, 255, 0.15)';
        });
        
        statCard.addEventListener('mouseleave', () => {
            statCard.style.transform = 'translateY(0) scale(1)';
            statCard.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            statCard.style.background = 'rgba(255, 255, 255, 0.08)';
        });
        
        statsContainer.appendChild(statCard);
    });
    
    // Insert stats at the beginning of main section
    mainSection.insertBefore(statsContainer, mainSection.firstChild);
}

/**
 * Form Enhancements
 */
function initializeFormEnhancements() {
    // Enhance form controls
    const formControls = document.querySelectorAll('.form-control, input, textarea, select');
    
    formControls.forEach(control => {
        control.style.cssText = `
            background: rgba(255, 255, 255, 0.05) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
            border-radius: 8px !important;
            color: white !important;
            padding: 0.75rem 1rem !important;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        `;
        
        // Placeholder styling
        const originalPlaceholder = control.placeholder;
        control.style.setProperty('--placeholder-color', 'rgba(255, 255, 255, 0.6)');
        
        control.addEventListener('focus', () => {
            control.style.background = 'rgba(255, 255, 255, 0.1) !important';
            control.style.borderColor = '#4facfe !important';
            control.style.boxShadow = '0 0 0 3px rgba(79, 172, 254, 0.2) !important';
            control.style.transform = 'scale(1.02) !important';
        });
        
        control.addEventListener('blur', () => {
            control.style.background = 'rgba(255, 255, 255, 0.05) !important';
            control.style.borderColor = 'rgba(255, 255, 255, 0.15) !important';
            control.style.boxShadow = 'none !important';
            control.style.transform = 'scale(1) !important';
        });
    });
    
    // Enhance form labels
    const formLabels = document.querySelectorAll('.form-label, label');
    formLabels.forEach(label => {
        label.style.cssText = `
            color: white !important;
            font-weight: 500 !important;
            margin-bottom: 0.5rem !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
        `;
    });
    
    // Enhance buttons
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(btn => {
        if (btn.classList.contains('btn-primary')) {
            btn.style.cssText = `
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
                border: none !important;
                border-radius: 8px !important;
                color: white !important;
                font-weight: 600 !important;
                padding: 0.75rem 1.5rem !important;
                transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
                box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4) !important;
                cursor: pointer !important;
            `;
            
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px) scale(1.05) !important';
                btn.style.boxShadow = '0 8px 25px rgba(79, 172, 254, 0.6) !important';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1) !important';
                btn.style.boxShadow = '0 4px 15px rgba(79, 172, 254, 0.4) !important';
            });
        } else {
            btn.style.cssText = `
                background: rgba(255, 255, 255, 0.08) !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                border: 1px solid rgba(255, 255, 255, 0.15) !important;
                border-radius: 8px !important;
                color: white !important;
                font-weight: 600 !important;
                padding: 0.75rem 1.5rem !important;
                transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
                cursor: pointer !important;
            `;
            
            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'rgba(255, 255, 255, 0.15) !important';
                btn.style.transform = 'translateY(-2px) scale(1.05) !important';
                btn.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1) !important';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'rgba(255, 255, 255, 0.08) !important';
                btn.style.transform = 'translateY(0) scale(1) !important';
                btn.style.boxShadow = 'none !important';
            });
        }
    });
}

/**
 * Responsive Features
 */
function initializeResponsiveFeatures() {
    let isMobile = window.innerWidth <= 768;
    
    function handleResize() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        
        if (wasMobile !== isMobile) {
            // Recreate mobile/desktop specific features
            if (isMobile) {
                enableMobileFeatures();
            } else {
                enableDesktopFeatures();
            }
        }
    }
    
    function enableMobileFeatures() {
        // Mobile-specific search bar adjustments
        const searchInputs = document.querySelectorAll('#navbar-search, .search-bar input');
        searchInputs.forEach(input => {
            input.style.width = '250px !important';
            input.addEventListener('focus', () => {
                input.style.width = '300px !important';
            });
            input.addEventListener('blur', () => {
                input.style.width = '250px !important';
            });
        });
        
        // Mobile navbar adjustments
        const navbar = document.querySelector('.navbar-expand');
        if (navbar) {
            navbar.style.padding = '0 1rem !important';
        }
        
        // Mobile sidebar toggle
        createMobileSidebarToggle();
    }
    
    function enableDesktopFeatures() {
        // Desktop-specific adjustments
        const searchInputs = document.querySelectorAll('#navbar-search, .search-bar input');
        searchInputs.forEach(input => {
            input.style.width = '350px !important';
            input.addEventListener('focus', () => {
                input.style.width = '400px !important';
            });
            input.addEventListener('blur', () => {
                input.style.width = '350px !important';
            });
        });
    }
    
    function createMobileSidebarToggle() {
        if (document.querySelector('.mobile-sidebar-toggle')) return;
        
        const toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-sidebar-toggle';
        toggleButton.innerHTML = '☰';
        toggleButton.style.cssText = `
            display: ${isMobile ? 'block' : 'none'};
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 9999;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: white;
            font-size: 1.5rem;
            padding: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        toggleButton.addEventListener('click', () => {
            const sidebar = document.querySelector('.layout-side-section');
            if (sidebar) {
                const isVisible = sidebar.style.transform === 'translateX(0px)' || !sidebar.style.transform;
                sidebar.style.transform = isVisible ? 'translateX(-100%)' : 'translateX(0px)';
                sidebar.style.transition = 'transform 0.3s ease';
            }
        });
        
        document.body.appendChild(toggleButton);
    }
    
    // Initial setup
    if (isMobile) {
        enableMobileFeatures();
    } else {
        enableDesktopFeatures();
    }
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
}

/**
 * Accessibility Features
 */
function initializeAccessibility() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #4facfe';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
    
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #4facfe;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id if it doesn't exist
    const mainSection = document.querySelector('.layout-main-section');
    if (mainSection && !mainSection.id) {
        mainSection.id = 'main-content';
    }
    
    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Theme Variable Setter
 */
function setGlassThemeVariables() {
    const root = document.documentElement;
    
    // Set CSS custom properties dynamically
    root.style.setProperty('--glass-primary', 'rgba(255, 255, 255, 0.08)');
    root.style.setProperty('--glass-secondary', 'rgba(255, 255, 255, 0.05)');
    root.style.setProperty('--glass-hover', 'rgba(255, 255, 255, 0.15)');
    root.style.setProperty('--glass-active', 'rgba(255, 255, 255, 0.2)');
    root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.15)');
    root.style.setProperty('--glass-border-strong', 'rgba(255, 255, 255, 0.25)');
    
    root.style.setProperty('--blur-ultra', 'blur(40px)');
    root.style.setProperty('--blur-heavy', 'blur(30px)');
    root.style.setProperty('--blur-medium', 'blur(20px)');
    root.style.setProperty('--blur-light', 'blur(15px)');
    root.style.setProperty('--blur-subtle', 'blur(10px)');
    
    root.style.setProperty('--itchamps-primary', '#1e90ff');
    root.style.setProperty('--itchamps-secondary', '#87ceeb');
    root.style.setProperty('--itchamps-accent', '#4facfe');
    
    root.style.setProperty('--transition-smooth', 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)');
    root.style.setProperty('--transition-bounce', 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)');
}

/**
 * Enhanced Table Styling
 */
function enhanceTables() {
    const tables = document.querySelectorAll('.table, table');
    
    tables.forEach(table => {
        // Style table container
        const tableContainer = table.closest('.table-responsive') || table.parentElement;
        tableContainer.style.cssText = `
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            margin-bottom: 1.5rem;
        `;
        
        // Style table headers
        const headers = table.querySelectorAll('thead th');
        headers.forEach(header => {
            header.style.cssText = `
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
                color: white !important;
                font-weight: 600 !important;
                padding: 1rem !important;
                border: none !important;
                text-transform: uppercase !important;
                letter-spacing: 0.5px !important;
                font-size: 0.9rem !important;
            `;
        });
        
        // Style table rows
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            row.style.cssText = `
                background: rgba(255, 255, 255, 0.02);
                transition: all 0.3s ease;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            `;
            
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                cell.style.cssText = `
                    color: white;
                    padding: 1rem;
                    border: none;
                `;
            });
            
            row.addEventListener('mouseenter', () => {
                row.style.background = 'rgba(255, 255, 255, 0.05)';
                row.style.transform = 'scale(1.01)';
            });
            
            row.addEventListener('mouseleave', () => {
                row.style.background = 'rgba(255, 255, 255, 0.02)';
                row.style.transform = 'scale(1)';
            });
        });
    });
}

/**
 * Initialize Enhanced Modals
 */
function initializeEnhancedModals() {
    // Monitor for new modals
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('modal')) {
                    enhanceModal(node);
                }
            });
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Enhance existing modals
    document.querySelectorAll('.modal').forEach(enhanceModal);
}

/**
 * Enhance Individual Modal
 */
function enhanceModal(modal) {
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.cssText = `
            background: rgba(255, 255, 255, 0.08) !important;
            backdrop-filter: blur(40px) !important;
            -webkit-backdrop-filter: blur(40px) !important;
            border: 1px solid rgba(255, 255, 255, 0.25) !important;
            border-radius: 20px !important;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
            color: white !important;
        `;
    }
    
    const modalHeader = modal.querySelector('.modal-header');
    if (modalHeader) {
        modalHeader.style.cssText = `
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
            border-radius: 20px 20px 0 0 !important;
        `;
    }
    
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
        modalBackdrop.style.cssText = `
            backdrop-filter: blur(30px) !important;
            -webkit-backdrop-filter: blur(30px) !important;
            background: rgba(0, 0, 0, 0.4) !important;
        `;
    }
}

/**
 * Performance Monitoring
 */
function initializePerformanceMonitoring() {
    // Monitor frame rate for smooth animations
    let frameCount = 0;
    let lastTime = performance.now();
    
    function monitorFPS() {
        const currentTime = performance.now();
        frameCount++;
        
        if (currentTime >= lastTime + 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // Reduce effects if FPS is too low
            if (fps < 30) {
                document.body.classList.add('reduced-effects');
                console.warn('🔄 Reduced effects mode enabled due to low FPS:', fps);
            } else if (fps > 50 && document.body.classList.contains('reduced-effects')) {
                document.body.classList.remove('reduced-effects');
                console.log('✅ Full effects mode restored. FPS:', fps);
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(monitorFPS);
    }
    
    requestAnimationFrame(monitorFPS);
    
    // Add reduced effects styles
    const reducedEffectsStyle = document.createElement('style');
    reducedEffectsStyle.textContent = `
        .reduced-effects * {
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            transition-duration: 0.1s !important;
            animation-duration: 0.1s !important;
        }
    `;
    document.head.appendChild(reducedEffectsStyle);
}

/**
 * Initialize All Enhanced Features on Load
 */
function initializeAllEnhancements() {
    // Stagger initialization for better performance
    setTimeout(enhanceTables, 100);
    setTimeout(initializeEnhancedModals, 200);
    setTimeout(initializePerformanceMonitoring, 300);
    
    console.log('🎉 All Enhanced Glassmorphism Features Initialized!');
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllEnhancements);
} else {
    initializeAllEnhancements();
}
