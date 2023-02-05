module.exports = {
  inputs: {
    organizationIds: {
      type: 'json',
      required: true
    }
  },
  exits: {
  },
  fn: async function (inputs) {
    const { organizationIds } = inputs;
    const organizationsForUser = await Organization.find({ id: organizationIds })
    return organizationsForUser;
  }
};

