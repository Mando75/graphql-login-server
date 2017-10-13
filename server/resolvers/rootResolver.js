import { merge } from 'lodash';
import UserModel from './connectors/userConnector';

const rootResolver = {
  RootQuery: {
    user(obj, args){
      return new Promise((resolve, reject)=> {
        UserModel.find((err, user_id)=> {
          if(err) reject(err);
          else resolve(user_id);
        })
      })
    }
  }
};

export const resolvers = merge(rootResolver);