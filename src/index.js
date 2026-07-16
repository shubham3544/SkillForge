// import dotenv from "dotenv";

// const result = dotenv.config({
//     path: "./.env",
// });
// console.log(result)

import "dotenv/config";

import app from "./app.js";

import connectDB from "./config/db.js";




const PORT = process.env.PORT || 8000;

connectDB()
.then(()=>{
    app.listen(PORT, () => {
    console.log(`Server is running on port:  ${process.env,PORT}`);
})
   
})
.catch((err)=>{
    console.log("MongoDB connection failed !!!",err);
})