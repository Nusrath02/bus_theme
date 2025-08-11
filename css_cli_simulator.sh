#\!/bin/bash

# CSS CLI Simulator - Equivalent functionality
# Usage: ./css_cli_simulator.sh <command> <options>

CSS_FILE="business_theme_v14/public/css/business_theme_v14.css"

check_change() {
    local target="$1"
    echo "=== CHECKING CHANGES FOR: $target ==="
    
    case $target in
        "sidebar background-color")
            echo "Searching for sidebar background-color rules..."
            if grep -q "\.sidebar.*background-color.*transparent" "$CSS_FILE"; then
                echo "✅ VERIFIED: Sidebar background-color set to transparent"
                return 0
            elif grep -q "\.sidebar.*background.*transparent" "$CSS_FILE"; then
                echo "✅ VERIFIED: Sidebar background set to transparent"
                return 0
            else
                echo "❌ NOT FOUND: Sidebar background-color not set to transparent"
                return 1
            fi
            ;;
        *)
            echo "Unknown target: $target"
            return 1
            ;;
    esac
}

force_change() {
    local target="$1"
    local property="$2"
    local action="$3"
    
    echo "=== FORCING CHANGE FOR: $target ==="
    
    case $target in
        "sidebar")
            if [[ "$action" == "remove" && "$property" == "background-color" ]]; then
                echo "Forcing removal of background-color from sidebar..."
                
                # Add override CSS with maximum specificity
                cat >> "$CSS_FILE" << 'FORCE_EOF'

/* FORCED OVERRIDE - Maximum specificity for sidebar */
.layout-side-section.layout-side-section .sidebar,
.layout-side-section.layout-side-section .sidebar-label,
.layout-side-section.layout-side-section .sidebar-item,
.desk-sidebar.desk-sidebar {
    background-color: transparent \!important;
    background: transparent \!important;
    background-image: none \!important;
}
FORCE_EOF
                echo "✅ FORCED: Added maximum specificity override"
                return 0
            fi
            ;;
    esac
    
    echo "❌ Unknown force change parameters"
    return 1
}

verify_change() {
    local selector="$1"
    local property="$2"
    local expected_value="$3"
    
    echo "=== VERIFYING: $selector { $property: $expected_value } ==="
    
    # Count occurrences
    local count=$(grep -c "$selector.*$property.*$expected_value" "$CSS_FILE")
    echo "Found $count matching rules"
    
    if [[ $count -gt 0 ]]; then
        echo "✅ VERIFICATION PASSED"
        grep -n "$selector.*$property.*$expected_value" "$CSS_FILE"
        return 0
    else
        echo "❌ VERIFICATION FAILED"
        return 1
    fi
}

# Main command dispatcher
case "$1" in
    "check-change")
        check_change "$2"
        ;;
    "force-change")
        force_change "$2" "$3" "$4"
        ;;
    "verify")
        verify_change "$2" "$3" "$4"
        ;;
    "modify-css")
        echo "=== CSS MODIFICATION TOOL ==="
        selector="$2"
        property="$3"
        value="$4"
        force_flag="$5"
        verify_flag="$6"
        
        echo "Selector: $selector"
        echo "Property: $property" 
        echo "Value: $value"
        
        if [[ "$force_flag" == "--force" ]]; then
            force_change "$selector" "$property" "remove"
        fi
        
        if [[ "$verify_flag" == "--verify" ]]; then
            verify_change "$selector" "$property" "$value"
        fi
        ;;
    *)
        echo "Usage: $0 {check-change|force-change|verify|modify-css} [options]"
        echo ""
        echo "Examples:"
        echo "  $0 check-change 'sidebar background-color'"
        echo "  $0 force-change 'sidebar' 'background-color' 'remove'"
        echo "  $0 verify '.sidebar' 'background-color' 'transparent'"
        echo "  $0 modify-css '.sidebar' 'background-color' 'transparent' --force --verify"
        ;;
esac
EOF < /dev/null

remove_styles() {
    local target="$1"
    local properties="$2"
    local force_flag="$3"
    
    echo "=== REMOVING STYLES FROM: $target ==="
    echo "Properties to remove: $properties"
    
    if [[ "$target" == "sidebar" ]]; then
        echo "Removing blue background and overlays from sidebar..."
        
        # Convert comma-separated properties to array
        IFS=',' read -ra PROPS <<< "$properties"
        
        # Build CSS override
        cat >> "$CSS_FILE" << 'REMOVE_EOF'

/* REMOVE STYLES - Blue background and overlay removal */
.sidebar,
.layout-side-section,
.desk-sidebar,
.sidebar-section,
.sidebar-menu,
.sidebar-label,
.sidebar-item,
.list-link {
    background-color: transparent \!important;
    background: transparent \!important;
    background-image: none \!important;
    box-shadow: none \!important;
    backdrop-filter: none \!important;
    -webkit-backdrop-filter: none \!important;
    border: none \!important;
    background-blend-mode: normal \!important;
}

/* Remove all sidebar state backgrounds */
.sidebar:hover,
.layout-side-section:hover,
.sidebar-label:hover,
.sidebar-item:hover,
.sidebar-label:active,
.sidebar-item:active,
.sidebar-label.active,
.sidebar-item.active,
.sidebar-label:focus,
.sidebar-item:focus {
    background-color: transparent \!important;
    background: transparent \!important;
    background-image: none \!important;
    box-shadow: none \!important;
    backdrop-filter: none \!important;
    -webkit-backdrop-filter: none \!important;
}

/* Override any blue gradients */
.layout-side-section {
    background: transparent \!important;
    background-image: none \!important;
    border-right: none \!important;
}
REMOVE_EOF
        
        echo "✅ REMOVED: All blue backgrounds, overlays, and shadows from sidebar"
        return 0
    fi
    
    echo "❌ Unknown target: $target"
    return 1
}

modify_css_advanced() {
    local selector="$1"
    local action="$2"
    local properties="$3"
    local apply_flag="$4"
    
    echo "=== ADVANCED CSS MODIFICATION ==="
    echo "Selector: $selector"
    echo "Action: $action"
    echo "Properties: $properties"
    
    if [[ "$selector" == ".sidebar" && "$action" == "remove" ]]; then
        echo "Applying advanced sidebar modifications..."
        
        # Convert comma-separated properties to array
        IFS=',' read -ra PROPS <<< "$properties"
        
        cat >> "$CSS_FILE" << 'ADVANCED_EOF'

/* ADVANCED CSS MODIFICATION - Comprehensive sidebar cleanup */
/* Remove all backgrounds, overlays, shadows from sidebar and all states */

.sidebar,
.layout-side-section,
.desk-sidebar,
.sidebar-content,
.sidebar-wrapper,
.sidebar-container {
    background-color: transparent \!important;
    background: transparent \!important;
    background-image: none \!important;
    background-gradient: none \!important;
    box-shadow: none \!important;
    text-shadow: none \!important;
    backdrop-filter: none \!important;
    -webkit-backdrop-filter: none \!important;
    filter: none \!important;
    border-right: none \!important;
    border-left: none \!important;
    border-top: none \!important;
    border-bottom: none \!important;
}

/* All sidebar items and labels */
.sidebar-label,
.sidebar-item,
.list-link,
.sidebar-menu-item,
.desk-sidebar .sidebar-item,
.layout-side-section .sidebar-label,
.layout-side-section .sidebar-label a {
    background-color: transparent \!important;
    background: transparent \!important;
    background-image: none \!important;
    box-shadow: none \!important;
    backdrop-filter: none \!important;
    -webkit-backdrop-filter: none \!important;
}

/* All interactive states */
.sidebar:hover,
.sidebar:active,
.sidebar:focus,
.layout-side-section:hover,
.layout-side-section:active,
.layout-side-section:focus,
.sidebar-label:hover,
.sidebar-label:active,
.sidebar-label:focus,
.sidebar-label.active,
.sidebar-item:hover,
.sidebar-item:active,
.sidebar-item:focus,
.sidebar-item.active,
.sidebar-item[aria-current="page"],
.list-link:hover,
.list-link:active,
.list-link:focus,
.list-link.active {
    background-color: transparent \!important;
    background: transparent \!important;
    background-image: none \!important;
    box-shadow: none \!important;
    backdrop-filter: none \!important;
    -webkit-backdrop-filter: none \!important;
}

/* Maximum specificity overrides */
.layout-side-section.layout-side-section.layout-side-section {
    background: transparent \!important;
    background-color: transparent \!important;
    background-image: none \!important;
    box-shadow: none \!important;
}
ADVANCED_EOF
        
        echo "✅ ADVANCED MODIFICATION: Applied comprehensive sidebar cleanup"
        return 0
    fi
    
    echo "❌ Unknown modification parameters"
    return 1
}

EOF < /dev/null

# Update main dispatcher
case "$1" in
    "remove-styles")
        remove_styles "$2" "$3" "$4"
        ;;
    "modify-css-advanced")
        modify_css_advanced "$2" "$3" "$4" "$5"
        ;;
esac
EOF < /dev/null
