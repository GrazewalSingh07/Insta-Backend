const mongoose=require("mongoose")

const ComentSchema=new mongoose.Schema({
   comment:{type:toString, required:true},
   userId:{type:mongoose.Types.ObjectId,ref:"post",required:true},
   postId:{type:mongoose.Types.ObjectId,ref:"post",required:true}
   
})
const Comment=mongoose.model("comment", ComentSchema)
module.exports=Comment