const express= require("express")
const app=express();
app.use(express.json()) 
const SignUpController=require("./controller/SignUp")
const SignInController=require("./controller/Sign-In")
const forgotPassword= require("./controller/forgotPassword")
const resetPassword= require("./controller/resetPassword")


app.use("/Sign-Up", SignUpController)
app.use("/Sign-In", SignInController)
app.use("/forgot-Password",forgotPassword)
app.use("/reset-Password",resetPassword)

module.exports=app