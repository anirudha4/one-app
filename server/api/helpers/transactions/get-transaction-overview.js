module.exports = {
  inputs: {
    transactions: {
      type: 'ref',
      required: true
    }
  },
  exits: {
    success: {
    },
  },
  fn: async function (inputs) {
    const { transactions } = inputs;
    let expense = 0, income = 0, investment = 0;
    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        expense += transaction.amount;
      }
      else if (transaction.type === 'income') {
        income += transaction.amount;
      }
      else {
        investment += transaction.amount;
      }
    })
    return {
      expense,
      income,
      investment,
      total: (income) - (expense + investment)
    }

  }


};

