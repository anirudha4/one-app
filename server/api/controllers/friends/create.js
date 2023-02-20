module.exports = {
  inputs: {
    name: {
      type: 'string',
      required: true
    },
    source: {
      type: 'json',
      defaultsTo: {}
    }
  },
  exits: {
    organizationNotFound: {
      responseType: 'organizationNotFound'
    }
  },
  fn: async function (inputs, exits) {
    const { name, source } = inputs;
    const { organizationId } = this.req.currentUser;

    // fetch organization
    const organization = await sails.helpers.organizations.getOrganizationByCriteria({ id: organizationId });

    if (!organization) {
      return exits.organizationNotFound();
    }

    // name, source, organizationId, request
    const friend = await sails.helpers.friends.createFriend(name, source, organizationId, this.req);

    return exits.success({
      friend
    });
  }
};
