import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {schema} from './server/rootSchema';
import cors from 'cors';
import { execute, subscribe } from 'graphql';
import {createServer } from 'http';
import {SubscriptionServer } from 'subscriptions-transport-ws';
//import UserModel from './server/resolvers/mongooseSchemas/monUserSchema';

const myGraphQLSchema = schema;
const PORT = process.env.port || 3000;

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use('*', cors({origin: 'http://localhost:3000'}));
server.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema}));
server.use('/graphiql', bodyParser.json(), graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));

// server.post('/testdb', (req, res)=> {
//   let newUser = new UserModel({
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     i_number: req.body.i_number,
//     admin: false
//   });

//   newUser.save((err, result)=> {
//     if (err) { console.log("Item save failed" + err)}
//     console.log('User saved' + newUser);
//
//     res.redirect('/graphiql');
//   })
// });

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

