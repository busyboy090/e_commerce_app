const adminRole = ['super','product','vendor','order','support','finance','hr'];

const adminPermission = {
    VENDOR_ADMIN: [
        "view_vendors",
        "create_vendor",
        "edit_vendor",
        "delete_vendor",
        "view_vendor_profile",
        "approve_vendor",
        "reject_vendor",
        "suspend_vendor",
        "activate_vendor",
        "view_vendor_products",
        "edit_vendor_products",
        "delete_vendor_products",
        "view_vendor_orders",
        "edit_vendor_orders",
        "delete_vendor_orders",
        "message_vendor"
    ],
    PRODUCT_ADMIN: [
        "create_product",
        "edit_product",
        "delete_product",
        "view_all_products",
        "approve_vendor_product",
        "reject_vendor_product",
        "view_vendor_products",
        "manage_categories",
        "manage_tags",
        "manage_sizes",
        "manage_units",
        "manage_colors"
    ],
    ORDER_ADMIN: [

    ],
    SUPPORT_ADMIN: [

    ],
    FINANCE_ADMIN: [

    ],
    HR_ADMIN: [
        'create_admin',
        'suspend_admin',
        'delete_admin',
        'edit_admin_profile',
        'view_admin_profile'
    ],
    SUPER_ADMIN: ["*"]
}

module.exports = {
    adminRole,
    adminPermission
}