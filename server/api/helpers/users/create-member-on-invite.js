const bcrypt = require('bcrypt');

module.exports = {
  inputs: {
    memberValues: {
      type: 'json',
      required: true
    },
    userId: {
      type: 'string',
      required: true
    },
    organizationId: {
      type: 'string',
      required: true
    },
    request: {
      type: 'ref'
    }
  },
  exits: {
  },
  fn: async function (inputs) {
    /**
     * TODO:
     * will require organizationId to emit socket event to other members of organization
     */
    const { memberValues } = inputs;
    const member = await User.create(memberValues).fetch();
    
    return {
      member
    };
  }
};

