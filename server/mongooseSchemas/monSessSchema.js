import Mongoose from './mongodb-connection';

export const SessionSchema = new Mongoose.Schema({
  session: Number,
  role: String,
  value: Number
});

const SessionModel = new Mongoose.model('Session', SessionSchema);

export default SessionModel;