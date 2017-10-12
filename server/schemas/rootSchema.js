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
  }
`;

const schema = makeExecutableSchema({ typeDefs: [
  schemaDef, RootQuery, Mutation, UserSchema
] , resolvers: {}});
addMockFunctionsToSchema({schema});

export {schema}
