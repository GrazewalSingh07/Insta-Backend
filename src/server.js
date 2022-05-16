const connect = require("./configs/db");
const app = require("./index");

app.listen(5000,async(req,res)=>{
    try {
        await connect()
        console.log("Connected to Instagram server")
    } catch (error) {
        console.log(error);
    }
})