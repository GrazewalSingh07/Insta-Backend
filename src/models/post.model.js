const mongoose= require("mongoose")

const postSchema= new mongoose.Schema({
 userId:{type:mongoose.Schema.Types.ObjectId, ref:"user",required:true},
 
 caption:{type:String,required:false},
  avatar:{type:String, required:true},
cloudinary_Id:{type:String, required:true}
 
},{
    timestamps:true,
    
})
const Post= mongoose.model("post",postSchema);
module.exports=Post