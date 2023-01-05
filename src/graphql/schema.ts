import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from "@graphql-tools/schema";
import userResolvers from './resolvers/users';
import userTypeDefs from './typeDefs/users';

const typeDefs = mergeTypeDefs([userTypeDefs]) as any;
const resolvers = mergeResolvers([userResolvers]) as any;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
