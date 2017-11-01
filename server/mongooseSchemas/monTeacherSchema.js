import Mongoose from './mongodb-connection';

/**
 *
 */
const TeacherSchema = Mongoose.Schema({
  id: Mongoose.Schema.Types.ObjectId,
  first_name: String,
  last_name: String,
  orgId: String,
  email: String,
  admin: Boolean,
  password: String,
  sections: [String],
  authToken: String,
  type: String
}, {collection: "Teachers"});

const TeacherModel = Mongoose.model('Teacher', TeacherSchema);

export default TeacherModel;