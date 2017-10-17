/**
 * Schema definition for Simulation Roles
 * e.g. Employer, Employee, etc.
 * @type {string}
 */
const RoleSchema = `
  type SimulationRole {
    _id: ID!
    role: String
  }
`;
export default RoleSchema;
