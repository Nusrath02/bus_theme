frappe.after_ajax(() => {
    if (frappe.get_route_str() !== "organizational-chart") return;

    const observer = new MutationObserver(() => {
        const cards = document.querySelectorAll(".org-node");

        cards.forEach(card => {
            if (card.dataset.customStyled) return;

            card.dataset.customStyled = true;

            // Apply your custom layout
            card.style.background = "#fff";
            card.style.borderRadius = "8px";
            card.style.padding = "12px";
            card.style.border = "1px solid #ddd";
            card.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
            card.style.display = "flex";
            card.style.flexDirection = "column";
            card.style.alignItems = "center";
            card.style.gap = "6px";

            const img = card.querySelector("img");
            if (img) {
                img.style.width = "50px";
                img.style.height = "50px";
                img.style.borderRadius = "50%";
                img.style.objectFit = "cover";
            }

            const name = card.querySelector(".employee-name");
            if (name) {
                name.style.fontSize = "14px";
                name.style.fontWeight = "600";
                name.style.color = "#000";
            }

            const title = card.querySelector(".designation");
            if (title) {
                title.style.fontSize = "12px";
                title.style.color = "#4a6cff";
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
