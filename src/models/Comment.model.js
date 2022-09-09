const mongoose=require("mongoose")

const ComentSchema=new mongoose.Schema({
   comment:{type:String, required:true},
   userId:{type:mongoose.Types.ObjectId,ref:"user",required:true},
   postId:{type:mongoose.Types.ObjectId,ref:"post",required:true}
   
})
const Comment=mongoose.model("comment", ComentSchema)
module.exports=Comment