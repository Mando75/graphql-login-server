const TeacherSchema = `
  type Teacher {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    sections: [Int]
    type: String!
  }
  
  extend type RootQuery {
    teachers: [Teacher]
    teacherById(teacher_id: ID!): Teacher
  }
  
  extend type Mutation {
    addTeacher(first_name: String!, last_name: String!, email: String!, 
               password: String!, sections: [Int]): Teacher
  }
`;

export default TeacherSchema;