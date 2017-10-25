import * as Role from '../connectors/roleConnector';

const RoleMap = {
  RootQuery: {
    async simulation_roles(obj, args) {
      return await Role.getRoles();
    }
  },
  Mutation: {
    async add_simulation_role(obj, args) {
      return await Role.addRole(args);
    }
  }
};

export default RoleMap;
