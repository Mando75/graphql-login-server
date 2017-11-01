import TeacherModel from '../mongooseSchemas/monTeacherSchema';


export async function teacherLogin(data) {
  return await TeacherModel.findOne({unit_id: data.unit_id, password: data.password}, (err, user) => {
    if (err)
      console.log("Error when finding " + data);
    else
      return user;
  });
}

export async function findTeacherById(teacher_id) {
  return await TeacherModel.findById(teacher_id, (err, teacher) => {
    if (err)
      console.log('Error when finding' + teacher_id);
    else
      return teacher;
  });
}

export async function saveTeacherToken(teacher_id, token) {
  return await TeacherModel.update({_id: teacher_id}, {authToken: token}, {upsert: false});
}

export async function findTeacherByAuth(token) {
  return await TeacherModel.findOne({authToken: token}, (err, user) => {
    if (err)
      console.log("Error when finding" + user);
    else
      return user;
  })
}