import Mongoose from './mongodb-connection';

/**
 *
 */
export const StudentSchema = Mongoose.Schema({
  first_name: String,
  last_name: String,
  org_id: String,
  unit_id: String,
  authToken: String,
  type: String,
  email: String,
  sections: [Mongoose.Schema.Types.ObjectId],
  create_date: Date
}, {collection: "Students"});

const StudentModel = Mongoose.model('Student', StudentSchema);

export default StudentModel;