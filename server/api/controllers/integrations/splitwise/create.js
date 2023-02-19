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
    let splitwiseUser = {};
    try {
      // create access token using client id and client secret
      splitwiseUser = await splitwise({
        consumerKey: clientId,
        consumerSecret: clientSecret
      }).getCurrentUser();
    }
    catch (err) {
      return exits.clientIdOrSecretIncorrect();
    }
    const splitwiseIntegrationValues = {
      name: `splitwise-integration`,
      clientId,
      clientSecret,
      splitwiseUser
    }
    const splitwiseIntegration = await sails.helpers.splitwiseIntegrations.createSplitwiseIntegration(splitwiseIntegrationValues, organizationId, userId, this.req);

    return exits.success({
      splitwiseIntegration
    });
  }
};
