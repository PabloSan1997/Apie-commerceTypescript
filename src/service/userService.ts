import boom from "@hapi/boom";
import { userModel } from "../db/modelUser";
import bcrypt from "bcrypt"

export class ServicioUser {
    async leerUsuarios():Promise<Usuario[]>{
        const data = await userModel.find() as Usuario[];
        if(data.length===0){
            throw boom.notFound("no se encuentran elementos");
        }
        return data;
    }
    async agregarUsuario(nuevo: Usuario):Promise<Message> {
        const { password, user, email } = nuevo;
        const verUser = await userModel.findOne({ user });
        const verEmail = await userModel.findOne({ email })
        if(verUser){
            throw boom.badRequest("Nombre de usuario ya existene");
        }
        if(verEmail){
            throw boom.badRequest("Email ya existente");
        }
        const encriptar = await bcrypt.hash(password, 8);
        const nuevoUser = {
            ...nuevo,
            password: encriptar
        }
        await userModel.create(nuevoUser);
        return {message:"Usuario agregado con exito"};
    }
}
type Message = {
    message: string
}
export type Usuario = {
    user: string,
    email: string,
    password: string,
    role:boolean
}