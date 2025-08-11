## Troubleshooting

### esbuild Path Validation Errors
- Diagnose esbuild path validation errors using CLI commands:
  ```
  cli diagnose-error --target "esbuild" --error-type "ERR_INVALID_ARG_TYPE" --fix-path-undefined
  
  # More specific variant
  cli fix-build-error --app "business_theme_v14" --error "path argument undefined" --check-esbuild-config
  ```