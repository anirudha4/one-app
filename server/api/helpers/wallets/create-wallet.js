module.exports = {
  inputs: {
    name: {
      type: 'string',
      required: true
    },
    amount: {
      type: 'number',
      required: true,
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
    const { name, amount, organizationId } = inputs;
    const color = await sails.helpers.utils.generateRandomColor();
    const values = {
      name,
      color,
      amount,
      organizationId,
    }
    const wallet = await Wallet.create(values).fetch();

    return { wallet };
  }
};

