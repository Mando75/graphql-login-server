import SimRoleModel from '../mongooseSchemas/monRoleSchema';

export async function getRoles() {
  return await SimRoleModel.find((err, roles) => {
    if (err)
      console.log('Error when finding users');
    else
      return roles;
  });
}

