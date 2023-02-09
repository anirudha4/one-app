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
    },
    action: {
      type: 'string',
      defaultsTo: 'create'
    }
  },
  exits: {
  },
  fn: async function (inputs) {
    const { walletBalance, transactionAmount, transactionType, action } = inputs;
    let balance = 0;
    if (action === 'create') {
      if (transactionType === 'expense' || transactionType === 'investment') {
        balance = walletBalance - transactionAmount;
      } else {
        balance = walletBalance + transactionAmount;
      }
    } else if (action === 'delete') {
      if (transactionType === 'expense' || transactionType === 'investment') {
        balance = walletBalance + transactionAmount;
      } else {
        balance = walletBalance - transactionAmount;
      }
    }
    return balance;
  }
};

