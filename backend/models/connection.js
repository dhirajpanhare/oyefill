import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/oyefill";
mongoose.connect(url);
console.log("database connected succesfully");