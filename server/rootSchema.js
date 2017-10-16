/**
 * Defines the root schema used for the GraphQL server
 */

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


/**
 * Pass makeExecutableSchema an array of type definitions
 * and resolvers.
 */
const schema = makeExecutableSchema({ typeDefs: [
  schemaDef, RootQuery, Mutation, UserSchema] , resolvers: resolvers});
//addMockFunctionsToSchema({schema});


export {schema}
