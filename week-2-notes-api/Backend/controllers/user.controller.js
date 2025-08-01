const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utility/token");

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      return res.json({ error: true, message: "No Empty Fields are allowed" });

    const emailExists = await userModel.findOne({ email });
    if (emailExists)
      return res.json({ error: true, message: "Account Already Exists" });

    const salt = await bcrypt.genSalt(10);
    const Password = await bcrypt.hash(password, salt);

    const user = new userModel({
      fullName,
      email,
      password: Password,
    });
    await user.save();
    const token = generateToken(user._id);
    return res.json({
      error: false,
      message: "Account Created Successfully",
      name: user.fullName,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.log("Error in register function", registerUser);
    return res.json({ error: true, message: "Something went wrong" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      const passIsMatch = await bcrypt.compare(password, user.password);
      if (passIsMatch) {
        const token = await generateToken(user._id);
        console.log(token);
        return res.json({ error: false, message: "Login success", token:token });
      } else 
          return res.json({ error: true, message: "Invalid Credentials" });
      
    } else 
        return res.json({ error: true, message: "User not Available" });
    
  } catch (error) {
    console.log("Error in login user ", error);
    return res.json({ error: true, message: "Login Failed" });
  }
};

const currentUser=async(req,res)=>{
  try {
    const user=await userModel.findOne(req.user._id).select('-password');
    if(!user)
        return res.json({error:true,message:'No user found'});
    else
      return res.json({error:false,user});
  } catch (error) {
    console.log('Error in fetching current user',error);
    return res.json({error:true,message:'Failed to get profile'});
    
  }
}
module.exports = { registerUser,loginUser,currentUser };
