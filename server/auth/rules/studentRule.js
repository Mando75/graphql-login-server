import Rule from 'graphql-rule';

export const StudentRule = Rule.create({
  name: 'Student',
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
    org_id: {
      preRead: model => model.$props.isOwner,
      readFail: () => {
        throw new Error('Unauthorized')
      },
    },
    last_name: {},
    first_name: {},
    unit_id: {},
    type: {},
    sections: {
      preRead: model => model.$props.isTeacher || model.$props.isOwner,
      readFail: () => { throw new Error('Unauthorized') },
    },
    authToken: {
      preRead: model => model.$props.isOwner,
      readFail: () => {
        throw new Error('Unauthorized')
      },
    },
    email: {
      preRead: model => model.$props.isTeacher || model.$props.isOwner,
      readFail: () => { throw new Error('Unauthorized') },
    }
  }
});

