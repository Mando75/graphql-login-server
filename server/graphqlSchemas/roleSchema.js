/**
 * Schema definition for Simulation Roles
 * e.g. Employer, Employee, etc.
 * @type {string}
 */
const RoleSchema = `
  type SimulationRole {
    _id: ID!
    role: String!
  }
  
  extend type RootQuery {
    simulation_roles: [SimulationRole]
  }
  
  extend type Mutation {
    add_simulation_role(role: String!): SimulationRole
  }`;
export default RoleSchema;
