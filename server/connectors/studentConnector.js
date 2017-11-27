import StudentModel from '../mongooseSchemas/monStudentSchema';

/**
 * A search query for finding users by MongoDb id. Returns
 * a single database object in the form of a Promise.
 * @param student_id
 * @returns {Query}
 */
export async function findStudentById(student_id) {
  return await StudentModel.findById(student_id, (err, student) => {
    if (err) {
      console.log('Error when finding' + student_id);
      return err;
    }
    else
      return student;
  });
}

/**
 *  Function that returns a list of all users in the db in the form of a Promise
 */
export async function getStudents() {
  return await StudentModel.find((err, users) => {
    if (err) {
      console.log('Error when finding users');
      return err;
    } else
      return users;
  });
}

/**
 *  A query function used to find user by i-number, takes an
 *  i-number as a parameter, and returns a single db user matching that number
 *  in the form of a Promise
 * @param i_number
 * @returns {Query|*}
 */
export async function findStudentByUnitId(unit_id) {
  return await StudentModel.findOne({unit_id: unit_id}, (err, user) => {
    if (err) {
      console.log('Error when finding' + unit_id);
      return err;
    } else
      return user;
  });
}

/**
 * Mutation function that saves the provided information in MongoDB
 * Requires a data object with the following fields (! indicates a require field):
 *        {
 *          first_name!
 *          last_name!
 *          i_number!
 *          section!
 *          simulation_role
 *          admin
 *        }
 * @param data
 * @returns {Promise.<void>}
 */
export async function addStudent(data) {
  const unit_id = await genUnitId();
  const newStudent = new StudentModel({
    first_name: data.first_name, last_name: data.last_name,
    orgId: data.orgId, section: data.section, unit_id: unit_id, type: 'student', create_date: new Date()
  });
  newStudent.save();
  return newStudent;
}


/**
 * Used for user authentication.
 * @param data
 * @returns {Promise.<*>}
 */
export async function studentLogin(data) {
  return await StudentModel.findOne({unit_id: data.unit_id}, '_id first_name last_name section type org_id', (err, user) => {
    if (err) {
      console.log("Error when finding " + data);
      return {};
    } else
      return user;
  });
}

/**
 * Helper function to generate a unit_id.
 * Uses crypto to generate a random 5 string id
 * Uses checkUnitId to verify that there are no duplicate ids.
 * @returns {String} - random string of chars used for Unit_id
 */
export function genUnitId() {
  const crypto = require('crypto');
  let id;
  do {
    id = crypto.randomBytes(5).toString('hex').slice(0, 5).toUpperCase();
  } while (checkUnitId(id));
  return id;
}

/**
 * Helper function to check for duplicate unit_id's
 * @param id - Id to be checked
 * @returns {boolean}
 */
function checkUnitId(id) {
  const check = StudentModel.findOne({unit_id: id}, (err, user) => {
    if (err) {
      console.log('Error when checking' + id);
      return err;
    }
    else
      return user;
  });
  return !check;
}

/**
 * saves auth token to user object in Mongo
 * @param student_id
 * @param token
 * @returns {Promise.<*>}
 */
export async function saveStudentToken(student_id, token) {
  return await StudentModel.update({_id: student_id}, {authToken: token}, {upsert: false});
}

/**
 * used for verifying a token payload. Returns just the items needed in the
 * payload.
 * @param student_id
 * @returns {Promise.<*>}
 */
export async function findStudentAuth(student_id) {
  return await StudentModel.findById(student_id, '_id first_name last_name type', (err, user) => {
    if (err) {
      console.log("Error when finding" + user);
      return null;
    }
    else
      return user;
  })
}