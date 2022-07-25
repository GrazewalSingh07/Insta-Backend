const mongoose= require("mongoose")

const postSchema= new mongoose.Schema({
 userId:{type:mongoose.Schema.Types.ObjectId, ref:"user",required:true},
 media:[{type:String, required:true}],
 caption:{type:String,required:false},
 Location:{type:String,required:false},
 music:{type:String, required:false},
},{
    timestamps:true,
    
})
const Post= mongoose.model("post",postSchema);
module.exports=Post