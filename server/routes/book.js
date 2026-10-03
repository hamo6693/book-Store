const express = require("express");
const  bookController  = require("../controller/bookController");
const isLoggedIn = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/book",(req,res) => {
    res.json({
        success:true,
        message:"hello",
    })
})


router.post("/create-book",upload.single("url"),bookController.createBook)

router.put("/update-book",bookController.updateBook)
router.delete("/delete-book",isLoggedIn,bookController.deleteBook)


router.get("/get-all-book",bookController.getAllBook)
router.get("/get-all-book-recent",bookController.getAllBookRecently)


router.get("/get-the-book/:id",bookController.getTheBook)



module.exports = router