import boom from "@hapi/boom";
import {Request, Response, NextFunction} from "express";
import  {ObjectSchema} from "joi";
import { LeerProductos } from "../service/productService";
import { Usuario, Inicio, Carro } from "../service/userService";

type Entradas = LeerProductos | Usuario | Inicio | Carro;

export function validatorHandler(schema:ObjectSchema<Entradas>, property: "body"|"headers") {
  return (req:Request, res:Response, next:NextFunction) => {
    const cuerpo = req[property];
    const { error } = schema.validate(cuerpo, { abortEarly: false });
    if(error){
        throw boom.badRequest(error);
    }
    next();
  };
}