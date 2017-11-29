import Rule from 'graphql-rule';
import {TeacherRule} from "./teacherRule";
import {StudentRule} from "./studentRule";

export const SectionRule = Rule.create({
  name: 'Section',
  props: {
    isTeacher: model => model.$context.type === 'teacher',
    isOwner: model => model.$data._id == model.$context._id,
  },
  defaultRule: {
    read: model => true,

    readFail: (model, key) => { throw new Error(`Cannot access '${key}`) }
  },
  rules: {
    _id: {},
    course_code: {},
    section_number: {},
    teacher: {},
    students: {},
    start_date: {},
    end_date: {},
  }
});

