const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/auth");
const  orderController  = require("../controller/orderController");



router.post("/place-order",isLoggedIn,orderController.createOrder)
router.get("/get-order-history",isLoggedIn,orderController.getOrderHistory)


router.get("/get-all-order",isLoggedIn,orderController.getAllOrders)

router.put("/update-status/:id",isLoggedIn,orderController.UpdateStatus)


module.exports = router