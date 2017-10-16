import UserModel from '../mongooseSchemas/monUserSchema';

export function findUserById(user_id) {
  return UserModel.findById(user_id, (err, user)=>{
    if(err) { console.log('Error when finding' + user_id); }
    else { return user; }
  });
}
