# Apie-commerceTypescript

Esta es una Api simula una parte del funcionamiento de una aplicación web e-commerce.
La Api se encarga de agregar e iliminar productos y autenticar ususarios, tambien validar usuarios y sus roles.
Toda la Api esta programada con **Typescript**

## Tecnologies

**Server:** Node, Express, Bycript, JWT, Boom, Joi, ts-node, mongoose
**Lenguages:** Javascript, Typescript
**Data Base:** MongoDb

## Instalation

Instalación de las dependencias con npm

```bash
npm install
```
### Modo desarrollador
```bash
npm run dev
```
### Generar archivos js para producción
```bash
npm start
```
## Environment Variables
- Variable que contiene el link para conectar con la base de datos

`URLDB`

- Palabra para generar hash de JWT

`WORD`

- Header para dar permiso del uso de la api

`CABEZA`

## Api reference

Base de las rutas

`/api/v1`

### Headers de las solicitudes

|Header|Argumento|
|-|-|
|Content-Type|application/json|
|entrada| `CABEZA` (Variable de entorno)|

### Solicitudes

#### Todos los productos

```http
GET /api/v1/products
```
|Patametro|Tipo|
|-|-|
|_id|String|
|name|String|
|price|Number|
|stoke|Boolean|
|image|String|
|category|String|
|description|String|

#### Obtener productos por categoria

```http
GET /category/:category
```

#### Obtener producto por id

```http
GET /category/:id
```

#### Borrar producto por Id

``` http
DELETE /api/v1/products/:id
```

|Patametro|Tipo|
|-|-|
|message|String|


####  Agregar producto

``` http
POST /api/v1/products/
```

Body Request

|Patametro|Tipo|Requerido|Default value|
|-|-|-|-|
|name|String|✔|-|
|price|Number|✔|-|
|stoke|Boolean|-|True|
|image|String|✔|-|
|category|String|✔|-|
|description|String|✔|-|

#### Editar Producto

``` http
PATCH /api/v1/products/:id
```
Elementos que se puede editar

|Patametro|Tipo|
|-|-|-|-|
|name|String|
|price|Number|
|stoke|Boolean|
|image|String|
|category|String|
|description|String|

#### Obtener todos los usuarios

``` http
GET /api/v1/users/
```
|Patametro|Tipo|
|-|-|-|-|
|_id|String|
|user|String|
|email|String|
|password|String|
|role|Boolean|
|products|Array[string]|

#### Agregar usuario

``` http
POST /api/v1/users/agregar
```
|Patametro|Tipo|
|-|-|-|-|
|user|String|
|email|String|
|password|String|

#### Loging

``` http
POST /api/v1/users/inicio
```

Body Request

|Patametro|Tipo|
|-|-|-|-|
|user|String|
|email|String|
|password|String|

|Patametro|Tipo|
|-|-|-|-|
|preinicio|String|

Response

|Patametro|Tipo|
|-|-|-|-|
|pase|boolean|
|user|String|
|email|String|
|password|String|

#### Agregar producto carritgo

``` http
POST /api/v1/users/carrito
```
Body 

|Patametro|Tipo|
|-|-|-|-|
|codigo|String|
|carrito| Array[String]|



## Authors

- [Pablo Santillana](https://github.com/PabloSan1997)