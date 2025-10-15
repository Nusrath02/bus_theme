import frappe
import anthropic

@frappe.whitelist(allow_guest=False)
def get_response(message):
    """
    Get AI response from Claude API
    """
    try:
        # Get API key from Frappe Cloud config
        api_key = frappe.conf.get('claude_api_key')
        
        if not api_key:
            frappe.log_error("Claude API key not found in config")
            return {
                "message": "⚠️ API key not configured. Please contact administrator.",
                "error": True
            }
        
        # Initialize Claude client
        client = anthropic.Anthropic(api_key=api_key)
        
        # Call Claude API
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": message
            }],
            system="You are a helpful AI assistant integrated into an ERPNext system. Help users with their questions in a friendly and professional manner."
        )
        
        # Extract response text
        bot_message = response.content[0].text
        
        return {
            "message": bot_message,
            "success": True
        }
        
    except Exception as e:
        frappe.log_error(f"Chatbot Error: {str(e)}", "Chatbot API Error")
        return {
            "message": f"⚠️ Error: {str(e)}",
            "error": True
        }
