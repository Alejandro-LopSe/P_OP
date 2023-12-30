export enum Status {
    pendiente = "pendiente",
    terminado = "terminado"
}
export type Cliente_ts = {
    id?: string
    name: string
    email: string
    cards: Cards[]
    orders: string[]
}
export type Cards ={
    number: string
    cvv: string
    expiririty: string
    money: number
}
export type repartidor = {
    username: string
    orders: string[]
}
export type Order = {
    id?: string
    id_client: string
    id_restaurante: string
    id_repartidor: string
    products: string[]
    price: number
    status: Status
}
export type Restaurante = {
    id?: string
    name: string
    cif: string
    address: string
    productos: string[]
}

