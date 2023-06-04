import {Request} from "express";
import dotnev from "dotenv";
import boom from "@hapi/boom";

dotnev.config();

const cabeza:string = process.env.CABEZA as string;
export async function verHeader(req:Request):Promise<null>{
    const {entrada} = req.headers;
    if(!entrada || entrada !== cabeza){
        throw boom.badRequest("No tienes permiso para entrar");
    }
    return null;
}
