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

export function addUser(data) {
  // TODO Fix this
  const unit_id = 0;
  const newUser = new UserModel({first_name: data.first_name, last_name: data.last_name, i_number: data.i_number, admin: false, simulation_role: null, section: data.section});

}