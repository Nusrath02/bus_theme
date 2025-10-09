import frappe
import requests
import json
from frappe import _

@frappe.whitelist(allow_guest=True)
def get_response(message):
    """
    Main chatbot endpoint that processes user messages and returns Claude's response
    """
    try:
        # Get API key from Site Config or Custom Field
        api_key = frappe.db.get_single_value("Chatbot Settings", "claude_api_key") or \
                  frappe.conf.get("claude_api_key")
        
        if not api_key:
            return {
                "message": "⚠️ Claude API key not configured. Please contact administrator.",
                "error": True
            }
        
        # Get context from Frappe (optional - fetch relevant data)
        context = get_frappe_context(message)
        
        # Prepare the prompt for Claude
        system_prompt = """You are a helpful assistant for a Frappe/ERPNext system. 
        You can help users with HR, inventory, sales, and general ERP queries.
        Be concise and friendly. If you need specific data, mention it clearly."""
        
        # Call Claude API
        response = call_claude_api(
            api_key=api_key,
            message=message,
            system_prompt=system_prompt,
            context=context
        )
        
        return {
            "message": response,
            "error": False
        }
        
    except Exception as e:
        frappe.log_error(f"Chatbot Error: {str(e)}", "Chatbot API")
        return {
            "message": "Sorry, I encountered an error. Please try again later.",
            "error": True
        }


def call_claude_api(api_key, message, system_prompt, context=None):
    """
    Makes the actual API call to Claude
    """
    url = "https://api.anthropic.com/v1/messages"
    
    headers = {
        "x-api-key": api_key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
    }
    
    # Build the user message with context
    user_message = message
    if context:
        user_message = f"Context from Frappe system:\n{context}\n\nUser question: {message}"
    
    payload = {
        "model": "claude-sonnet-4-5-20250929",
        "max_tokens": 1024,
        "system": system_prompt,
        "messages": [
            {
                "role": "user",
                "content": user_message
            }
        ]
    }
    
    response = requests.post(url, headers=headers, json=payload, timeout=30)
    response.raise_for_status()
    
    result = response.json()
    return result["content"][0]["text"]


def get_frappe_context(message):
    """
    Fetches relevant context from Frappe based on the user's message
    You can customize this to fetch specific data
    """
    context_data = []
    
    # Example: If user asks about employees
    if any(keyword in message.lower() for keyword in ["employee", "staff", "hr", "people"]):
        try:
            employees = frappe.get_all(
                "Employee",
                fields=["name", "employee_name", "department", "designation"],
                limit=5
            )
            if employees:
                context_data.append(f"Recent employees: {json.dumps(employees, indent=2)}")
        except Exception:
            pass
    
    # Example: If user asks about items/products
    if any(keyword in message.lower() for keyword in ["item", "product", "stock", "inventory"]):
        try:
            items = frappe.get_all(
                "Item",
                fields=["item_code", "item_name", "item_group"],
                limit=5
            )
            if items:
                context_data.append(f"Recent items: {json.dumps(items, indent=2)}")
        except Exception:
            pass
    
    # Example: If user asks about customers
    if any(keyword in message.lower() for keyword in ["customer", "client"]):
        try:
            customers = frappe.get_all(
                "Customer",
                fields=["name", "customer_name", "customer_group"],
                limit=5
            )
            if customers:
                context_data.append(f"Recent customers: {json.dumps(customers, indent=2)}")
        except Exception:
            pass
    
    return "\n\n".join(context_data) if context_data else None


@frappe.whitelist()
def save_chat_history(message, response):
    """
    Optional: Save chat history for analytics
    """
    try:
        chat_log = frappe.get_doc({
            "doctype": "Chatbot Log",
            "user": frappe.session.user,
            "message": message,
            "response": response,
            "timestamp": frappe.utils.now()
        })
        chat_log.insert(ignore_permissions=True)
        frappe.db.commit()
    except Exception as e:
        frappe.log_error(f"Failed to save chat history: {str(e)}")
