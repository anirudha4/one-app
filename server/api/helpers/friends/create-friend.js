module.exports = {
  inputs: {
    name: {
      type: 'string',
      required: true
    },
    source: {
      type: 'json',
      defaultsTo: {}
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
    success: {
    },
  },
  fn: async function (inputs) {
    const { name, source, organizationId } = inputs;

    // generate random color for friend
    const color = await sails.helpers.utils.generateRandomColor();

    // create friend
    const friend = await Friend.create({ name, color, source, organizationId }).fetch();
    return friend;
  }
};

