module.exports = {
  inputs: {
    transaction: {
      type: 'json',
      required: true
    },
    splitwiseUser: {
      type: 'json',
      required: true
    }
  },
  exits: {
    success: {
    },
  },

  fn: async function (inputs) {
    let cost = 0;
    const { transaction, splitwiseUser } = inputs;

    const createdBy = transaction.created_by.id;

    if(parseInt(splitwiseUser.id) === parseInt(createdBy)) {
      cost = transaction.cost;
    } else {
      const transactionUser = transaction.users.find(user => parseInt(user.user_id) === parseInt(splitwiseUser.id));
      if(transactionUser) {
        cost = transactionUser.owed_share;
      }
    }
    return cost;
  }
};

