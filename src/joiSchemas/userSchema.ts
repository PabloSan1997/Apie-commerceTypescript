import { Usuario } from "../service/userService";
import joi from "joi";


const user = joi.string().min(3).max(20).required();
const email = joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required();
const password = joi.string().min(5).required();
const role = joi.boolean();

export const agregarUsusario: joi.ObjectSchema<Usuario> = joi.object({
    user,
    email ,
    password,
    role
});