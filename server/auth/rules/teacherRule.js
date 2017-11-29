import Rule from 'graphql-rule';

export const TeacherRule = Rule.create({
  name: 'Teacher',
  props: {
    isTeacher: model => model.$context.type === 'teacher',
    isOwner: model => model.$data._id == model.$context._id,
  },
  defaultRule: {
    read: model => true,
    readFail: (model, key) => { throw new Error(`Cannot access '${key}`) }
  },
  rules: {
    _id: {},
    last_name: {},
    first_name: {},
    unit_id: {},
    type: {},
    sections: {
      preRead: model => model.$props.isTeacher,
      readFail: () => { throw new Error('Unauthorized') },
    },
    authToken: {
      preRead: model => model.$props.isOwner,
      readFail: () => { throw new Error('Unauthorized') },
    },
    email: {
      preRead: model => model.$props.isTeacher,
      readFail: () => { throw new Error('Unauthorized') },
    },
    password: {
      preRead: model => model.$props.isOwner,
      readFail: () => { throw new Error('Unauthorized') }
    }
  }
});

