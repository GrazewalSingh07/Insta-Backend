const express= require("express");
const User = require("../models/user.model");
 const router= express.Router();
const {body,validationResult}=require("express-validator")
const jwt = require('jsonwebtoken');
require("dotenv").config()
 const authenticate= require("../middlewares/authenticate");
const Follow = require("../models/Follow.model");
const Post = require("../models/post.model");

const newToken=(user)=>{
    return jwt.sign({user},process.env.SECRET_KEY)
}

 router.get("/",authenticate,async(req,res)=>{
    try {
        const user= await User.find().lean().exec()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
 })

 
 router.post("/",
 body("email").not().isEmpty().withMessage("Please enter email").isEmail().withMessage("Please enter valid email")
 .custom(async(value)=>{
    let user= await User.findOne({email:value}).lean().exec()
    
    if(!user){
        throw new Error("User doesnot exist, Please register")
    }
    return true
 }).bail(),
 body("password").not().isEmpty().bail(),

 async(req,res)=>{
     try {
        const errors=validationResult(req)
         
        if(!errors.isEmpty()){
           return res.status(400).json({error:errors.array()})
        }


       let user= await User.findOne({email:req.body.email}).exec()
       let posts= await Post .find({userId:user._id}).populate({"path":"userId",select:["username","email"]}) 
       const follower=await Follow.find({following:user._id}).populate({"path":"follower",select:["follower"]}).lean().exec()
       const following=await Follow.find({follower:user._id}).populate({"path":"following",select:["fullname"]}).lean().exec()
       const match=user.checkPassword(req.body.password)

       if(!match){
           return  res.status(400).send("Email or password incorrect")
       }

       const token=newToken(user)

       return res.status(200).send({user,token,follower,following,posts})
     } catch (error) {
        return res.status(500).send({error:error.message})
     }
     
 })
module.exports= router