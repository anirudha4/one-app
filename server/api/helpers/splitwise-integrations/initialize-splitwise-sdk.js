const splitwise = require('splitwise');
module.exports = {
  inputs: {
    integrationId: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
    },
  },
  fn: async function (inputs) {
    const { integrationId } = inputs;
    const { clientId, clientSecret } = await sails.helpers.splitwiseIntegrations.getSplitwiseIntegrationByCriteria({ id: integrationId });
    return splitwise({
      consumerKey: clientId,
      consumerSecret: clientSecret
    })
  }
};

