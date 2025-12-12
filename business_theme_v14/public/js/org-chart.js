window.onload = function () {
    frappe.call({
        method: "frappe.desk.reportview.get",
        args: {
            doctype: "Employee",
            fields: ["name", "employee_name", "reports_to", "image", "department"]
        },
        callback: function(r) {
            let employees = r.message;

            let nodes = [];

            // Convert Employee List into OrgChart nodes
            employees.forEach(emp => {
                nodes.push({
                    id: emp.name,
                    pid: emp.reports_to || "",
                    name: emp.employee_name,
                    title: emp.department || "",
                    img: emp.image || ""
                });
            });

            let chart = new OrgChart(document.getElementById("orgchart"), {
                nodes: nodes,
                nodeBinding: {
                    field_0: "name",
                    field_1: "title",
                    img_0: "img"
                },
                layout: OrgChart.layouts.treeLeft,
                collapse: { level: 2 },
            });
        }
    });
};
