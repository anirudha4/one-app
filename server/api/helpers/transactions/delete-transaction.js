module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
    },
  },
  fn: async function (inputs) {
    const transaction = await Transaction.destroyOne(inputs.id);
    return transaction;
  }
};

