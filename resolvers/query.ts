
import { Cli_ModelType, Cli_model } from "../DB_P_OB/Cliente.ts";
import { Ped_model, ped_ModelType } from "../DB_P_OB/Order.ts";
import { Rep_ModelType, Rep_model } from "../DB_P_OB/Repartidor.ts";
import { Res_ModelType, Res_model } from "../DB_P_OB/Restaurante.ts";

export const Query = {
    clientes: async (): Promise<Cli_ModelType[]> => {
        const cliente = await Cli_model.find({})
        return cliente
    },
    restaurantes: async (): Promise<Res_ModelType[]> => {
        const restaurantes = await Res_model.find({})
        return restaurantes
    },
    repartidores: async (): Promise<Rep_ModelType[]> => {
        const repartidor = await Rep_model.find({})
        return repartidor
    },
    Orders: async (): Promise<ped_ModelType[]> => {
        const pediod = await Ped_model.find({})
        return pediod
    }
}