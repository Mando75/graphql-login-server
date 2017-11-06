import * as Teacher from '../connectors/teacherConnector';

const teacherMap = {
  RootQuery: {
    async teachers() {
      return await Teacher.getTeachers();
    },
    async teacherById(teacher_id) {
      return await Teacher.findTeacherById(teacher_id);
    },
  },
  Mutation: {
    async addTeacher(obj, args) {
      return await Teacher.addTeacher(args);
    }
  }
};

export default teacherMap;