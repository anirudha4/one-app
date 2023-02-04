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
    const transactionMembers = await TransactionMember.find(criteria);

    return transactionMembers;
  }
}
