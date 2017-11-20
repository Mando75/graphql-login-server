import { merge } from 'lodash';
import studentMap from './studentResolver';
import teacherMap from './teacherResolver';
import sectionMap from './sectionResolver'

/**
 * Our root resolver map.
 * Defines an empty RootQuery, and will merge this
 * with all the other resolver maps
 * @type {{RootQuery: {}}}
 */
const rootResolver = {
  RootQuery: {
    user: {},
    course: {}
  }
};

export const resolvers = merge(rootResolver, teacherMap, sectionMap, studentMap);