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
      return {};
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
    const checkUser = true; // await findTeacherById(req.authpayload._id);
    checkUser ? next() : res.status(403).json({message: "You are not authorized to view this page"}).end();
  } else {
    res.status(403).json({message: "You are not authorized to view this page"}).end();
  }
}

/**
 * Extract the login data from request body and return it as an object
 * @param body
 * @returns {{unit_id: *, password: *, type}}
 */
export function extractLoginData(body) {
  return {
    unit_id: body.unit_id,
    password: body.password,
    type: body.type
  }
}

/**
 * Builds the sign in payload to be returned to the
 * client unhashed
 * @param user
 * @returns {{_id, unit_id: *, type}}
 */
export function buildSignInPayload(user) {
  return {
    _id: user._id,
    unit_id: user.unit_id,
    type: user.type,
  }
}

/**
 * Builds the token payload to be signed and sent with
 * the payload
 * @param user
 * @returns {{_id, unit_id: *, type}}
 */
export function buildTokenPayload(user) {
  return {
    _id: user._id,
    unit_id: user.unit_id,
    type: user.type,
    sections: user.sections
  }
}