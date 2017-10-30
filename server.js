/**
 * created by Bryan Muller
 */
//server packages
import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {schema} from './server/rootSchema';
import cors from 'cors';
import {execute, subscribe} from 'graphql';
import {createServer} from 'http';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import {Router} from "./server/upload";

const sanitizedb = require('express-mongo-sanitize');
// auth packages
import * as jwt from 'jsonwebtoken';

const passport = require('passport');
import {ExtractJwt, Strategy} from 'passport-jwt';
import {userLogin, findUserById} from './server/connectors/userConnector';


const myGraphQLSchema = schema;
const PORT = process.env.port || 3000;

// define auth options
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'gzarfharharbezullube'; // This is a present from Mohonri


// create passport.js strategy
const strategy = new Strategy(jwtOptions, async (jwt_payload, next) => {
  const user = await findUserById(jwt_payload.id);
  if (user)
    next(null, user);
  else
    next(null, false);
});

passport.use(strategy);

// start defining middleware
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(passport.initialize());
server.use(sanitizedb({
  replaceWith: '_'
}));
server.use('*', cors({origin: 'http://localhost:3000'}));
server.use('*', cors({origin: 'http://localhost:3001'}));
server.get('/', (req, res) => {
  res.json({message: "Server is running."});
});

// define the auth endpoint
server.post('/auth', async (req, res, next) => {
  // ensure that proper parameters were provided.
  if (req.body.unit_id && req.body.password) {
    const data = {
      unit_id: req.body.unit_id,
      password: req.body.password
    };

    // find user in db
    const user = await userLogin(data);

    if (!user) {
      res.status(401).json({message: "no such user found"});
      next();
    } else if (user.org_id === data.password) {
      // if data was correct, create a jwt payload
      const payload = {id: user._id};
      // set a token with 14 day lifespan
      const token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: '14d'});
      res.json({message: "ok", token: token});
    } else {
      res.status(401).json({message: "passwords did not match"});
    }
  } else {
    res.status(401).json({message: "incorrect login parameters provided"});
  }
});

// create auth variable to pass as middleware
const auth = passport.authenticate('jwt', {session: false});

// To remove auth on these endpoints, comment out the 'passport.authenticate('jwt', {session: false})'

// new student upload point
server.use('/csvupload',
    //auth,
    Router);

// graphql endpoint
server.use('/graphql',
    auth,
    bodyParser.json(), graphqlExpress({schema: myGraphQLSchema}));

// for development only
server.use('/graphiql',
    auth,
    bodyParser.json(), graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
    }));

const ws = createServer(server);

// managing subscriptions
ws.listen(PORT, () => {
  console.log(`GraphQL Server is running on port ${PORT}`);

  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions'
  })
});

