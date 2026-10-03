const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const isLoggedIn = require("../middlewares/auth");


router.get("/",(req,res) => {
    res.json({
        success:true,
        message:"hello",
    })
})

router.post("/singup",userController.register)

router.post("/login",userController.login)

router.get("/get-user-info",userController.getUserInfo)

router.put("/update-address",userController.updateAddress)

module.exports = router