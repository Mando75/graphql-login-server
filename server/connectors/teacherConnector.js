import TeacherModel from '../mongooseSchemas/monTeacherSchema';

/**
 * Used for an initial teacher login
 * @param data
 * @returns {Promise.<*>}
 */
export async function teacherLogin(data) {
  return await TeacherModel.findOne({unit_id: data.unit_id}, (err, user) => {
    if (err)
      console.log("Error when finding " + data);
    else
      return user;
  });
}

/**
 * find a teacher based on mongo _id field
 * @param teacher_id
 * @returns {Promise.<*>}
 */
export async function findTeacherById(teacher_id) {
  return await TeacherModel.findById(teacher_id, (err, teacher) => {
    if (err) {
      console.log('Error when finding' + teacher_id);
      return null;
    }
    else
      return teacher;
  });
}

/**
 * saves auth token to a teacher
 * @param teacher_id
 * @param token
 * @returns {Promise.<*>}
 */
export async function saveTeacherToken(teacher_id, token) {
  return await TeacherModel.update({_id: teacher_id}, {authToken: token}, {upsert: false});
}

/**
 * finds a teacher based on existing auth token. Returns just the values
 * needed for a payload.
 * @param teacher_id
 * @returns {Promise.<*>}
 */
export async function findTeacherAuth(teacher_id) {
  return await TeacherModel.findById(teacher_id, '_id first_name last_name type', (err, teacher) => {
    if (err) {
      console.log('Error when finding teacher ' + err);
      return null;
    }
    else {
      return teacher;
    }
  })
}