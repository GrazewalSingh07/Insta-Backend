 
const express = require("express");
const User= require("../models/user.model")
const router= express.Router();
 const path= require("path")
 const {body, validationResult}=require("express-validator")
 
router.post("/",
body("email").not().isEmpty().withMessage("Please enter email ").bail()
.isEmail().withMessage("Please enter a valid email address").bail().custom(async(value)=>{
let user= await User.findOne({email:value}).lean().exec()
    if(!user){
    throw new Error("Email is not registered, Please register first")
    }
    return true
})
,async(req, res)=>{
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            
            return res.status(400).json({error:errors.array()})
     
        }
        const user = await User.findOne({email:req.body.email}).lean().exec()
    
          
          return res.status(200).send({message:"Please enter OTP sent on registered email", userId:user._id})
    } catch (error) {
        console.log(error)
    }
})

module.exports=  router