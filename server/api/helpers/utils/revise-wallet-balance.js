module.exports = {
  inputs: {
    walletBalance: {
      type: 'number'
    },
    transactionAmount: {
      type: 'number'
    },
    transactionType: {
      type: 'string'
    }
  },
  exits: {
  },
  fn: async function (inputs) {
    const { walletBalance, transactionAmount, transactionType } = inputs;
    let balance = 0;
    if (transactionType === 'expense' || transactionType === 'investment') {
      balance = walletBalance - transactionAmount;
    } else {
      balance = walletBalance + transactionAmount;
    }

    return balance;
  }
};

