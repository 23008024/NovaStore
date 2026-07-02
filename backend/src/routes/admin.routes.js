const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/role.middleware");

const {
    dashboard,
    products,
    create,
    update,
    remove,
    orders,
    status
} = require("../controllers/admin.controller");



// ==============================
// DASHBOARD
// ==============================

router.get(
    "/dashboard",
    protect,
    adminOnly,
    dashboard
);



// ==============================
// PRODUCTS
// ==============================

router.get(
    "/products",
    protect,
    adminOnly,
    products
);

router.post(
    "/products",
    protect,
    adminOnly,
    create
);

router.put(
    "/products/:id",
    protect,
    adminOnly,
    update
);

router.delete(
    "/products/:id",
    protect,
    adminOnly,
    remove
);



// ==============================
// ORDERS
// ==============================

router.get(
    "/orders",
    protect,
    adminOnly,
    orders
);

router.put(
    "/orders/:id",
    protect,
    adminOnly,
    status
);

module.exports = router;