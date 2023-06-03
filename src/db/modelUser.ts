import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
      user:{
        type:String,
        unique:true
      },
      email:{
        type:String,
        unique:true
      },
      password:{
        type:String
      },
      role:{
        type:Boolean,
        default:false
      }
    },
    {
        versionKey:false
    }
);

export const userModel = mongoose.model("user", userSchema);