const mongoose= require("mongoose");
require("dotenv").config()

module.exports=()=>{
    return mongoose.connect("mongodb+srv://Grazewal:9199770959@cluster0.arpnr.mongodb.net/Instagram")
}