const express= require("express")
const app=express();
// app.use(express.json()) 
 
 
var bodyParser = require('body-parser');
const cors= require("cors")
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
 app.use(cors())

const SignUpController=require("./controller/SignUp")
const SignInController=require("./controller/Sign-In")
const forgotPassword= require("./controller/forgotPassword")
const resetPassword= require("./controller/resetPassword")
const post_creator=require("./controller/Post.controller")
const comment=require("./controller/comment.contorller")
const connection= require("./controller/Follow.controller")
const user=require("./controller/user.controller")
app.use("/Sign-Up", SignUpController)
app.use("/Sign-In", SignInController)
app.use("/forgot-Password",forgotPassword)
app.use("/reset-Password",resetPassword)


app.use("/post" ,post_creator)
app.use("/comment",comment)
app.use("/getalluser", user)

app.use("/connection",connection)
module.exports=app