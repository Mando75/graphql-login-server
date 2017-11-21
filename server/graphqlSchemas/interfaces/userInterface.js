export const userInterface = `
    interface User {
      first_name: String!
      last_name: String!
      _id: ID!
      email: String
      type: UserType!
    }
    
    enum UserType {
      student
      teacher
    }
    `;
