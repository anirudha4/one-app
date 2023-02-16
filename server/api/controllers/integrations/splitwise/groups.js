module.exports = {
  inputs: {
    integrationId: {
      type: 'string',
      required: true
    }
  },
  exits: {
    organizationNotFound: {
      responseType: 'organizationNotFound'
    },
    splitwiseIntegrationCorrupt: {
      responseType: 'splitwiseIntegrationCorrupt'
    }
  },
  fn: async function (inputs, exits) {
    const { organizationId } = this.req.currentUser;

    // fetch organization
    const organization = await sails.helpers.organizations.getOrganizationByCriteria({ id: organizationId });

    if (!organization) {
      return exits.organizationNotFound();
    }

    const { integrationId } = inputs;
    const splitwise = await sails.helpers.splitwiseIntegrations.initializeSplitwiseSdk(integrationId);

    try {
      const groups = await splitwise.getGroups({
        limit: 100
      });
      return exits.success({
        groups
      });
    } catch (err) {
      return exits.splitwiseIntegrationCorrupt();
    }
  }
};
