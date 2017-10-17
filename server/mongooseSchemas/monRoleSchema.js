import Mongoose from 'server/mongooseSchemas/mongodb-connection';

const SimRoleSchema = Mongoose.Schema({
  id: Mongoose.Schema.Types.ObjectId,
  role: String
});

const SimRoleModel = Mongoose.model('Role', SimRoleSchema);

export default SimRoleModel;

