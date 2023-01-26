module.exports = {
  description: 'Init organzation data',
  inputs: {
  },
  exits: {
  },

  fn: async function () {
    // user
    const { id, organizationId } = this.req.currentUser;

    // organization
    const organization = await sails.helpers.organizations.getOrganizationByCriteria({ id: organizationId });

    // categories
    const categories = await sails.helpers.categories.getCategoriesByCriteria({ organizationId });

    // tags
    const tags = await sails.helpers.tags.getTagsByCriteria({ organizationId });

    // transactions
    const transactions = await sails.helpers.transactions.getTransactionsByCriteria({ organizationId, userId: id });

    // transaction-tags
    const transactionIds = await sails.helpers.utils.mapRecords(transactions);

    const transactionTags = await sails.helpers.transactionTags.getTransactionTagsByCriteria({ transactionId: transactionIds });
    
    return {
      user: this.req.currentUser,
      included: {
        organization,
        categories,
        tags,
        transactions,
        transactionTags
      }
    };
  }
};
