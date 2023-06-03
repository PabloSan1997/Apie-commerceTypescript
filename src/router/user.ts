import express, { Router, Request, Response, NextFunction } from "express";
import { ServicioUser } from "../service/userService";
import { validatorHandler } from "../middlewares/joiHandle";
import { agregarUsusario } from "../joiSchemas/userSchema";
const servicio = new ServicioUser();
export const routerUser: Router = express.Router();

routerUser.get("/", async (req, res, next)=>{
    try {
        const data = await servicio.leerUsuarios();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

routerUser.post("/agregar",
    validatorHandler(agregarUsusario, "body"),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await servicio.agregarUsuario(req.body);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    })