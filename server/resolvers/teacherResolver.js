import * as Teacher from '../connectors/teacherConnector';


const teacherMap = {
  RootQuery: {
    async teachers(obj, args, context) {
      return await Teacher.getTeachers(context);
    },
    async teacherById(obj, args, context) {
      return await Teacher.findTeacherById(args.teacher_id, context);
    },
  },
  Mutation: {
    async addTeacher(obj, args) {
      return await Teacher.addTeacher(args);
    }
  }
};

export default teacherMap;