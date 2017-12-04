
const TeacherSchema = `
  type Teacher implements User{
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
    type: UserType!
    #saved Auth Token
    authToken: String
  }
  
  extend type RootQuery {
    #Returns a list of all teachers
    teachers: [Teacher]
    #Finds one teacher by db _id field
    teacherById(teacher_id: ID!): Teacher
  }
  
  extend type Mutation {
    addTeacher(teacher: CreateTeacher!): Teacher
    editTeacher(teacher_id: ID!, new_data: EditTeacher!): Teacher
  }
  
  input CreateTeacher {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
  }
  
  input EditTeacher {
    first_name: String
    last_name: String
    email: String
    sections: [ID]
  }
`;

export default TeacherSchema;