import * as Student from "../connectors/studentConnector";


/**
 * This defines a resolver map for anything regarding the Student Schema.
 * This includes several search queries and mutations
 * @type {{RootQuery: {StudentById: (function(*, *): Promise), StudentByInumber: (function(*, *): Promise), Students: (function(*, *): Promise)}}}
 */
const studentMap = {
  RootQuery: {
    async studentById(obj, args, context) {
      return await Student.findStudentById(args.student_id, context);
    },
    async studentByUnitId(obj, args, context) {
      return await Student.findStudentByUnitId(args.unit_id, context);
    },
    async students(obj, args, context) {
      try {
        return await Student.getStudents(context);
      } catch(e) {
        return e;
      }
    }
  },
  Mutation: {
    async addStudent(obj, args) {
      return await Student.addStudent(args);
    }
  }
};

export default studentMap;
