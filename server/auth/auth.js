import * as jwt from 'jsonwebtoken';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {findUser, saveAuth} from './authHelpers';


// define auth options
export const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'gzarfharharbezullube'; // This is a present from Mohonri


// create passport.js strategy
export const strategy = new Strategy(jwtOptions, async (jwt_payload, next) => {
  if (jwt_payload.user)
    next(null, jwt_payload.user);
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

    const user = await findUser(data);

    if (!user) {
      res.status(401).json({message: "no such user found"});
      next();
    } else if (user.orgId === data.password) {
      // if data was correct, create a jwt payload
      const payload = {user: user};
      // set a token with 14 day lifespan
      const token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: '14d'});
      res.json({message: "ok", token: token, user: user});
      saveAuth(token, user.type, user._id);
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


