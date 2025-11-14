import anthropic
import frappe
from frappe.utils import add_days, cint, formatdate, getdate, now_datetime, nowdate

DEFAULT_MODEL = "claude-sonnet-4-20250514"
DEFAULT_MAX_TOKENS = 1024
DEFAULT_SYSTEM_PROMPT = (
    "You are a helpful AI assistant integrated into an ERPNext system. "
    "Help users with their questions in a friendly and professional manner."
)


@frappe.whitelist(allow_guest=False)
def get_response(message):
    """
    Get AI response, prioritizing mandated rule-based tasks.
    """
    message = (message or "").strip()
    if not message:
        return {
            "message": "⚠️ Please enter a question before sending.",
            "error": True
        }

    user = frappe.session.user

    try:
        rule_response, intent = handle_rule_based_queries(message)
        if rule_response:
            log_chatbot_interaction(user, message, rule_response, intent or "rule-based")
            return {
                "message": rule_response,
                "success": True,
                "source": "rule-based"
            }

        bot_message = call_claude(message)
        log_chatbot_interaction(user, message, bot_message, "llm")
        return {
            "message": bot_message,
            "success": True,
            "source": "llm"
        }
    except Exception as e:
        error_message = f"⚠️ Error: {str(e)}"
        frappe.log_error(f"Chatbot Error: {str(e)}", "Chatbot API Error")
        log_chatbot_interaction(user, message, error_message, "error")
        return {
            "message": error_message,
            "error": True
        }


def call_claude(message):
    settings = get_chatbot_settings()
    api_key = (getattr(settings, "claude_api_key", None) or
               frappe.conf.get('claude_api_key'))

    if not api_key:
        raise ValueError("API key not configured. Please contact the administrator.")

    model = getattr(settings, "model_name", None) or DEFAULT_MODEL
    max_tokens = cint(getattr(settings, "max_tokens", 0)) or DEFAULT_MAX_TOKENS
    system_prompt = getattr(settings, "system_prompt", None) or DEFAULT_SYSTEM_PROMPT

    client = anthropic.Anthropic(api_key=api_key)
    response = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=[{
            "role": "user",
            "content": message
        }],
        system=system_prompt
    )

    return response.content[0].text.strip()


def handle_rule_based_queries(message):
    normalized = (message or "").lower()
    if not normalized:
        return None, None

    employee_doc = None

    if "pending leave" in normalized and "application" in normalized:
        employee_doc = employee_doc or get_employee_for_current_user()
        if not employee_doc:
            return (
                "I couldn't find an Employee record linked to your user. "
                "Please ask your administrator to link your user to an Employee profile.",
                "pending_leave_missing_employee"
            )
        return get_pending_leave_response(employee_doc), "pending_leave_status"

    if "sick leave" in normalized and ("have left" in normalized or "balance" in normalized):
        employee_doc = employee_doc or get_employee_for_current_user()
        if not employee_doc:
            return (
                "I couldn't find an Employee record linked to your user. "
                "Please ask your administrator to link your user to an Employee profile.",
                "sick_leave_missing_employee"
            )
        return get_sick_leave_balance(employee_doc), "sick_leave_balance"

    if ("reporting manager" in normalized or "manager" in normalized) and "email" in normalized:
        employee_doc = employee_doc or get_employee_for_current_user()
        if not employee_doc:
            return (
                "I couldn't find an Employee record linked to your user. "
                "Please ask your administrator to link your user to an Employee profile.",
                "manager_email_missing_employee"
            )
        return get_reporting_manager_email(employee_doc), "manager_email"

    if "create" in normalized and "leave" in normalized and "next monday" in normalized:
        employee_doc = employee_doc or get_employee_for_current_user()
        if not employee_doc:
            return (
                "I couldn't find an Employee record linked to your user. "
                "Please ask your administrator to link your user to an Employee profile.",
                "create_leave_missing_employee"
            )
        return create_leave_request_for_next_monday(employee_doc), "create_leave_request"

    if "marketing" in normalized and ("department" in normalized or "employees" in normalized):
        return get_marketing_department_employees(), "marketing_lookup"

    return None, None


def get_chatbot_settings():
    try:
        return frappe.get_cached_doc("Chatbot Settings")
    except frappe.DoesNotExistError:
        return frappe._dict(
            claude_api_key=None,
            model_name=None,
            max_tokens=None,
            system_prompt=None
        )


def get_employee_for_current_user():
    user = frappe.session.user
    if not user or user == "Guest":
        return None

    employee_name = frappe.db.get_value("Employee", {"user_id": user}, "name")
    if not employee_name:
        return None

    try:
        return frappe.get_doc("Employee", employee_name)
    except frappe.DoesNotExistError:
        return None


def get_pending_leave_response(employee):
    leaves = frappe.get_all(
        "Leave Application",
        filters={
            "employee": employee.name,
            "status": ["in", ["Open", "Applied", "Pending Approval", "Submitted"]],
            "docstatus": ["<", 2]
        },
        fields=["name", "leave_type", "from_date", "to_date", "status"],
        order_by="from_date asc",
        limit=5
    )

    if not leaves:
        return "You have no pending leave applications right now."

    lines = ["Here are your pending leave applications:"]
    for leave in leaves:
        lines.append(
            f"- {leave.leave_type}: {formatdate(leave.from_date)} to {formatdate(leave.to_date)} ({leave.status})"
        )

    if len(leaves) == 5:
        lines.append("Only the first 5 records are shown here.")

    return "\n".join(lines)


def get_sick_leave_balance(employee):
    allocation = frappe.get_all(
        "Leave Allocation",
        filters={
            "employee": employee.name,
            "leave_type": "Sick Leave",
            "docstatus": 1
        },
        fields=[
            "name",
            "from_date",
            "to_date",
            "total_leaves_allocated",
            "total_leaves_consumed",
            "leave_balance"
        ],
        order_by="to_date desc",
        limit=1
    )

    if not allocation:
        return (
            "I couldn't find a Sick Leave allocation for you. "
            "Please check with HR if the Sick Leave allocation is missing."
        )

    record = allocation[0]
    balance = (
        record.get("leave_balance")
        if record.get("leave_balance") is not None
        else max(
            (record.get("total_leaves_allocated") or 0) -
            (record.get("total_leaves_consumed") or 0),
            0
        )
    )

    return (
        f"You have {balance} Sick Leave day(s) remaining for the period "
        f"{formatdate(record.get('from_date'))} to {formatdate(record.get('to_date'))}."
    )


def get_reporting_manager_email(employee):
    if not getattr(employee, "reports_to", None):
        return "A reporting manager has not been set for you yet."

    manager = frappe.db.get_value(
        "Employee",
        employee.reports_to,
        ["employee_name", "user_id"],
        as_dict=True
    )

    if not manager:
        return "I couldn't find details for your reporting manager."

    manager_email = manager.get("user_id")
    if not manager_email:
        manager_email = frappe.db.get_value(
            "User",
            {"full_name": manager.get("employee_name")},
            "email"
        )

    if not manager_email:
        return "Your reporting manager does not have an email address on file."

    return (
        f"Your reporting manager is {manager.get('employee_name')} "
        f"and their email is {manager_email}."
    )


def create_leave_request_for_next_monday(employee):
    next_monday = get_next_monday()
    try:
        leave_type = frappe.db.get_single_value("HR Settings", "default_leave_type")
    except Exception:
        leave_type = None
    leave_type = leave_type or "Casual Leave"

    leave_doc = frappe.get_doc({
        "doctype": "Leave Application",
        "employee": employee.name,
        "employee_name": employee.employee_name,
        "leave_type": leave_type,
        "from_date": next_monday,
        "to_date": next_monday,
        "description": "Auto-created from the AI Chatbot."
    })

    try:
        leave_doc.insert()
    except frappe.PermissionError:
        return (
            "I tried to draft a Leave Application for you, but your user does not "
            "have permission to create leave requests."
        )
    except Exception as exc:
        return (
            "I couldn't create the Leave Application because of this error: "
            f"{exc}"
        )

    return (
        f"I've created Leave Application {leave_doc.name} for {formatdate(next_monday)} "
        f"using the {leave_type} leave type. Please review and submit it if everything looks good."
    )


def get_marketing_department_employees():
    employees = frappe.get_all(
        "Employee",
        filters={
            "department": ["like", "%Marketing%"],
            "status": "Active"
        },
        fields=["employee_name", "designation", "company"],
        order_by="employee_name asc",
        limit=10
    )

    if not employees:
        return "I couldn't find any active employees in the Marketing department."

    lines = ["Here are the active employees in the Marketing department:"]
    for emp in employees:
        designation = f" ({emp.designation})" if emp.designation else ""
        company = f" - {emp.company}" if emp.company else ""
        lines.append(f"- {emp.employee_name}{designation}{company}")

    if len(employees) == 10:
        lines.append("Only the first 10 employees are shown here.")

    return "\n".join(lines)


def get_next_monday(reference_date=None):
    base_date = getdate(reference_date or nowdate())
    days_ahead = (0 - base_date.weekday() + 7) % 7
    if days_ahead == 0:
        days_ahead = 7
    return add_days(base_date, days_ahead)


def log_chatbot_interaction(user, user_message, bot_message, intent=None):
    try:
        doc = frappe.get_doc({
            "doctype": "Chatbot Log",
            "user": user,
            "message": user_message,
            "response": bot_message,
            "timestamp": now_datetime(),
        })
        if intent:
            doc.intent = intent
        doc.insert(ignore_permissions=True)
    except Exception:
        frappe.log_error("Unable to write Chatbot Log entry.", "Chatbot Log Error")
