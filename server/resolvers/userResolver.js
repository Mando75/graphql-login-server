import * as User from "../connectors/userConnector";


/**
 * This defines a resolver map for anything regarding the User Schema.
 * This includes several search queries and mutations
 * @type {{RootQuery: {userById: (function(*, *): Promise), userByOrgId: (function(*, *): Promise), users: (function(*, *): Promise)}}}
 */
const userMap = {
  RootQuery: {
    async userById(obj, args) {
      return await User.findUserById(args.user_id);
    },
    async userByOrgId(obj, args) {
      return await User.findUserByOrgId(args.org_id);
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
