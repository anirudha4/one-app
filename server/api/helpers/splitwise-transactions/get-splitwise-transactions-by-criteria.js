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
    const splitwiseTransactions = await SplitwiseTransaction.find(criteria);

    return splitwiseTransactions;
  }
};

