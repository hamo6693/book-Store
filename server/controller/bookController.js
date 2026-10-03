const Book = require("../models/book");
const User = require("../models/user");

exports.createBook = async (req, res) => {
  const { id } = req.headers;
  const { url, title, author, price, desc, language } = req.body;
  try {
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(400).json({
        message: "you are not having access to perform admin work",
      });
    }
    const book = await Book.create({
      url:req.file.path,
      title,
      author,
      price,
      desc,
      language,

    });
    await book.save();
    res.status(200).json({
      success: true,
      message: "created is successfully",
      data:book
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "error"
    });
  }
};


exports.updateBook = async (req, res) => {
    const { bookid } = req.headers;
    const { url, title, author, price, desc, language } = req.body;
    try {
      const book = await Book.findByIdAndUpdate(bookid,{
        url,
        title,
        author,
        price,
        desc,
        language,
      });
      await book.save();
      res.status(200).json({
        success: true,
        message: "update is successfully",
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "error",
      });
    }
  };
  

  exports.deleteBook = async (req, res) => {
    const { bookid } = req.headers;
    try {
      const book = await Book.findByIdAndDelete(bookid);
      res.status(200).json({
        success: true,
        message: "delete is successfully",
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "error",
      });
    }
  };


  exports.getAllBook = async (req, res) => {
    try {
      const book = await Book.find()
      res.status(200).json({
        success: true,
        data: book,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "error",
      });
    }
  };

  exports.getAllBookRecently = async (req, res) => {
    try {
      const book = await Book.find().sort({createdAt: -1}).limit(4)
      return res.json({
        success: true,
        data: book,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "error",
      });
    }
  };


  exports.getTheBook = async (req, res) => {
    const {id} = req.params
    try {
      const book = await Book.findById(id)
      res.status(200).json({
        success: true,
        data: book,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "error",
      });
    }
  };