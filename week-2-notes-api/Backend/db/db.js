const mongoose=require('mongoose');

const connectDB=async(DB_URI)=>{
  try {
   await mongoose.connection.on('connected',()=>console.log('Connected to db success'));
    await mongoose.connect(DB_URI);
  } catch (error) {
    console.log('Error in connecting db',error);
 }
}
module.exports=connectDB;