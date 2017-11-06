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
    unit_id: String
    section: String
    authToken: String
    type: String
  }
  
  extend type RootQuery {
    students: [Student]
    studentById(student_id: ID!): Student
    studentByUnitId(unit_id: String!): Student
  }
  
  extend type Mutation {
    addStudent(first_name: String!, last_name: String!, orgId: String!,
          section: String!): Student
  }
  `;

export default StudentSchema;