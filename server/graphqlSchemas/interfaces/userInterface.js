export const userInterface = `
    interface User {
      first_name: String!
      last_name: String!
      _id: ID!
      email: String
      type: UserType!
      authToken: String
    }
    
    enum UserType {
      student
      teacher
    }
    `;
