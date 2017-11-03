/**
 * Defines the root schema used for the GraphQL server
 */

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import StudentSchema from './graphqlSchemas/studentSchema';
import { resolvers } from './resolvers/rootResolver';

const RootQuery = `
  type RootQuery {
    test: Boolean
  }`;

const Mutation = ` type Mutation { 
    test: RootQuery
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
const schema = makeExecutableSchema({ typeDefs: [schemaDef, RootQuery, Mutation, StudentSchema],
                                      resolvers: resolvers});



export {schema}
