module.exports = {
  inputs: {
    values: {
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
    const { values } = inputs;
    const transactionMembers = await TransactionMember.createEach(values).fetch();
    return transactionMembers;
  }
};

