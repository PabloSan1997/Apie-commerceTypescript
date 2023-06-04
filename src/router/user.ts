import express, { Router, Request, Response, NextFunction } from "express";
import { ServicioUser } from "../service/userService";
import { validatorHandler } from "../middlewares/joiHandle";
import { agregarUsusario, carritoSchema, iniciarSeccion } from "../joiSchemas/userSchema";
const servicio = new ServicioUser();
export const routerUser: Router = express.Router();

routerUser.get("/", async (req: Request, res: Response, next: NextFunction) => {
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
    });
routerUser.post("/inicio",
    validatorHandler(iniciarSeccion, "body"),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datos = await servicio.inicio(req.body);
            res.status(201).json(datos);
        } catch (error) {
            next(error);
        }
    }
);
routerUser.post("/carrito",
    validatorHandler(carritoSchema, "body") ,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datos = await servicio.agregarCarrito(req.body);
            res.status(201).json(datos);
        } catch (error) {
            next(error);
        }
    });
