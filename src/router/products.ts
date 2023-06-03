import express, { Request, Response, Router, NextFunction } from "express";
import { ServicioProductos } from "../service/productService";
import { validatorHandler } from "../middlewares/joiHandle";
import { agregarProducto, editarProducto } from "../joiSchemas/productSchema";

const servicio = new ServicioProductos();

export const routerPorduc:Router = express.Router();

routerPorduc.get("/", async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const data = await servicio.leerProductos();
        res.json(data);
    } catch (error) {
        next(error);
    }
});


routerPorduc.post("/", 
validatorHandler(agregarProducto, "body"),
async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const data = await servicio.agregarProducto(req.body);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

routerPorduc.patch("/:id", 
validatorHandler(editarProducto, "body"),
async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const data = await servicio.editarProducto(req.params.id,req.body);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

