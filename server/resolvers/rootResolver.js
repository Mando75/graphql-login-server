import { merge } from 'lodash';
import userMap from './userResolver';


const rootResolver = {
  RootQuery: {

  }
};

export const resolvers = merge(rootResolver, userMap);