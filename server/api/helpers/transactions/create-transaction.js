module.exports = {
  inputs: {
    values: {
      type: 'json',
      required: true
    },
    userId: {
      type: 'string',
      required: true
    },
    organizationId: {
      type: 'string',
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
    const { values, userId, organizationId } = inputs;
    const transaction = await Transaction.create({ ...values, userId, organizationId }).fetch();

    return transaction;
  }
};

