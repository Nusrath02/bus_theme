from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in business_theme_v14/__init__.py
from business_theme_v14 import __version__ as version

setup(
	name="business_theme_v14",
	version=version,
	description="Business Theme for ERPNext / Frappe",
	author="Midocean Technologies Pvt Ltd",
	author_email="sagar@midocean.tech",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)

import frappe

NAVBAR_ITEM_LABEL = "Show Time"
NAVBAR_EXTND_ITEMS = [
    {
        "item_label": NAVBAR_ITEM_LABEL,
        "item_type": "Action",
        "action": "() => {}",
        "idx": 1,
    },
    {
        "item_type": "Separator",
        "idx": 2,
    },
]

def after_install():
    if frappe.db.exists("Navbar Item", {"item_label": NAVBAR_ITEM_LABEL}):
        return
    navbar_settings = frappe.get_single("Navbar Settings")
    for ni in navbar_settings.settings_dropdown:
        ni.idx = ni.idx + len(NAVBAR_EXTND_ITEMS)
    navbar_settings.extend("settings_dropdown", NAVBAR_EXTND_ITEMS)
    navbar_settings.save()
    frappe.db.commit()

def after_uninstall():
    if not frappe.db.exists("Navbar Item", {"item_label": NAVBAR_ITEM_LABEL}):
        return
    patch_flag = frappe.flags.in_patch
    frappe.flags.in_patch = True
    navbar_settings = frappe.get_single("Navbar Settings")
    for i, ni in enumerate(navbar_settings.settings_dropdown):
        if ni.item_label == NAVBAR_ITEM_LABEL:
            navbar_settings.settings_dropdown.pop(i)
            # Fix: item_stype should be item_type
            if i < len(navbar_settings.settings_dropdown) and navbar_settings.settings_dropdown[i].item_type == "Separator":
                navbar_settings.settings_dropdown.pop(i)
            break
    navbar_settings.save()
    frappe.db.commit()
    frappe.flags.in_patch = patch_flag
