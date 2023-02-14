const { default: mongoose } = require("mongoose");

const FollowModel= new mongoose.Schema({
    follower:{type:mongoose.Types.ObjectId, ref:"user",required:false},
    following:{type:mongoose.Types.ObjectId, ref:"user",required:false},
})
const Follow=mongoose.model("follow",FollowModel)
module.exports= Follow
 