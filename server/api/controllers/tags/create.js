module.exports = {
  inputs: {
    name: {
      type: 'string',
      required: true
    }
  },
  exits: {
    organizationNotFound: {
      responseType: 'organizationNotFound'
    }
  },
  fn: async function (inputs, exits) {
    const { name } = inputs;
    const { organizationId, ...user } = this.req.currentUser;

    // fetch organization
    const organization = await sails.helpers.organizations.getOrganizationByCriteria({ id: organizationId });

    if (!organization) {
      return exits.organizationNotFound();
    }
    const tag = await sails.helpers.tags.createTag(name, user.id, organizationId, this.req);
    
    return exits.success({
      tag
    });
  }
};
