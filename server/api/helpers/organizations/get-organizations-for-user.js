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
    console.log({ organizationIds });
    const organizationsForUser = await Organization.find({ id: organizationIds })
    return organizationsForUser;
  }
};

