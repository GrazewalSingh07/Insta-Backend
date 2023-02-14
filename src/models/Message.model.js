const mongoose= require("mongoose")


const MessageSchema= new mongoose.Schema({
    senderId:{type:mongoose.Types.ObjectId, ref:"user",required:true},
    recieverId:{type:mongoose.Types.ObjectId, ref:"user", required:true},
    message:{type:String,required:true}
})

const Message= mongoose.model("message",MessageSchema)

module.exports= Message