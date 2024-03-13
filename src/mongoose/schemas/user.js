import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username : mongoose.Schema.Types.String,
    displayName : mongoose.Schema.Types.String,
    password : mongoose.Schema.Types.String,
})