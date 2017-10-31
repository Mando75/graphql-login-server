import Mongoose from './mongodb-connection';

/**
 *
 */
const StudentSchema = Mongoose.Schema({
  id: Mongoose.Schema.Types.ObjectId,
  first_name: String,
  last_name: String,
  orgId: String,
  unit_id: String,
  admin: Boolean,
  simulation_role: {type: Mongoose.Schema.Types.ObjectId, ref: 'Role'},
  section: String
}, {collection: "Users"});

const StudentModel = Mongoose.model('Student', StudentSchema);

export default StudentModel;