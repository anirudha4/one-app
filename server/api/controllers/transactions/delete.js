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
    }
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

    return exits.success({
      transaction
    })
  }
};

