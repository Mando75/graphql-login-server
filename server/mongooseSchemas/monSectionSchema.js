import Mongoose from './mongodb-connection';
import {StudentSchema} from "./monStudentSchema";

const SectionSchema = new Mongoose.Schema({
  number: Number,
  instructor: Mongoose.Types.ObjectId,
  start_date: Date,
  end_date: Date,
  students: [StudentSchema]
}, {collection: 'Sections'});

export const SectionModel = Mongoose.model('Section', SectionSchema);