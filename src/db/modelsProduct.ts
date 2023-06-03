import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
        },
        price:{
            type:Number,
            require:true
        },
        stoke:{
            type:Boolean,
            default:true
        },
        image:{
            type:String,
            require:true
        },
        category:{
            type:String,
            require:true
        },
        description:{
            type:String,
            require:true
        }
    },
    {
        versionKey:false
    }
);

export const productosModel = mongoose.model("productos", productSchema);