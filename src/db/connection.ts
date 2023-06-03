import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URLDB = process.env.URLDB as string;
export function conectar() {
    mongoose.connect(URLDB)
        .then(() => console.log("Conectado a la base de datos"))
        .catch(() => console.log("Error al conectarse a la base de datos"));
}