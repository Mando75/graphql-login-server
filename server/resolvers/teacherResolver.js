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
    async addTeacher(obj, args, context) {
      return await Teacher.addTeacher(args.teacher);
    },
    async editTeacher(obj, args, context) {
      const teacher = await Teacher.editTeacher(args.teacher_id, args.new_data, context);
      console.log(teacher);
      return teacher
    }
  }
};

export default teacherMap;