module.exports = {
  inputs: {
    integrationId: {
      type: 'string',
      required: true
    },
    transactionsToImport: {
      type: 'ref',
      required: true
    }
  },
  exits: {
    organizationNotFound: {
      responseType: 'organizationNotFound'
    },
  },
  fn: async function (inputs, exits) {
    const { organizationId, id: userId } = this.req.currentUser;

    // fetch organization
    const organization = await sails.helpers.organizations.getOrganizationByCriteria({ id: organizationId });
    if (!organization) {
      return exits.organizationNotFound();
    }

    // for now get category_id of others
    const category = await sails.helpers.categories.getCategoryByCriteria({ organizationId: organization.id, name: 'Other' });

    // for not get first wallet
    let [wallet] = await sails.helpers.wallets.getWalletsByCriteria({ organizationId: organization.id });

    const { transactionsToImport, integrationId } = inputs;

    let transactions = [], transactionTags = [], tags = [], splitwiseTransactions = [];
    try {
      for (let index = 0; index < transactionsToImport.length; index++) {
        const splitwiseTransactionToImport = transactionsToImport[index];
        const transactionValues = {
          name: splitwiseTransactionToImport.description,
          type: 'expense',
          amount: splitwiseTransactionToImport.cost,
          date: splitwiseTransactionToImport.date,
          categoryId: category.id,
          walletId: wallet.id
        }
        const transaction = await sails.helpers.transactions.createTransaction(transactionValues, userId, organizationId, this.req);

        // create splitwise_transaction
        const splitwiseTransactionToImportValues = {
          referenceId: splitwiseTransactionToImport.id,
          groupName: splitwiseTransactionToImport.group_id,
          creationMethod: splitwiseTransactionToImport.creation_method,
          friends: splitwiseTransactionToImport.users,
          createdBy: splitwiseTransactionToImport.createdBy,
          splitwiseIntegrationId: integrationId,
          transactionId: transaction.id
        };
        const splitwiseTransaction = await sails.helpers.splitwiseIntegrations.createSplitwiseTransaction(splitwiseTransactionToImportValues, organizationId, this.req);
        splitwiseTransactions.push(splitwiseTransaction);

        const tagsForThisTransaction = [];
        for (let friendIndex = 0; friendIndex < splitwiseTransactionToImport.users.length; friendIndex++) {
          const element = splitwiseTransactionToImport.users[friendIndex].user;
          const name = element.first_name;
          const color = await sails.helpers.utils.generateRandomColor();
          const tag = await Tag.findOrCreate({ name, organizationId }, { color, name, createdBy: userId, organizationId });
          tagsForThisTransaction.push(tag);
        }
        const transactionTagsValues = tagsForThisTransaction.map(tag => ({
          tagId: tag.id,
          transactionId: transaction.id
        }));
        const transactionTagsForThisTransaction = await sails.helpers.transactionTags.createTransactionTags(transactionTagsValues, this.req);

        transactions.push(transaction);
        transactionTags = [...transactionTags, ...transactionTagsForThisTransaction];
        tags = _.uniqBy([...tags, ...tagsForThisTransaction], 'name');
      }


      // adjust wallet balance :WALLET
      // const balance = await sails.helpers.wallets.reviseWalletBalanceAfterBulkAdd(transactions, wallet.amount, this.req);

      // wallet = await sails.helpers.wallets.updateWallet(wallet.id, { amount: balance }, this.req);
      return exits.success({
        transactions,
        wallet,
        tags,
        transactionTags,
        splitwiseTransactions
      })

    } catch (error) {
      console.log(error);
    }
  }
};
