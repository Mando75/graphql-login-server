import express from 'express';
const checkAuthRouter = express.Router();
import {findUserFromAuth} from "./authHelpers";

checkAuthRouter.post('/', async (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const user = await findUserFromAuth(token);
  res.json({user: user});
});

export {checkAuthRouter};