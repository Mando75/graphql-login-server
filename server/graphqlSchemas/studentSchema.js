/**
 *  Def of User Schema.
 *  Also includes mutation to add new Users.
 * @type {string}
 */
const StudentSchema = `
  type Student {
    _id:  ID!
    first_name: String!
    last_name: String!
    orgId: String!
    unit_id: String
    simulation_role: String
    section: String
    authToken: String
  }
  
  extend type RootQuery {
    students: [Student]
    studentById(student_id: ID!): Student
    studentByOrgId(orgId: String!): Student
  }
  
  extend type Mutation {
    addStudent(first_name: String!, last_name: String!, orgId: String!, 
            admin: Boolean, simulation_role: String, section: String!): Student
  }
  `;

export default StudentSchema;