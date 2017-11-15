/**
 * created by Bryan Muller
 */
// start the mongo server
import {mongodstart} from "./mongostart";
mongodstart();

// server packages
import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {schema} from './server/rootSchema';
import cors from 'cors';
import {execute, subscribe} from 'graphql';
import {createServer} from 'http';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import {uploadRouter} from "./server/upload";

const myGraphQLSchema = schema;
const PORT = process.env.port || 3000;
const passport = require('passport');
// auth packages
import {strategy, authRouter} from "./server/auth/auth";
import {checkAuthRouter} from "./server/auth/checkauth";
import {decodeJWT, verifyTeacher} from "./server/auth/authHelpers";



passport.use(strategy);

// start defining middleware
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(passport.initialize());

//server.use('*', cors({origin: 'http://localhost:3001'}));


server.get('/', (req, res) => {
  res.json({message: "Server is running."});
});

server.use(authRouter);

// create auth variable to pass as middleware
const auth = passport.authenticate('jwt', {session: false});
server.use(decodeJWT);
// To remove auth on these endpoints, comment out the 'passport.authenticate('jwt', {session: false})'

server.use('/checkauth',
    auth,
    checkAuthRouter);

// graphql endpoint
server.use('/graphql',
    //auth,
    bodyParser.json(), graphqlExpress({schema: myGraphQLSchema}));

// for development only
server.use('/graphiql',
    //auth,
    bodyParser.json(), graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));

// new student upload point
server.use('/csvupload',
    auth,
    verifyTeacher,
    uploadRouter);


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

