import TeacherModel from '../mongooseSchemas/monTeacherSchema';


export async function teacherLogin(data) {
  return await TeacherModel.findOne({unit_id: data.unit_id}, (err, user) => {
    if (err)
      console.log("Error when finding " + data);
    else
      return user;
  });
}

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

export async function saveTeacherToken(teacher_id, token) {
  return await TeacherModel.update({_id: teacher_id}, {authToken: token}, {upsert: false});
}


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