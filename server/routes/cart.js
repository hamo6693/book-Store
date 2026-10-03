const express = require("express");
const  cartController  = require("../controller/cartController");
const isLoggedIn = require("../middlewares/auth");
const router = express.Router();



router.put("/add-to-cart",isLoggedIn,cartController.addCart)

router.get("/get-my-cart",isLoggedIn,cartController.getMyCart)

router.put("/delete-my-cart/:bookid",cartController.deleteMyCart)

module.exports = router