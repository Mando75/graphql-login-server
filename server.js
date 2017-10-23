/**
 * created by Bryan Muller
 */
import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {schema} from './server/rootSchema';
import cors from 'cors';
import {execute, subscribe} from 'graphql';
import {createServer} from 'http';
import {SubscriptionServer} from 'subscriptions-transport-ws';
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
server.use('*', cors({origin: 'http://localhost:3000'}));
server.get('/', (req, res) => {
  res.json({message: "Server is running"});
});

// define the auth endpoint
server.post('/auth', async (req, res, next) => {
  // ensure that proper parameters were provided.
  if (req.body.unit_id && req.body.password) {
    const data = {
      unit_id : req.body.unit_id,
      i_number : req.body.password
    };

    const user = await userLogin(data);

    if (!user) {
      res.status(401).json({message: "no such user found"});
      next();
    }else if (user.i_number === data.i_number) {
      // if data was correct, create a jwt payload
      const payload = {id: user._id};
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({message: "ok", token: token});
    } else {
      res.status(401).json({message: "passwords did not match"});
    }
  } else {
    res.status(401).json({message: "incorrect login parameters provided"});
  }
});

// To remove auth on these endpoints, comment out the 'passport.authenticate('jwt', {session: false})'
server.use('/graphql', passport.authenticate('jwt', {session: false }), bodyParser.json(), graphqlExpress({schema: myGraphQLSchema}));
server.use('/graphiql', passport.authenticate('jwt', {session: false}), bodyParser.json(), graphiqlExpress({
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

