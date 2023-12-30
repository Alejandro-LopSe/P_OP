import { Cli_ModelType, Cli_model } from "../DB_P_OB/Cliente.ts";
import { Ped_model, ped_ModelType } from "../DB_P_OB/Order.ts";
import { Rep_ModelType, Rep_model } from "../DB_P_OB/Repartidor.ts";
import { Res_ModelType, Res_model } from "../DB_P_OB/Restaurante.ts";
import { Cards, Status } from "../types_vs.ts";


export const Mutation  = {
    addCliente: async (_:unknown, args:{name: string, email: string, number: string, cvv: string, expiririty: string, money: number}): Promise<Cli_ModelType> => {
        
        const {name,email,number,cvv,expiririty,money} = args
        const cliente = {
            name: name,
            email: email
        }
        if(number && cvv && expiririty && money){
            const cliente_c = {
                name: name,
                email: email,
                cards: [{
                    number: number,
                    cvv: cvv,
                    expiririty: expiririty,
                    money: money
                }]
            }
            const F_client_c = await Cli_model.create(cliente_c)
        return F_client_c
        }else{
            const F_client = await Cli_model.create(cliente)
            return F_client
        }        
        
    },
    updateCliente: async (_:unknown, args:{id: string, name: string, email: string}): Promise<Cli_ModelType> => {
        
        const {id,name,email} = args
        const cliente = await Cli_model.findById(id)

        if(!cliente){
            throw Error("no existe")
        }
        
        cliente.name=name
        cliente.email=email
        const c = await cliente.save()
        return c
    },
    deleteCliente: async (_:unknown, args:{id: string}): Promise<Cli_ModelType> => {
        
        const {id} = args
        const cliente = await Cli_model.findByIdAndDelete(id)

        if(!cliente){
            throw Error("no existe")
        }
        return cliente
    },
    addCards: async ( _:unknown, args: {id: string, number: string, cvv: string, expiririty: string, money: number}): Promise<string> => {

        const cliente = await Cli_model.findById(args.id)

        if(!cliente){
            throw Error("Cliente no encontrado")
        }
        
        const card = {
            number: args.number,
            cvv: args.cvv,
            expiririty: args.expiririty,
            money: args.money
        }

        cliente.cards.push(card)
        
        const f_client = await cliente.save()
        console.log(f_client);
        return  "Tarjeta añadida"
    },
    delCards: async ( _:unknown, args: {numbers: string[],id: string}): Promise<string> => {

        const {id,numbers}= args
        const cliente = await Cli_model.findById(id)

        if(!cliente){
            throw Error("Cliente no encontrado")
        }
        cliente.cards = cliente.cards.reduce((acc: Cards[], elem: Cards)=>{
            const f=numbers.find((e: string)=>{return e===elem.number})
            console.log(f);
            
            if(f){
                console.log(`${elem}+++`);
                
                return acc
            }else{
                return[...acc,elem]
            }
        },[])
        
        const f_client = await cliente.save()
        console.log(f_client);
        return  "Tarjetas eliminadas"
    },


    addrestaurante: async ( _:unknown, args: {name: string, cif: string, address: string, productos: string[]}): Promise<Res_ModelType> => {
        const restaurante = {
            name: args.name,
            cif: args.cif,
            address: args.address,
            productos: args.productos
        }
        
        const f_res = await Res_model.create(restaurante)
        return f_res
    },
    updateRestaurante: async ( _:unknown, args: {name: string, cif: string, address: string, productos: string[]}): Promise<Res_ModelType> => {
        const restaurante = {
            name: args.name,
            cif: args.cif,
            address: args.address,
            productos: args.productos
        }
        
        const f_res = await Res_model.findOneAndUpdate({cif: args.cif},restaurante)
        if(!f_res){
            throw Error()
        }
        return f_res
    },
    deleteRestaurante: async ( _:unknown, args: { cif: string}): Promise<Res_ModelType> => {
        
        const f_res = await Res_model.findOneAndDelete({cif: args.cif})
        if(!f_res){
            throw Error()
        }
        return f_res
    },
    
    addRepartidor: async ( _:unknown, args: {username: string, orders: string[]}): Promise<Rep_ModelType> => {
        
        const repartidor = {
            username: args.username,
            orders: args.orders
        }
        
        const f_repartidor = await Rep_model.create(repartidor)
        return  f_repartidor
    },
    updateRepartidor: async ( _:unknown, args: {username: string}): Promise<Rep_ModelType> => {
        

        
        const f_repartidor = await Rep_model.findOneAndUpdate({username: args.username},{$set: {username: args.username}})
        if(!f_repartidor){
            throw Error()
        }
        return  f_repartidor
    },

    deleteRepartidor: async ( _:unknown, args: {username: string}): Promise<Rep_ModelType> => {
        

        
        const f_repartidor = await Rep_model.findOneAndDelete({username: args.username})
        if(!f_repartidor){
            throw Error()
        }
        return  f_repartidor
    },
    addPedido: async ( _:unknown, args: {id_client: string, id_restaurante: string, id_repartidor: string, products: string[], price: number, status: Status}): Promise<ped_ModelType> => {
        

        const cli = await Cli_model.findById(args.id_client)
        const res =await Res_model.findById(args.id_restaurante)
        const rep =await Rep_model.findById(args.id_repartidor)

        if(!cli || !rep || !res){
            throw Error("No se ha encontrado alguno de los ids.")
        }

        const Order = {
            id_client: args.id_client,
            id_restaurante: args.id_restaurante,
            id_repartidor: args.id_repartidor,
            products: args.products,
            price: args.price,
            status: args.status
        }
        
        const ped_f = await Ped_model.create(Order)
        console.log(ped_f);
        return  ped_f
    },

    terminarPedido: async ( _:unknown, args: {id: string}): Promise<ped_ModelType> => {
        
        const pedido = await Ped_model.findByIdAndUpdate(args.id,{$set: {status: "terminado"}})

        if(!pedido){
            throw Error("No se ha encontrado alguno de los ids.")
        }
        
        return  pedido
    }
}