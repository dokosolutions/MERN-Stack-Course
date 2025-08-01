const webToken = require("jsonwebtoken");
require('dotenv').config();
const generateToken = async (data) => {
  try {
    const token = await webToken.sign({ userId: data }, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });
    // console.log(token);
    return token;
  } catch (error) {
    console.log("Error in generating Token", error);
    throw new Error("Invalid Credentials");
  }
};
module.exports = generateToken;
