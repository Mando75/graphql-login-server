/**
 * Def of SectionSchema
 * @type {string}
 */

const SectionSchema = `
  type Section {
    #Unique database identifier
    _id: ID!
    #Course identifier (i.e. ECON 101)
    course_code: String!
    #Section identifier (i.e. 32)
    section_number: Int!
    #Owner/Instructor of the section.
    #Returns a Teacher object with its associated fields
    teacher: Teacher!
    #Starting date of the course
    start_date: String!
    #Ending date of the course
    end_date: String!
    #List of students enrolled in the section. 
    #Each list entry returns a student object with associated fields
    students: [Student]
    #Date of section creation
    create_date: String
  }
  
  extend type RootQuery {
    #Returns a list of all sections
    sections: [Section]
    #Find a section by Course Code and Section Number
    sectionByCodeAndNum(course_code: String!, section_number: String!) : Section
    #Find a section using unique database _id field
    sectionById(section_id: ID!) : Section
    #Find all sections taught by a specific teacher
    sectionsByTeacherId(teacher_id: ID!) : [Section]
  }
`;

export default SectionSchema;