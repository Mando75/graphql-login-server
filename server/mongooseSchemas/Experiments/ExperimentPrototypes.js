import {Mongoose} from '../mongodb-connection';

export const BasicTypeSchema = new Mongoose.Schema({
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
});

// export const BasicTypesModel = Mongoose.model('BasicType', BasicTypeSchema);

export const BasicExpSchema = new Mongoose.Schema({
  name: String,
  size: Number,
  session_count: Number,
}, {collection: 'Experiments', discriminatorKey: '_type'});

export const BasicExpModel = Mongoose.model('Experiment', BasicExpSchema);


