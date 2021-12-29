import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { mergeSchemas } from "@graphql-tools/schema";

/// 1. collect every files corresponding "the type"
// ** --> inside of evey folder; * --> every File
const loadTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

/// 2. merge collected the typeDefs.js && resolvers.js --> merge ALL
const typeDefs = mergeTypeDefs(loadTypeDefs);
const resolvers = mergeResolvers(loadResolvers);

/// 3. build Schema using merged TypeDefs, Resolvers
const schema = mergeSchemas({typeDefs, resolvers});

export default schema;







