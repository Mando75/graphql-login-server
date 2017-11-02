import * as jwt from 'jsonwebtoken';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {findUser, saveAuth} from './authHelpers';


// define auth options
export const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'gzarfharharbezullube'; // This is a present from Mohonri


// create passport.js strategy
export const strategy = new Strategy(jwtOptions, async (jwt_payload, next) => {
  if (jwt_payload._id)
    next(null, jwt_payload._id);
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
      unit_id: req.body.unit_id,
      password: req.body.password,
      type: req.body.type
    };

    let user = await findUser(data);
    const userpass = user.orgId || user.password;
    if (!user) {
      res.status(401).json({message: "no such user found"});
      next();
      //TODO this needs to be adjusted for teacher login
    } else if (userpass === data.password) {
      // if data was correct, create a jwt payload
      delete user.password;
      delete user.orgId;
      const payload = {
        _id: user._id,
        unit_id: user.unit_id,
        type: user.type
      };
      // set a token with 14 day lifespan
      const token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: '14d'});
      res.json({message: "ok", token: token, user: user});
      await saveAuth(token, user.type, user._id);
      next();
    } else {
      res.status(401).json({message: "passwords did not match"});
      next();
    }
  } else {
    res.status(401).json({message: "incorrect login parameters provided"});
    next();
  }
});

export {authRouter};


