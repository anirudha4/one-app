module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
    },
    organizationNotFound: {
      responseType: 'organizationNotFound'
    },
    transactionNotFound: {
      responseType: 'transactionNotFound'
    },
    walletNotFound: {
      responseType: 'walletNotFound'
    },
  },
  fn: async function (inputs, exits) {
    const { id } = inputs;

    const { organizationId } = this.req.currentUser;

    // fetch organization
    const organization = await sails.helpers.organizations.getOrganizationByCriteria({ id: organizationId });

    if (!organization) {
      return exits.organizationNotFound();
    }

    // find transaction by id
    let transaction = await sails.helpers.transactions.getTransactionByCriteria({ id });

    if (!transaction) {
      return exits.transactionNotFound({ code })
    }

    transaction = await sails.helpers.transactions.deleteTransaction(id);

    let wallet = await sails.helpers.wallets.getWalletByCriteria({ id: transaction.walletId });

    if(!wallet) {
      return exits.walletNotFound();
    }
    const updatedWalletBalance = await sails.helpers.utils.reviseWalletBalance(wallet.amount, transaction.amount, transaction.type, 'delete');
    wallet = await sails.helpers.wallets.updateWallet(wallet.id, { amount: updatedWalletBalance }, this.req);

    return exits.success({
      transaction,
      wallet
    });
  }
};

