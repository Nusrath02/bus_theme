// Search Dropdown Square Shape Behavior
document.addEventListener('DOMContentLoaded', function() {
    
    // Function to apply square styling to search dropdowns
    function applySquareDropdown() {
        const searchDropdowns = document.querySelectorAll(
            '.search-dropdown, .awesomplete, .dropdown-menu, .search-results'
        );
        
        searchDropdowns.forEach(dropdown => {
            dropdown.style.borderRadius = '8px';
            dropdown.style.WebkitBorderRadius = '8px';
            dropdown.style.MozBorderRadius = '8px';
        });
        
        // Style dropdown items
        const dropdownItems = document.querySelectorAll(
            '.dropdown-item, .awesomplete li, .search-result-item'
        );
        
        dropdownItems.forEach(item => {
            item.style.borderRadius = '4px';
            item.style.margin = '2px 4px';
        });
    }
    
    // Apply styling when search is focused
    const searchInputs = document.querySelectorAll('input[type="search"], .search-field');
    searchInputs.forEach(input => {
        input.addEventListener('focus', applySquareDropdown);
        input.addEventListener('input', applySquareDropdown);
    });
    
    // Observer to catch dynamically created dropdowns
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        if (node.classList && 
                            (node.classList.contains('dropdown-menu') || 
                             node.classList.contains('awesomplete') ||
                             node.classList.contains('search-dropdown'))) {
                            applySquareDropdown();
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Initial application
    setTimeout(applySquareDropdown, 500);
});
EOF < /dev/null
