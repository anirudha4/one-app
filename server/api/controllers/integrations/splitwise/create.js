const splitwise = require('splitwise');

module.exports = {
  inputs: {
    clientId: {
      type: 'string',
      required: true
    },
    clientSecret: {
      type: 'string',
      required: true
    }
  },
  exits: {
    organizationNotFound: {
      responseType: 'organizationNotFound'
    },
    clientIdOrSecretIncorrect: {
      responseType: 'clientIdOrSecretIncorrect'
    }
  },
  fn: async function (inputs, exits) {
    const { clientId, clientSecret } = inputs;
    const { organizationId, id: userId } = this.req.currentUser;

    // fetch organization
    const organization = await sails.helpers.organizations.getOrganizationByCriteria({ id: organizationId });

    if (!organization) {
      return exits.organizationNotFound();
    }

    try {
      // create access token using client id and client secret
      await splitwise({
        consumerKey: clientId,
        consumerSecret: clientSecret
      }).getAccessToken()
    }
    catch (err) {
      return exits.clientIdOrSecretIncorrect();
    }
    const splitwiseIntegrationValues = {
      name: `splitwise-integration`,
      clientId,
      clientSecret
    }
    const splitwiseIntegration = await sails.helpers.splitwiseIntegrations.createSplitwiseIntegration(splitwiseIntegrationValues, organizationId, userId, this.req);

    return exits.success({
      splitwiseIntegration
    });
  }
};
