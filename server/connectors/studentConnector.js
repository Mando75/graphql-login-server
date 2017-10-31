import StudentModel from '../mongooseSchemas/monStudentSchema';

/**
 * A search query for finding users by MongoDb id. Returns
 * a single database object in the form of a Promise.
 * @param user_id
 * @returns {Query}
 */
export async function findStudentById(user_id) {
  return await StudentModel.findById(user_id, (err, user)=>{
    if(err)
      console.log('Error when finding' + user_id);
    else
      return user;
  });
}

/**
 *  Function that returns a list of all users in the db in the form of a Promise
 */
export async function getStudents() {
  return await StudentModel.find((err, users)=> {
    if(err)
      console.log('Error when finding users');
    else
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
export async function findStudentByOrgId(orgId) {
  return await StudentModel.findOne({orgId: orgId}, (err, user)=>{
    if(err)
      console.log('Error when finding' + orgId);
    else
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
  const newUser = new UserModel({first_name: data.first_name, last_name: data.last_name,
                   orgId: data.orgId, simulation_role: null, section: data.section, unit_id: unit_id});
  newUser.save();
  return newUser;
}


/**
 * Used for user authentication.
 * @param data
 * @returns {Promise.<*>}
 */
export async function userLogin(data) {
  return await StudentModel.findOne({unit_id: data.unit_id, orgId: data.orgId}, (err, user) => {
    if(err)
      console.log("Error when finding " + data);
    else
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
    id = crypto.randomBytes(5).toString('hex').slice(0,5).toUpperCase();
  } while (checkUnitId(id));
  return id;
}

/**
 * Helper function to check for duplicate unit_id's
 * @param id - Id to be checked
 * @returns {boolean}
 */
function checkUnitId(id) {
  const check = StudentModel.findOne({unit_id: id}, (err, user)=> {
    if(err)
      console.log('Error when checking' + id);
    else
      return user;
  });
  return !check;
}
