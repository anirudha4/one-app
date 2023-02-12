module.exports = {
  inputs: {
    criteria: {
      type: 'json'
    }
  },
  exits: {
    success: {
    },
  },
  fn: async function (inputs) {
    const { criteria } = inputs;
    const splitwiseIntegrations = await SplitwiseIntegration.find(criteria);

    return splitwiseIntegrations;
  }
};

