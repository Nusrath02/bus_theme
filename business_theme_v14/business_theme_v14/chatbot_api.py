import frappe

@frappe.whitelist(allow_guest=True)
def get_response(message):
    # Your chatbot logic here
    # Connect to Claude API or process the message
    return {"message": f"You said: {message}"}
