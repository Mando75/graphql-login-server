import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {schema} from './server/rootSchema';
import cors from 'cors';
import { execute, subscribe } from 'graphql';
import {createServer } from 'http';
import {SubscriptionServer } from 'subscriptions-transport-ws';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import {ExtractJwt, Strategy } from 'passport-jwt';

const myGraphQLSchema = schema;
const PORT = process.env.port || 3000;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'gzarfharharbezullube';

const strategy = new Strategy(jwtOptions, (jwt_payload, next) => {
  console.log('payload received', jwt_payload);
  //const user =
});





const server = express();
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: false }));
server.use('*', cors({origin: 'http://localhost:3000'}));
server.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema}));
server.use('/graphiql', bodyParser.json(), graphiqlExpress({
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

