/**
 * This file containers various helper functions to assist in
 * the authentication process
 */

import {studentLogin, saveStudentToken} from '../connectors/studentConnector';
import {teacherLogin, saveTeacherToken, findTeacherById} from "../connectors/teacherConnector";


/**
 * determines the type of the user trying to login,
 * and returns a result from the correct login function
 * @param data
 * @returns {Promise.<*>}
 */
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

/**
 * saves the auth token provided to the user in the db
 * based on user type.
 * @param token
 * @param type
 * @param user_id
 * @returns {Promise.<null>}
 */
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

/**
 * This is used for post authentication.
 * It decodes the jwt attached to the request,
 * and saves it to the req.authpayload parameter.
 * This allows the decoded jwt info to be used by other functions
 */
import jwt_decode from 'jwt-decode'
export function decodeJWT(req, res, next) {
  if (req.headers.authorization) {
    try {
      const payload = jwt_decode(req.headers.authorization.split('Bearer ')[1]);
      req.authpayload = payload;
      return next();
    } catch (e) {
      res.status(401).json({message: "Error when decoding Auth Token", error: e}).end();
    }
  } else {
    console.log('No JWT detected');
    return next();
  }
}

/**
 * Used to verify the type associated with
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export async function verifyTeacher(req, res, next) {
  const type = req.authpayload.type;
  if (type === 'teacher') {
    const checkUser = await findTeacherById(req.authpayload._id);
        checkUser ? next() : res.status(403).json({message: "You are not authorized to view this page"}).end();
  } else {
    res.status(403).json({message: "You are not authorized to view this page"}).end();
  }
}