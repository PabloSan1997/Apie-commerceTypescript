import express, {Router, Request, Response, NextFunction} from "express";

export const routerUser:Router = express.Router();

routerUser.get("/", async (req, res, next)=>{
    res.json({message:"users"});
});