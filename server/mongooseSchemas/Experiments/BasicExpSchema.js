import {Mongoose} from '../mongodb-connection';

export const BasicExpSchema = new Mongoose.Schema({
  name: String,
  size: Number,
  session_count: Number,
  Types: [
    {
      type: String,
      distribution: Number,
      session_roles: [
        {
          session: Number,
          role: String,
          value: Number,
          allow_sell: Boolean
        }
      ]
    }
  ]
}, {collection: 'Experiments', discriminatorKey: '_type'});

export const BasicExpModel = Mongoose.model('Experiment', BasicExpSchema);