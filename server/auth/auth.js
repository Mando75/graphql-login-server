import * as jwt from 'jsonwebtoken';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {findUser, saveAuth, buildSignInPayload, buildTokenPayload, extractLoginData} from './authHelpers';
import bcrypt from 'bcrypt'


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
    const data = extractLoginData(req.body);
    // async call to find user based on login information
    let user = await findUser(data);

    // password is stored one of two ways, as the orgId, or the password.
    // this grabs the correct one agnostically.
    const userpass = user ? user.org_id || user.password : null;

    if (!user) {
      res.status(401).json({message: "no such user found"});
      return next();
    } else if (userpass === data.password || await bcrypt.compare(data.password, userpass)) {
      // if data was correct, create a jwt payload
      const payload = buildTokenPayload(user);
      // set a token with 14 day lifespan
      const token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: '14d'});

      // define payload to send to user
      const userPayload = buildSignInPayload(user);
      res.json({message: "Authenticated", token: token, user: userPayload});
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


