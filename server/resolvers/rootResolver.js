import { merge } from 'lodash';
import userMap from './userResolver';

/**
 * Our root resolver map.
 * Defines an empty RootQuery, and will merge this
 * with all the other resolver maps
 * @type {{RootQuery: {}}}
 */
const rootResolver = {
  RootQuery: {

  }
};

export const resolvers = merge(rootResolver, userMap);