module.exports = {
  inputs: {
    criteria: {
      type: 'json'
    }
  },
  exits: {
    success: {
    },
  },
  fn: async function (inputs) {
    const { criteria } = inputs;
    const transactionTags = await TransactionTag.find(criteria);

    return transactionTags;
  }
};

