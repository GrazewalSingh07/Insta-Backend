const express = require("express")
const authenticate = require("../middlewares/authenticate")
 
const Follow = require("../models/Follow.model")
const User = require("../models/user.model")

const router=express.Router()

router.get("/follower",authenticate,async(req,res)=>{
    try {
        const follower=await Follow.find({userId:req.user._id}).populate({"path":"follower"}).lean().exec()
        return res.status(201).send(follower)
    } catch (error) {
        return res.status(401).send(error.message)
    }
})
router.get("/following",authenticate,async(req,res)=>{
    try {
        const following=await Follow.find({userId:req.user._id}).populate({"path":"following"}).lean().exec()
        return res.status(201).send(following)
    } catch (error) {
        return res.status(401).send(error.message)
    }
})

router.post("/follow",authenticate,async(req,res)=>{
    try {
       
      
        const user= await User.findOne({username:req.body.user_name}).lean().exec()
        req.body.following=user._id
        req.body.follower=req.user._id
        
        const following=await Follow.create(req.body)

        return res.status(201).send(following)
    } catch (error) {
        return res.status(401).send(error.message)
    }
})

router.delete("/Unfollow",authenticate,async(req,res)=>{
    try {
        // console.log(req.body)
        const user= await User.findOne({username:req.body.following}).lean().exec()
        req.body.following=user._id
        req.body.follower=req.user._id
        req.body.userId=req.user._id
        console.log(req.body)
        const following=await Follow.create(req.body)

        return res.status(201).send(following)
    } catch (error) {
        return res.status(401).send(error.message)
    }
})
module.exports= router