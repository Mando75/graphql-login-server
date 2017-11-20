import * as Student from "../connectors/studentConnector";


/**
 * This defines a resolver map for anything regarding the Student Schema.
 * This includes several search queries and mutations
 * @type {{RootQuery: {StudentById: (function(*, *): Promise), StudentByInumber: (function(*, *): Promise), Students: (function(*, *): Promise)}}}
 */
const studentMap = {
  UserQuery: {
    async studentById(obj, args) {
      return await Student.findStudentById(args.student_id);
    },
    async studentByUnitId(obj, args) {
      return await Student.findStudentByUnitId(args.unit_id);
    },
    async students(obj, args) {
      console.log(obj, args);
      return await Student.getStudents();
    }
  },
  Mutation: {
    async addStudent(obj, args) {
      return await Student.addStudent(args);
    }
  }
};

export default studentMap;
