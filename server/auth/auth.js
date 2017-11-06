import * as jwt from 'jsonwebtoken';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {findUser, saveAuth} from './authHelpers';


// define auth options
export const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = `T25jZXVwb25hdGltZW1vaG9ucmlhbmRicnlhbmRlY2lk
                          ZWR0b21ha2V0aGVpcm93bmZyZWVsYW5jZWRldmVsb3Bt
                          ZW50Y29tcGFueWl0d2FzcHJldHR5c2lja2FuZG5vd3Ro
                          ZXlhcmVnb2luZ3RvcnVsZXRoZXdvcmxk`;


// create passport.js strategy
export const strategy = new Strategy(jwtOptions, async (jwt_payload, next) => {
  if (jwt_payload._id)
    return next(null, jwt_payload._id);
  else
    return next(null, false);
});

/**
 * Authentication endpoint
 * Requires a unit_id, password, and type in the body
 */
import express from 'express';

const authRouter = express.Router();

// define the auth endpoint
authRouter.post('/auth', async (req, res, next) => {
  // ensure that proper parameters were provided.
  if (req.body.unit_id && req.body.password && req.body.type) {
    const data = {
      unit_id: req.body.unit_id,
      password: req.body.password,
      type: req.body.type
    };

    // async call to find user based on login information
    let user = await findUser(data);
    // password is stored one of two ways, as the orgId, or the password.
    // this grabs the correct one agnostically.
    const userpass = user.orgId || user.password;

    if (!user) {
      res.status(401).json({message: "no such user found"});
      return next();
    } else if (userpass === data.password) {
      // if data was correct, create a jwt payload
      delete user.password; // remove sensitive data from payload
      delete user.orgId;
      const payload = {
        _id: user._id,
        unit_id: user.unit_id,
        type: user.type
      };
      // set a token with 14 day lifespan
      const token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: '14d'});
      res.json({message: "Authenticated", token: token, user: user});
      // save token to the db
      await saveAuth(token, user.type, user._id);
      return next();
    } else {
      res.status(401).json({message: "passwords did not match"});
      return next();
    }
  } else {
    res.status(401).json({message: "incorrect login parameters provided"});
    return next();
  }
});

export {authRouter};


