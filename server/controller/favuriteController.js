const User = require("../models/user")


exports.addFavuraite = async(req,res) => {
    try {
        const {bookid,id} = req.headers
        const user = await User.findById(id)
        const isBookFavuraite = user.favourites.includes(bookid)
        if(isBookFavuraite){
             res.status(200).json({
                message:"book is ready in favourite"
            })
        }else{
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}})
         res.status(200).json({
            message:"book added in favourite"
        })
    }
    } catch (e) {
     console.log(e);
        
    }
}


exports.deleteFavuraite = async(req,res) => {
    try {
        const {bookid,id} = req.headers
        const user = await User.findById(id)
        const isBookFavuraite = user.favourites.includes(bookid)
        if(isBookFavuraite){
        await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}})
           
        }
        return res.status(200).json({
            message:"book is remove"
        })
    } catch (e) {
        return res.status(500).json({
            message:"error"
        })
        
    }
}


exports.getFavuraite = async(req,res) => {
    try {
        const {id} = req.headers
        const user = await User.findById(id).populate("favourites")
        const userFavuraite = user.favourites
         res.status(200).json({
            success:true,
            data:userFavuraite
        })
    } catch (e) {
        console.log(e);
        
    }
}