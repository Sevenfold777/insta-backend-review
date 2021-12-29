import { ApolloServer } from "apollo-server";
import schema from "./schema";

/// 아래는 apollo server 공식 doc
/// 가장 기본적인 타입의 Server Defintion & run
// The ApolloServer constructor requires two parameters: your schema
// typedDefinition and your set of resolvers.
const server = new ApolloServer({ schema });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
