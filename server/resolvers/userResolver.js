import * as User from "../connectors/userConnector";


/**
 * This defines a resolver map for anything regarding the User Schema.
 * This includes several search queries and mutations
 * @type {{RootQuery: {userById: (function(*, *): Promise), userByInumber: (function(*, *): Promise), users: (function(*, *): Promise)}}}
 */
const userMap = {
  RootQuery: {
    async userById(obj, args) {
      return await User.findUserById(args.user_id);
    },
    async userByInumber(obj, args) {
      return await User.findUserByInumber(args.i_number);
    },
    async users(obj, args) {
      return await User.getUsers();
    }
  },
  Mutation: {
    async addUser(obj, args) {
      return await User.addUser(args);
    }
  }

};

export default userMap;
