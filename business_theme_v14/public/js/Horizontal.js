// Frappe HR Horizontal Navigation Creator
// Creates modern navigation cards like the reference image

(function() {
    'use strict';
    
    function initHorizontalNav() {
        // Remove existing navigation if it exists
        const existingNav = document.querySelector('.horizontal-nav-container');
        if (existingNav) {
            existingNav.remove();
        }
        
        // Create horizontal navigation container
        const navContainer = document.createElement('div');
        navContainer.className = 'horizontal-nav-container';
        
        // Define HR menu items based on your sidebar structure
        const hrMenuItems = [
            {
                title: 'Employee Onboarding',
                description: 'Execute Employee Onboarding smoothly by standardizing process flow.',
                icon: '👥',
                href: '/app/hr',
                background: '#3b82f6'
            },
            {
                title: 'Recruitment',
                description: 'Plan and execute the recruitment of candidates till their joining.',
                icon: '🎯',
                href: '/app/recruitment',
                background: '#10b981'
            },
            {
                title: 'Job Postings',
                description: 'Track the job posts to be filled and monitor their progress.',
                icon: '📋',
                href: '/app/job-opening',
                background: '#f59e0b'
            },
            {
                title: 'Employee Lifecycle',
                description: 'Manage employee records, profiles, and career progression.',
                icon: '👤',
                href: '/app/employee',
                background: '#8b5cf6'
            },
            {
                title: 'Performance',
                description: 'Track performance reviews and employee appraisals.',
                icon: '⭐',
                href: '/app/appraisal',
                background: '#ef4444'
            },
            {
                title: 'Attendance',
                description: 'Monitor shift schedules and attendance tracking.',
                icon: '⏰',
                href: '/app/attendance',
                background: '#06b6d4'
            },
            {
                title: 'Leave Management',
                description: 'Handle leave applications, approvals, and balance tracking.',
                icon: '🏖️',
                href: '/app/leave-application',
                background: '#84cc16'
            },
            {
                title: 'Expense Claims',
                description: 'Process employee expense claims and reimbursements.',
                icon: '💰',
                href: '/app/expense-claim',
                background: '#f97316'
            }
        ];
        
        // Create navigation items
        hrMenuItems.forEach(item => {
            const navItem = document.createElement('a');
            navItem.className = 'nav-card-item';
            navItem.href = item.href;
            navItem.title = item.description;
            
            // Create icon/image container
            const imageDiv = document.createElement('div');
            imageDiv.className = 'nav-card-image';
            imageDiv.style.background = item.background;
            imageDiv.textContent = item.icon;
            
            // Create title
            const titleDiv = document.createElement('div');
            titleDiv.className = 'nav-card-title';
            titleDiv.textContent = item.title;
            
            // Create description
            const descDiv = document.createElement('div');
            descDiv.className = 'nav-card-description';
            descDiv.textContent = item.description;
            
            // Append elements
            navItem.appendChild(imageDiv);
            navItem.appendChild(titleDiv);
            navItem.appendChild(descDiv);
            navContainer.appendChild(navItem);
        });
        
        // Insert navigation into page
        document.body.appendChild(navContainer);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHorizontalNav);
    } else {
        initHorizontalNav();
    }
    
    // Re-initialize when navigating between pages
    if (window.frappe) {
        frappe.router.on('change', function() {
            setTimeout(initHorizontalNav, 100);
        });
    }
    
    // Also listen for hash changes
    window.addEventListener('hashchange', function() {
        setTimeout(initHorizontalNav, 100);
    });
    
})();
