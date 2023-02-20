module.exports = {
  description: 'Init organzation data',
  inputs: {
  },
  exits: {
  },

  fn: async function () {
    // user
    const { id, email, organizationId } = this.req.currentUser;

    // organization
    const organization = await sails.helpers.organizations.getOrganizationByCriteria({ id: organizationId });

    // organization-members
    const members = await sails.helpers.users.getOrganizationMembers(organizationId);

    // user organizations
    const usersByEmail = await sails.helpers.users.getUsersByEmail({ email })
    const organizationIds = await sails.helpers.utils.mapRecords(usersByEmail, 'organizationId');
    const organizations = await sails.helpers.organizations.getOrganizationsForUser(organizationIds);

    // categories
    const categories = await sails.helpers.categories.getCategoriesByCriteria({ organizationId });

    // tags
    const tags = await sails.helpers.tags.getTagsByCriteria({ organizationId });

    // friends
    const friends = await sails.helpers.friends.getFriendsByCriteria({ organizationId });

    // transactions
    const transactions = await sails.helpers.transactions.getTransactionsByCriteria({ organizationId, userId: id });
    const transactionIds = await sails.helpers.utils.mapRecords(transactions);

    // transaction-tags
    const transactionTags = await sails.helpers.transactionTags.getTransactionTagsByCriteria({ transactionId: transactionIds });

    // transaction-members
    const transactionMembers = await sails.helpers.transactionMembers.getTransactionMembersByCriteria({ transactionId: transactionIds });

    const wallets = await sails.helpers.wallets.getWalletsByCriteria({ organizationId });

    const splitwiseIntegrations = await sails.helpers.splitwiseIntegrations.getSplitwiseIntegrationsByCriteria({ organizationId });

    const splitwiseIntegrationIds = sails.helpers.utils.mapRecords(splitwiseIntegrations);
    const splitwiseTransactions = await sails.helpers.splitwiseTransactions.getSplitwiseTransactionsByCriteria({ splitwiseIntegrationId: splitwiseIntegrationIds, transactionId: transactionIds });
    return {
      user: this.req.currentUser,
      included: {
        organization,
        categories,
        tags,
        transactions,
        transactionTags,
        transactionMembers,
        members,
        organizations,
        wallets,
        splitwiseIntegrations,
        friends,
        splitwiseTransactions
      }
    };
  }
};
