import boom from "@hapi/boom";
import { userModel } from "../db/modelUser";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generar } from "../utilities/generarJwt";
dotenv.config();

const palabra = process.env.WORD as string;
export class ServicioUser {
    async leerUsuarios(): Promise<UsuarioFull[]> {
        const data = await userModel.find() as UsuarioFull[];
        if (data.length === 0) {
            throw boom.notFound("no se encuentran elementos");
        }
        return data;
    }
    async agregarUsuario(nuevo: Usuario): Promise<Message> {
        const { password, user, email } = nuevo;
        const verUser = await userModel.findOne({ user });
        const verEmail = await userModel.findOne({ email })
        if (verUser) {
            throw boom.badRequest("Nombre de usuario ya existene");
        }
        if (verEmail) {
            throw boom.badRequest("Email ya existente");
        }
        const encriptar = await bcrypt.hash(password, 8);
        const nuevoUser = {
            ...nuevo,
            password: encriptar
        }
        await userModel.create(nuevoUser);
        return { message: "Usuario agregado con exito" };
    }
    async inicio(cuerpo: Inicio): Promise<Pasar> {
        if (cuerpo.preinicio) {
            const { preinicio } = cuerpo;
            try {
                const datos = await generar(preinicio, palabra);
                const encontrar = await userModel.findOne({ ...datos }) as UsuarioFull;
                if (!encontrar) {
                    throw boom.badRequest("No encontrar");
                }
                return { pase: true, preinicio, user: encontrar.user, email: encontrar.email }
            } catch (error) {
                throw boom.badRequest("No se puede pasar");
            }
        } else {
            const { user, email, password } = cuerpo;
            const encontrar = await userModel.findOne({ user, email }) as UsuarioFull;
            if (!encontrar) {
                throw boom.badRequest("Usuario y contraseña incorrectas");
            }
            const ver = await bcrypt.compare(password, encontrar.password);
            if (!ver) {
                throw boom.badRequest("Contraseña incorrectas");
            }
            const encriptar = await bcrypt.hash(password, 8);
            const nuevo: UsuarioFull = {
                ...encontrar,
                password: encriptar
            }
            await userModel.findOneAndUpdate({ email }, nuevo);

            return {
                pase: true,
                preinicio: jwt.sign(nuevo, palabra),
                user,
                email
            }
        }
    }
    async agregarCarrito(carro: Carro) {
        const {codigo, carrito} = carro;
        try {
            const datos = await generar(codigo, palabra) as UsuarioFull;
            const encontrar = await userModel.findById(datos._id) as UsuarioFull;
            if (!encontrar) {
                throw boom.badRequest("No encontrar");
            }
            await userModel.findByIdAndUpdate(datos._id, { products: carrito });
            return {message: "Productos agregados con exito"};
        } catch (error) {
            throw boom.badRequest("No se pudo hacer dicha operacion");
        }
    }
}
type Message = {
    message: string
}
export type Carro = {
    codigo: string, carrito: string[]
}
export type Usuario = {
    user: string,
    email: string,
    password: string,
    role: boolean,
    products: string[]
}
export type UsuarioFull = {
    _id: string,
    user: string,
    email: string,
    password: string,
    role: boolean,
    products: string[]
}
export type Inicio = {
    user: string,
    email: string,
    password: string,
    preinicio: string
}
export type Pasar = {
    pase: boolean,
    preinicio: string,
    user: string,
    email: string,
}
