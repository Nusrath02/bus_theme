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
