const mongoose= require("mongoose")


const ConversationSchema= new mongoose.Schema({
    user_a:{type:mongoose.Types.ObjectId, ref:"user",required:true},
    user_b:{type:mongoose.Types.ObjectId, ref:"user", required:true},
})

const Conversation= mongoose.model("message",ConversationSchema)

module.exports= Conversation
