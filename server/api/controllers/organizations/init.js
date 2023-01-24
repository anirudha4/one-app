module.exports = {
  description: 'Init organzation data',
  inputs: {
  },
  exits: {
  },

  fn: async function () {
    // get user properties
    const { organizationId } = this.req.currentUser;

    // get organization
    const organization = await sails.helpers.organizations.getOrganizationByCriteria({ id: organizationId });

    const categories = await sails.helpers.categories.getCategoriesByCriteria({ organizationId });

    
    return {
      user: this.req.currentUser,
      included: {
        organization,
        categories
      }
    };
  }
};
