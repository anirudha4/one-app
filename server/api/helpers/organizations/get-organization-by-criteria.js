module.exports = {
  inputs: {
    criteria: {
      type: 'json',
      required: true
    }
  },
  exits: {
  },
  fn: async function (inputs) {

    // Get organization by criteria.
    const { criteria } = inputs;
    const organization = await Organization.findOne(criteria);

    return organization;

  }


};

