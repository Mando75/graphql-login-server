import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import UserSchema from './schemas/userSchema';
import { resolvers } from './resolvers/rootResolver';

const RootQuery = `
  type RootQuery {
    users: [User]
    user(user_id: ID!): User
  }`;

const Mutation = ` type Mutation { 
    emptyMut: RootQuery
 }`;

const schemaDef = `
  schema {
    query: RootQuery
    mutation: Mutation
  }`;

const schema = makeExecutableSchema({ typeDefs: [
  schemaDef, RootQuery, Mutation, UserSchema
] , resolvers: resolvers});
//addMockFunctionsToSchema({schema});

export {schema}
