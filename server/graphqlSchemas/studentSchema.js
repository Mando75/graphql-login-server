/**
 *  Def of User Schema.
 *  Also includes mutation to add new Users.
 * @type {string}
 */
const StudentSchema = `
  type Student {
    #Unique Database id field
    _id:  ID!
    #Self descriptive
    first_name: String!
    #Self descriptive
    last_name: String!
    #Used for logging in to service
    unit_id: String
    #Stored authentication token
    authToken: String
    #User type
    type: String
    #Sections user is enrolled in. 
    sections: [ID]
  }
  
  extend type UserQuery {
    #Returns a list of all students
    students: [Student]
    #Returns a student using db _id field
    studentById(student_id: ID!): Student
    #Returns a student using unit_id field
    studentByUnitId(unit_id: String!): Student
  }
  
  extend type Mutation {
    #Add student. It is currently not recommended to use this Mutation, as several fields will be left blank 
    addStudent(first_name: String!, last_name: String!, orgId: String!): Student
  }
  `;

export default StudentSchema;