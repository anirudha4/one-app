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
    const splitwiseIntegration = await SplitwiseIntegration.findOne(criteria);

    return splitwiseIntegration;
  }
};

