const express=require("express");
const router= express.Router();
const User=require("../models/user.model")
 const cloudinary= require("../utils/cloudinary")
 const upload=require("../utils/multer")
 
const {body, validationResult}=require("express-validator")
 
router.post("/",

    body("username").not().isEmpty().withMessage("Please Enter Username"),
    
body("email").not().isEmpty().withMessage("Please enter email").isEmail().withMessage("Please enter valid email").custom(async(value)=>{
    let user= await User.findOne({email:value}).lean().exec()
    if(user){
       throw new Error("Email already exists")
    }
    return true
    
   }),
body("password").not().isEmpty().withMessage("Please enter password").custom((value)=>{
    
    let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(!value.match(regex)||value.length<8){
                throw new Error("Password must be strong");
            }
         return true;
    
}), body("fullname").not().isEmpty().withMessage("Please enter fullname"),


async(req,res)=>{
    try {
       
        const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send({error:errors.array()})
        }
        
        // if(req.file.path){
        //     const result= await cloudinary.uploader.upload(req.file.path)
        
        // upload.single('image'),
        //  let curr=  await new User({
        //         username:req.body.username,
        //         email:req.body.email,
        //         password:req.body.password,
        //         fullname:req.body.fullname,
        //         phone:req.body.phone,
        //         avatar:result.secure_url,
        //         cloudinary_Id:result.public_id
        //      }) 
//              await curr.save()
//              console.log(curr)
//         return res.status(200).send(curr)
// // 
        // }
    
            const curr=await User.create(req.body)
           
            return res.status(200).send({curr})
        
        
       
    } catch (error) {
        if(error.code===11000){
           return res.status(500).send("Register successful please login")
        }
        return res.status(400).send(error)
        
    }
})







router.get("/" ,async(req,res)=>{
    try {
        const user= await User.find().lean().exec()
      return  res.status(200).send(user)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
})


router.delete("/:id",async(req,res)=>{
    try {
        let user=await User.findById(req.param.id)
        await cloudinary.uploader.destroy(user.cloudinary_id)
        await user.remove()
      return  res.status(201).send({"message":"deleted sucessfully","user":user})
    } catch (error) {
        return res.status(401).send(error.message)
    }
})
router.patch("/:id",upload.single('image'),async(req,res)=>{
    try {
        let user=await User.findById(req.param.id)
        await cloudinary.uploader.destroy(user.cloudinary_id)
        const result= await cloudinary.uploader.upload(req.file.path)
         
        const data={
            username:req.body.username||user.username,
            email:req.body.email||user.email,
            password:req.body.password||user.password,
            fullname:req.body.fullname||userfullname,
            phone:req.body.phone||user.phone,
            avatar:result.secure_url||user.avatar,
            cloudinary_Id:result.public_id||user.cloudinary_id
        }
        user= await User.findByIdAndUpdate(req.param.id,data,{new:true})

        



      return  res.status(201).send({"message":"updated sucessfully","user":user})
    } catch (error) {
        return res.status(401).send(error.message)
    }
})

module.exports= router