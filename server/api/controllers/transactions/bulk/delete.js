module.exports = {
  inputs: {
    transactionIds: {
      type: 'ref',
      required: true
    },
    walletId: {
      type: 'string',
      required: true
    }
  },
  exits: {
    organizationNotFound: {
      responseType: 'organizationNotFound'
    },
    walletNotFound: {
      responseType: 'walletNotFound'
    }
  },
  fn: async function (inputs, exits) {
    const { transactionIds, walletId } = inputs;

    const { organizationId } = this.req.currentUser;

    // fetch organization
    const organization = await sails.helpers.organizations.getOrganizationByCriteria({ id: organizationId });

    if (!organization) {
      return exits.organizationNotFound();
    }

    let wallet = await sails.helpers.wallets.getWalletByCriteria({ id: walletId });
    if (!wallet) {
      return exits.walletNotFound();
    }

    const transactions = await Promise.all(transactionIds.map(id => sails.helpers.transactions.deleteTransaction(id)));
    const balance = await sails.helpers.wallets.reviseWalletBalanceAfterBulkDelete(transactions, wallet.amount, this.req);
    wallet = await sails.helpers.wallets.updateWallet(wallet.id, { amount: balance }, this.req);

    return exits.success({
      transactions,
      wallet
    })
  }
};