import mongoose from "mongoose"
import * as types from "../types_vs.ts"

const Schema = mongoose.Schema

const Rep_schema = new Schema({
    username: {type: String,required: true,unique:true},
    orders: [{type: String}]
})/*
Rep_schema.pre("save",async function(next){

    const can = await Ped_model.findOne({id_repartidor: this.id,status: "pendiente"})
    if(can){
        throw Error("error")
    }
    next()
    
})*/

export type Rep_ModelType = mongoose.Document & Omit<types.repartidor,"orders"> & {
    orders: [{types: mongoose.Types.ObjectId}]
}
export const Rep_model = mongoose.model<Rep_ModelType>("Repartidores", Rep_schema)