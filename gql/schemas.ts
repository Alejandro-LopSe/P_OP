// The GraphQL schema
export const typeDefs = `#graphql
 
  type Cliente {
    id: ID!
    name: String!
    email: String!
    cards: [Card]
    orders: [Order]
  }

  type Repartidor {
    id: ID!
    username: String!
    orders: [Order]
  }

  type Card {
    number: String!
    cvv: String!
    expiririty: String!
    money: Int!
  }

  type Order {
    id: String!
    id_client: Cliente!
    id_restaurante: Restaurante!
    id_repartidor: Repartidor!
    products: [String!]!
    price: Int!
    status: Status!
  }

  enum Status {
    pendiente  ,
    terminado 
  }

  type Restaurante  {
    id: String!
    name: String!
    cif: String!
    address: String!
    productos: [String!]!
  } 



  type Query {
    clientes: [Cliente!]!
    restaurantes: [Restaurante!]!
    Orders: [Order!]!
    repartidores: [Repartidor!]!
  }

  type Mutation {

    """---------------------/ADDS/-------------------------"""
    
    addCliente(
      name: String!,
      email: String!,
      number: String,
      cvv: String,
      expiririty: String,
      money: Int,
    ): Cliente!

    addCards(
      id: ID!,
      number: String!
      cvv: String!
      expiririty: String!
      money: Int!
    ): String!

    addrestaurante(
      name: String!,
      cif: String!,
      address: String!,
      productos: [String!]!
    ): Restaurante!

    addPedido(
      id_client: String!
      id_restaurante: String!
      id_repartidor: String!
      products: [String!]!
      price: Int!
      status: Status!
    ): Order!

    addRepartidor(
      username: String!
      orders: [String]
    ): Repartidor!

    """---------------------/UPDATES/-------------------------"""

    terminarPedido(
      id: ID!
    ):Order!

    updateCliente(
      id: ID!,
      name: String!,
      email: String!,
    ): Cliente!

    updateRestaurante(
      name: String!,
      cif: String!,
      address: String!,
      productos: [String!]!
    ): Restaurante!
    
    updateRepartidor(
      username: String!
    ): Repartidor!

    """--------------------/DELETES/--------------------------"""

    deleteCliente(
      id: ID!,
    ): Cliente!

    delCards(
      id: ID!,
      numbers: [ID!]!,
    ): String!

    deleteRestaurante(
      cif: String!,
    ): Restaurante!

    deleteRepartidor(
      username: String!
    ): Repartidor!
  }
`;
