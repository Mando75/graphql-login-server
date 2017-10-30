import Mongoose from './mongodb-connection';
import {TypeSchema} from "./monTypeSchema";

export const ExpSchema= Mongoose.Schema({
  _id: Mongoose.Types.ObjectId,
  name: String,
  Types: [TypeSchema]
});

const ExpModel = Mongoose.model('Experiment', ExpSchema);

export default ExpModel;