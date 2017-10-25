import Mongoose from 'mongoose'
Mongoose.Promise = global.Promise;
//Mongoose.connect('mongodb://localhost/econ-sim', {useMongoClient: true});
Mongoose.connect('mongodb://dev:colinisdecent@ds229435.mlab.com:29435/econsimdev', {useMongoClient: true});
export const mongo = Mongoose.connection;
mongo.on('error', console.error.bind(console, "connection err:"));
mongo.once('open' ,() =>{
  console.log('Connected to MongoDB');
});

export default Mongoose;