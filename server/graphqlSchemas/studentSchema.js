/**
 *  Def of User Schema.
 *  Also includes mutation to add new Users.
 * @type {string}
 */
const StudentSchema = `
  type Student implements User {
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
    type: UserType!
    #Sections user is enrolled in. 
    sections: [ID]
    email: String
  }
  
  extend type RootQuery {
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
    #Edit Student. Some fields are currently not allowed to be edited. See input type for a list of editable fields
    editStudent(student_id: ID!, new_data: EditStudent): Student
  }
  
  input EditStudent {
    first_name: String
    last_name: String
    unit_id: String
    sections: [ID]
    email: String
  }
  `;

export default StudentSchema;
