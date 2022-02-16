require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import express from "express";
import http from "http";
import schema from "./schema";
import { getUser } from "./users/users.utils";
import logger from "morgan";
import { graphqlUploadExpress } from "graphql-upload";

/// 아래는 apollo server 공식 doc
/// 가장 기본적인 타입의 Server Defintion & run
// The ApolloServer constructor requires two parameters: your schema
// typedDefinition and your set of resolvers.
/*
const server = new ApolloServer({
  schema,

  // to check the user validtity
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },

  //plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});


// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
*/

// Based on "https://www.apollographql.com/docs/apollo-server/integrations/middleware/"
async function startApolloServer() {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  // Normal Apollo Server initialization + Drain Plugin
  const server = new ApolloServer({
    introspection: true,
    schema,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  // set logger(morgan)
  app.use(logger("tiny"));

  // for uploading files
  app.use(graphqlUploadExpress());

  // Additional Required Logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });

  // modify server startup
  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
