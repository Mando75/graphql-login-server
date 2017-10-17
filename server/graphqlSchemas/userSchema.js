/**
 *  Def of User Schema.
 *  Also includes mutation to add new Users.
 * @type {string}
 */
const UserSchema = `
  type User {
    _id:  ID!
    first_name: String!
    last_name: String!
    i_number: String!
    unit_id: String
    admin: Boolean
    simulation_role: String
    section: String
  }
  
  extend type RootQuery {
    users: [User]
    userById(user_id: ID!): User
    userByInumber(i_number: String!): User
  }
  
  extend type Mutation {
    addUser(first_name: String!, last_name: String!, i_number: String!, unit_id: String!, admin: Boolean, simulation_role: String, section: String): User 
  }
  `;

export default UserSchema;