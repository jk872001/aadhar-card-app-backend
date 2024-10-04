import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app=express();


app.use(cors({
    // origin : process.env.CORS_ORIGIN
    origin : "*"
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.use(cookieParser())


import {userRouter}  from "./routes/user.route.js"
import { aadharCardRouter } from "./routes/aadharCard.route.js";
import { data } from "./constants/cookie.js";
import { productRouter } from "./routes/product.route.js";

// app.use("/api/v1/users",userRouter)
// app.use("/api/v1/aadhar",aadharCardRouter)
app.use("/api/v1/",productRouter)
app.get("/getAllTests",(req,res)=>{
    res.send(data)
})

app.get("/",(req,res)=>{
    res.json({msg:"hi working well"})
})







export {app};