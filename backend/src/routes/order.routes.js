const express = require("express");

const router = express.Router();

const { protect: auth } = require("../middleware/auth.middleware");


const {
    create,
    myOrders
} = require("../controllers/order.controller");



router.post(
    "/checkout",
    auth,
    create
);



router.get(
    "/",
    auth,
    myOrders
);



module.exports = router;