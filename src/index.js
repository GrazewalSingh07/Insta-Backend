const express= require("express")
const app=express();
app.use(express.json()) 


const SignUpController=require("./controller/SignUp")
const SignInController=require("./controller/Sign-In")
const forgotPassword= require("./controller/forgotPassword")
const resetPassword= require("./controller/resetPassword")
const post_creator=require("./controller/Post.controller")

app.use("/Sign-Up", SignUpController)
app.use("/Sign-In", SignInController)
app.use("/forgot-Password",forgotPassword)
app.use("/reset-Password",resetPassword)


app.use("/post" ,post_creator)
module.exports=app