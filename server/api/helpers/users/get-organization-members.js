module.exports = {
  inputs: {
    organizationId: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
    },
  },
  fn: async function (inputs) {
    const { organizationId } = inputs;
    const members = await User.find({ organizationId });
    return members;
  }
};