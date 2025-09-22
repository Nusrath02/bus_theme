// Fix for select dropdown not showing selected value in ERPNext
// Add this to your custom JavaScript file or include it in your theme

$(document).ready(function() {
    // Fix for naming series and other select dropdowns
    function fixSelectDropdowns() {
        // Target all select elements with data-fieldname
        $('select[data-fieldname]').each(function() {
            const $select = $(this);
            
            // Force refresh the display value
            $select.on('change', function() {
                const selectedValue = this.value;
                const selectedText = $(this).find('option:selected').text();
                
                console.log('Selected:', selectedValue, selectedText);
                
                // Force the browser to update the display
                this.blur();
                this.focus();
                this.blur();
                
                // Trigger any Frappe events
                if (typeof frappe !== 'undefined') {
                    frappe.ui.form.trigger($(this).attr('data-fieldname'), 'change');
                }
            });
            
            // Fix initial display if there's a selected value
            if ($select.val()) {
                setTimeout(() => {
                    $select.trigger('change');
                }, 100);
            }
        });
        
        // Specific fix for naming series dropdown
        $('select[data-fieldname="naming_series"]').on('change', function() {
            const $this = $(this);
            const selectedValue = $this.val();
            
            // Force the select to show the selected value
            $this.css({
                'color': '#000 !important',
                'background-color': '#fff !important'
            });
            
            // Update any associated display elements
            const $container = $this.closest('.form-group, .field');
            $container.find('.control-value').text(selectedValue);
            
            console.log('Naming series changed to:', selectedValue);
        });
    }
    
    // Run the fix
    fixSelectDropdowns();
    
    // Re-run when new elements are added (for dynamic forms)
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    setTimeout(fixSelectDropdowns, 100);
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Additional fix for Frappe framework
    if (typeof frappe !== 'undefined') {
        // Hook into Frappe's form refresh
        $(document).on('form_refresh', function() {
            setTimeout(fixSelectDropdowns, 200);
        });
        
        // Fix for when fields are rendered
        $(document).on('field_refresh', function() {
            setTimeout(fixSelectDropdowns, 100);
        });
    }
});

// CSS fixes to ensure select dropdowns display properly
const selectFixCSS = `
<style>
/* Ensure select dropdowns show selected values */
select[data-fieldname] {
    color: #374151 !important;
    background-color: #ffffff !important;
    -webkit-appearance: menulist !important;
    -moz-appearance: menulist !important;
    appearance: menulist !important;
}

select[data-fieldname] option {
    color: #374151 !important;
    background-color: #ffffff !important;
}

select[data-fieldname]:focus {
    outline: 2px solid #3b82f6 !important;
    outline-offset: 2px !important;
}

/* Specific fix for naming series */
select[data-fieldname="naming_series"] {
    display: block !important;
    width: 100% !important;
    padding: 8px 12px !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
    border: 1px solid #d1d5db !important;
    border-radius: 6px !important;
    background-color: #ffffff !important;
    color: #374151 !important;
}

/* Fix for any hidden or transparent text */
.input-with-feedback.form-control.ellipsis.bold {
    color: #374151 !important;
    background-color: #ffffff !important;
}

/* Ensure dropdown arrow is visible */
select[data-fieldname] {
    background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23666' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>") !important;
    background-repeat: no-repeat !important;
    background-position: right 8px center !important;
    background-size: 12px !important;
    padding-right: 32px !important;
}
</style>
`;

// Inject the CSS
if (!document.getElementById('select-dropdown-fix-css')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'select-dropdown-fix-css';
    styleElement.innerHTML = selectFixCSS;
    document.head.appendChild(styleElement);
}
