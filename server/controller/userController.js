const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  try {
    const findEmail = await User.findOne({ email: email });

    const hashPassword = await bcrypt.hash(password, 10);

    if (findEmail) {
      return res.status(400).json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });
    }
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      address,
      role: "user",
    });

    await user.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
      data: user,
    });
  } catch (e) {
    res.status(501).json({
      success: false,
      message: "Some error occured",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    }
    const pass = await bcrypt.compare(password, user.password);
    if (pass) {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          password: user.password,
          role: user.role,
        },
        process.env.JWT
      );
      res.status(200).json({
        success: true,
        message: "logged in successfully",
        
          email: user.email,
          role: user.role,
          id: user.id,
          name: user.name,
          accessToken: token,
        
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

exports.getUserInfo = async(req,res) => {
  try {
    const {id} = req.headers
    const data = await User.findById(id).select("-password")
    return res.status(200).json(data)
  } catch (e) {
     res.status(500).json({
      message:"internal server error"
     })
    
  }
}

exports.updateAddress = async(req,res) => {
    const {id} = req.headers
    const {address} = req.body
    try {
        const update = await User.findByIdAndUpdate(id,{address:address})
        res.status(200).json({
            success:true,
            message:"update is successfully",
            data:update
        })
        
    } catch (e) {
        res.status(500).json({
            success:false,
            message:"error"
        })
    }
}