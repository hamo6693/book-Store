const Order = require("../models/order");
const User = require("../models/user");

exports.createOrder = async (req, res) => {
  const { id } = req.headers;
  const { order } = req.body;
  try {
    for (const orderData of order) {
      const newOrder = await Order.create({ user: id, book: orderData });
      const orderDataFromOb = await newOrder.save();

      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromOb._id },
      });
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }
    return res.status(200).json({
      success: true,
      message: "order placed successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "An error occured" });
  }
};


exports.getOrderHistory = async(req,res)=>{
    const {id} = req.headers
    try {
        const userData = await User.findById(id).populate({
            path:"orders",
            populate:{path:"book"}
        })
        const userOrder = userData.orders.reverse()
        return res.status(200).json({
            success:true,
            data:userOrder
        })
    } catch (e) {
        console.log(e);
        
    }
}


exports.getAllOrders = async(req,res) => {
  try {
    const userData = await Order.find().populate({path:"book"}).populate({path:"user"}).sort({createdAt:-1})
    return res.json({
      message:"success",
      data:userData
    })
  } catch (e) {
    return res.status(500).json({
      message:"error",
    })
  }
}

exports.UpdateStatus = async(req,res) => {
  const {id} = req.params 
  try {
    await Order.findByIdAndUpdate(id,{status:req.body.status})
    return res.json({
      status:"Success",
      message:"status update successfully"
    })
  } catch (e) {
    return res.status(500).json({
      message:"error"
    })
  }
}