const TeacherSchema = `
  type Teacher {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    sections: [ID!]
    type: String!
  }
  
  extend type RootQuery {
    teachers: [Teacher]
    teacherById(teacher_id: ID!): Teacher
  }
  
  extend type Mutation {
    addTeacher(first_name: String!, last_name: String!, email: String!, 
               password: String!): Teacher
  }
`;

export default TeacherSchema;