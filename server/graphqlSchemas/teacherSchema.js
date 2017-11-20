const TeacherSchema = `
  type Teacher {
    #Unique database identifier
    _id: ID!
    #Self descriptive
    first_name: String!
    #Self descriptive
    last_name: String!
    #Self descriptive
    email: String!
    #List of sections this teacher owns
    sections: [ID!]
    #User type
    type: String!
  }
  
  type UserQuery {
    #Returns a list of all teachers
    teachers: [Teacher]
    #Finds one teacher by db _id field
    teacherById(teacher_id: ID!): Teacher
  }
  
  extend type Mutation {
    addTeacher(first_name: String!, last_name: String!, email: String!, 
               password: String!): Teacher
  }
`;

export default TeacherSchema;