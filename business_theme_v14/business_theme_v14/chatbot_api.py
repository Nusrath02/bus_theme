import frappe
import anthropic
import json
from frappe import _

@frappe.whitelist(allow_guest=False)
def get_response(message):
    """
    Get AI response from Claude API
    """
    try:
        # Get Claude API key from Site Config or Custom Settings
        api_key = claude_api_key()
        
        if not api_key:
            return {
                "message": "⚠️ Claude API key not configured. Please contact administrator.",
                "error": True
            }
        
        # Initialize Claude client
        client = anthropic.Anthropic(api_key=api_key)
        
        # Get conversation history (optional - for context)
        conversation_history = get_conversation_history()
        
        # Build messages for Claude
        messages = []
        
        # Add previous messages if any
        if conversation_history:
            for msg in conversation_history[-5:]:  # Last 5 messages for context
                messages.append({
                    "role": msg.get("role", "user"),
                    "content": msg.get("content", "")
                })
        
        # Add current message
        messages.append({
            "role": "user",
            "content": message
        })
        
        # Call Claude API
        response = client.messages.create(
            model="claude-sonnet-4-20250514",  # or claude-3-5-sonnet-20241022
            max_tokens=1024,
            messages=messages,
            system="You are a helpful AI assistant integrated into an ERPNext system. Help users with their questions in a friendly and professional manner."
        )
        
        # Extract response text
        bot_message = response.content[0].text
        
        # Save to conversation history
        save_to_history(message, bot_message)
        
        return {
            "message": bot_message,
            "success": True
        }
        
    except anthropic.APIError as e:
        frappe.log_error(f"Claude API Error: {str(e)}", "Chatbot API Error")
        return {
            "message": f"⚠️ API Error: {str(e)}",
            "error": True
        }
    except Exception as e:
        frappe.log_error(f"Chatbot Error: {str(e)}", "Chatbot Error")
        return {
            "message": "⚠️ Something went wrong. Please try again.",
            "error": True
        }


def get_claude_api_key():
    """
    Get Claude API key from various sources
    Priority: Site Config > Custom Settings DocType > Environment Variable
    """
    try:
        # Method 1: From site_config.json
        api_key = frappe.conf.get('claude_api_key')
        if api_key:
            return api_key
        
        # Method 2: From Custom Settings DocType (if you create one)
        # if frappe.db.exists('Singles', 'Chatbot Settings'):
        #     api_key = frappe.db.get_single_value('Chatbot Settings', 'claude_api_key')
        #     if api_key:
        #         return api_key
        
        # Method 3: From environment variable
        import os
        api_key = os.getenv('CLAUDE_API_KEY')
        if api_key:
            return api_key
            
        return None
        
    except Exception as e:
        frappe.log_error(f"Error getting API key: {str(e)}")
        return None


def get_conversation_history():
    """
    Get recent conversation history for current user
    """
    try:
        user = frappe.session.user
        
        # Check if table exists
        if not frappe.db.exists('DocType', 'Chatbot History'):
            return []
        
        history = frappe.get_all(
            'Chatbot History',
            filters={'user': user},
            fields=['user_message', 'bot_response', 'creation'],
            order_by='creation desc',
            limit=10
        )
        
        # Format for Claude API
        messages = []
        for h in reversed(history):  # Reverse to get chronological order
            messages.append({"role": "user", "content": h.user_message})
            messages.append({"role": "assistant", "content": h.bot_response})
        
        return messages
        
    except Exception as e:
        frappe.log_error(f"Error getting history: {str(e)}")
        return []


def save_to_history(user_message, bot_response):
    """
    Save conversation to database (optional)
    """
    try:
        # Only save if DocType exists
        if frappe.db.exists('DocType', 'Chatbot History'):
            doc = frappe.get_doc({
                'doctype': 'Chatbot History',
                'user': frappe.session.user,
                'user_message': user_message,
                'bot_response': bot_response
            })
            doc.insert(ignore_permissions=True)
            frappe.db.commit()
    except Exception as e:
        # Don't fail if history saving fails
        frappe.log_error(f"Error saving history: {str(e)}")
        pass


@frappe.whitelist(allow_guest=False)
def clear_history():
    """
    Clear conversation history for current user
    """
    try:
        user = frappe.session.user
        
        if frappe.db.exists('DocType', 'Chatbot History'):
            frappe.db.delete('Chatbot History', {'user': user})
            frappe.db.commit()
        
        return {"success": True, "message": "History cleared"}
    except Exception as e:
        return {"success": False, "message": str(e)}
