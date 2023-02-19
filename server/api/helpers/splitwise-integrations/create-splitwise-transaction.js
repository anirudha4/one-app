module.exports = {
  inputs: {
    values: {
      type: 'json',
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
    const { values, organizationId, request } = inputs;
    const splitwiseTransaction = await SplitwiseTransaction.create({ ...values, organizationId }).fetch();

    return splitwiseTransaction;
  }
};

