import TeacherModel from '../mongooseSchemas/monTeacherSchema';
import bcrypt from 'bcrypt';
import {TeacherRule} from "../auth/rules/teacherRule";

export async function getTeachers(context) {
  return await TeacherModel.find((err, teachers) => {
    if (err) {
      console.log('Error when finding users');
      return err;
    } else
      return teachers.map(teacher => new TeacherRule(teacher, context));
  })
}

/**
 * add teacher to the db.
 * Data object must contain
 * @param data
 * @returns {Promise.<void>}
 */
export async function addTeacher(data) {
  const salt = await bcrypt.genSalt(5);
  const password = await  bcrypt.hash(data.password, salt);
  const newTeacher = new TeacherModel({
    first_name: data.first_name, last_name: data.last_name,
    email: data.email, password: password,
    type: "teacher", create_date: new Date()
  });
  newTeacher.save();
  return newTeacher;
}

/**
 * Used for an initial teacher login
 * @param data
 * @returns {Promise.<*>}
 */
export async function teacherLogin(data) {
  return await TeacherModel.findOne({email: data.unit_id}, '_id first_name last_name type password sections', (err, user) => {
    if (err) {
      console.log("Error when finding " + data);
      return {};
    } else
      return user;
  });
}

/**
 * find a teacher based on mongo _id field
 * @param teacher_id
 * @returns {Promise.<*>}
 */
export async function findTeacherById(teacher_id, context) {
  return await TeacherModel.findById(teacher_id).populate('sections').exec((err, teacher) => {
    if (err) {
      console.log('Error when finding' + teacher_id);
      return null;
    }
    else
      return new TeacherRule(teacher, context);
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

/**
 *
 * @param teacher_id
 * @param new_data
 * @param context
 * @returns {Promise<void>}
 */
export async function editTeacher(teacher_id, new_data, context) {
  return await TeacherModel.findOneAndUpdate({_id: teacher_id}, new_data, {upsert: false, new: true}).exec().then((err, teacher) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      return new TeacherRule(teacher, context);
    }
  });
}
