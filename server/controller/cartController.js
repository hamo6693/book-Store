const User = require("../models/user")



exports.addCart = async(req,res) => {
    try {
        const {bookid,id} = req.headers
        const user = await User.findById(id)
        const isBookCart = user.cart.includes(bookid)
        if(isBookCart){
            return res.status(200).json({
                message:"book is ready in cart"
            })
        }else{
        await User.findByIdAndUpdate(id,{$push:{cart:bookid}})
        return  res.status(200).json({
            message:"book added in cart"
        })
    }
    } catch (e) {
        console.log(e);
        
    }
}


exports.deleteMyCart = async(req,res) => {
    try {
        const{bookid} = req.params
        const {id} = req.headers
        const user = await User.findByIdAndUpdate(id,{
            $pull:{cart:bookid}
        })
       
         res.status(200).json({
            message:"book is removed"
        })
    } catch (e) {
        console.log(e);
        
    }
}

exports.getMyCart = async(req,res) => {
    try {
        const {id} = req.headers
        const user = await User.findById(id).populate("cart")
        const userCart = user.cart.reverse()
         res.status(200).json({
            success:true,
            data:userCart
        })
    } catch (e) {
        console.log(e);
        
    }
}