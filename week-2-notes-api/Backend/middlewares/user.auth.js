const josnToken = require("jsonwebtoken");
const userModel = require("../models/user.model");
const jsonwebtoken = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    const { utoken } = req.headers;
    if (!utoken)
      return res.json({ error: true, message: "Not authorized ,No Token" });
    const signId = await jsonwebtoken.verify(utoken, process.env.SECRET_KEY);

    const user = await userModel.findById(signId.userId);
    if (user) {
      req.user = user;
      next();
    } else
      return res.json({ error: true, message: "Not authorized ,No Token" });
  } catch (error) {
    console.log("Error in auth user function", error);
  }
};
module.exports = authUser;
