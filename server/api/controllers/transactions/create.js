module.exports = {
  inputs: {
    name: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      defaultsTo: 'expense'
    },
    amount: {
      type: 'number',
      required: true
    },
    date: {
      type: 'ref',
      required: true
    },
    description: {
      type: 'string'
    },
    is_recurring: {
      type: 'boolean',
      defaultsTo: false
    },
    categoryId: {
      type: 'string',
      required: true
    },
    walletId: {
      type: 'string',
      required: true
    },
    tags: {
      type: 'ref'
    },
    friends: {
      type: 'ref'
    }
  },
  exits: {
    organizationNotFound: {
      responseType: 'organizationNotFound'
    },
    categoryNotFound: {
      responseType: 'categoryNotFound'
    },
    walletNotFound: {
      responseType: 'walletNotFound'
    }
  },
  fn: async function (inputs, exits) {
    const { categoryId, tags, friends } = inputs;
    const { organizationId, ...user } = this.req.currentUser;

    // fetch organization
    const organization = await sails.helpers.organizations.getOrganizationByCriteria({ id: organizationId });

    if (!organization) {
      return exits.organizationNotFound();
    }

    let wallet = await sails.helpers.wallets.getWalletByCriteria({ id: inputs.walletId });
    if (!wallet) {
      return exits.walletNotFound();
    }

    const [category] = await sails.helpers.categories.getCategoriesByCriteria({ id: categoryId });

    if (!category) {
      return exits.categoryNotFound();
    }

    // create transaction
    const transactionValues = _.pick(inputs, ['name', 'amount', 'type', 'date', 'categoryId', 'walletId', 'description']);
    const transaction = await sails.helpers.transactions.createTransaction(transactionValues, user.id, organizationId, this.req);

    // relational data
    let transactionTags = [], transactionMembers = [];
    // create transaction_tags if tag is assigned
    if (tags.length > 0) {
      const transactionTagsValues = tags.map(tag => ({
        tagId: tag,
        transactionId: transaction.id
      }))
      transactionTags = await sails.helpers.transactionTags.createTransactionTags(transactionTagsValues, this.req);
    }
    if (friends.length > 0) {
      const transactionMembersValues = friends.map(friend => ({
        memberId: friend,
        transactionId: transaction.id
      }))
      transactionMembers = await sails.helpers.transactionMembers.createTransactionMembers(transactionMembersValues, this.req);
    }

    // update wallet balance :WALLET
    // wallet = await sails.helpers.wallets.updateWalletBalance(transaction, wallet, this.req);

    return exits.success({
      transaction,
      transactionTags,
      transactionMembers,
      wallet
    })
  }
};
