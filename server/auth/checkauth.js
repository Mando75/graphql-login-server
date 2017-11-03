import express from 'express';
const checkAuthRouter = express.Router();
import {findStudentAuth} from "../connectors/studentConnector";
import {findTeacherAuth} from "../connectors/teacherConnector";

checkAuthRouter.post('/', async (req, res, next) => {
  const payload = req.authpayload;
  let user;
  switch (payload.type) {
    case 'student':
      user = await findStudentAuth(payload._id);
      break;
    case 'teacher':
      user = await findTeacherAuth(payload._id);
      break;
    default:
      user = null;
      break;
  }
  if(user)
    res.json({user: user});
  else
    res.status(404).json({message: "User not found"});
});

export {checkAuthRouter};