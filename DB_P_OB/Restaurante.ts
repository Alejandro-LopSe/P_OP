import mongoose from "mongoose"


const Schema = mongoose.Schema

const Res_schema = new Schema({
    name: {type: String,required: true,unique:true},
    cif: {type: String,required: true,unique:true},
    address: {type: String,required: true},
    productos: [{type: String,required: true}]
})

export type Res_ModelType = mongoose.Document 

export const Res_model = mongoose.model<Res_ModelType>("Restaurante", Res_schema)