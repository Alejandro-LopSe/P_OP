import { Ped_model, ped_ModelType } from "../DB_P_OB/Order.ts";
import { Rep_ModelType } from "../DB_P_OB/Repartidor.ts";

export const Repartidor = {
    orders: async (parent: Rep_ModelType): Promise<ped_ModelType[]> => {
      const ped = await Ped_model.find({ id_repartidor: parent._id });
      return ped;
    },
  };
  