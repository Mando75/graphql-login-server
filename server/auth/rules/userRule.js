import Rule from 'graphql-rule';

export const StudentRule = Rule.create({
  name: 'Student',
  props: {
    isTeacher: (model) => model.$context.type === 'teacher',
    isOwner: (model) => model.$data._id == model.$context._id,
  },
  rules: {
    _id: true,
    org_id: {
      preRead: (model) => model.$props.isOwner,
      readFail: () => { return new Error('Unauthorized')},
    },
    last_name: true,
    first_name: true,
    unit_id: true,
    type: true,
    sections: {
      preRead: (model) => model.$props.isTeacher || model.$props.isOwner,
      readFail: () => { return new Error('Unauthorized')},
    },
    authToken: {
      preRead: (model) => model.$props.isOwner,
      readFail: () => { return new Error('Unauthorized')},
    }
  }
});

