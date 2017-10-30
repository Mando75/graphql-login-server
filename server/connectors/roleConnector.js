import SimRoleModel from '../mongooseSchemas/monRoleSchema';


export async function getRoles() {
  return await SimRoleModel.find((err, roles) => {
    if (err)
      console.log('Error when finding users');
    else
      return roles;
  });
}

export function addRole(args) {
  const role = new SimRoleModel({role: args.role});
  role.save();
  return role;
}