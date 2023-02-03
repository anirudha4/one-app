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
    const transactions = await Transaction.findOne(criteria);
    
    return transactions;
  }
};

