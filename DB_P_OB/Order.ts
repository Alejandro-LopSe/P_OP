import mongoose from "mongoose"
import * as types from "../types_vs.ts"
import { Cli_model } from "./Cliente.ts";
import { Res_model } from "./Restaurante.ts";
import { Rep_model } from "./Repartidor.ts";

const Schema = mongoose.Schema

const Ped_schema = new Schema({
    id_client: {type: mongoose.Types.ObjectId,required: true},
    id_restaurante: {type: mongoose.Types.ObjectId,required: true},
    id_repartidor: {type: mongoose.Types.ObjectId,required: true},
    products: [{type: String,required: true}],
    price: {type: Number,required: true},
    status: {type: String,enum: types.Status,required: true}
})

Ped_schema.post("save",async function(elem,next){
    const cliente = await Cli_model.findById(elem.id_client)
    const restaurante = await Res_model.findById(elem.id_restaurante)
    const repartidor = await Rep_model.findById(elem.id_repartidor)
    
    if(!cliente || !restaurante || !repartidor){
        throw Error("ids, errorneas")
    }

    const prod = this.products.every((e)=>{
        //@ts-expect-error>
       return restaurante.productos.includes(e)
    })
    if(!prod){
        //@ts-expect-error>
        throw Error(`Productos Erroneos, Disponivilidad: ${restaurante.productos}`)
    }

    cliente.orders.push(this.id)
    cliente.save()
    repartidor.orders.push(this.id)
    repartidor.save()
    next()
})
Ped_schema.post("findOneAndDelete",async function(doc: types.Order,next){
    
    const cli_o = await Cli_model.findById(doc.id_client)
    const rep = await Rep_model.findById(doc.id_repartidor)
    if(cli_o){
        cli_o.orders.filter((o)=>{
           console.log(o.toString()!==doc.id);
           return o.toString()!==doc.id
        })
        cli_o.save()
   }
   if(rep){
    rep.orders.filter((o)=>{
       return o.toString()!==doc.id
    })
    rep.save()
}
    
    next()
})

export type ped_ModelType = mongoose.Document 

export const Ped_model = mongoose.model<ped_ModelType>("Orders", Ped_schema)