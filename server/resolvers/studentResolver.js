import * as Student from "../connectors/studentConnector";


/**
 * This defines a resolver map for anything regarding the Student Schema.
 * This includes several search queries and mutations
 * @type {{RootQuery: {studentById(*, *, *=): Promise<*>, studentByUnitId(*, *, *=): Promise<*>, students(*, *, *=): Promise<*>}, Mutation: {addStudent(*, *=): Promise<*>, editStudent(*, *, *=): Promise<*>}}}
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
      return await Student.getStudents(context);
    }
  },
  Mutation: {
    async addStudent(obj, args) {
      return await Student.addStudent(args);
    },
    async editStudent(obj, args, context) {
      return await Student.editStudent(args._id, args.new_data, context)
    }
  }
};

export default studentMap;
