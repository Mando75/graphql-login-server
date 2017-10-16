/**
 *  Def of User Schema.
 *  Also includes mutation to add new Users.
 * @type {string}
 */
const UserSchema = `
  type User {
    id:  ID!
    first_name: String!
    last_name: String!
    i_number: String!
    admin: Boolean
    simulation_role: String 
  }
  
  extend type Mutation {
    addUser(first_name: String!, last_name: String!, i_number: String!, admin: Boolean, simulation_role: String): User 
  }
  `;

export default UserSchema;