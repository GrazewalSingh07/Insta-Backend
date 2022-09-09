const express= require("express")
const authenticate = require("../middlewares/authenticate")
const User = require("../models/user.model")
const router= express.Router()


router.get("/:query",authenticate,async(req,res)=>{
     
    try {
        const query=req.params.query
        const user= await User.find({ username: new RegExp('.*' +   query + '.*')}).lean().exec() 
        return res.status(200).send({user})
    } catch (error) {
        return res.status(400).send({error})
    }
})
router.get("/",authenticate,async(req,res)=>{
     
    try {
        
        const user= await User.find().lean().exec()
        return res.status(200).send({user})
    } catch (error) {
        return res.status(400).send({error})
    }
})

module.exports= router