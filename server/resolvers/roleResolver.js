import * as Role from '../connectors/roleConnector';

const RoleMap = {
  RootQuery: {
    async simulation_roles(obj, args) {
      return await Role.getRoles();
    }
  },
  Mutation: {
    // TODO Add mutation function
    //async
  }
};

export default RoleMap;
