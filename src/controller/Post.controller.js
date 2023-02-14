const express=require("express")
const Post = require("../models/post.model")
 const authenticate= require("../middlewares/authenticate")
const { findByIdAndDelete } = require("../models/post.model")
const cloudinary= require("../utils/cloudinary")
const router=express.Router()
const upload=require("../utils/multer")
const User = require("../models/user.model")
const Follow = require("../models/Follow.model")


router.get("/get",authenticate,async(req,res)=>{
   try {
 
        let posts= await Post.find({userId:req.user._id}).populate({"path":"userId",select:["username","email"]}) 
 
        return res.status(201).send(posts)
   } catch (error) {
        return res.status(401).send(error.message)
   }
})
router.get("/getOthers/:user",authenticate,async(req,res)=>{
     try {
          // console.log(req.params.user)
          const user= await User.findOne({username:req.params.user}).lean().exec()
          const follower=await Follow . find({following:user._id}).populate({"path":"follower",select:["follower"]}).lean().exec()
       const following=await Follow.find({follower:user._id}).populate({"path":"following",select:["fullname"]}).lean().exec()
          let posts= await Post.find({userId:user._id}).lean().exec()
         
          return res.status(201).send({posts,SpectatingUser:user,follower,following})
     } catch (error) {
          return res.status(401).send(error.message)
     }
})

router.post("/create",authenticate, upload.single('file'), async(req,res)=>{
    try  {
    
     const result= await cloudinary.uploader.upload(req.file.path)
     let curr=  await new Post({
                    userId:req.user._id,
                    caption:req.body.caption,
                    avatar:result.secure_url,
                    cloudinary_Id:result.public_id
               }) 
               await curr.save()
               console.log(curr)
          return res.status(200).send(curr)
    } catch (error) {
         return res.status(401).send(error.message)
    }
 })
 router.delete("/",async(req,res)=>{
     try {
          await findByIdAndDelete(req.params.id,)
     } catch (error) {
          return res.status(401).send("error.message")
     }
 })


 module.exports=router