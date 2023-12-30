import { Cli_ModelType } from "../DB_P_OB/Cliente.ts";
import { Ped_model, ped_ModelType } from "../DB_P_OB/Order.ts";

export const Cliente = {
  orders: async (parent: Cli_ModelType): Promise<ped_ModelType[]> => {
    const ped = await Ped_model.find({ id_client: parent._id });
    
    return ped;
  },
};
