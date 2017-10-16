import UserModel from '../mongooseSchemas/monUserSchema';

export function findUserById(user_id) {
  return UserModel.findById(user_id, (err, user)=>{
    if(err) { console.log('Error when finding' + user_id); }
    else { return user; }
  });
}

export function getUsers() {
  return UserModel.find((err, users)=> {
    if(err) { console.log('Error when finding users');}
    else {console.log(users); return users;}
  });
}

export function findUserByInumber(i_number) {
  return UserModel.findOne({i_number: i_number}, (err, user)=>{
    if(err) { console.log('Error when finding' + i_number); }
    else { return user; }
  });
}