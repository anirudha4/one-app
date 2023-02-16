module.exports = {
  inputs: {
    integrationId: {
      type: 'string',
      required: true
    },
    dated_after: {
      type: 'string',
      required: true
    },
    group_id: {
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

    const { integrationId, group_id, dated_after } = inputs;
    const splitwise = await sails.helpers.splitwiseIntegrations.initializeSplitwiseSdk(integrationId);

    try {
      const expenses = await splitwise.getExpenses({
        group_id,
        limit: 10000
      });
      return exits.success({
        expenses
      });
    } catch (err) {
      console.log(err);
      return exits.splitwiseIntegrationCorrupt();
    }
  }
};
