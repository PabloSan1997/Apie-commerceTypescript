import { productosModel } from "../db/modelsProduct";
import boom from "@hapi/boom";

export class ServicioProductos {
    async leerProductos(): Promise<LeerProductosFull[]> {
        const data = await productosModel.find() as LeerProductosFull[];
        if (data.length === 0) {
            throw boom.notFound("No se encontraron productos");
        }
        return data;
    }
    async agregarProducto(data: LeerProductos): Promise<Message> {
        await productosModel.create(data);
        return { message: "Se agregó producto con exito" };
    }
    async editarProducto(id:string, body:LeerProductos){
        const data = await productosModel.findByIdAndUpdate(id, body);
        if(!data){
            throw boom.badRequest("no se encontro el producto que desea editar");
        }
        return {message:`Producto ${id} cambiado con exito`};

    }
}



type Message = {
    message: string
}
export type LeerProductos = {
    name: string,
    price: number,
    stoke: boolean,
    image: string,
    category: string,
    description: string
}
export type LeerProductosFull = {
    name: string,
    price: number,
    stoke: boolean,
    image: string,
    category: string,
    description: string,
    _id:string
}