import Mongoose from './mongodb-connection';
import {StudentSchema} from "./monStudentSchema";

const SectionSchema = new Mongoose.Schema({
  course_code: String,
  section_number: Number,
  teacher: {
    ref: 'Teacher',
    type: Mongoose.Schema.Types.ObjectId
  },
  start_date: Date,
  end_date: Date,
  students: [{type: Mongoose.Schema.Types.ObjectId, ref: 'Student'}],
  create_date: Date
}, {collection: 'Sections'});

export const SectionModel = Mongoose.model('Section', SectionSchema);