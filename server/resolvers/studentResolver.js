import * as Student from "../connectors/studentConnector";


/**
 * This defines a resolver map for anything regarding the Student Schema.
 * This includes several search queries and mutations
 * @type {{RootQuery: {StudentById: (function(*, *): Promise), StudentByInumber: (function(*, *): Promise), Students: (function(*, *): Promise)}}}
 */
const studentMap = {
  RootQuery: {
    async studentById(obj, args) {
      return await Student.findStudentById(args.student_id);
    },
    async studentByOrgId(obj, args) {
      return await Student.findStudentByInumber(args.orgId);
    },
    async students(obj, args) {
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
