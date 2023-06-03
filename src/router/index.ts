import express, {Express, Router} from "express";
import { routerPorduc } from "./products";
const router:Router = express.Router();

export function crearApi(app:Express){
    app.use("/api/v1", router);
    router.use("/products", routerPorduc);
    
}