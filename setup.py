from setuptools import setup, find_packages

with open("requirements.txt") as f:
    install_requires = f.read().strip().split("\n")

# Use static version - don't import from the package
version = "0.0.1"

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
