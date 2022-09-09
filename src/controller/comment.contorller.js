const express=require("express")
const Comment = require("../models/Comment.model")

const router=express.Router()

//This router create comment for a particular post
router.post("/:id",async(req,res)=>{
    try {
        const temp={
            comment:req.body.comment,
            userId:req.body.userId,
            postId:req.params.id
        }
        await Comment.create(temp)
        return res.status(201).send(temp)
    } catch (error) {
        return res.status(401).send(error.message)
    }
})
router.delete("/:id",async(req,res)=>{
    try {
         
        await Comment.findByIdAndDelete(req.params.id,req.body,{new:true}).lean().exec()
        return res.status(201).send("comment Updated")
    } catch (error) {
        return res.status(401).send(error.message)
    }
})

router.patch("/:id",async(req,res)=>{
    try {
         
        const comment =await Comment.findByIdAndUpdate(req.params.id)
        return res.status(201).send("comment deleted")
    } catch (error) {
        return res.status(401).send(error.message)
    }
})
//this router gets all the comments on a particualr post
router.get("/:id",async(req,res)=>{
    try {
        const comments= await Comment.find({postId:req.params.id}).populate({ path: 'userId', select: ['username',"email"] }).lean().exec()
        console.log(comments)
        return res.status(201).send(comments)
    } catch (error) {
        return res.status(401).send(error.message)
    }
})
module.exports=router