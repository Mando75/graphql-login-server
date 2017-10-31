import * as jwt from 'jsonwebtoken';
const passport = require('passport');
import {ExtractJwt, Strategy} from 'passport-jwt';
import {studentLogin, findStudentById} from './connectors/studentConnector';



// define auth options
export const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'gzarfharharbezullube'; // This is a present from Mohonri


// create passport.js strategy
export const strategy = new Strategy(jwtOptions, async (jwt_payload, next) => {
  const student = await findStudentById(jwt_payload.id);
  if (student)
    next(null, student);
  else
    next(null, false);
});

import express from 'express';
const authRouter = express.Router();

// define the auth endpoint
authRouter.post('/auth', async (req, res, next) => {
  // ensure that proper parameters were provided.
  if (req.body.unit_id && req.body.password) {
    const data = {
      unit_id : req.body.unit_id,
      password : req.body.password
    };

    // find user in db
    const student = await studentLogin(data);

    if (!user) {
      res.status(401).json({message: "no such user found"});
      next();
    }else if (user.orgId === data.password) {
      // if data was correct, create a jwt payload
      const payload = {id: user._id};
      // set a token with 14 day lifespan
      const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: '14d' });
      res.json({message: "ok", token: token, user: user});
    } else {
      res.status(401).json({message: "passwords did not match"});
    }
  } else {
    res.status(401).json({message: "incorrect login parameters provided"});
  }
});


export default authRouter;