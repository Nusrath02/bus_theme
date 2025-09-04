// // Frappe HR Horizontal Navigation Creator
// // Creates modern navigation cards like the reference image

// (function() {
//     'use strict';
    
//     function initHorizontalNav() {
//         // Remove existing navigation if it exists
//         const existingNav = document.querySelector('.horizontal-nav-container');
//         if (existingNav) {
//             existingNav.remove();
//         }
        
//         // Hide original Frappe onboarding content - comprehensive targeting
//         const onboardingElements = document.querySelectorAll(
//             '.onboarding-step, .onboarding-widget-box, .setup-wizard-slide, ' +
//             '.onboarding-step.pending, .onboarding-step.pending.active, .module-onboarding, .onboarding-steps-wrapper, ' +
//             '.onboarding-step-preview, .widget.onboarding-widget-box, ' +
//             'div[data-doctype="Module Onboarding"], div[onboarding_name="Human Resource"], ' +
//             'div[onboarding_name], .ce-block[onboarding_name], .widget[data-widget-name*="onboarding"]'
//         );
//         onboardingElements.forEach(el => {
//             el.style.display = 'none';
//             el.style.visibility = 'hidden';
//         });
        
//         // Create horizontal navigation container
//         const navContainer = document.createElement('div');
//         navContainer.className = 'horizontal-nav-container';
        
//         // Define HR menu items based on your actual sidebar structure
//         const hrMenuItems = [
//             {
//                 title: 'HR',
//                 description: 'Human Resource management dashboard and overview.',
//                 icon: '👥',
//                 href: '/app/hr',
//                 background: '#3b82f6'
//             },
//             {
//                 title: 'Recruitment',
//                 description: 'Plan and execute the recruitment of candidates till their joining.',
//                 icon: '🎯',
//                 href: '/app/recruitment',
//                 background: '#10b981'
//             },
//             {
//                 title: 'Employee Lifecycle',
//                 description: 'Manage employee records, profiles, and career progression.',
//                 icon: '👤',
//                 href: '/app/employee-lifecycle',
//                 background: '#8b5cf6'
//             },
//             {
//                 title: 'Performance',
//                 description: 'Track performance reviews and employee appraisals.',
//                 icon: '⭐',
//                 href: '/app/performance',
//                 background: '#ef4444'
//             },
//             {
//                 title: 'Shift & Attendance',
//                 description: 'Monitor shift schedules and attendance tracking.',
//                 icon: '⏰',
//                 href: '/app/shift-%26-attendance',
//                 background: '#06b6d4'
//             },
//             {
//                 title: 'Expense Claims',
//                 description: 'Process employee expense claims and reimbursements.',
//                 icon: '💰',
//                 href: '/app/expense-claims',
//                 background: '#f97316'
//             },
//             {
//                 title: 'Leaves',
//                 description: 'Handle leave applications, approvals, and balance tracking.',
//                 icon: '🏖️',
//                 href: '/app/leaves',
//                 background: '#84cc16'
//             }
//         ];
        
//         // Create navigation items
//         hrMenuItems.forEach(item => {
//             const navItem = document.createElement('a');
//             navItem.className = 'nav-card-item';
//             navItem.href = item.href;
//             navItem.title = item.description;
            
//             // Create icon/image container
//             const imageDiv = document.createElement('div');
//             imageDiv.className = 'nav-card-image';
//             imageDiv.style.background = item.background;
//             imageDiv.textContent = item.icon;
            
//             // Create title
//             const titleDiv = document.createElement('div');
//             titleDiv.className = 'nav-card-title';
//             titleDiv.textContent = item.title;
            
//             // Create description
//             const descDiv = document.createElement('div');
//             descDiv.className = 'nav-card-description';
//             descDiv.textContent = item.description;
            
//             // Append elements
//             navItem.appendChild(imageDiv);
//             navItem.appendChild(titleDiv);
//             navItem.appendChild(descDiv);
//             navContainer.appendChild(navItem);
//         });
        
//         // Insert navigation into page using better positioning
//         insertNavigation(navContainer);
//     }
    
//     // Initialize when DOM is ready
//     if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', initHorizontalNav);
//     } else {
//         initHorizontalNav();
//     }
    
//     // Re-initialize when navigating between pages
//     if (window.frappe) {
//         frappe.router.on('change', function() {
//             setTimeout(initHorizontalNav, 100);
//         });
//     }
    
//     // Also listen for hash changes
//     window.addEventListener('hashchange', function() {
//         setTimeout(initHorizontalNav, 100);
//     });
    
//     function insertNavigation(navContainer) {
//         // Target the main content area directly from your HTML structure
//         const layoutMainSection = document.querySelector('.layout-main-section');
//         const deskPageContent = document.querySelector('.desk-page.page-main-content');
//         const pageMainContent = document.querySelector('.page-main-content');
        
//         if (layoutMainSection) {
//             // Insert at the very beginning of layout-main-section
//             layoutMainSection.insertBefore(navContainer, layoutMainSection.firstChild);
//         } else if (deskPageContent) {
//             // Insert at the beginning of desk-page content
//             deskPageContent.insertBefore(navContainer, deskPageContent.firstChild);
//         } else if (pageMainContent) {
//             // Insert at the beginning of page-main-content
//             pageMainContent.insertBefore(navContainer, pageMainContent.firstChild);
//         } else {
//             // Fallback: try other selectors
//             const pageHead = document.querySelector('.page-head');
//             const pageContainer = document.querySelector('.page-container');
//             const mainSection = document.querySelector('.main-section');
            
//             if (pageHead) {
//                 pageHead.parentNode.insertBefore(navContainer, pageHead.nextSibling);
//             } else if (pageContainer) {
//                 pageContainer.insertBefore(navContainer, pageContainer.firstChild);
//             } else if (mainSection) {
//                 mainSection.insertBefore(navContainer, mainSection.firstChild);
//             } else {
//                 document.body.appendChild(navContainer);
//             }
//         }
//     }
    
// })();


<script>
document.addEventListener("DOMContentLoaded", function() {
  const sidebar = document.querySelector(".list-sidebar.overlay-sidebar");
  if (sidebar) {
    sidebar.addEventListener("wheel", function(e) {
      e.preventDefault();
      // Adjust scroll speed (lower = smoother & slower)
      sidebar.scrollBy({
        top: e.deltaY * 0.3,  // 0.3 makes it smoother, adjust between 0.2–0.5
        behavior: "smooth"
      });
    }, { passive: false });
  }
});
</script>
