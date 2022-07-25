const express=require("express")
const Post = require("../models/post.model")
 const {Single}=require("../middlewares/profilePic")
 
const router=express.Router()

router.get("/get/:id",async(req,res)=>{
   try {
 
        let posts= await Post.find() 
       posts= posts.filter((el)=>{
            if(el.userId==req.params.id){
                return el
            }
        })
        
      
        return res.status(201).send(posts)
   } catch (error) {
        return res.status(401).send(error.message)
   }
})
router.post("/create/:id", Single("media") ,async(req,res)=>{
    try  {
        let tempPost={
            userId:req.params.id,
            media:req.file.filename
        }
       
         await Post.create(tempPost)
        console.log(tempPost)
         return res.status(201).send(tempPost)
    } catch (error) {
         return res.status(401).send(error.message)
    }
 })


 module.exports=router