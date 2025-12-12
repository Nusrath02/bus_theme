frappe.pages['organizational-chart'].on_page_load = function(wrapper) {

    // Replace ERPNext chart area
    const body = wrapper.querySelector(".page-body");
    if (body) {
        body.innerHTML = `
            <div id="my-orgchart" style="width:100%; height:85vh;"></div>
        `;
    }

    // Load external JS library
    let script = document.createElement("script");
    script.src = "https://balkan.app/js/OrgChart.js";
    document.head.appendChild(script);

    script.onload = () => {
        frappe.call({
            method: "frappe.desk.reportview.get",
            args: {
                doctype: "Employee",
                fields: ["name","employee_name","reports_to","image","department"]
            },
            callback: function(r) {

                let nodes = r.message.map(row => ({
                    id: row.name,
                    pid: row.reports_to,
                    name: row.employee_name,
                    title: row.department,
                    img: row.image
                }));

                new OrgChart(document.getElementById("my-orgchart"), {
                    nodes: nodes,
                    layout: OrgChart.treeLeft, // horizontal
                    collapse: { level: 2 },
                    nodeBinding: {
                        field_0: "name",
                        field_1: "title",
                        img_0: "img"
                    }
                });
            }
        });
    };
};
