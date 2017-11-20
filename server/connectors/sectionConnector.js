import {SectionModel} from '../mongooseSchemas/monSectionSchema'

/**
 *
 * @returns {Promise.<void>}
 */
export async function getSections() {
  return await SectionModel.find().populate('teacher students').exec((err, sections) => {
    if(err) {
      console.log('Error when finding sections');
      return err;
    } else {
      return sections;
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
  return await SectionModel.findOne({course_code: code, section_number: num}).populate('teacher students').exec((err, section) => {
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
export async function findSectionById(id) {
  return await SectionModel.findById(id).populate('teacher students').exec((err, section) => {
    if (err) {
      console.log("error when finding section");
      return err;
    } else {
      return section;
    }
  });
}



