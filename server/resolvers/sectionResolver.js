import * as Section from "../connectors/sectionConnector";

/**
 *
 * @type {{RootQuery: {sections: (function(*, *): Promise), sectionByCodeAndNum: (function(*, *): Promise), sectionById: (function(*, *): Promise)}}}
 */
const sectionMap = {
  RootQuery: {
    async sections(obj, args) {
      return await Section.getSections();
    },
    async sectionByCodeAndNum(obj, args) {
      return await Section.findSectionByCodeAndNum(args.course_code, args.section_number);
    },
    async sectionById(obj, args) {
      return await Section.findSectionById(args.section_id)
    },
    async sectionsByTeacherId(obj, args) {
      return await Section.findSectionsByTeacherId(args.teacher_id)
    }
  }
};

export default sectionMap;