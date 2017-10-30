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
    org_id: String!
    unit_id: String
    admin: Boolean
    simulation_role: String
    section: String
  }
  
  extend type RootQuery {
    users: [User]
    userById(user_id: ID!): User
    userByOrgId(org_id: String!): User
  }
  
  extend type Mutation {
    addUser(first_name: String!, last_name: String!, org_id: String!, 
            admin: Boolean, simulation_role: String, section: String!): User 
  }
  `;

export default UserSchema;