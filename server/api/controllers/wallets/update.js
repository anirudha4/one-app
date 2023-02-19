module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string'
    },
    amount: {
      type: 'number'
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
    const { organizationId } = this.req.currentUser;

    // fetch organization
    const organization = await sails.helpers.organizations.getOrganizationByCriteria({ id: organizationId });

    if (!organization) {
      return exits.organizationNotFound();
    }

    const { id } = inputs;
    let wallet = await sails.helpers.wallets.getWalletByCriteria({ id });
    if (_.isEmpty(wallet)) {
      return exits.walletNotFound();
    }

    // :WALLET
    // // update wallet
    // const walletValues = _.pick(inputs, ['name', 'amount']);

    // wallet = await sails.helpers.wallets.updateWallet(id, walletValues, this.req);
    
    return exits.success({
      item: wallet
    });
  }
};
