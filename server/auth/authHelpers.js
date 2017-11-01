import {studentLogin, saveStudentToken, findStudentByAuth} from '../connectors/studentConnector';
import {teacherLogin, saveTeacherToken, findTeacherByAuth} from "../connectors/teacherConnector";

export async function findUser(data) {
  switch (data.type) {
    case 'teacher':
      return await teacherLogin(data);
      break;
    case 'student':
      return await studentLogin(data);
      break;
    default:
      return null;
      break;
  }
}

export async function saveAuth(token, type, user_id) {
  switch (type) {
    case 'teacher':
      await saveTeacherToken(user_id, token);
      break;
    case 'student':
      await saveStudentToken(user_id, token);
      break;
    default:
      return null;
      break;
  }
}

export async function findUserFromAuth(token) {
  return await findStudentByAuth(token) || await findTeacherByAuth(token);
}
