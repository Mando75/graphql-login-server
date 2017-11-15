import Mongoose from './mongodb-connection';

/**
 *
 */
export const StudentSchema = Mongoose.Schema({
  first_name: String,
  last_name: String,
  orgId: String,
  unit_id: String,
  authToken: String,
  type: String,
  create_date: Date
}, {collection: "Students"});

const StudentModel = Mongoose.model('Student', StudentSchema);

export default StudentModel;