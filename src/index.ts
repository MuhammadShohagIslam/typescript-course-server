import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import connectionDatabase from './config/db';
import schema from "./graphql/schema";
dotenv.config();

const PORT = 4000;

const app = express();
const httpServer = createServer(app);

// Set up WebSocket server.
const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
});
const serverCleanup = useServer({ schema }, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
    schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});

await server.start();
app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
        context: async ({ req }) => ({ req }),
    })
);

// Now that our HTTP server is fully set up, actually listen.
httpServer.listen(PORT,() => {
    console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`);
    console.log(
        `🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`
    );
    connectionDatabase();
});
