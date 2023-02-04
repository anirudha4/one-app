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
    tags: {
      type: 'ref'
    }
  },
  exits: {
    organizationNotFound: {
      responseType: 'organizationNotFound'
    },
    categoryNotFound: {
      responseType: 'categoryNotFound'
    }
  },
  fn: async function (inputs, exits) {
    const { categoryId, tags } = inputs;
    const { organizationId, ...user } = this.req.currentUser;

    // fetch organization
    const organization = await sails.helpers.organizations.getOrganizationByCriteria({ id: organizationId });

    if (!organization) {
      return exits.organizationNotFound();
    }

    const [category] = await sails.helpers.categories.getCategoriesByCriteria({ id: categoryId });

    if (!category) {
      return exits.categoryNotFound();
    }

    // create transaction
    const transactionValues = _.pick(inputs, ['name', 'amount', 'type', 'date', 'categoryId', 'description']);
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


    return exits.success({
      transaction,
      transactionTags,
      transactionMembers
    })
  }
};
