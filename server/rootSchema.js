/**
 * Defines the root schema used for the GraphQL server
 */

import { makeExecutableSchema,} from 'graphql-tools';
import {userInterface} from "./graphqlSchemas/interfaces/userInterface";
import StudentSchema from './graphqlSchemas/studentSchema';
import TeacherSchema from './graphqlSchemas/teacherSchema';
import SectionSchema from './graphqlSchemas/sectionSchema';
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
const schema = makeExecutableSchema({ typeDefs: [schemaDef, RootQuery, Mutation, userInterface, StudentSchema, SectionSchema, TeacherSchema],
                                      resolvers: resolvers});



export {schema}
