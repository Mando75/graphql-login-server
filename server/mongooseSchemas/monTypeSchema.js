import Mongoose from './mongodb-connection';
import SessionSchema from './monSessSchema';

export const TypeSchema = Mongoose.Schema({
  _id: Mongoose.Types.ObjectId,
  name: String,
  distribution: Number,
  Sessions: [SessionSchema]
});

const TypeModel = Mongoose.model('Type', TypeSchema);

export default TypeModel;

