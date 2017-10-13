import Mongoose from 'mongoose'
Mongoose.connect('mongodb://localhost/econ-sim', {useMongoClient: true});
export const mongo = Mongoose.connection;
mongo.on('error', console.error.bind(console, "connection err:"));
mongo.once('open' ,() =>{
  console.log('connected to MongoDB');
});

export default Mongoose