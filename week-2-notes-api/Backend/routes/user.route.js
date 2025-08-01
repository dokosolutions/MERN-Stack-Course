const express=require('express');
const userRouter=express.Router();

const{registerUser,loginUser,currentUser}=require('../controllers/user.controller');
const authUser=require('../middlewares/user.auth');
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/profile',authUser,currentUser);

module.exports=userRouter;