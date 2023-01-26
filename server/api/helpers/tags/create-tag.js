module.exports = {
  inputs: {
    name: {
      type: 'string',
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
    success: {
    },
  },
  fn: async function (inputs) {
    const { name, userId, organizationId, request } = inputs;

    // generate random color for tag
    const color = await sails.helpers.utils.generateRandomColor();
    // create tag
    const tag = await Tag.create({ name, color, createdBy: userId, organizationId }).fetch();
    return tag;

  }
};

