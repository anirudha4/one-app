module.exports = {
  inputs: {
    transactions: {
      type: 'ref',
      required: true
    },
    walletBalance: {
      type: 'ref',
      required: true
    },
    request: {
      type: 'ref'
    }
  },
  exits: {
    success: {
    },
  },
  fn: async function (inputs) {
    const { transactions, walletBalance } = inputs;
    let balance = walletBalance;
    const { expense, income, investment } = await sails.helpers.transactions.getTransactionOverview(transactions);

    balance = balance - (expense + investment);
    balance = balance + income;

    return balance;
  }
};

