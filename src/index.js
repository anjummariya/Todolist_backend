
import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import router from "./routes/taskRoutes.js";


const app=express()
app.use(express.json());
app.use(cors());
app.use("/api/tasks",router);

mongoose.connect("mongodb+srv://mariyaanjum:TvTh88NGPbHl7xNy@todolist.sdoyzsj.mongodb.net/todolist")

app.listen(3001, ()=> console.log("server started!"));


 
