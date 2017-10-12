/**
 * Defines the root schema used for the GraphQL server
 */

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import UserSchema from './userSchema';

const RootQuery = `
  type RootQuery {
    users: [User]
    user(user_id: ID!): User
  }
`;

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
  schemaDef, RootQuery, Mutation, UserSchema
] , resolvers: {}});

// Using Mock until database is set up.
addMockFunctionsToSchema({schema});

export {schema}
