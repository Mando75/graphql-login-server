/**
 * Def of SectionSchema
 * @type {string}
 */

const SectionSchema = `
  type Section {
    _id: ID!
    course_code: String!
    section_number: Int!
    instructor: Teacher!
    start_date: String!
    end_date: String!
    students: [Student]
    create_date: String
  }
  
  extend type RootQuery {
    sections: [Section]
    sectionByCodeAndNum(course_code: String!, section_number: String!) : Section
    sectionById(section_id: ID!) : Section
  }
`;

export default SectionSchema;