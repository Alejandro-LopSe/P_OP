import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Query } from "./resolvers/query.ts";
import { Cliente } from "./resolvers/clientes.ts";
import { Repartidor } from "./resolvers/repartidor.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { typeDefs } from "./gql/schemas.ts";
import mongoose from "mongoose";
import { Order } from "./resolvers/order.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");


// Connect to MongoDB
await mongoose.connect(MONGO_URL!);
 
console.info("🚀 Connected to MongoDB");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Cliente,
    Repartidor,
    Order,
    Mutation
  },
});

const x= await startStandaloneServer(server);
console.info(`🚀 Server ready at ${x.url} `);
