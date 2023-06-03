import { Usuario, Inicio } from "../service/userService";
import joi from "joi";


const user = joi.string().min(3).max(20);
const email = joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
const password = joi.string().min(5);
const role = joi.boolean();
const preinicio = joi.string().min(3);
export const agregarUsusario: joi.ObjectSchema<Usuario> = joi.object({
    user:user.required(),
    email:email.required() ,
    password:password.required(),
    role
});
export const iniciarSeccion: joi.ObjectSchema<Inicio> = joi.object({
    user,
    email,
    password,
    preinicio
});