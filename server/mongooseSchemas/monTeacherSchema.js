import Mongoose from './mongodb-connection';

/**
 * Teacher Schema
 */
const TeacherSchema = Mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  sections: [Number],
  authToken: String,
  type: String,
  create_date: String
}, {collection: "Teachers"});

const TeacherModel = Mongoose.model('Teacher', TeacherSchema);

export default TeacherModel;