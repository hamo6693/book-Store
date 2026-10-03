const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/auth");
const favourite = require("../controller/favuriteController");



router.put("/favourite-book",isLoggedIn,favourite.addFavuraite)

router.delete("/delete-favourite",isLoggedIn,favourite.deleteFavuraite)

router.get("/get-favourite",isLoggedIn,favourite.getFavuraite)



module.exports = router