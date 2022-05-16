const mongoose= require("mongoose");

module.exports=()=>{
    return mongoose.connect("mongodb+srv://Grazewal:9199770959@cluster0.arpnr.mongodb.net/Instagram")
}