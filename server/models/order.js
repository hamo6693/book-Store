const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  book: {
    type: mongoose.Types.ObjectId,
    ref: "Books",
  },
  status:{
    type:String,
    default:"order placed",
    enum:["order placed","out for delivery","delivered","canceled"]
  }
},{timestamps:true});

module.exports = mongoose.model("Order",OrderSchema)