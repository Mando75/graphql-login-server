import { merge } from 'lodash';
import studentMap from './studentResolver';
import teacherMap from './teacherResolver';

/**
 * Our root resolver map.
 * Defines an empty RootQuery, and will merge this
 * with all the other resolver maps
 * @type {{RootQuery: {}}}
 */
const rootResolver = {
  RootQuery: {  }
};


export const resolvers = merge(rootResolver, studentMap, teacherMap);