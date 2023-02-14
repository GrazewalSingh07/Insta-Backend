const connect = require("./configs/db");
const app = require("./index");
require("dotenv").config()

const PORT=process.env.PORT

app.listen(PORT,()=>{
    try {
         connect()
        console.log("http://localhost:4000")
    } catch (error) {
        console.log(error);
    }
})