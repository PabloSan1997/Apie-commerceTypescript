import { Usuario } from "../service/userService";
import jwt from "jsonwebtoken";

export async function generar(a:string, b:string){
    return new Promise<Usuario>((resolve) => {
        const datos = jwt.verify(a, b) as Jwt;
        resolve(datos._doc);
    })
}
type Jwt = {
    _doc: Usuario
}