import Mongoose from 'server/mongooseSchemas/mongodb-connection';

const RoleSchema = Mongoose.Schema({
  id: Mongoose.Schema.Types.ObjectId,
  name: String
});

const RoleModel = Mongoose.model('Role', RoleSchema);

export default RoleModel;