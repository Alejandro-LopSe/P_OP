import mongoose from "mongoose"
import {Cards, Cliente_ts} from "../types_vs.ts"
import { Ped_model } from "./Order.ts";

const Schema = mongoose.Schema

const Cli_schema = new Schema({
    name: {type: String,required: true},
    email: {type: String,required: true,unique: true},
    cards: [{
        number: {type: String,required: true},
        cvv: {type: String,required: true},
        expiririty: {type: String,required: true},
        money: {type: Number,required: true,min:0},
    }],
    orders: [{type: String}]
})

Cli_schema.pre("save",async function(next){
    if(this.isNew){
        const exist = await Cli_model.findOne({email: this.email})
        if(exist){
            throw Error("ya existe cliente.")
        }
    }
    this.cards = this.cards.reduce((acc: Cards[], elem: Cards)=>{
        const f = acc.find((e: Cards)=>{
            return (e.number===elem.number)
        })
        if(f){
            return acc
        }else{
            return [...acc,elem]
        }
    },[])
    next()
})
Cli_schema.post("findOneAndDelete", function(doc,next){

    doc.orders.forEach(async (order: string) => {
        await  Ped_model.findByIdAndDelete(order)
    });
    next()
})


export type Cli_ModelType = mongoose.Document & Omit<Cliente_ts,"orders"> & {
    orders: [{types: mongoose.Types.ObjectId}],
}
export const Cli_model = mongoose.model<Cli_ModelType>("Clients", Cli_schema)