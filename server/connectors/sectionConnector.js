import {SectionModel} from '../mongooseSchemas/monSectionSchema';
import {SectionRule } from "../auth/rules/sectionRule";

/**
 *
 * @returns {Promise.<void>}
 */
export async function getSections(context) {
  return await SectionModel.find().populate('teacher students', '_id first_name last_name email type unit_id').exec((err, sections) => {
    if (err) {
      console.log('Error when finding sections');
      return err;
    } else {
      return sections.map(section => new SectionRule(section, context));
    }
  })
}

/**
 *
 * @param code
 * @param num
 * @returns {Promise.<*>}
 */
export async function findSectionByCodeAndNum(code, num) {
  return await SectionModel.findOne({
    course_code: code,
    section_number: num
  }).populate('teacher students').exec((err, section) => {
    if (err) {
      console.log('Error when finding section');
      return err;
    } else {
      return section;
    }
  });
}

/**
 *
 * @param id
 * @returns {Promise.<*>}
 */
export async function findSectionById(id, context) {
  return await SectionModel.findById(id).populate('teacher students',
      'first_name last_name _id email type unit_id').exec((err, section) => {
    if (err) {
      console.log("error when finding section");
      return err;
    } else {
      return section;
    }
  });
}

/**
 * Returns an array of sections taught by a particular teacher
 * @param id
 * @returns {Promise.<*>}
 */
export async function findSectionsByTeacherId(id) {
  return await SectionModel.find({teacher: id}).populate('teacher students').exec((err, sections) => {
    if (err) {
      console.log("error when finding section");
      return err;
    }
    else {
      return sections
    }
  })
}



