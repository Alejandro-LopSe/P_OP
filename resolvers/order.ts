import { Cli_ModelType, Cli_model } from "../DB_P_OB/Cliente.ts";
import {  ped_ModelType } from "../DB_P_OB/Order.ts";
import {  } from "../DB_P_OB/Repartidor.ts";

export const Order = {
    id_client: async (parent: ped_ModelType): Promise<Cli_ModelType> => {
      //@ts-expect-error>
      const cli = await Cli_model.findOne({_id: parent.id_client} );
      console.log(cli);
      
      return cli!;
    },
  };
  