import express, { Express, Request, Response } from "express";
import cors from "cors";
import { conectar } from "./db/connection";
import { crearApi } from "./router";
import { boomHandle } from "./middlewares/boomHandle";
conectar();
const app:Express = express();
const PUERTO = process.env.PORT || 3005;
app.use(cors());
app.use(express.json());

crearApi(app);

app.use(boomHandle);

app.get("/", (req:Request, res:Response)=>{
  res.json({message:"Bienvenido a mi api :)"});
});

app.listen(PUERTO, ()=>{
    if(typeof PUERTO === "number"){
        console.log(`http://localhost:${PUERTO}/`);
    }
});