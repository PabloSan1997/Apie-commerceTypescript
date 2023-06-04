import { Usuario, Inicio, Carro } from "../service/userService";
import joi from "joi";


const user = joi.string().min(3).max(20);
const email = joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
const password = joi.string().min(5);
const role = joi.boolean();
const preinicio = joi.string().min(3);
const products = joi.array().items(joi.string().min(0));

export const agregarUsusario: joi.ObjectSchema<Usuario> = joi.object({
    user:user.required(),
    email:email.required() ,
    password:password.required(),
    role,
    products
});
export const iniciarSeccion: joi.ObjectSchema<Inicio> = joi.object({
    user,
    email,
    password,
    preinicio
});

export const carritoSchema:joi.ObjectSchema<Carro>=joi.object({
    codigo:preinicio,
    carrito:products
});

