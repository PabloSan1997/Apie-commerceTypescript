import joi, {ObjectSchema} from "joi";
import { LeerProductos } from "../service/productService";

const name = joi.string().min(1).max(100);
const price = joi.number().min(0);
const stoke = joi.boolean();
const image = joi.string().min(1);
const category = joi.string().min(1).max(50);
const description = joi.string().min(1).max(500);

export const agregarProducto:ObjectSchema<LeerProductos> = joi.object({
    name: name.required(),
    price: price.required(),
    stoke,
    image: image.required(),
    category: category.required(),
    description: description.required()
});

export const editarProducto:ObjectSchema<LeerProductos> = joi.object({
    name,
    price,
    stoke,
    image,
    category,
    description
});


