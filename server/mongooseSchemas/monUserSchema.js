import Mongoose from './mongodb-connection';

/**
 *
 */
const UserSchema = Mongoose.Schema({
  id: Mongoose.Schema.Types.ObjectId,
  first_name: String,
  last_name: String,
  i_number: String,
  unit_id: String,
  admin: Boolean,
  simulation_role: {type: Mongoose.Schema.Types.ObjectId, ref: 'Role'},
  section: String
}, {collection: "Users"});

const UserModel = Mongoose.model('User', UserSchema);

export default UserModel;