import express, { Request, Response, Router, NextFunction } from "express";
import { ServicioProductos } from "../service/productService";
import { validatorHandler } from "../middlewares/joiHandle";
import { agregarProducto, editarProducto } from "../joiSchemas/productSchema";
import { verHeader } from "../utilities/verificarHeader";

const servicio = new ServicioProductos();

export const routerPorduc:Router = express.Router();

routerPorduc.get("/", async (req:Request, res:Response, next:NextFunction)=>{
    try {
        await verHeader(req);
        const data = await servicio.leerProductos();
        res.json(data);
    } catch (error) {
        next(error);
    }
});
routerPorduc.get("/category/:category", async (req:Request, res:Response, next:NextFunction)=>{
    const {category} = req.params;
    try {
        await verHeader(req);
        const data = await servicio.leerCategoria(category);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

routerPorduc.get("/:id", async (req:Request, res:Response, next:NextFunction)=>{
    try {
        await verHeader(req);
        const data = await servicio.leerId(req.params.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

routerPorduc.post("/", 
validatorHandler(agregarProducto, "body"),
async (req:Request, res:Response, next:NextFunction)=>{
    try {
        await verHeader(req);
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
        await verHeader(req);
        const data = await servicio.editarProducto(req.params.id,req.body);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

routerPorduc.delete("/:id", async (req:Request, res:Response, next:NextFunction)=>{
    try {
        await verHeader(req);
        const data = await servicio.borrarProducto(req.params.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
});